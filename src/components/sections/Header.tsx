import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { BrainCircuit } from "lucide-react";

export function Header() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <header className="relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
          <BrainCircuit className="w-5 h-5 text-white" />
        </div>
        <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ChainSight
        </span>
      </div>

      <nav className="hidden md:flex items-center space-x-6">
        <Button
          variant="ghost"
          onClick={() => scrollToSection("case-studies")}
          className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
        >
          Case Studies
        </Button>
        <Button
          variant="ghost"
          onClick={() => scrollToSection("how-it-works")}
          className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
        >
          How It Works
        </Button>
        <Button
          variant="ghost"
          onClick={() => scrollToSection("problem")}
          className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
        >
          The Problem
        </Button>
        <Button
          variant="ghost"
          onClick={() => scrollToSection("solution")}
          className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
        >
          Our Solution
        </Button>
        <Button
          variant="ghost"
          onClick={() => scrollToSection("book-demo")}
          className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
        >
          Book Demo
        </Button>
        <Button
          variant="ghost"
          onClick={() => scrollToSection("founders")}
          className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
        >
          Our Founders
        </Button>
        <ThemeToggle />
      </nav>

      <div className="md:hidden">
        <ThemeToggle />
      </div>
    </header>
  );
}
