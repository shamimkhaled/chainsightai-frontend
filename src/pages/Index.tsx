// src/pages/Index.tsx - ENHANCED VERSION
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/sections/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { SolutionSection } from '@/components/sections/SolutionSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { BookDemoSection } from '@/components/sections/BookDemoSection';
import { CTASection } from '@/components/sections/CTASection';
import { Footer } from '@/components/sections/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 transition-colors duration-500">
      <Header />
      
      <main className="pt-16 relative">
        {/* Background Pattern - NEW */}
        <div className="absolute inset-0 bg-grid-slate-100/50 dark:bg-grid-slate-800/25 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none" />
        
        {/* Floating Elements - NEW */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-teal-500/10 via-emerald-500/5 to-cyan-500/10 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }} />
        
        {/* Content */}
        <div className="relative z-10">
          <HeroSection />
          <ProblemSection />
          <SolutionSection />
          {/* <HowItWorksSection /> */}
          <BookDemoSection id="book-demo-section" />
          {/* <CTASection /> - Commented out as per original */}
        </div>
      </main>
      
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;