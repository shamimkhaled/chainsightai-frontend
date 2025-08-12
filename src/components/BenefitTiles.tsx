
import { Card, CardContent } from '@/components/ui/card';
import { Code, Globe, Scale, Zap, Shield, TrendingUp } from 'lucide-react';

export function BenefitTiles() {
  const benefits = [
    {
      icon: Code,
      title: "Programmable Compliance",
      description: "Automate KYC, AML, and VAT compliance with AI-powered APIs that adapt to local regulations across 50+ jurisdictions.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Globe,
      title: "Cross-Border Ready",
      description: "Seamless FX optimization using both fiat and Web3 rails, enabling efficient international transactions and payments.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Scale,
      title: "Shariah + Common Law Contracts",
      description: "Smart contracts that comply with both Islamic finance principles and common law, opening markets across emerging economies.",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {benefits.map((benefit, index) => {
        const Icon = benefit.icon;
        return (
          <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-600 hover:scale-105">
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${benefit.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {benefit.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
