import React, { useState } from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, DollarSign, Shield, Clock, ArrowRight, FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import { BookDemoForm } from "@/components/BookDemoForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const CaseStudies = () => {
  const [open, setOpen] = useState(false);

  const additionalCaseStudies = [
    {
      title: "Global Electronics Manufacturer Prevents $3.2M Supply Chain Disruption",
      industry: "Electronics Manufacturing",
      challenge: "Vendor financial health monitoring across 200+ suppliers in Asia-Pacific region",
      solution: "Real-time financial health scoring and predictive bankruptcy alerts",
      results: [
        "Identified 3 at-risk suppliers 6 months before bankruptcy",
        "Prevented $3.2M in lost inventory and production delays", 
        "Reduced supplier risk assessment time by 89%",
        "Established backup supplier relationships proactively"
      ],
      impact: {
        cost_savings: "$3.2M",
        time_saved: "89%",
        risks_prevented: "15"
      },
      testimonial: {
        quote: "ChainSight's early warning system saved us from a catastrophic supply chain breakdown. The AI identified risks our human analysts missed completely.",
        author: "Sarah Chen",
        title: "Chief Procurement Officer"
      }
    },
    {
      title: "International Law Firm Streamlines Contract Risk Assessment",
      industry: "Legal Services", 
      challenge: "Manual contract review taking 40+ hours per complex international agreement",
      solution: "AI-powered contract parsing and risk identification across multiple jurisdictions",
      results: [
        "Reduced contract review time from 40 hours to 4 hours",
        "Identified 23% more risk factors than manual review",
        "Standardized risk assessment across 12 global offices",
        "Improved client satisfaction scores by 34%"
      ],
      impact: {
        efficiency_gain: "90%",
        accuracy_improvement: "23%", 
        client_satisfaction: "+34%"
      },
      testimonial: {
        quote: "The level of detail ChainSight provides in contract analysis is remarkable. It's like having a senior partner review every agreement.",
        author: "Michael Rodriguez",
        title: "Managing Partner"
      }
    },
    {
      title: "Pharmaceutical Company Ensures Regulatory Compliance Across 15 Markets",
      industry: "Pharmaceuticals",
      challenge: "Maintaining compliance with varying regulations across multiple international markets",
      solution: "Multi-jurisdiction compliance monitoring and automated regulatory change alerts",
      results: [
        "100% compliance maintenance across all 15 markets",
        "Reduced compliance violations by 94%",
        "Automated monitoring of 500+ regulatory changes monthly",
        "Decreased legal consultation costs by 67%"
      ],
      impact: {
        compliance_rate: "100%",
        violation_reduction: "94%",
        cost_reduction: "67%"
      },
      testimonial: {
        quote: "ChainSight keeps us ahead of regulatory changes we never would have tracked manually. It's essential for our global operations.",
        author: "Dr. Emma Thompson",
        title: "Head of Regulatory Affairs"
      }
    }
  ];

  const industries = [
    { name: "Manufacturing", count: "150+" },
    { name: "Financial Services", count: "89+" },
    { name: "Healthcare", count: "76+" },
    { name: "Legal Services", count: "134+" },
    { name: "Technology", count: "203+" },
    { name: "Retail & E-commerce", count: "92+" }
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
                Real-World Impact
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-8">
                How{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  ChainSight
                </span>{' '}
                Protects Businesses Worldwide
              </h1>
              
              <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Discover how leading organizations use AI-powered risk intelligence to prevent disasters, 
                save millions, and make confident decisions in uncertain times.
              </p>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">$50M+</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Losses Prevented</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">500+</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Companies Protected</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">50k+</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Contracts Analyzed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">99.7%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Accuracy Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Coverage */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Trusted Across Industries
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                From startups to Fortune 500 companies, organizations across diverse sectors rely on ChainSight.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {industries.map((industry, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      {industry.count}
                    </div>
                    <div className="text-slate-600 dark:text-slate-400">
                      {industry.name}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Case Study - BHS Collapse */}
        <CaseStudiesSection />

        {/* Additional Case Studies */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                More Success Stories
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                See how ChainSight delivers measurable results across different industries and use cases.
              </p>
            </div>

            <div className="space-y-20 max-w-7xl mx-auto">
              {additionalCaseStudies.map((study, index) => (
                <div key={index} className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className={`space-y-8 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div>
                      <Badge 
                        variant="secondary" 
                        className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 mb-4"
                      >
                        {study.industry}
                      </Badge>
                      <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                        {study.title}
                      </h3>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                          Challenge
                        </h4>
                        <p className="text-slate-600 dark:text-slate-300">{study.challenge}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                          <Shield className="w-5 h-5 text-blue-500" />
                          ChainSight Solution
                        </h4>
                        <p className="text-slate-600 dark:text-slate-300">{study.solution}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          Results
                        </h4>
                        <ul className="space-y-2">
                          {study.results.map((result, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                              <span>{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6">
                      <blockquote className="text-lg italic text-slate-700 dark:text-slate-300 mb-4">
                        "{study.testimonial.quote}"
                      </blockquote>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {study.testimonial.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white">
                            {study.testimonial.author}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            {study.testimonial.title}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <Card className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 text-white">
                      <CardContent className="p-8">
                        <h4 className="text-xl font-bold mb-6">Key Impact Metrics</h4>
                        <div className="space-y-6">
                          {Object.entries(study.impact).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between">
                              <span className="text-slate-300 capitalize">
                                {key.replace('_', ' ')}
                              </span>
                              <span className="text-2xl font-bold">{value}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-slate-700">
                          <Button className="w-full bg-white text-slate-900 hover:bg-slate-100">
                            Download Full Case Study
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id='book-demo-section' className="py-20 bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Ready to Write Your Success Story?
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
                Join hundreds of forward-thinking companies using ChainSight to transform their risk management.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white px-8 py-4 text-lg">
                  Start Your Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button onClick={() => setOpen(true)} variant="outline" className="px-8 py-4 text-lg border-slate-300 dark:border-slate-600">
                  Schedule a Demo
                </Button>
              </div>
              
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-6">
                No credit card required • 14-day free trial • Full feature access
              </p>
            </div>
          </div>
            

                     {/* Modal */}
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          {/* <DialogTitle className="text-xl font-semibold">
                            Book Your Demo
                          </DialogTitle> */}
                        </DialogHeader>
                        <BookDemoForm />
                      </DialogContent>
                    </Dialog>
            


        </section>
      </main>

      <Footer />
      <Toaster />
    </div>
  );
};

export default CaseStudies;