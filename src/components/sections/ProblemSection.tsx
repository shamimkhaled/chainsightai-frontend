
// import { Card, CardContent } from '@/components/ui/card';
// import { AlertTriangle, FileText, Users } from 'lucide-react';

// export function ProblemSection() {
//   return (
//     <section id="problem" className="py-24 px-6 bg-slate-50 dark:bg-slate-900">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
//             The Hidden Cost of Risk Blindspots
//           </h2>
//           <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
//             Global businesses lose billions annually from supply chain fraud, contract red flags, and vendor due diligence blindspots
//           </p>
//         </div>
        
//         <div className="grid md:grid-cols-3 gap-8">
//           <Card className="border-red-200 dark:border-red-800">
//             <CardContent className="p-6">
//               <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4">
//                 <AlertTriangle className="w-6 h-6 text-red-600" />
//               </div>
//               <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Supply Chain Fraud</h3>
//               <p className="text-slate-600 dark:text-slate-300 text-sm">
//                 Companies like BHS collapsed due to hidden vendor relationships and fraudulent certifications that went undetected for years.
//               </p>
//             </CardContent>
//           </Card>

//           <Card className="border-yellow-200 dark:border-yellow-800">
//             <CardContent className="p-6">
//               <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mb-4">
//                 <FileText className="w-6 h-6 text-yellow-600" />
//               </div>
//               <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Contract Red Flags</h3>
//               <p className="text-slate-600 dark:text-slate-300 text-sm">
//                 Legal teams miss critical clauses and unfavorable terms buried in complex agreements, leading to costly disputes.
//               </p>
//             </CardContent>
//           </Card>

//           <Card className="border-orange-200 dark:border-orange-800">
//             <CardContent className="p-6">
//               <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
//                 <Users className="w-6 h-6 text-orange-600" />
//               </div>
//               <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Vendor Bankruptcy</h3>
//               <p className="text-slate-600 dark:text-slate-300 text-sm">
//                 Sudden vendor failures disrupt supply chains when financial distress signals go unnoticed until it's too late.
//               </p>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </section>
//   );
// }



import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  FileText, 
  Users, 
  TrendingDown, 
  DollarSign, 
  Clock,
  Target,
  Shield,
  Zap
} from 'lucide-react';

