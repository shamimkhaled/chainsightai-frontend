import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  TrendingUp, 
  AlertTriangle, 
  Globe,
  Brain,
  Shield,
  Zap,
  Target,
  Eye,
  ArrowRight,
  CheckCircle,
  BarChart3,
  Clock,
  Users
} from 'lucide-react';

export function SolutionSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
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

  const solutions = [
    {
      icon: FileText,
      title: "AI Contract Intelligence",
      subtitle: "Instant Risk Detection",
      description: "Automatically extract key terms, identify unusual clauses, and flag potential legal risks in seconds. Our AI reads between the lines to catch what human reviewers miss.",
      color: "from-blue-500 to-purple-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800",
      features: [
        "Natural language processing",
        "Clause risk scoring",
        "Compliance validation",
        "Term benchmarking"
      ],
      metrics: { primary: "99.7%", secondary: "Accuracy Rate" }
    },
    {
      icon: TrendingUp,
      title: "Vendor Health Monitoring",
      subtitle: "Predictive Analytics",
      description: "Real-time financial health monitoring and predictive analytics for all your suppliers and partners. Get early warnings before problems impact your business.",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800",
      features: [
        "Financial stress indicators",
        "Credit risk assessment",
        "Supply chain mapping",
        "Performance tracking"
      ],
      metrics: { primary: "6 months", secondary: "Early Warning" }
    },
    {
      icon: AlertTriangle,
      title: "Real-time Risk Alerts",
      subtitle: "Intelligent Monitoring",
      description: "Continuous monitoring of geopolitical events, regulatory changes, and market conditions that could impact your business operations and vendor relationships.",
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      borderColor: "border-red-200 dark:border-red-800",
      features: [
        "Geopolitical tracking",
        "Regulatory monitoring",
        "Market intelligence",
        "Custom alert rules"
      ],
      metrics: { primary: "24/7", secondary: "Global Monitoring" }
    },
    {
      icon: Globe,
      title: "Global Compliance Engine",
      subtitle: "Regulatory Intelligence",
      description: "Stay ahead of evolving regulations across all jurisdictions. Automatic compliance checking and gap analysis to prevent costly violations.",
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-800",
      features: [
        "Multi-jurisdiction support",
        "Regulatory change tracking",
        "ESG compliance scoring",
        "Audit trail management"
      ],
      metrics: { primary: "195", secondary: "Countries Covered" }
    }
  ];

  const benefits = [
    {
      icon: Target,
      title: "Proactive Protection",
      description: "Identify and mitigate risks before they impact your business"
    },
    {
      icon: Clock,
      title: "Time Savings",
      description: "Reduce manual review time by 90% with AI-powered automation"
    },
    {
      icon: Shield,
      title: "Compliance Assurance",
      description: "Stay compliant across all jurisdictions automatically"
    },
    {
      icon: BarChart3,
      title: "Data-Driven Insights",
      description: "Make informed decisions with comprehensive risk analytics"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Connect",
      description: "Integrate with your existing systems and data sources",
      icon: Users
    },
    {
      step: "02", 
      title: "Analyze",
      description: "AI continuously monitors and analyzes your business ecosystem",
      icon: Brain
    },
    {
      step: "03",
      title: "Alert",
      description: "Receive intelligent alerts and actionable recommendations",
      icon: Zap
    },
    {
      step: "04",
      title: "Act",
      description: "Take informed action to mitigate risks and protect your business",
      icon: CheckCircle
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="solution" 
      className="relative py-32 px-6 bg-white dark:bg-slate-950 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-green-400/5 to-emerald-400/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-slate-500/2 to-transparent rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center gap-2 mb-6">
            <Badge 
              variant="outline" 
              className="px-4 py-2 text-xs font-light tracking-wide bg-blue-50/50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
            >
              <Brain className="w-3 h-3 mr-2" />
              AI-Powered Solution
            </Badge>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-light tracking-tight mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Your Virtual
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent font-medium">
              Chief Risk Officer
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
            ChainSight's AI continuously monitors your business ecosystem to identify and flag risks 
            before they become costly disruptions. Intelligent, proactive, and always watching.
          </p>
        </div>

        {/* Solution Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {solutions.map((solution, index) => (
            <Card 
              key={solution.title}
              className={`group relative overflow-hidden bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-700 hover:scale-[1.02] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                transitionDelay: `${300 + index * 200}ms` 
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${solution.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-xl`}></div>
              
              <CardContent className="relative p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${solution.color} flex items-center justify-center shadow-lg transform transition-transform duration-300 ${
                      hoveredCard === index ? 'scale-110 rotate-3' : ''
                    }`}>
                      <solution.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 tracking-wide">
                        {solution.subtitle}
                      </div>
                      <h3 className="text-xl lg:text-2xl font-medium text-slate-900 dark:text-white">
                        {solution.title}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Metrics */}
                  <div className="text-right">
                    <div className={`text-2xl lg:text-3xl font-light bg-gradient-to-r ${solution.color} bg-clip-text text-transparent`}>
                      {solution.metrics.primary}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {solution.metrics.secondary}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed font-light text-lg">
                  {solution.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {solution.features.map((feature, idx) => (
                    <div 
                      key={idx}
                      className={`flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 transition-all duration-300 ${
                        hoveredCard === index ? 'translate-x-1' : ''
                      }`}
                      style={{ transitionDelay: `${idx * 100}ms` }}
                    >
                      <CheckCircle className={`w-4 h-4 bg-gradient-to-r ${solution.color} bg-clip-text text-transparent`} />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Action */}
                <div className="flex items-center justify-between">
                  <div className={`inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full ${solution.bgColor} ${solution.borderColor} border font-medium`}>
                    <Eye className="w-3 h-3" />
                    Live Monitoring
                  </div>
                  
                  <button className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                    hoveredCard === index 
                      ? `bg-gradient-to-r ${solution.color} bg-clip-text text-transparent translate-x-1` 
                      : 'text-slate-600 dark:text-slate-400'
                  }`}>
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Steps */}
        <div className={`mb-20 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-light text-slate-900 dark:text-white mb-4">
              How ChainSight Works
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light">
              Four simple steps to comprehensive risk intelligence
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div 
                key={step.step}
                className={`text-center group transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${800 + index * 200}ms` }}
              >
                {/* Step Number */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-2xl flex items-center justify-center border border-slate-200 dark:border-slate-600 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <step.icon className="w-8 h-8 text-slate-600 dark:text-slate-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs font-bold">{step.step}</span>
                  </div>
                  
                  {/* Connection Line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-8 h-0.5 bg-gradient-to-r from-slate-300 to-transparent dark:from-slate-600"></div>
                  )}
                </div>

                <h4 className="text-xl font-medium text-slate-900 dark:text-white mb-3">
                  {step.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className={`transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-light text-slate-900 dark:text-white mb-4">
              Why Choose ChainSight
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light">
              Transform your approach to risk management with AI-powered intelligence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={benefit.title}
                className={`group p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600 hover:shadow-xl transition-all duration-500 hover:scale-105 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${1200 + index * 150}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                
                <h4 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                  {benefit.title}
                </h4>
                
                <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}