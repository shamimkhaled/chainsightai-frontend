import { Progress } from '@/components/ui/progress';
import { Loader2, Clock } from 'lucide-react';

interface ProcessingProgressProps {
  progress: number;
  isProcessing: boolean;
}

export function ProcessingProgress({ progress, isProcessing }: ProcessingProgressProps) {
  if (!isProcessing) return null;

  return (
    <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <div className="relative">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" aria-hidden="true" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Clock className="w-4 h-4 text-blue-600" aria-hidden="true" />
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
            Analyzing Contract
          </h4>
          <p className="text-xs text-blue-700 dark:text-blue-300 mb-2">
            AI performing deep analysis...
          </p>
          <Progress value={progress} className="w-full h-2" aria-label={`${Math.round(progress)}% complete`} />
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
            {Math.round(progress)}% Complete
          </p>
        </div>
      </div>
    </div>
  );
}
