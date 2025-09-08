import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText, Loader2, X, AlertTriangle, CheckCircle, Info, Download, Clock, Star, Target, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';

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

interface IPRateLimitInfo {
  daily_limit: number;
  current_count: number;
  remaining: number;
  can_proceed: boolean;
  reset_time: string;
  ip_address?: string;
}

export function ContractUploadSection() {
  const [formData, setFormData] = useState<UploadFormData>({
    files: [],
    industry: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [isCheckingRateLimit, setIsCheckingRateLimit] = useState(false);
  const [rateLimitInfo, setRateLimitInfo] = useState<IPRateLimitInfo | null>(null);
  const [results, setResults] = useState<ContractResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedRecommendations, setSelectedRecommendations] = useState<{[key: string]: boolean}>({});
  const [selectAllByPriority, setSelectAllByPriority] = useState<{[key: number]: boolean}>({});
  const [isDownloading, setIsDownloading] = useState(false);
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
    checkIPRateLimit();
  }, []);

  const checkIPRateLimit = async () => {
    setIsCheckingRateLimit(true);
    try {
      const response = await fetch('https://chainsightai-app-34v92.ondigitalocean.app/api/v1/rate-limit/', {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        }
      });

      if (response.ok) {
        const rateLimitData = await response.json();
        setRateLimitInfo(rateLimitData);
        return rateLimitData;
      }
    } catch (error) {
      console.error('Error checking IP rate limit:', error);
      return null;
    } finally {
      setIsCheckingRateLimit(false);
    }
  };

  // Simulate processing progress
  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProcessingProgress(prev => {
          if (prev >= 95) return prev;
          return prev + Math.random() * 5;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  const handleSubmit = async () => {
    if (!formData.files.length || !formData.industry) {
      toast({
        title: "Missing information",
        description: "Please select files and industry before uploading.",
        variant: "destructive"
      });
      return;
    }

    const rateLimitData = await checkIPRateLimit();
    if (rateLimitData && !rateLimitData.can_proceed) {
      const resetDate = rateLimitData.reset_time ? new Date(rateLimitData.reset_time).toLocaleString() : 'tomorrow';
      toast({
        title: "Rate limit exceeded",
        description: `This IP address has reached the daily limit. Please try again after ${resetDate}.`,
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setIsProcessing(true);
    setProcessingProgress(0);

    try {
      const uploadResults: ContractResult[] = [];
      
      for (const file of formData.files) {
        const formDataToSend = new FormData();
        formDataToSend.append('file', file);
        formDataToSend.append('industry', formData.industry.toLowerCase());

        const response = await fetch('https://chainsightai-app-34v92.ondigitalocean.app/api/v1/contracts/', {
          method: 'POST',
          body: formDataToSend,
          headers: {
            'accept': 'application/json',
            'X-CSRFTOKEN': 'kdFZ5pqo5Q207gB3CVs8jhMqMXMswbjfTmcLlw8yIHpW69jeb3x3iXUW6JXNdlsg'
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || errorData.message || `Upload failed for ${file.name}`);
        }

        const result = await response.json();
        uploadResults.push(result);
      }

      setProcessingProgress(100);
      setResults(uploadResults);
      setShowResults(true);

      // Initialize selected recommendations and priority groups
      const initialSelection: {[key: string]: boolean} = {};
      const priorityGroups: {[key: number]: boolean} = {};
      
      uploadResults.forEach(result => {
        result.analysis_result.document_analysis.improvement_recommendations.forEach((rec, index) => {
          initialSelection[`${result.id}-${index}`] = false;
          priorityGroups[rec.priority] = false;
        });
      });
      
      setSelectedRecommendations(initialSelection);
      setSelectAllByPriority(priorityGroups);

      toast({
        title: "Analysis Complete!",
        description: `Successfully analyzed ${uploadResults.length} contract(s).`,
      });

      await checkIPRateLimit();
      setFormData({ files: [], industry: '' });
      
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "There was an error uploading your contracts.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      setIsProcessing(false);
      setProcessingProgress(0);
    }
  };

  const handleRecommendationToggle = (resultId: string, index: number) => {
    const key = `${resultId}-${index}`;
    setSelectedRecommendations(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSelectAllByPriority = (priority: number, checked: boolean) => {
    setSelectAllByPriority(prev => ({ ...prev, [priority]: checked }));
    
    const updates: {[key: string]: boolean} = {};
    results.forEach(result => {
      result.analysis_result.document_analysis.improvement_recommendations.forEach((rec, index) => {
        if (rec.priority === priority) {
          updates[`${result.id}-${index}`] = checked;
        }
      });
    });
    
    setSelectedRecommendations(prev => ({ ...prev, ...updates }));
  };

  const downloadResults = async (format: 'pdf' | 'doc') => {
    setIsDownloading(true);
    
    try {
      // Create filtered data with only selected recommendations
      const selectedData = results.map(result => {
        const selectedRecs = result.analysis_result.document_analysis.improvement_recommendations
          .filter((_, index) => selectedRecommendations[`${result.id}-${index}`]);
        
        return {
          ...result,
          analysis_result: {
            ...result.analysis_result,
            document_analysis: {
              ...result.analysis_result.document_analysis,
              improvement_recommendations: selectedRecs
            }
          }
        };
      });

      // Backend API call for professional PDF/DOC generation
      const response = await fetch(`/api/contracts/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contracts: selectedData,
          format: format,
          include_sections: {
            executive_summary: true,
            risk_assessment: true,
            missing_clauses: true,
            improvement_recommendations: true,
            compliance_check: true
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Download failed');
      }

      // Handle file download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      const contentDisposition = response.headers.get('Content-Disposition');
      const filename = contentDisposition 
        ? contentDisposition.split('filename=')[1].replace(/"/g, '')
        : `contract-analysis-${Date.now()}.${format}`;
        
      link.download = filename;
      link.click();
      
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Download Complete",
        description: `Your ${format.toUpperCase()} report with selected recommendations has been downloaded.`,
      });
      
    } catch (error) {
      // Fallback to frontend JSON download if backend not available
      console.warn('Backend download failed, using fallback:', error);
      
      const selectedData = results.map(result => {
        const selectedRecs = result.analysis_result.document_analysis.improvement_recommendations
          .filter((_, index) => selectedRecommendations[`${result.id}-${index}`]);
        
        return {
          ...result,
          analysis_result: {
            ...result.analysis_result,
            document_analysis: {
              ...result.analysis_result.document_analysis,
              improvement_recommendations: selectedRecs
            }
          }
        };
      });

      const dataStr = JSON.stringify(selectedData, null, 2);
      const dataBlob = new Blob([dataStr], {type: 'application/json'});
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `contract-analysis-${format}-${Date.now()}.json`;
      link.click();
      
      URL.revokeObjectURL(url);

      toast({
        title: "Download Complete (JSON)",
        description: `Your analysis results with selected recommendations have been downloaded as JSON. Backend ${format.toUpperCase()} generation coming soon!`,
      });
      
    } finally {
      setIsDownloading(false);
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

  const getPriorityIcon = (priority: number) => {
    if (priority === 1) return <Star className="w-4 h-4 text-red-500" />;
    if (priority === 2) return <Target className="w-4 h-4 text-orange-500" />;
    return <Zap className="w-4 h-4 text-blue-500" />;
  };

  const getPriorityColor = (priority: number) => {
    if (priority === 1) return "from-red-500 to-red-600";
    if (priority === 2) return "from-orange-500 to-orange-600";
    return "from-blue-500 to-blue-600";
  };

  const getSelectedCount = () => {
    return Object.values(selectedRecommendations).filter(Boolean).length;
  };

  const getPriorityGroups = () => {
    const groups: {[key: number]: number} = {};
    results.forEach(result => {
      result.analysis_result.document_analysis.improvement_recommendations.forEach(rec => {
        groups[rec.priority] = (groups[rec.priority] || 0) + 1;
      });
    });
    return groups;
  };

  return (
    <>
      <section id="contract-upload-section" className="py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl">Professional Contract Analysis</CardTitle>
                <CardDescription>
                  Upload your contract documents and get comprehensive AI-powered risk analysis with selective reporting
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
                      </div>
                    </div>
                  </div>
                )}

                {/* Processing State */}
                {isProcessing && (
                  <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="text-center space-y-4">
                      <div className="flex justify-center">
                        <div className="relative">
                          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Clock className="w-6 h-6 text-blue-600" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                          Analyzing Your Contract
                        </h3>
                        <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                          Our AI is performing deep contract analysis...
                        </p>
                        <Progress value={processingProgress} className="w-full" />
                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                          {Math.round(processingProgress)}% Complete
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-xs text-blue-600 dark:text-blue-400">
                        <div className="flex items-center justify-center space-x-1">
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                          <span>Scanning clauses</span>
                        </div>
                        <div className="flex items-center justify-center space-x-1">
                          <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse delay-100"></div>
                          <span>Risk assessment</span>
                        </div>
                        <div className="flex items-center justify-center space-x-1">
                          <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse delay-200"></div>
                          <span>Generating report</span>
                        </div>
                      </div>
                    </div>
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
                        disabled={isProcessing}
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
                                  disabled={isProcessing}
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
                    <Select onValueChange={handleIndustryChange} value={formData.industry} disabled={isProcessing}>
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
                      isProcessing ||
                      isCheckingRateLimit || 
                      !formData.files.length || 
                      !formData.industry || 
                      (rateLimitInfo && !rateLimitInfo.can_proceed)
                    }
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing Contracts...
                      </>
                    ) : isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Uploading...
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
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Results Modal with Dynamic Selection */}
      <Dialog open={showResults} onOpenChange={setShowResults}>
        <DialogContent className="max-w-7xl max-h-[95vh]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl">Contract Analysis Results</DialogTitle>
                <DialogDescription>
                  Select improvement recommendations to include in your professional report
                </DialogDescription>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 mr-4">
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    {getSelectedCount()} selected
                  </Badge>
                </div>
                <Button 
                  onClick={() => downloadResults('pdf')}
                  disabled={isDownloading || getSelectedCount() === 0}
                  className="bg-red-600 hover:bg-red-700 text-white"
                  size="sm"
                >
                  {isDownloading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4 mr-2" />
                  )}
                  Download PDF
                </Button>
                <Button 
                  onClick={() => downloadResults('doc')}
                  disabled={isDownloading || getSelectedCount() === 0}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  size="sm"
                >
                  {isDownloading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4 mr-2" />
                  )}
                  Download DOC
                </Button>
              </div>
            </div>
          </DialogHeader>
          
          <ScrollArea className="max-h-[75vh] pr-4">
            <div className="space-y-6">
              {/* Priority Selection Controls */}
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200 dark:border-blue-800">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    Smart Selection by Priority
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(getPriorityGroups()).sort(([a], [b]) => Number(a) - Number(b)).map(([priority, count]) => (
                      <div key={priority} className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${getPriorityColor(Number(priority))} flex items-center justify-center`}>
                            {getPriorityIcon(Number(priority))}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">
                              Priority {priority}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {count} recommendations
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={selectAllByPriority[Number(priority)] || false}
                          onCheckedChange={(checked) => handleSelectAllByPriority(Number(priority), checked)}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {results.map((result, index) => (
                <div key={index} className="border rounded-lg p-6 bg-white dark:bg-slate-800">
                  <div className="flex items-center justify-between mb-6">
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

                  {/* Improvement Recommendations with Enhanced Selection */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-base flex items-center gap-2">
                        <Target className="w-5 h-5 text-blue-600" />
                        Improvement Recommendations
                      </h4>
                      <p className="text-sm text-slate-500">Select recommendations for your custom report</p>
                    </div>
                    
                    <div className="space-y-3">
                      {result.analysis_result.document_analysis.improvement_recommendations
                        .sort((a, b) => a.priority - b.priority)
                        .map((rec, recIndex) => {
                          const originalIndex = result.analysis_result.document_analysis.improvement_recommendations.indexOf(rec);
                          const isSelected = selectedRecommendations[`${result.id}-${originalIndex}`] || false;
                          
                          return (
                            <div 
                              key={originalIndex} 
                              className={`border rounded-lg p-4 transition-all duration-200 ${
                                isSelected 
                                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700 shadow-md' 
                                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-600'
                              }`}
                            >
                              <div className="flex items-start space-x-3">
                                <Checkbox
                                  checked={isSelected}
                                  onCheckedChange={() => handleRecommendationToggle(result.id, originalIndex)}
                                  className="mt-1"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-3">
                                    <div className={`w-6 h-6 rounded-lg bg-gradient-to-r ${getPriorityColor(rec.priority)} flex items-center justify-center`}>
                                      {getPriorityIcon(rec.priority)}
                                    </div>
                                    <Badge variant="secondary" className="text-xs">
                                      Priority {rec.priority}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                      {rec.category}
                                    </Badge>
                                    {isSelected && (
                                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs">
                                        ✓ Selected
                                      </Badge>
                                    )}
                                  </div>
                                  <h5 className="font-medium text-sm mb-2 text-slate-900 dark:text-white">
                                    {rec.description}
                                  </h5>
                                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                                    <strong>Justification:</strong> {rec.justification}
                                  </p>
                                  <p className="text-xs text-slate-600 dark:text-slate-400">
                                    <strong>Implementation:</strong> {rec.suggested_implementation}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Executive Summary and Compliance (Always Included) */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-base mb-3 flex items-center gap-2">
                        <Info className="w-4 h-4 text-blue-600" />
                        Executive Summary
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p><strong>Priority Level:</strong> {result.analysis_result.document_analysis.executive_summary.priority_level}</p>
                        <p><strong>Critical Issues:</strong> {result.analysis_result.document_analysis.executive_summary.critical_issues_count}</p>
                        <p><strong>Missing Clauses:</strong> {result.analysis_result.document_analysis.executive_summary.missing_clauses_count}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-base mb-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Compliance Assessment
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p><strong>Industry Standards:</strong> {result.analysis_result.document_analysis.compliance_check.industry_standards}</p>
                        <p><strong>Regulatory:</strong> {result.analysis_result.document_analysis.compliance_check.regulatory_requirements.slice(0, 100)}...</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-sm text-slate-600 dark:text-slate-400">
              {getSelectedCount() === 0 ? (
                "Select recommendations to enable download"
              ) : (
                `${getSelectedCount()} recommendations selected for your custom report`
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowResults(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}