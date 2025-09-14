import { useState } from "react";
import { BookDemoForm } from "@/components/BookDemoForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  Users, 
  Shield, 
  Sparkles,
  CheckCircle 
} from "lucide-react";

// Define props interface for BookDemoSection
interface BookDemoSectionProps {
  id?: string;
}

const BookDemoSection = ({ id }: BookDemoSectionProps) => {
  const [open, setOpen] = useState(false);

  const benefits = [
    { icon: Calendar, text: "30-minute personalized session" },
    { icon: Users, text: "Tailored to your business needs" },
    { icon: Shield, text: "Enterprise security walkthrough" },
  ];

  const features = [
    "Live contract analysis demonstration",
    "Custom risk assessment for your industry", 
    "ROI calculation and implementation roadmap",
    "Q&A with our risk intelligence experts"
  ];

  return (
    <section className="py-32 bg-white dark:bg-slate-950" id={id}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Premium Card Container */}
          <div className="relative overflow-hidden">
            
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950/20 rounded-3xl"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-100/40 to-purple-100/40 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-100/30 to-blue-100/30 dark:from-purple-900/10 dark:to-blue-900/10 rounded-full blur-3xl"></div>
            
            {/* Main Content */}
            <div className="relative z-10 p-12 lg:p-16 text-center">
              
              {/* Badge */}
              <div className="inline-flex mb-8">
                <Badge 
                  variant="outline" 
                  className="px-4 py-2 text-sm font-light bg-white/60 dark:bg-slate-800/60 border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 backdrop-blur-sm"
                >
                  <Sparkles className="w-4 h-4 mr-2 text-blue-500" />
                  Exclusive Demo Experience
                </Badge>
              </div>

              {/* Main Headline */}
              <h2 className="text-4xl lg:text-6xl font-extralight tracking-tight text-slate-900 dark:text-white mb-6">
                <span className="block">See ChainSight</span>
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent font-light">
                  in Action
                </span>
              </h2>
              
              <p className="text-xl lg:text-2xl font-light text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                Experience how AI-powered risk intelligence transforms your decision-making process. 
                <span className="text-slate-900 dark:text-white font-normal"> See real results, live.</span>
              </p>

              {/* Benefits Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center">
                      <benefit.icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {benefit.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  onClick={() => setOpen(true)}
                  className="h-14 px-8 bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 text-white font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Your Demo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <Button
                  asChild
                  variant="outline"
                  className="h-14 px-8 text-lg border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 backdrop-blur-sm"
                >
                  <Link to="/pricing">
                    Start Free Trial
                  </Link>
                </Button>
              </div>

              {/* Features List */}
              <div className="max-w-2xl mx-auto">
                <p className="text-sm font-medium text-slate-900 dark:text-white mb-4">
                  What you'll see in your demo:
                </p>
                <div className="grid md:grid-cols-2 gap-3 text-left">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Signal */}
              <div className="mt-8 pt-8 border-t border-slate-200/50 dark:border-slate-700/50">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Average demo takes 30 minutes • No commitment required • 
                  <span className="font-medium text-slate-700 dark:text-slate-300 ml-1">
                    250+ companies already trust ChainSight
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
          <DialogHeader className="pb-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <DialogTitle className="text-2xl font-light text-slate-900 dark:text-white">
                Book Your Demo
              </DialogTitle>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Get a personalized walkthrough of ChainSight's capabilities
              </p>
            </div>
          </DialogHeader>
          <BookDemoForm variant="light" />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export { BookDemoSection };