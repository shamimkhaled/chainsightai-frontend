
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





import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, FileText, Users, TrendingDown, DollarSign, Clock } from 'lucide-react';

export function ProblemSection() {
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
      examples: ["Collapsed vendors like BHS", "Fake certifications", "Hidden ownership structures"]
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
      examples: ["Unfavorable payment terms", "Missing liability clauses", "Hidden penalties"]
    },
    {
      icon: Users,
      title: "Vendor Bankruptcy",
      description: "Sudden vendor failures disrupt supply chains when financial distress signals go unnoticed until it's too late.",
      impact: "45%",
      impactLabel: "Supply Chain Disruptions",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-800",
      examples: ["Unexpected bankruptcies", "Cash flow issues", "Payment delays"]
    }
  ];

  const stats = [
    { value: "£1.2M", label: "Average loss per incident", icon: DollarSign },
    { value: "6 months", label: "Average detection delay", icon: Clock },
    { value: "85%", label: "Preventable with early warning", icon: TrendingDown }
  ];

  return (
    <section id="problem" className="py-24 px-6 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 mb-6">
            The Challenge
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-slate-900 dark:text-white">The Hidden Cost of</span>
            <br />
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Risk Blindspots
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Global businesses lose billions annually from supply chain fraud, contract red flags, and vendor due diligence blindspots. 
            The cost of not knowing can destroy companies overnight.
          </p>
        </div>

        {/* Statistics Bar */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                <Icon className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
              </div>
            );
          })}
        </div>
        
        {/* Problem Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <Card key={index} className={`group hover:shadow-xl transition-all duration-300 ${problem.borderColor} hover:scale-105 overflow-hidden`}>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {/* Icon and Impact */}
                    <div className="flex items-start justify-between">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${problem.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold bg-gradient-to-r ${problem.color} bg-clip-text text-transparent`}>
                          {problem.impact}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 max-w-20">
                          {problem.impactLabel}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                        {problem.title}
                      </h3>
                      
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                        {problem.description}
                      </p>
                    </div>
                    
                    {/* Examples */}
                    <div className={`p-4 rounded-lg ${problem.bgColor}`}>
                      <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Common scenarios:
                      </div>
                      <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        {problem.examples.map((example, i) => (
                          <li key={i} className="flex items-center">
                            <div className="w-1 h-1 bg-current rounded-full mr-2 flex-shrink-0"></div>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              These Risks Don't Have to Be Invisible
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
              ChainSight's AI continuously monitors your business ecosystem, identifying and flagging 
              potential risks before they become costly disasters.
            </p>
            
            <div className="flex items-center justify-center gap-4 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Real-time monitoring</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
                <span>AI-powered analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-500"></div>
                <span>Instant alerts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}





