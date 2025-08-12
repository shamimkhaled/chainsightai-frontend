
import { Badge } from '@/components/ui/badge';
import { FileText, Shield, AlertTriangle, Eye } from 'lucide-react';
import { WaitlistForm } from '@/components/WaitlistForm';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-24 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-6">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              AI-Powered Risk Intelligence Platform
            </Badge>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
              AI-Powered Risk Intelligence
              <span className="block text-blue-600 dark:text-blue-400">for Global Trade</span>
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              ChainSight acts as your virtual Chief Risk Officer—scanning contracts, vendors, and global events to flag risks before they cost you.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>AI Contract Parsing</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-600" />
              <span>Vendor Health Scoring</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>Real-time Risk Alerts</span>
            </div>
          </div>

          <WaitlistForm />
        </div>

        {/* Hero Visual */}
        <div className="relative">
          <div className="relative z-10 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-200 dark:border-slate-600">
            {/* Risk Dashboard Mockup */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Risk Dashboard</h3>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-red-700 dark:text-red-300">High Risk Vendor</span>
                    <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">Critical</Badge>
                  </div>
                  <div className="text-xs text-red-600 dark:text-red-400">Supplier ABC - Financial distress detected</div>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">Contract Red Flag</span>
                    <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">Medium</Badge>
                  </div>
                  <div className="text-xs text-yellow-600 dark:text-yellow-400">Unusual payment terms identified</div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-green-700 dark:text-green-300">Geopolitical Monitor</span>
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">Stable</Badge>
                  </div>
                  <div className="text-xs text-green-600 dark:text-green-400">All regions monitoring normal</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-20 animate-pulse delay-700"></div>
        </div>
      </div>
    </section>
  );
}
