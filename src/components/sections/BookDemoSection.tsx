import { BookDemoForm } from '@/components/BookDemoForm';

export function BookDemoSection() {
  return (
    <section id="book-demo" className="py-16 px-6 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            See ChainSight in Action
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Get a personalized demo tailored to your business needs. Discover how ChainSight can help you identify and mitigate supply chain risks before they impact your operations.
          </p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Book Your Demo
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Schedule a 30-minute session with our team
            </p>
          </div>
          
          <BookDemoForm />
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🔍</span>
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Live Walkthrough</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">See real-time risk detection in action</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">⚡</span>
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Custom Use Cases</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Tailored to your industry and needs</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">💡</span>
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Expert Insights</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Get answers from our risk specialists</p>
          </div>
        </div>
      </div>
    </section>
  );
}