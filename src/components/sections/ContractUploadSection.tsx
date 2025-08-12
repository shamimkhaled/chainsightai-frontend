import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText, Building2, Loader2, X, AlertTriangle, CheckCircle, Info, Eye, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface UploadFormData {
  files: File[];
  industry: string;
}

interface AnalysisResult {
  document_analysis: {
    overall_risk_score: number;
    executive_summary: {
      priority_level: string;
      critical_issues_count: number;
      missing_clauses_count: number;
    };
    risk_assessment: Array<{
      category: string;
      severity: string;
      description: string;
      potential_impact: string;
      likelihood: string;
    }>;
    missing_critical_clauses: Array<{
      clause_name: string;
      importance: string;
      reason: string;
      suggested_text: string;
    }>;
    identified_risks: Array<{
      risk_type: string;
      severity: string;
      current_protection: string;
      mitigation_suggestion: string;
    }>;
    improvement_recommendations: Array<{
      priority: number;
      category: string;
      description: string;
      justification: string;
      suggested_implementation: string;
    }>;
    compliance_check: {
      industry_standards: string;
      regulatory_requirements: string;
      best_practices: string;
    };
  };
}

interface ContractResult {
  id: string;
  original_filename: string;
  analysis_result: AnalysisResult;
  created_at: string;
  risk_score: number;
}

