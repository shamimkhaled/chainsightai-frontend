// import { useState, useEffect } from 'react';
// import { Badge } from '@/components/ui/badge';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Separator } from '@/components/ui/separator';
// import { FileText, Shield, AlertTriangle, Eye, Upload, Loader2, X, CheckCircle, Info, Download, Clock, Star, Target, Zap, TrendingUp } from 'lucide-react';
// import { WaitlistForm } from '@/components/WaitlistForm';
// import { ContractUploadForm } from '@/components/ContractUploadForm';
// import { ProcessingProgress } from '@/components/ProcessingProgress';
// import { ResultsModal } from '@/components/ResultsModal';
// import { useToast } from '@/hooks/use-toast';

// interface UploadFormData {
//   files: File[];
//   industry: string;
// }

// interface AnalysisResult {
//   document_analysis: {
//     overall_risk_score: number;
//     executive_summary: {
//       priority_level: string;
//       critical_issues_count: number;
//       missing_clauses_count: number;
//     };
//     risk_assessment: Array<{
//       category: string;
//       severity: string;
//       description: string;
//       potential_impact: string;
//       likelihood: string;
//     }>;
//     missing_critical_clauses: Array<{
//       clause_name: string;
//       importance: string;
//       reason: string;
//       suggested_text: string;
//     }>;
//     identified_risks: Array<{
//       risk_type: string;
//       severity: string;
//       current_protection: string;
//       mitigation_suggestion: string;
//     }>;
//     improvement_recommendations: Array<{
//       priority: number;
//       category: string;
//       description: string;
//       justification: string;
//       suggested_implementation: string;
//     }>;
//     compliance_check: {
//       industry_standards: string;
//       regulatory_requirements: string;
//       best_practices: string;
//     };
//   };
// }

// interface ContractResult {
//   id: string;
//   original_filename: string;
//   analysis_result: AnalysisResult;
//   created_at: string;
//   risk_score: number;
// }

// interface IPRateLimitInfo {
//   daily_limit: number;
//   current_count: number;
//   remaining: number;
//   can_proceed: boolean;
//   reset_time: string;
//   ip_address?: string;
// }

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://chainsightai-app-6kgwc.ondigitalocean.app/api/v1';

// export function HeroSection() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [processingProgress, setProcessingProgress] = useState(0);
//   const [isCheckingRateLimit, setIsCheckingRateLimit] = useState(false);
//   const [rateLimitInfo, setRateLimitInfo] = useState<IPRateLimitInfo | null>(null);
//   const [results, setResults] = useState<ContractResult[]>([]);
//   const [showResults, setShowResults] = useState(false); // Added missing state
//   const { toast } = useToast();

//   useEffect(() => {
//     checkIPRateLimit();
//   }, []);

//   const checkIPRateLimit = async () => {
//     setIsCheckingRateLimit(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/rate-limit/`, {
//         method: 'GET',
//         headers: {
//           'accept': 'application/json',
//         }
//       });

//       if (response.ok) {
//         const rateLimitData = await response.json();
//         setRateLimitInfo(rateLimitData);
//         return rateLimitData;
//       }
//     } catch (error) {
//       console.error('Error checking IP rate limit:', error);
//       return null;
//     } finally {
//       setIsCheckingRateLimit(false);
//     }
//   };

//   // Simulate processing progress
//   useEffect(() => {
//     if (isProcessing) {
//       const interval = setInterval(() => {
//         setProcessingProgress(prev => {
//           if (prev >= 95) return prev;
//           return prev + Math.random() * 5;
//         });
//       }, 1000);

//       return () => clearInterval(interval);
//     }
//   }, [isProcessing]);

//   const handleUpload = async (data: UploadFormData) => {
//     const rateLimitData = await checkIPRateLimit();
//     if (rateLimitData && !rateLimitData.can_proceed) {
//       const resetDate = rateLimitData.reset_time ? new Date(rateLimitData.reset_time).toLocaleString() : 'tomorrow';
//       toast({
//         title: "Rate limit exceeded",
//         description: `This IP address has reached the daily limit. Please try again after ${resetDate}.`,
//         variant: "destructive"
//       });
//       return;
//     }

//     setIsLoading(true);
//     setIsProcessing(true);
//     setProcessingProgress(0);

//     try {
//       const uploadResults: ContractResult[] = [];
      
//       for (const file of data.files) {
//         const formDataToSend = new FormData();
//         formDataToSend.append('file', file);
//         formDataToSend.append('industry', data.industry.toLowerCase());

//         const response = await fetch(`${API_BASE_URL}/contracts/`, {
//           method: 'POST',
//           body: formDataToSend,
//           headers: {
//             'accept': 'application/json',
//             'X-CSRFTOKEN': 'kdFZ5pqo5Q207gB3CVs8jhMqMXMswbjfTmcLlw8yIHpW69jeb3x3iXUW6JXNdlsg'
//           }
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.detail || errorData.message || `Upload failed for ${file.name}`);
//         }