export function ProblemSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const problems = [
    {
      icon: AlertTriangle,
      title: "Supply Chain Fraud",
      description: "Hidden vendor relationships and fraudulent certifications go undetected for years, leading to catastrophic business failures.",
      impact: "$2.9B",
      impactLabel: "Annual Global Losses",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      borderColor: "border-red-200 dark:border-red-800",
      textColor: "text-red-700 dark:text-red-300",
      examples: ["Collapsed vendors like BHS", "Fake certifications", "Hidden ownership structures"],
      stats: { percentage: "43%", description: "of companies affected annually" }
    },
    {
      icon: FileText,
      title: "Contract Red Flags",
      description: "Legal teams miss critical clauses and unfavorable terms buried in complex agreements, resulting in costly disputes.",
      impact: "73%",
      impactLabel: "of Companies Affected",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      borderColor: "border-yellow-200 dark:border-yellow-800",
      textColor: "text-yellow-700 dark:text-yellow-300",
      examples: ["Unfavorable payment terms", "Missing liability clauses", "Hidden penalties"],
      stats: { percentage: "68%", description: "of contract disputes are preventable" }
    },
    {
      icon: Users,
      title: "Vendor Bankruptcy",
      description: "Sudden vendor failures disrupt supply chains when financial distress signals go unnoticed until it's too late.",
      impact: "156%",
      impactLabel: "Increase in 2024",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-800",
      textColor: "text-purple-700 dark:text-purple-300",
      examples: ["No early warning systems", "Financial data lag", "Supply chain disruption"],
      stats: { percentage: "92%", description: "of failures had visible warning signs" }
    },
    {
      icon: TrendingDown,
      title: "Regulatory Blindness",
      description: "Evolving compliance requirements and geopolitical changes catch organizations off-guard, resulting in hefty penalties.",
      impact: "$4.7B",
      impactLabel: "in Fines Globally",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800",
      textColor: "text-blue-700 dark:text-blue-300",
      examples: ["GDPR violations", "Sanctions compliance", "ESG reporting gaps"],
      stats: { percentage: "85%", description: "of violations are avoidable with proper monitoring" }
    }
  ];

  const impactMetrics = [
    { icon: DollarSign, value: "$12.9T", label: "Global business disruption cost", color: "text-red-600" },
    { icon: Clock, value: "18 months", label: "Average recovery time", color: "text-orange-600" },
    { icon: Target, value: "1 in 3", label: "Companies hit by supplier issues", color: "text-purple-600" },
  ];

  return (
    <section 
      ref={sectionRef}
      id="problems" 
      className="relative py-32 px-6 bg-gradient-to-br from-slate-100 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.05)_50%,transparent_75%,transparent)] bg-[length:20px_20px]"></div>
      </div>

      {/* Floating Background Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-red-400/10 to-orange-400/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center gap-2 mb-6">
            <Badge 
              variant="outline" 
              className="px-4 py-2 text-xs font-light tracking-wide bg-red-50/50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300"
            >
              <Shield className="w-3 h-3 mr-2" />
              The Hidden Crisis
            </Badge>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-light tracking-tight mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Business Risks Are
            </span>
            <br />
            <span className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 bg-clip-text text-transparent font-medium">
              Invisible Until They Strike
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
            Traditional risk management is reactive, expensive, and often too late. 
            Modern businesses need intelligent, proactive protection.
          </p>
        </div>

        {/* Impact Metrics */}
        <div className={`grid md:grid-cols-3 gap-8 mb-20 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {impactMetrics.map((metric, index) => (
            <div 
              key={metric.label}
              className={`text-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${500 + index * 200}ms` }}
            >
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                </div>
              </div>
              <div className="text-3xl lg:text-4xl font-light bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-2">
                {metric.value}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 font-light">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Problem Cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          {problems.map((problem, index) => (
            <Card 
              key={problem.title}
              className={`group relative overflow-hidden bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-700 hover:scale-[1.02] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                transitionDelay: `${700 + index * 200}ms` 
              }}
            >
              {/* Gradient Border */}
              <div className={`absolute inset-0 bg-gradient-to-r ${problem.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl`}></div>
              
              <CardContent className="relative p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${problem.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <problem.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl lg:text-2xl font-medium text-slate-900 dark:text-white mb-1">
                        {problem.title}
                      </h3>
                      <div className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${problem.bgColor} ${problem.textColor} font-medium`}>
                        <Zap className="w-3 h-3" />
                        High Impact
                      </div>
                    </div>
                  </div>
                  
                  {/* Impact Badge */}
                  <div className="text-right">
                    <div className={`text-2xl lg:text-3xl font-light bg-gradient-to-r ${problem.color} bg-clip-text text-transparent`}>
                      {problem.impact}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {problem.impactLabel}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed font-light text-lg">
                  {problem.description}
                </p>

                {/* Examples */}
                <div className="space-y-3 mb-6">
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Common Examples:
                  </div>
                  <div className="space-y-2">
                    {problem.examples.map((example, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${problem.color}`}></div>
                        {example}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Statistics */}
                <div className={`rounded-lg p-4 ${problem.bgColor} ${problem.borderColor} border`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`text-2xl font-light ${problem.textColor}`}>
                        {problem.stats.percentage}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        {problem.stats.description}
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-white/50 dark:bg-slate-800/50 flex items-center justify-center">
                      <TrendingDown className={`w-5 h-5 ${problem.textColor}`} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
            <h3 className="text-2xl lg:text-3xl font-light text-slate-900 dark:text-white mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium">
                What if you could see these risks coming?
              </span>
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light">
              ChainSight's AI continuously monitors your business ecosystem, 
              turning invisible threats into actionable intelligence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


