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

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://chainsightai-app-34v92.ondigitalocean.app/api/v1';

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
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  Shield, 
  AlertTriangle, 
  Upload, 
  Loader2, 
  CheckCircle, 
  Info, 
  Clock, 
  Star, 
  Target, 
  Zap, 
  TrendingUp,
  ArrowRight,
  BarChart3,
  Globe,
  Eye
} from 'lucide-react';
import { WaitlistForm } from '@/components/WaitlistForm';
import { ContractUploadForm } from '@/components/ContractUploadForm';
import { ProcessingProgress } from '@/components/ProcessingProgress';
import { ResultsModal } from '@/components/ResultsModal';
import { useToast } from '@/hooks/use-toast';

// Keep existing interfaces from the original file
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
  const [showResults, setShowResults] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();

  // Animation states
  useEffect(() => {
    setMounted(true);
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

  // Processing progress simulation
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
        description: `This IP address has reached the daily limit. Try again ${resetDate}.`,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setIsProcessing(true);
    setProcessingProgress(5);

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

    } catch (error: any) {
      console.error('Upload error:', error);
      setIsProcessing(false);
      setProcessingProgress(0);

      toast({
        title: "Upload failed",
        description: error.message || "There was an error uploading your contracts.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsProcessing(false);
      setProcessingProgress(0);
    }
  };

  const features = [
    { icon: FileText, label: "AI Contract Parsing", color: "text-blue-600" },
    { icon: Shield, label: "Vendor Health Scoring", color: "text-emerald-600" },
    { icon: AlertTriangle, label: "Real-time Risk Alerts", color: "text-amber-600" },
    { icon: BarChart3, label: "Predictive Analytics", color: "text-purple-600" },
    { icon: Globe, label: "Global Compliance", color: "text-teal-600" },
    { icon: Eye, label: "Risk Visualization", color: "text-indigo-600" }
  ];

  const riskMetrics = [
    { label: "High Risk Vendor", status: "Critical", color: "red", description: "Supplier ABC - Financial distress detected" },
    { label: "Contract Red Flag", status: "Medium", color: "yellow", description: "Unusual payment terms identified" },
    { label: "Geopolitical Monitor", status: "Stable", color: "green", description: "All regions monitoring normal" },
  ];

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800/50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse opacity-70"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-teal-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000 opacity-70"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-purple-500/5 to-transparent rounded-full animate-spin-slow"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className={`space-y-8 transition-all duration-1000 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              {/* Badge */}
              <div className="inline-flex">
                <Badge 
                  variant="outline" 
                  className="px-4 py-2 text-xs font-light tracking-wide bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 backdrop-blur-sm hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all duration-300"
                >
                  <Zap className="w-3 h-3 mr-2 text-blue-500" />
                  AI-Powered Risk Intelligence Platform
                </Badge>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-light tracking-tight leading-tight">
                  <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent">
                    Your Virtual
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent font-medium">
                    Chief Risk Officer
                  </span>
                </h1>
                
                <p className="text-xl lg:text-2xl font-light text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                  AI that continuously monitors your business ecosystem to identify and flag risks 
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium">
                    before they become costly disruptions
                  </span>
                </p>
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {features.map((feature, index) => (
                  <div 
                    key={feature.label}
                    className={`flex items-center gap-3 p-3 rounded-lg bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-500 transform hover:scale-105 ${
                      mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ 
                      transitionDelay: `${index * 100}ms` 
                    }}
                  >
                    <feature.icon className={`w-5 h-5 ${feature.color}`} aria-hidden="true" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {feature.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Waitlist Form */}
              <div className={`transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <WaitlistForm />
              </div>

              {/* Stats */}
              <div className={`flex items-center gap-8 text-sm text-slate-600 dark:text-slate-400 transition-all duration-1000 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 border-white dark:border-slate-900"></div>
                    ))}
                  </div>
                  <span className="font-medium">500+ companies trust us</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium">4.9/5 customer rating</span>
                </div>
              </div>
            </div>

            {/* Right Content - Interactive Demo */}
            <div className={`relative transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              {/* Main Card */}
              <div className="relative z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
                
                {/* Header */}
                <div className="p-8 border-b border-slate-200/50 dark:border-slate-700/50">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <FileText className="w-5 h-5 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-xl font-medium text-slate-900 dark:text-white">
                          Contract Intelligence
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Upload & analyze in seconds
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="text-xs bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                    >
                      Live Beta
                    </Badge>
                  </div>

                  <ProcessingProgress 
                    progress={processingProgress} 
                    isProcessing={isProcessing} 
                  />

                  <ContractUploadForm 
                    onUpload={handleUpload}
                    isLoading={isLoading}
                    isProcessing={isProcessing}
                  />
                </div>

                <Separator className="border-slate-200/50 dark:border-slate-700/50" />

                {/* Risk Dashboard Widget */}
                <div className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-medium text-slate-900 dark:text-white flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                        Risk Dashboard
                      </h4>
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" aria-hidden="true"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-200" aria-hidden="true"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse delay-500" aria-hidden="true"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {riskMetrics.map((metric, index) => (
                        <div 
                          key={metric.label}
                          className={`rounded-xl p-4 border transition-all duration-500 hover:scale-[1.02] ${
                            metric.color === 'red' 
                              ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' 
                              : metric.color === 'yellow'
                              ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
                              : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                          } ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                          style={{ transitionDelay: `${1000 + index * 200}ms` }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className={`font-medium ${
                              metric.color === 'red' 
                                ? 'text-red-700 dark:text-red-300' 
                                : metric.color === 'yellow'
                                ? 'text-yellow-700 dark:text-yellow-300'
                                : 'text-green-700 dark:text-green-300'
                            }`}>
                              {metric.label}
                            </span>
                            <Badge 
                              className={`text-xs ${
                                metric.color === 'red' 
                                  ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' 
                                  : metric.color === 'yellow'
                                  ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                                  : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                              }`}
                            >
                              {metric.status}
                            </Badge>
                          </div>
                          <div className={`text-sm ${
                            metric.color === 'red' 
                              ? 'text-red-600 dark:text-red-400' 
                              : metric.color === 'yellow'
                              ? 'text-yellow-600 dark:text-yellow-400'
                              : 'text-green-600 dark:text-green-400'
                          }`}>
                            {metric.description}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-400">
                          Last updated: 2 min ago
                        </span>
                        <button className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium">
                          View Details
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-br from-blue-400/30 to-purple-500/30 rounded-2xl backdrop-blur-sm animate-float opacity-80"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tr from-teal-400/30 to-blue-500/30 rounded-2xl backdrop-blur-sm animate-float-delayed opacity-80"></div>
              
              {/* Glow Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl blur-3xl scale-110 animate-pulse"></div>
            </div>
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



