
export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            How ChainSight Works
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Simple 3-step process to transform your risk management
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Upload</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Connect your contracts, vendor data, and business documents to ChainSight's secure platform
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Analyze</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Our AI scans everything in real-time, cross-referencing global databases and risk indicators
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Act</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Receive instant alerts and actionable insights to mitigate risks before they impact your business
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
