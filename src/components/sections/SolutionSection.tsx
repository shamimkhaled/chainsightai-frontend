
import { Card, CardContent } from '@/components/ui/card';
import { FileText, TrendingUp, AlertTriangle, Globe } from 'lucide-react';

export function SolutionSection() {
  return (
    <section id="solution" className="py-24 px-6 bg-white dark:bg-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Your Virtual Chief Risk Officer
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            ChainSight's AI continuously monitors your business ecosystem to identify and flag risks before they become costly disruptions
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="group hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">AI Contract Parsing</h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Automatically extract key terms, identify unusual clauses, and flag potential legal risks in seconds
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Vendor Health Scoring</h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Real-time financial health monitoring and predictive analytics for all your suppliers and partners
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Red Flag Detection</h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Advanced pattern recognition to identify fraud indicators, compliance violations, and operational risks
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Geopolitical Risk Alerts</h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Stay ahead of regulatory changes, sanctions, and political events that could impact your operations
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
