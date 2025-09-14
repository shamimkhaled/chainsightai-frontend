import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import FoundersSection from "@/components/sections/FoundersSection";
import { BookDemoForm } from "@/components/BookDemoForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { BrainCircuit, Target, Users, Globe, Award, Lightbulb, Shield, TrendingUp } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import { BookDemoSection } from '@/components/sections/BookDemoSection';

const About = () => {
  const [open, setOpen] = useState(false);
  const values = [
    {
      icon: Shield,
      title: "Trust & Security",
      description: "We prioritize data security and privacy, ensuring your sensitive business information remains protected with enterprise-grade security measures.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "We continuously push the boundaries of AI and risk intelligence, delivering cutting-edge solutions that stay ahead of emerging risks.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Client Success",
      description: "Your success drives everything we do. We're committed to delivering measurable value and exceptional support at every step.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "We believe in democratizing risk intelligence, making advanced AI accessible to businesses of all sizes across emerging markets.",
      color: "from-orange-500 to-red-500"
    }
  ];

  const milestones = [
    {
      year: "2025",
      title: "ChainSight Founded",
      description: "Founded by experienced leaders with deep expertise in AI, risk management, and global trade."
    },
    {
      year: "2025",
      title: "Beta Platform Launch",
      description: "Launched our AI-powered contract analysis platform with initial enterprise clients."
    },
    {
      year: "2026",
      title: "Global Expansion",
      description: "Expanding operations across 15+ countries with localized risk intelligence."
    },
    {
      year: "2026",
      title: "Advanced AI Models",
      description: "Deploying next-generation AI models for predictive risk analytics and real-time monitoring."
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
                About ChainSight
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-8">
                Democratizing{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Risk Intelligence
                </span>{' '}
                for Global Trade
              </h1>
              
              <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                We believe that advanced AI-powered risk analysis shouldn't be exclusive to Fortune 500 companies. 
                Our mission is to make intelligent risk management accessible and affordable for businesses worldwide.
              </p>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">50+</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Countries Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">99.7%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">10k+</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Contracts Analyzed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">&lt;30s</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Analysis Time</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Target className="w-6 h-6 text-blue-600" />
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                  To transform how businesses identify, analyze, and mitigate risks by providing 
                  AI-powered intelligence that was previously accessible only to large enterprises. 
                  We're leveling the playing field for SMEs and emerging market businesses.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-green-600 rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">Accessible AI</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">Making advanced AI tools affordable and easy to use</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-green-600 rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">Global Reach</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">Supporting businesses across emerging and developed markets</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-green-600 rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">Proactive Protection</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">Identifying risks before they become costly problems</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-200 dark:border-blue-800">
                <CardContent className="p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <Award className="w-6 h-6 text-purple-600" />
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Our Vision</h3>
                  </div>
                  <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed mb-6">
                    A world where every business, regardless of size or location, has access to 
                    intelligent risk management tools that protect their operations and enable confident decision-making.
                  </p>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                    <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">By 2030, we aim to:</p>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                      <li>• Serve 1M+ businesses globally</li>
                      <li>• Prevent $1B+ in risk-related losses</li>
                      <li>• Become the standard for AI risk intelligence</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                These principles guide everything we do, from product development to customer relationships.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-slate-200 dark:border-slate-700">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                        {value.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Company Timeline */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Our Journey
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                From inception to global impact, here's how we're building the future of risk intelligence.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-indigo-500" />
                
                <div className="space-y-12">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="relative flex items-start gap-6">
                      {/* Timeline dot */}
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        {milestone.year}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 pb-8">
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founders Section */}
        <FoundersSection />

        {/* Join Us Section */}
        <section id='book-demo-section' className="py-20">
        {/* <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-600 dark:to-purple-600 rounded-2xl p-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Ready to Transform Risk Management?
                </h2>
                <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Join thousands of businesses already using ChainSight to make smarter, safer decisions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={"/pricing"} className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-4 rounded-lg font-semibold transition-colors">
                    Start Free Trial
                </Link>
                <button onClick={() => setOpen(true)} className="border border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold transition-colors">
                  
                    Schedule Demo
                </button>

               
                </div>
            </div>
            </div>
        </div> */}

        <BookDemoSection />


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

export default About;