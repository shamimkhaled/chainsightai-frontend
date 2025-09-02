import { useState } from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Check, X, Zap, Shield, Users, Building2, ArrowRight, Star, Sparkles, Crown } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';



const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small businesses and startups",
      monthlyPrice: 49,
      annualPrice: 490,
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
      popular: false,
      features: {
        included: [
          "Up to 50 contracts/month",
          "Basic risk assessment",
          "Email support",
          "Standard templates",
          "PDF reports",
          "Basic compliance checks"
        ],
        notIncluded: [
          "Advanced AI models",
          "Real-time monitoring", 
          "Custom integrations",
          "Priority support",
          "Advanced analytics",
          "Multi-user access"
        ]
      },
      limits: {
        contracts: "50/month",
        users: "1 user",
        support: "Email only",
        storage: "1 GB"
      }
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses with complex needs",
      monthlyPrice: 149,
      annualPrice: 1490,
      icon: Shield,
      color: "from-purple-500 to-pink-500",
      popular: true,
      features: {
        included: [
          "Up to 500 contracts/month",
          "Advanced AI risk analysis",
          "Real-time vendor monitoring",
          "Priority email & chat support",
          "Custom report templates",
          "Advanced compliance suite",
          "API access",
          "Multi-user collaboration",
          "Advanced analytics dashboard",
          "Integration with popular tools"
        ],
        notIncluded: [
          "Unlimited contracts",
          "Dedicated account manager",
          "Custom AI model training",
          "White-label solution"
        ]
      },
      limits: {
        contracts: "500/month",
        users: "5 users",
        support: "Priority support",
        storage: "10 GB"
      }
    },
    {
      name: "Enterprise", 
      description: "For large organizations with mission-critical needs",
      monthlyPrice: 499,
      annualPrice: 4990,
      icon: Crown,
      color: "from-amber-500 to-orange-500",
      popular: false,
      features: {
        included: [
          "Unlimited contracts",
          "Custom AI model training",
          "Dedicated account manager",
          "24/7 phone & email support",
          "White-label solution",
          "Advanced security features",
          "Custom integrations",
          "On-premise deployment option",
          "Advanced workflow automation",
          "Predictive risk modeling",
          "Multi-jurisdiction compliance",
          "Advanced user management"
        ],
        notIncluded: []
      },
      limits: {
        contracts: "Unlimited",
        users: "Unlimited",
        support: "24/7 dedicated",
        storage: "Unlimited"
      }
    }
  ];

  const faq = [
    {
      question: "How does the contract analysis limit work?",
      answer: "Each plan includes a monthly allowance of contracts you can analyze. If you exceed this limit, you can either upgrade or purchase additional contract credits at $2 per contract."
    },
    {
      question: "Can I change my plan anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the billing accordingly."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! We offer a 14-day free trial with full access to Professional features. No credit card required to start."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express) and bank transfers for Enterprise customers."
    },
    {
      question: "Do you offer discounts for non-profits or educational institutions?",
      answer: "Yes, we offer special pricing for qualified non-profit organizations and educational institutions. Contact our sales team for details."
    },
    {
      question: "What happens to my data if I cancel?",
      answer: "You can export all your data anytime. After cancellation, we retain your data for 30 days before permanent deletion, giving you time to reconsider or export."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800" />
          <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-700/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent dark:from-slate-950/80" />
          
          <div className="relative container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <Badge 
                variant="secondary" 
                className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 mb-6"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Simple, Transparent Pricing
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-8">
                Choose the{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Perfect Plan
                </span>{' '}
                for Your Business
              </h1>
              
              <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Start with a free trial, scale as you grow. No hidden fees, no vendor lock-in, 
                and enterprise-grade security at every level.
              </p>

              {/* Billing Toggle */}
              <div className="flex items-center justify-center gap-4 mb-12">
                <span className={`text-sm font-medium ${!isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                  Monthly
                </span>
                <Switch
                  checked={isAnnual}
                  onCheckedChange={setIsAnnual}
                  className="data-[state=checked]:bg-green-500"
                />
                <span className={`text-sm font-medium ${isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                  Annual
                </span>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 ml-2">
                  Save 15%
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {plans.map((plan, index) => {
                const Icon = plan.icon;
                const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
                const billingPeriod = isAnnual ? '/year' : '/month';
                
                return (
                  <Card 
                    key={index} 
                    className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                      plan.popular 
                        ? 'ring-2 ring-purple-500 dark:ring-purple-400 scale-105 shadow-xl' 
                        : 'hover:shadow-lg'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-2 text-sm font-semibold">
                        <Star className="w-4 h-4 inline mr-1" />
                        Most Popular
                      </div>
                    )}
                    
                    <CardContent className={`p-8 ${plan.popular ? 'pt-16' : 'pt-8'}`}>
                      {/* Plan Header */}
                      <div className="text-center mb-8">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.color} flex items-center justify-center mx-auto mb-4`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                          {plan.name}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                          {plan.description}
                        </p>
                        <div className="text-center">
                          <span className="text-4xl font-bold text-slate-900 dark:text-white">
                            ${price}
                          </span>
                          <span className="text-slate-600 dark:text-slate-400 ml-2">
                            {billingPeriod}
                          </span>
                          {isAnnual && (
                            <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                              Save ${(plan.monthlyPrice * 12 - plan.annualPrice)} per year
                            </div>
                          )}
                        </div>
                      </div>



                      {/* Plan Limits */}
                      <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <div className="text-center">
                          <div className="font-semibold text-slate-900 dark:text-white text-sm">
                            {plan.limits.contracts}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">Contracts</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-slate-900 dark:text-white text-sm">
                            {plan.limits.users}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">Users</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-slate-900 dark:text-white text-sm">
                            {plan.limits.support}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">Support</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-slate-900 dark:text-white text-sm">
                            {plan.limits.storage}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">Storage</div>
                        </div>
                      </div>



                      {/* Features */}
                      <div className="space-y-3 mb-8">
                        {plan.features.included.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                          </div>
                        ))}
                        {plan.features.notIncluded.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3 opacity-50">
                            <X className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-500 dark:text-slate-400">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <Button 
                        className={`w-full ${
                          plan.popular 
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                            : 'bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white'
                        }`}
                      >
                        {index === 2 ? 'Contact Sales' : 'Start Free Trial'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      
                      {index !== 2 && (
                        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-3">
                          No credit card required
                        </p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Enterprise Features */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                  Enterprise-Grade Features
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                  Advanced capabilities for large organizations with complex requirements.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: Shield,
                    title: "Advanced Security",
                    description: "SOC 2 compliance, SSO integration, and advanced encryption"
                  },
                  {
                    icon: Users,
                    title: "Team Collaboration",
                    description: "Role-based access, team workspaces, and approval workflows"
                  },
                  {
                    icon: Building2,
                    title: "Custom Deployment",
                    description: "On-premise, private cloud, or hybrid deployment options"
                  },
                  {
                    icon: Zap,
                    title: "API & Integrations",
                    description: "RESTful APIs and integrations with popular business tools"
                  },
                  {
                    icon: Star,
                    title: "Dedicated Support",
                    description: "24/7 priority support with dedicated account manager"
                  },
                  {
                    icon: Crown,
                    title: "White Label",
                    description: "Fully branded experience with your company's look and feel"
                  }
                ].map((feature, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Everything you need to know about our pricing and plans.
                </p>
              </div>

              <div className="space-y-8">
                {faq.map((item, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-8">
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                        {item.question}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {item.answer}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id='book-demo-section' className="py-20 bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
                Join thousands of businesses using ChainSight to make smarter, safer decisions every day.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white px-8 py-4 text-lg">
                  Start Your Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" className="px-8 py-4 text-lg border-slate-300 dark:border-slate-600">
                  Talk to Sales
                </Button>
              </div>
              
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-6">
                14-day free trial • No credit card required • Cancel anytime
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <Toaster />
    </div>
  );
};

export default Pricing;