
import { ContactForm } from '@/components/ContactForm';

export function CTASection() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-3">
            Ready to See Risks Before They See You?
          </h2>
          <p className="text-base mb-6 opacity-90">
            Join forward-thinking businesses using ChainSight to stay ahead of supply chain and compliance risks.
          </p>
          
          <div className="max-w-xs mx-auto">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
