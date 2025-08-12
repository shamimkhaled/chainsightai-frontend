
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, FileText, Users } from 'lucide-react';

export function ProblemSection() {
  return (
    <section id="problem" className="py-24 px-6 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            The Hidden Cost of Risk Blindspots
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Global businesses lose billions annually from supply chain fraud, contract red flags, and vendor due diligence blindspots
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-red-200 dark:border-red-800">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Supply Chain Fraud</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Companies like BHS collapsed due to hidden vendor relationships and fraudulent certifications that went undetected for years.
              </p>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 dark:border-yellow-800">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Contract Red Flags</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Legal teams miss critical clauses and unfavorable terms buried in complex agreements, leading to costly disputes.
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 dark:border-orange-800">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Vendor Bankruptcy</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Sudden vendor failures disrupt supply chains when financial distress signals go unnoticed until it's too late.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
