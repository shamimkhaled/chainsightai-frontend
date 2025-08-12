import { Toaster } from '@/components/ui/toaster';


import { Header } from '@/components/sections/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { SolutionSection } from '@/components/sections/SolutionSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection';
import { BookDemoSection } from '@/components/sections/BookDemoSection';
import { ContractUploadSection } from '@/components/sections/ContractUploadSection';
import { CTASection } from '@/components/sections/CTASection';
import { Footer } from '@/components/sections/Footer';
import FoundersSection from "@/components/sections/FoundersSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
      <Header />
      <HeroSection />
      <ContractUploadSection />
      <CaseStudiesSection />
      <BookDemoSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <CTASection />
      <FoundersSection />
      <Footer />

      <Toaster />
    </div>
  );
};

export default Index;
