
import { BrainCircuit } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ChainSight
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              AI-powered risk intelligence for global trade
            </p>
          </div>
        </div>
        
        <div className="border-t border-slate-200 dark:border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            © 2025 ChainSight. AI-powered risk intelligence for global businesses.
          </p>
        </div>
      </div>
    </footer>
  );
}
