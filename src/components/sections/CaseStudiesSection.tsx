export function CaseStudiesSection() {
  return (
    <section id="case-studies" className="py-16 px-6 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Real-World Impact
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            See how ChainSight would have prevented major supply chain disasters and protected businesses from catastrophic losses.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm font-medium text-red-600 dark:text-red-400 uppercase tracking-wide">
                Case Study
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              How a Bangladeshi Garment Factory Lost £1.2 Million in the BHS Collapse — and How ChainSight Could Have Prevented It
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-3">The Situation</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>• Mid-sized Bangladeshi garment factory</li>
                <li>• $30M annual turnover, 1,800 employees</li>
                <li>• BHS contributed 15% of annual revenue</li>
                <li>• Large orders on Net 90 day payment terms</li>
              </ul>
            </div>
            
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-3">The Disaster</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>• April 25, 2016: BHS filed for bankruptcy</li>
                <li>• £1.2M worth of goods never paid for</li>
                <li>• 350 workers laid off</li>
                <li>• Factory nearly bankrupted overnight</li>
              </ul>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-3">ChainSight Solution</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>• Real-time financial health monitoring</li>
                <li>• Early bankruptcy risk alerts</li>
                <li>• Contract risk analysis</li>
                <li>• WhatsApp/email warnings in local language</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Background</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                In the early 2010s, British Home Stores (BHS) was a legacy high-street retail brand in the UK with over 160 stores. Despite struggling financially, it continued placing large garment orders with manufacturers in Bangladesh. One such supplier was a family-run factory in Gazipur that had built BHS as a marquee client, contributing 15% of their annual revenue.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Where It Went Wrong</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-slate-900 dark:text-white mb-2">Structural Failures:</h5>
                  <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                    <li>• No real-time financial monitoring of BHS</li>
                    <li>• Missing credit insurance and risk clauses</li>
                    <li>• No early warning system for client distress</li>
                    <li>• One-way visibility with no risk scoring</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-slate-900 dark:text-white mb-2">Warning Signs Missed:</h5>
                  <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                    <li>• Mounting pension liabilities</li>
                    <li>• Store closures across the UK</li>
                    <li>• Board member resignations</li>
                    <li>• Delayed payments to other suppliers</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">How ChainSight Would Have Prevented This</h4>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">🚨 Early Warning System</h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    ChainSight would have flagged BHS's deteriorating financial health weeks before bankruptcy, monitoring pension contributions, store closures, and board changes.
                  </p>
                  
                  <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">📱 Instant Alerts</h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Factory owner receives WhatsApp alert in Bengali: "⚠️ URGENT: Your client BHS is experiencing financial distress. Consider halting production or requiring payment guarantees."
                  </p>
                </div>
                
                <div>
                  <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">📄 Contract Intelligence</h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    AI analysis would have identified missing safeguards like force majeure clauses and payment guarantees, suggesting real-time contract modifications.
                  </p>
                  
                  <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">🌐 Global Risk Network</h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Anonymous risk data from other BHS suppliers worldwide would have provided cross-border warnings about payment delays.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-6 text-center">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">The Bottom Line</h4>
              <p className="text-slate-600 dark:text-slate-400">
                One intelligent alert could have saved £1.2 million and 350 jobs. In today's volatile trade environment, 
                information isn't just power—it's protection.
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-2 font-medium">
                ChainSight is building that shield.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}