//         const result = await response.json();
//         uploadResults.push(result);
//       }

//       setProcessingProgress(100);
//       setResults(uploadResults);
//       setShowResults(true);

//       toast({
//         title: "Analysis Complete!",
//         description: `Successfully analyzed ${uploadResults.length} contract(s).`,
//       });

//       await checkIPRateLimit();
      
//     } catch (error) {
//       console.error('Upload error:', error);
//       toast({
//         title: "Upload failed",
//         description: error instanceof Error ? error.message : "There was an error uploading your contracts.",
//         variant: "destructive"
//       });
//     } finally {
//       setIsLoading(false);
//       setIsProcessing(false);
//       setProcessingProgress(0);
//     }
//   };

//   return (
//     <>
//       <section className="relative overflow-hidden px-6 pt-16 pb-24 max-w-7xl mx-auto">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
          
//           {/* Left Content */}
//           <div className="space-y-8">
//             <div className="space-y-6">
//               <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
//                 AI-Powered Risk Intelligence Platform
//               </Badge>

//               <h1 className="text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
//                 AI-Powered Risk Intelligence
//                 <span className="block text-blue-600 dark:text-blue-400">for Global Trade</span>
//               </h1>

//               <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
//                 ChainSight acts as your virtual Chief Risk Officer—scanning contracts, vendors, and global events to flag risks before they cost you.
//               </p>
//             </div>

//             <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
//               <div className="flex items-center gap-2">
//                 <FileText className="w-4 h-4 text-blue-600" aria-hidden="true" />
//                 <span>AI Contract Parsing</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Shield className="w-4 h-4 text-green-600" aria-hidden="true" />
//                 <span>Vendor Health Scoring</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <AlertTriangle className="w-4 h-4 text-red-600" aria-hidden="true" />
//                 <span>Real-time Risk Alerts</span>
//               </div>
//             </div>

//             <WaitlistForm />
//           </div>

//           {/* Right Content */}
//           <div className="relative">
//             <div className="relative z-10 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-600 overflow-hidden">
              
//               {/* Contract Upload Section */}
//               <div className="p-6">
//                 <div className="flex items-center gap-2 mb-4">
//                   <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
//                     <FileText className="w-4 h-4 text-white" aria-hidden="true" />
//                   </div>
//                   <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Upload Contract Documents</h3>
//                   <Badge variant="secondary" className="ml-auto text-xs">Try Beta Mode</Badge>
//                 </div>

//                 <ProcessingProgress progress={processingProgress} isProcessing={isProcessing} />

//                 <ContractUploadForm 
//                   onUpload={handleUpload}
//                   isLoading={isLoading}
//                   isProcessing={isProcessing}
//                 />
//               </div>

//               <Separator />

//               {/* Risk Dashboard Widget */}
//               <div className="w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl p-4 border-t border-slate-200 dark:border-slate-700">
//                 <div className="space-y-6">
//                   <div className="flex items-center justify-between">
//                     <h3 className="text-base font-semibold text-slate-900 dark:text-white">Risk Dashboard</h3>
//                     <div className="flex space-x-2">
//                       <div className="w-2.5 h-2.5 bg-red-400 rounded-full" aria-hidden="true"></div>
//                       <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full" aria-hidden="true"></div>
//                       <div className="w-2.5 h-2.5 bg-green-400 rounded-full" aria-hidden="true"></div>
//                     </div>
//                   </div>
                  
//                   <div className="space-y-3 text-sm">
//                     <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 border border-red-200 dark:border-red-800">
//                       <div className="flex items-center justify-between mb-1">
//                         <span className="font-medium text-red-700 dark:text-red-300">High Risk Vendor</span>
//                         <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 text-xs">Critical</Badge>
//                       </div>
//                       <div className="text-xs text-red-600 dark:text-red-400">Supplier ABC - Financial distress detected</div>
//                     </div>
                    
//                     <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 border border-yellow-200 dark:border-yellow-800">
//                       <div className="flex items-center justify-between mb-1">
//                         <span className="font-medium text-yellow-700 dark:text-yellow-300">Contract Red Flag</span>
//                         <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 text-xs">Medium</Badge>
//                       </div>
//                       <div className="text-xs text-yellow-600 dark:text-yellow-400">Unusual payment terms identified</div>
//                     </div>
                    
//                     <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
//                       <div className="flex items-center justify-between mb-1">
//                         <span className="font-medium text-green-700 dark:text-green-300">Geopolitical Monitor</span>
//                         <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs">Stable</Badge>
//                       </div>
//                       <div className="text-xs text-green-600 dark:text-green-400">All regions monitoring normal</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Background decoration */}
//             <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse" aria-hidden="true"></div>
//             <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-20 animate-pulse delay-700" aria-hidden="true"></div>
//           </div>
//         </div>
//       </section>

