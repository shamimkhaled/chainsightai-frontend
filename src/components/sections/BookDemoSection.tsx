import { useState } from "react";
import { BookDemoForm } from "@/components/BookDemoForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Define props interface for BookDemoSection
interface BookDemoSectionProps {
  id?: string; // Make id optional
}

const BookDemoSection = ({ id }: BookDemoSectionProps) => {
  const [open, setOpen] = useState(false);

  return (
    <section className="py-20" id={id}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-600 dark:to-purple-600 rounded-2xl p-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              See ChainSight in Action
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Get a personalized demo tailored to your business needs. Discover how ChainSight can help you identify and mitigate supply chain risks before they impact your operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/pricing"
                className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-4 rounded-lg font-semibold transition-colors text-center"
              >
                Start Free Trial
              </Link>
              <button
                onClick={() => setOpen(true)}
                className="border border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold transition-colors text-center"
              >
                Book Your Demo
              </button>
            </div>
            <p className="text-sm text-white/60 mt-6">
              Schedule a 30-minute session with our team
            </p>
          </div>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg bg-slate-900 border border-white/20">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-white text-center">
              Book Your Demo
            </DialogTitle>
          </DialogHeader>
          <BookDemoForm variant="light" />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export { BookDemoSection }; // Use named export


