
import { Badge } from '@/components/ui/badge';

export function SocialProofSection() {
  return (
    <section className="py-16 px-6 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto text-center">
        <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 mb-6">
          Backed by Experience
        </Badge>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Leading $800M+ in Global Trade
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
          Our team brings deep expertise from DIFC, private banking, and international trade finance to build the risk intelligence platform businesses actually need.
        </p>
        <div className="flex items-center justify-center space-x-8 text-slate-500 dark:text-slate-400">
          <span className="text-sm">DIFC Experience</span>
          <span className="text-sm">•</span>
          <span className="text-sm">Private Banking</span>
          <span className="text-sm">•</span>
          <span className="text-sm">Trade Finance</span>
        </div>
      </div>
    </section>
  );
}
