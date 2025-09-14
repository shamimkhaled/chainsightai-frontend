import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ArrowRight, User, ChevronDown } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavItem {
  name: string;
  href: string;
  submenu?: { name: string; href: string; }[];
}

const AuthModal = ({ open, onOpenChange, isSignUp, setIsSignUp }: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onOpenChange(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-light tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            {isSignUp ? "Join ChainSight" : "Welcome Back"}
          </DialogTitle>
          <DialogDescription className="text-slate-600 dark:text-slate-400 font-light">
            {isSignUp ? "Create your account to get started" : "Sign in to your account"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  className="h-11 transition-all duration-300 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 bg-white/50 dark:bg-slate-800/50"
                  placeholder="Enter your full name"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</Label>
              <Input
                id="email"
                type="email"
                required
                className="h-11 transition-all duration-300 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 bg-white/50 dark:bg-slate-800/50"
                placeholder="Enter your email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</Label>
              <Input
                id="password"
                type="password"
                required
                className="h-11 transition-all duration-300 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 bg-white/50 dark:bg-slate-800/50"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Please wait...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {isSignUp ? "Create Account" : "Sign In"}
                <ArrowRight className="w-4 h-4" />
              </div>
            )}
          </Button>
        </form>
        <div className="text-center text-sm text-slate-600 dark:text-slate-400">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline transition-colors"
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const navigation: NavItem[] = [
    { name: "Home", href: "/" },
    // { 
    //   name: "Solutions", 
    //   href: "#",
    //   submenu: [
    //     { name: "Contract Analysis", href: "/contract-analysis" },
    //     { name: "Vendor Monitoring", href: "/vendor-monitoring" },
    //     { name: "Risk Assessment", href: "/risk-assessment" },
    //   ]
    // },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const handleAuthClick = (signUp: boolean) => {
    setIsSignUp(signUp);
    setAuthModalOpen(true);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-lg shadow-slate-900/5' 
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Top">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-4 group">
                <div className="relative">
                  <img
                    src={isDark ? "/logo-light.png" : "/logo-dark.png"}
                    alt="ChainSight Logo"
                    className="w-24 h-25 transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      // Fallback to gradient background if image fails to load
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div
                    className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl hidden transition-transform duration-300 group-hover:scale-110"
                    style={{ display: 'none' }}
                  >
                    <div className="w-6 h-6 border-2 border-white rounded-lg relative">
                      <div className="absolute inset-1 bg-white rounded-sm opacity-80"></div>
                    </div>
                  </div>
                </div>
                {/* <div className="flex flex-col">
                  <span className="text-2xl font-light tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent transition-all duration-300">
                    ChainSight
                  </span>
                  <span className="text-xs font-light text-slate-500 dark:text-slate-400 -mt-1 tracking-wide">
                    AI RISK INTELLIGENCE
                  </span>
                </div> */}
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-1">
              {navigation.map((item) => (
                item.submenu ? (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="text-sm font-light transition-all duration-300 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg"
                      >
                        {item.name}
                        <ChevronDown className="w-4 h-4 ml-1 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
                      {item.submenu.map((subItem) => (
                        <DropdownMenuItem key={subItem.name} asChild>
                          <Link 
                            to={subItem.href}
                            className="text-sm font-light transition-colors text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            {subItem.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`text-sm font-light transition-all duration-300 px-4 py-2 rounded-lg relative group ${
                      isActive(item.href)
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20"
                        : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20"
                    }`}
                  >
                    {item.name}
                    {isActive(item.href) && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                    )}
                  </Link>
                )
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex lg:items-center lg:space-x-3">
              <Button
                variant="ghost"
                onClick={() => handleAuthClick(false)}
                className="text-sm font-light text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all duration-300 px-4 py-2"
              >
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
              
              <Button
                onClick={() => {
                  document.getElementById("book-demo-section")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] rounded-lg"
              >
                Request Demo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <div className="pl-3 border-l border-slate-200 dark:border-slate-700">
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden items-center space-x-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all duration-300"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-2xl">
              <div className="space-y-1 px-6 py-6">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.submenu ? (
                      <div>
                        <div className="px-3 py-2 text-base font-medium text-slate-900 dark:text-white">
                          {item.name}
                        </div>
                        <div className="pl-6 space-y-1">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className="block px-3 py-2 text-sm font-light transition-colors text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        className={`block px-3 py-2 text-base font-medium transition-colors ${
                          isActive(item.href)
                            ? "text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20"
                            : "text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="pt-4 space-y-3 border-t border-slate-200 dark:border-slate-700">
                  <Button
                    variant="ghost"
                    onClick={() => handleAuthClick(false)}
                    className="w-full justify-start text-slate-700 dark:text-slate-300"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                  <Button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      document.getElementById("book-demo-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    Request Demo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      <AuthModal 
        open={authModalOpen} 
        onOpenChange={setAuthModalOpen}
        isSignUp={isSignUp}
        setIsSignUp={setIsSignUp}
      />
    </>
  );
}