//       <ResultsModal 
//         open={showResults}
//         onOpenChange={setShowResults}
//         results={results}
//       />
//     </>
//   );
// }







import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Shield, AlertTriangle, Eye, Upload, Loader2, X, CheckCircle, Info, Download, Clock, Star, Target, Zap, TrendingUp, Play, ArrowRight, Sparkles } from 'lucide-react';
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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://chainsightai-app-6kgwc.ondigitalocean.app/api/v1';

export function HeroSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [isCheckingRateLimit, setIsCheckingRateLimit] = useState(false);
  const [rateLimitInfo, setRateLimitInfo] = useState<IPRateLimitInfo | null>(null);
  const [results, setResults] = useState<ContractResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [activeDemo, setActiveDemo] = useState(false);
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Sophisticated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
          <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-700/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent dark:from-slate-950/80" />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 dark:bg-purple-400/5 rounded-full blur-3xl" />

        <div className="relative z-10 container mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="flex items-center gap-2">
                <Badge 
                  variant="secondary" 
                  className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 px-4 py-2"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI-Powered Risk Intelligence
                </Badge>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-slate-600 dark:text-slate-400">Live Beta</span>
                </div>
              </div>

              {/* Main Headline */}
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="text-slate-900 dark:text-white">Your</span>{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Virtual
                  </span>{' '}
                  <br />
                  <span className="text-slate-900 dark:text-white">Chief Risk</span>{' '}
                  <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                    Officer
                  </span>
                </h1>

                <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                  Transform contracts into insights. Identify risks before they cost you. 
                  <span className="font-semibold text-slate-900 dark:text-white"> Powered by advanced AI.</span>
                </p>
              </div>

              {/* Feature Highlights */}
              <div className="flex flex-wrap gap-6 text-sm">
                {[
                  { icon: FileText, text: "Intelligent Contract Parsing", color: "text-blue-600" },
                  { icon: Shield, text: "Real-time Risk Detection", color: "text-green-600" },
                  { icon: AlertTriangle, text: "Predictive Analytics", color: "text-orange-600" }
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <feature.icon className={`w-5 h-5 ${feature.color}`} />
                    <span className="font-medium text-slate-700 dark:text-slate-300">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Section */}
              <div className="space-y-6">
                <WaitlistForm />
                
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    onClick={() => setActiveDemo(true)}
                    className="group text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  >
                    <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Watch Demo
                  </Button>
                  <span className="text-slate-400">•</span>
                  <span className="text-sm text-slate-500">2-minute overview</span>
                </div>
              </div>
            </div>

            {/* Right Content - Interactive Demo */}
            <div className="relative">
              <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border border-slate-200/50 dark:border-slate-700/50 shadow-2xl shadow-slate-900/5">
                <CardContent className="p-8">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Contract Analysis
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Upload and analyze in seconds
                      </p>
                    </div>
                    <Badge variant="secondary" className="ml-auto">
                      Beta
                    </Badge>
                  </div>

                  {/* Rate Limit Info */}
                  {rateLimitInfo && (
                    <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-lg border border-blue-100 dark:border-blue-800/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                          Daily Analysis Quota
                        </span>
                        <span className="text-xs text-blue-600 dark:text-blue-400">
                          {rateLimitInfo.remaining} of {rateLimitInfo.daily_limit} remaining
                        </span>
                      </div>
                      <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-1.5">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${(rateLimitInfo.remaining / rateLimitInfo.daily_limit) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Processing State */}
                  <ProcessingProgress progress={processingProgress} isProcessing={isProcessing} />
                  
                  {/* Upload Form */}
                  <ContractUploadForm 
                    onUpload={handleUpload}
                    isLoading={isLoading}
                    isProcessing={isProcessing}
                  />

                  {/* Demo Insights Panel */}
                  <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Live Risk Dashboard
                    </h4>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full" />
                          <span className="font-medium text-slate-900 dark:text-white">High Risk Vendor</span>
                        </div>
                        <Badge variant="destructive" className="text-xs">Critical</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                          <span className="font-medium text-slate-900 dark:text-white">Contract Anomaly</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">Medium</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="font-medium text-slate-900 dark:text-white">Compliance Status</span>
                        </div>
                        <Badge className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Verified
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Floating Stats */}
              <div className="absolute -top-4 -right-4 bg-white dark:bg-slate-900 rounded-xl p-4 shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">99.7%</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Accuracy Rate</div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-900 rounded-xl p-4 shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">&lt;50s</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Analysis Time</div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-20 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
              Trusted by leading enterprises across 50+ countries
            </p>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              {['Enterprise A', 'Company B', 'Corp C', 'Firm D'].map((company, idx) => (
                <div key={idx} className="px-4 py-2 text-slate-400 dark:text-slate-500 font-medium">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Modal */}
      <ResultsModal 
        open={showResults}
        onOpenChange={setShowResults}
        results={results}
      />
    </>
  );
}