export function ContractUploadSection() {
  const [formData, setFormData] = useState<UploadFormData>({
    files: [],
    industry: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingRateLimit, setIsCheckingRateLimit] = useState(false);
  const [rateLimitInfo, setRateLimitInfo] = useState<{
    daily_limit: number;
    current_count: number;
    remaining: number;
    can_proceed: boolean;
    reset_time: string;
  } | null>(null);
  const [results, setResults] = useState<ContractResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, files }));
  };

  const handleIndustryChange = (value: string) => {
    setFormData(prev => ({ ...prev, industry: value }));
  };

  const handleRemoveFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  useEffect(() => {
    // Check rate limit when component mounts
    checkRateLimit();
  }, []);

  const checkRateLimit = async () => {
    setIsCheckingRateLimit(true);
    try {
      const response = await fetch('https://chainsightai-app-6kgwc.ondigitalocean.app/api/v1/rate-limit/', {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        }
      });

      if (response.ok) {
        const rateLimitData = await response.json();
        setRateLimitInfo(rateLimitData);
        return rateLimitData;
      } else {
        console.error('Failed to check rate limit');
        return null;
      }
    } catch (error) {
      console.error('Error checking rate limit:', error);
      return null;
    } finally {
      setIsCheckingRateLimit(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.files.length) {
      toast({
        title: "No files selected",
        description: "Please select at least one contract document to upload.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.industry) {
      toast({
        title: "Industry required",
        description: "Please select an industry for your contract.",
        variant: "destructive"
      });
      return;
    }

    // Check rate limit before proceeding
    const rateLimitData = await checkRateLimit();
    if (!rateLimitData || !rateLimitData.can_proceed) {
      const resetDate = rateLimitData?.reset_time ? new Date(rateLimitData.reset_time).toLocaleString() : 'tomorrow';
      toast({
        title: "Rate limit exceeded",
        description: `You have reached the daily limit of ${rateLimitData?.daily_limit || 5} document analyses. Please try again after ${resetDate}.`,
        variant: "destructive"
      });
      return;
    }

    // Check if user has enough remaining analyses for selected files
    if (formData.files.length > rateLimitData.remaining) {
      toast({
        title: "Insufficient remaining analyses",
        description: `You have ${rateLimitData.remaining} analyses remaining, but selected ${formData.files.length} files. Please select fewer files or try again tomorrow.`,
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const uploadResults: ContractResult[] = [];
      
      for (const file of formData.files) {
        const formDataToSend = new FormData();
        formDataToSend.append('file', file);
        formDataToSend.append('industry', formData.industry.toLowerCase());

        const response = await fetch('https://chainsightai-app-6kgwc.ondigitalocean.app/api/v1/contracts/', {
          method: 'POST',
          body: formDataToSend,
          headers: {
            'accept': 'application/json',
            'X-CSRFTOKEN': 'kdFZ5pqo5Q207gB3CVs8jhMqMXMswbjfTmcLlw8yIHpW69jeb3x3iXUW6JXNdlsg'
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          
          // Handle specific rate limit error
          if (response.status === 429 || errorData.error === "Rate limit exceeded") {
            const retryAfter = errorData.retry_after ? Math.ceil(errorData.retry_after / 3600) : 24;
            throw new Error(`Rate limit exceeded: ${errorData.message || 'Daily limit reached'}. Please try again in ${retryAfter} hours.`);
          }
          
          throw new Error(errorData.detail || errorData.message || `Upload failed for ${file.name}`);
        }

        const result = await response.json();
        uploadResults.push(result);
      }

      if (uploadResults.length === 0) {
        throw new Error('No contracts were uploaded successfully');
      }

      setResults(uploadResults);
      setShowResults(true);

      toast({
        title: "Analysis Complete!",
        description: `Successfully analyzed ${uploadResults.length} contract(s).`,
      });

      // Update rate limit info after successful upload
      await checkRateLimit();

      // Reset form
      setFormData({ files: [], industry: '' });
      
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "There was an error uploading your contracts. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getRiskBadgeVariant = (riskScore: number) => {
    if (riskScore >= 7) return "destructive";
    if (riskScore >= 4) return "secondary";
    return "default";
  };

  const getRiskLevel = (riskScore: number) => {
    if (riskScore >= 7) return "High Risk";
    if (riskScore >= 4) return "Medium Risk";
    return "Low Risk";
  };

  const getRiskIcon = (riskScore: number) => {
    if (riskScore >= 7) return <AlertTriangle className="w-4 h-4" />;
    if (riskScore >= 4) return <Info className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  return (
    <>
      <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl">Upload Contract Documents</CardTitle>
                <CardDescription>
                  Upload your contract documents or images and select the relevant industry for processing.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Rate Limit Info */}
                {rateLimitInfo && (
                  <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                          Daily Analysis Limit
                        </p>
                        <p className="text-xs text-blue-600 dark:text-blue-400">
                          {rateLimitInfo.remaining} of {rateLimitInfo.daily_limit} analyses remaining
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="w-20 h-2 bg-blue-200 dark:bg-blue-800 rounded-full">
                          <div 
                            className="h-2 bg-blue-600 dark:bg-blue-400 rounded-full transition-all duration-300"
                            style={{ width: `${(rateLimitInfo.remaining / rateLimitInfo.daily_limit) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                          Resets at midnight
                        </p>
                      </div>
                    </div>
                    {rateLimitInfo.remaining === 0 && (
                      <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                        Daily limit reached. Please try again tomorrow.
                      </p>
                    )}
                  </div>
                )}
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Contract Documents
                    </label>
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                      <Input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.tiff"
                        onChange={handleFileChange}
                        className="hidden"
                        id="contract-upload"
                      />
                      <label
                        htmlFor="contract-upload"
                        className="cursor-pointer flex flex-col items-center space-y-2"
                      >
                        <Upload className="w-12 h-12 text-slate-400 mb-2" />
                        <span className="text-lg font-medium text-slate-700 dark:text-slate-300">
                          {formData.files.length > 0 
                            ? `${formData.files.length} file(s) selected`
                            : 'Click to upload or drag and drop'
                          }
                        </span>
                        <span className="text-sm text-slate-500 dark:text-slate-500">
                          PDF, DOC, DOCX, JPG, PNG, TIFF (max 10MB each)
                        </span>
                      </label>
                    </div>
                    
                    {formData.files.length > 0 && (
                      <div className="space-y-2 mt-4">
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Selected files:</p>
                        <div className="space-y-1">
                          {formData.files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm">
                              <div className="flex items-center gap-2 flex-1">
                                <FileText className="w-4 h-4 text-blue-600" />
                                <span className="truncate text-slate-700 dark:text-slate-300">{file.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-500 dark:text-slate-400">{formatFileSize(file.size)}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                                  onClick={() => handleRemoveFile(index)}
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Industry
                    </label>
                    <Select onValueChange={handleIndustryChange} value={formData.industry}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IT">IT</SelectItem>
                        <SelectItem value="Construction">Construction</SelectItem>
                        <SelectItem value="Garments">Garments</SelectItem>
                        <SelectItem value="General">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleSubmit}
                    disabled={
                      isLoading || 
                      isCheckingRateLimit || 
                      !formData.files.length || 
                      !formData.industry || 
                      (rateLimitInfo && !rateLimitInfo.can_proceed) ||
                      (rateLimitInfo && formData.files.length > rateLimitInfo.remaining)
                    }
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing Contracts...
                      </>
                    ) : isCheckingRateLimit ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Checking Rate Limit...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload & Analyze Contracts
                        {rateLimitInfo && formData.files.length > 0 && (
                          <span className="ml-2 text-xs">
                            ({formData.files.length}/{rateLimitInfo.remaining})
                          </span>
                        )}
                      </>
                    )}
                  </Button>
                  
                  {rateLimitInfo && formData.files.length > rateLimitInfo.remaining && (
                    <p className="text-xs text-red-600 dark:text-red-400 text-center mt-2">
                      You can only analyze {rateLimitInfo.remaining} more documents today. Please select fewer files.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Results Modal */}
      <Dialog open={showResults} onOpenChange={setShowResults}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Contract Analysis Results</DialogTitle>
            <DialogDescription>
              Detailed analysis and risk assessment for your uploaded contracts
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-6">
              {results.map((result, index) => (
                <div key={index} className="border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      {result.original_filename}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={getRiskBadgeVariant(result.analysis_result.document_analysis.overall_risk_score)}
                        className="flex items-center gap-1"
                      >
                        {getRiskIcon(result.analysis_result.document_analysis.overall_risk_score)}
                        {getRiskLevel(result.analysis_result.document_analysis.overall_risk_score)}
                      </Badge>
                      <Badge variant="outline">
                        Score: {result.analysis_result.document_analysis.overall_risk_score}/10
                      </Badge>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Executive Summary */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-base">Executive Summary</h4>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Priority Level:</span>
                          <p className="text-sm mt-1">{result.analysis_result.document_analysis.executive_summary.priority_level}</p>
                        </div>
                        
                        <div>
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Critical Issues:</span>
                          <p className="text-sm mt-1">{result.analysis_result.document_analysis.executive_summary.critical_issues_count} issues identified</p>
                        </div>

                        <div>
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Missing Clauses:</span>
                          <p className="text-sm mt-1">{result.analysis_result.document_analysis.executive_summary.missing_clauses_count} missing critical clauses</p>
                        </div>
                      </div>
                    </div>

                    {/* Risk Assessment */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-base">Risk Assessment</h4>
                      
                      {/* High Risk Issues */}
                      {result.analysis_result.document_analysis.risk_assessment.filter(risk => risk.severity === 'High').length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">High Risk Issues</h5>
                          <div className="space-y-2">
                            {result.analysis_result.document_analysis.risk_assessment.filter(risk => risk.severity === 'High').map((risk, idx) => (
                              <div key={idx} className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                                <p className="text-sm font-medium text-red-800 dark:text-red-300">{risk.category}</p>
                                <p className="text-xs text-red-600 dark:text-red-400 mt-1">{risk.description}</p>
                                <p className="text-xs text-red-700 dark:text-red-300 mt-1 font-medium">Impact: {risk.potential_impact}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Medium Risk Issues */}
                      {result.analysis_result.document_analysis.risk_assessment.filter(risk => risk.severity === 'Medium').length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-yellow-600 dark:text-yellow-400 mb-2">Medium Risk Issues</h5>
                          <div className="space-y-2">
                            {result.analysis_result.document_analysis.risk_assessment.filter(risk => risk.severity === 'Medium').map((risk, idx) => (
                              <div key={idx} className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">{risk.category}</p>
                                <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">{risk.description}</p>
                                <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1 font-medium">Impact: {risk.potential_impact}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Low Risk Issues */}
                      {result.analysis_result.document_analysis.risk_assessment.filter(risk => risk.severity === 'Low').length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">Low Risk Issues</h5>
                          <div className="space-y-2">
                            {result.analysis_result.document_analysis.risk_assessment.filter(risk => risk.severity === 'Low').slice(0, 3).map((risk, idx) => (
                              <div key={idx} className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                                <p className="text-sm font-medium text-green-800 dark:text-green-300">{risk.category}</p>
                                <p className="text-xs text-green-600 dark:text-green-400 mt-1">{risk.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Missing Critical Clauses & Recommendations */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Missing Critical Clauses */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-base">Missing Critical Clauses</h4>
                      
                      {result.analysis_result.document_analysis.missing_critical_clauses.length > 0 && (
                        <div className="space-y-2">
                          {result.analysis_result.document_analysis.missing_critical_clauses.map((clause, idx) => (
                            <div key={idx} className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                              <p className="text-sm font-medium text-orange-800 dark:text-orange-300">{clause.clause_name}</p>
                              <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">{clause.reason}</p>
                              <span className="text-xs px-2 py-1 bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 rounded-full mt-2 inline-block">
                                {clause.importance}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Improvement Recommendations */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-base">Improvement Recommendations</h4>
                      
                      {result.analysis_result.document_analysis.improvement_recommendations.length > 0 && (
                        <div className="space-y-2">
                          {result.analysis_result.document_analysis.improvement_recommendations.slice(0, 5).map((rec, idx) => (
                            <div key={idx} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs px-2 py-1 bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full">
                                  Priority {rec.priority}
                                </span>
                                <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                                  {rec.category}
                                </span>
                              </div>
                              <p className="text-sm font-medium text-blue-800 dark:text-blue-300">{rec.description}</p>
                              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">{rec.justification}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Compliance Check */}
                  <div>
                    <h4 className="font-semibold text-base mb-3">Compliance Assessment</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Industry Standards:</span>
                        <p className="text-sm mt-1 capitalize text-slate-700 dark:text-slate-300">{result.analysis_result.document_analysis.compliance_check.industry_standards}</p>
                      </div>
                      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Regulatory Requirements:</span>
                        <p className="text-sm mt-1 text-slate-700 dark:text-slate-300">{result.analysis_result.document_analysis.compliance_check.regulatory_requirements.slice(0, 100)}...</p>
                      </div>
                      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Best Practices:</span>
                        <p className="text-sm mt-1 text-slate-700 dark:text-slate-300">{result.analysis_result.document_analysis.compliance_check.best_practices.slice(0, 100)}...</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setShowResults(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}