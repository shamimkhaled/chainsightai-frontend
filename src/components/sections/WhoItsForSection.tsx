
import { Card, CardContent } from '@/components/ui/card';
import { Shield, TrendingUp, Users } from 'lucide-react';

export function WhoItsForSection() {
  return (
    <section className="py-24 px-6 bg-white dark:bg-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Built for Global Trade Leaders
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            ChainSight empowers businesses engaged in cross-border trade and complex vendor relationships
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Global Brands</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Multinational companies with complex supply chains and vendor networks across multiple jurisdictions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Banks & Financial Institutions</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Trade finance providers needing enhanced due diligence and risk assessment capabilities
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">B2B Platforms & SMEs</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Growing businesses lacking in-house legal or compliance teams but facing enterprise-level risks
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
