import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FileText, Shield, AlertTriangle, Eye, Upload, Loader2, X, CheckCircle, Info, Download, Clock, Star, Target, Zap, TrendingUp } from 'lucide-react';
import { WaitlistForm } from '@/components/WaitlistForm';
import { ContractUploadForm } from '@/components/ContractUploadForm';
import { ProcessingProgress } from '@/components/ProcessingProgress';
import { ResultsModal } from '@/components/ResultsModal';
import { useToast } from '@/hooks/use-toast';

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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://chainsightai-app-34v92.ondigitalocean.app/api/v1';

export function HeroSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [isCheckingRateLimit, setIsCheckingRateLimit] = useState(false);
  const [rateLimitInfo, setRateLimitInfo] = useState<IPRateLimitInfo | null>(null);
  const [results, setResults] = useState<ContractResult[]>([]);
  const [showResults, setShowResults] = useState(false); // Added missing state
  const { toast } = useToast();

  useEffect(() => {
    checkIPRateLimit();
  }, []);

  const checkIPRateLimit = async () => {
    setIsCheckingRateLimit(true);
    try {
      const response = await fetch(`${API_BASE_URL}/rate-limit/`, {
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

  const handleUpload = async (data: UploadFormData) => {
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
      
      for (const file of data.files) {
        const formDataToSend = new FormData();
        formDataToSend.append('file', file);
        formDataToSend.append('industry', data.industry.toLowerCase());

        const response = await fetch(`${API_BASE_URL}/contracts/`, {
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

      toast({
        title: "Analysis Complete!",
        description: `Successfully analyzed ${uploadResults.length} contract(s).`,
      });

      await checkIPRateLimit();
      
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

  return (
    <>
      <section className="relative overflow-hidden px-6 pt-16 pb-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                AI-Powered Risk Intelligence Platform
              </Badge>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                AI-Powered Risk Intelligence
                <span className="block text-blue-600 dark:text-blue-400">for Global Trade</span>
              </h1>

              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                ChainSight acts as your virtual Chief Risk Officer—scanning contracts, vendors, and global events to flag risks before they cost you.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" aria-hidden="true" />
                <span>AI Contract Parsing</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" aria-hidden="true" />
                <span>Vendor Health Scoring</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" aria-hidden="true" />
                <span>Real-time Risk Alerts</span>
              </div>
            </div>

            <WaitlistForm />
          </div>

          {/* Right Content */}
          <div className="relative">
            <div className="relative z-10 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-600 overflow-hidden">
              
              {/* Contract Upload Section */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Upload Contract Documents</h3>
                  <Badge variant="secondary" className="ml-auto text-xs">Try Beta Mode</Badge>
                </div>

                <ProcessingProgress progress={processingProgress} isProcessing={isProcessing} />

                <ContractUploadForm 
                  onUpload={handleUpload}
                  isLoading={isLoading}
                  isProcessing={isProcessing}
                />
              </div>

              <Separator />

              {/* Risk Dashboard Widget */}
              <div className="w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl p-4 border-t border-slate-200 dark:border-slate-700">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">Risk Dashboard</h3>
                    <div className="flex space-x-2">
                      <div className="w-2.5 h-2.5 bg-red-400 rounded-full" aria-hidden="true"></div>
                      <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full" aria-hidden="true"></div>
                      <div className="w-2.5 h-2.5 bg-green-400 rounded-full" aria-hidden="true"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 border border-red-200 dark:border-red-800">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-red-700 dark:text-red-300">High Risk Vendor</span>
                        <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 text-xs">Critical</Badge>
                      </div>
                      <div className="text-xs text-red-600 dark:text-red-400">Supplier ABC - Financial distress detected</div>
                    </div>
                    
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 border border-yellow-200 dark:border-yellow-800">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-yellow-700 dark:text-yellow-300">Contract Red Flag</span>
                        <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 text-xs">Medium</Badge>
                      </div>
                      <div className="text-xs text-yellow-600 dark:text-yellow-400">Unusual payment terms identified</div>
                    </div>
                    
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-green-700 dark:text-green-300">Geopolitical Monitor</span>
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs">Stable</Badge>
                      </div>
                      <div className="text-xs text-green-600 dark:text-green-400">All regions monitoring normal</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse" aria-hidden="true"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-20 animate-pulse delay-700" aria-hidden="true"></div>
          </div>
        </div>
      </section>

      <ResultsModal 
        open={showResults}
        onOpenChange={setShowResults}
        results={results}
      />
    </>
  );
}