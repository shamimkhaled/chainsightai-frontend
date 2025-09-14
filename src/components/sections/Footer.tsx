import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Github,
  ArrowUp,
  ArrowRight,
  Globe,
  Shield,
  Award,
  Heart
} from 'lucide-react';

export function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    const footerElement = document.getElementById('footer');
    if (footerElement) {
      observer.observe(footerElement);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (footerElement) {
        observer.unobserve(footerElement);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const productLinks = [
    { name: 'Contract Intelligence', href: '/features/contracts' },
    { name: 'Vendor Monitoring', href: '/features/vendors' },
    { name: 'Risk Analytics', href: '/features/analytics' },
    { name: 'API Access', href: '/api' },
    { name: 'Integrations', href: '/integrations' }
  ];

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Pricing', href: '/pricing', badge: 'use free trial' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Sign In', href: '/' },
    // { name: 'Press Kit', href: '/press' }
  ];

  const supportLinks = [
    { name: 'Help Center', href: '/help' },
    { name: 'Documentation', href: '/docs' },
    { name: 'Community', href: '/community' },
    { name: 'Contact Support', href: '/support' },
    { name: 'System Status', href: '/status' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Compliance', href: '/compliance' }
  ];

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/chainsight', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/chainsight', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/chainsight', label: 'GitHub' },
    { icon: Facebook, href: 'https://facebook.com/chainsight', label: 'Facebook' }
  ];

  const certifications = [
    { icon: Shield, label: 'SOC 2 Certified' },
    { icon: Globe, label: 'GDPR Compliant' },
    { icon: Award, label: 'ISO 27001' }
  ];

  return (
    <>
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300"
          size="icon"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}

      <footer 
        id="footer"
        className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-teal-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-grid-dark opacity-10"></div>
        </div>

        <div className="relative z-10">
          {/* Main Footer Content */}
          <div className="container mx-auto px-6 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
              {/* Brand Section */}
              <div className={`lg:col-span-2 space-y-8 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                {/* Logo */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img 
                      src="/logo-light.png" 
                      alt="ChainSight Logo" 
                      className="w-42 h-20 transition-transform duration-300 hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                     <span className="text-xs mx-18 font-light text-slate-400 -mt-1 tracking-wide">
                      AI RISK INTELLIGENCE
                    </span>
                    <div 
                      className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center hidden"
                      style={{ display: 'none' }}
                    >
                      <div className="w-7 h-7 border-2 border-white rounded-lg relative">
                        <div className="absolute inset-1 bg-white rounded-sm opacity-80"></div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex flex-col">
                    <span className="text-2xl font-light tracking-tight text-white">
                      ChainSight
                    </span>
                    <span className="text-xs font-light text-slate-400 -mt-1 tracking-wide">
                      AI RISK INTELLIGENCE
                    </span>
                  </div> */}
                </div>

                {/* Description */}
                <p className="text-slate-300 font-light leading-relaxed max-w-md">
                  Transforming global trade through AI-powered risk intelligence. 
                  Protect your business with predictive analytics and real-time monitoring.
                </p>

                {/* Certifications */}
                {/* <div className="space-y-3">
                  <p className="text-sm font-medium text-slate-400">Trusted & Certified</p>
                  <div className="flex flex-wrap gap-3">
                    {certifications.map((cert, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-2 px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700/50 backdrop-blur-sm"
                      >
                        <cert.icon className="w-3 h-3 text-green-400" />
                        <span className="text-xs text-slate-300 font-light">{cert.label}</span>
                      </div>
                    ))}
                  </div>
                </div> */}

                {/* Social Links */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-slate-400">Follow Us</p>
                  <div className="flex space-x-3">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        aria-label={social.label}
                        className="w-10 h-10 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:border-transparent transition-all duration-300 transform hover:scale-110"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <social.icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation Columns */}
              {/* <div className={`space-y-6 transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <h3 className="text-lg font-medium text-white">Product</h3>
                <ul className="space-y-3">
                  {productLinks.map((link, index) => (
                    <li key={index}>
                      <Link 
                        to={link.href} 
                        className="text-slate-400 hover:text-white transition-all duration-300 font-light text-sm flex items-center gap-2 group"
                      >
                        {link.name}
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div> */}

              <div className={`space-y-6 transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <h3 className="text-lg font-medium text-white">Company</h3>
                <ul className="space-y-3">
                  {companyLinks.map((link, index) => (
                    <li key={index}>
                      <Link 
                        to={link.href} 
                        className="text-slate-400 hover:text-white transition-all duration-300 font-light text-sm flex items-center gap-2 group"
                      >
                        {link.name}
                        {link.badge && (
                          <Badge className="bg-green-600 text-white text-xs px-2 py-0.5">
                            {link.badge}
                          </Badge>
                        )}
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* <div className={`space-y-6 transition-all duration-1000 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <h3 className="text-lg font-medium text-white">Support</h3>
                <ul className="space-y-3">
                  {supportLinks.map((link, index) => (
                    <li key={index}>
                      <Link 
                        to={link.href} 
                        className="text-slate-400 hover:text-white transition-all duration-300 font-light text-sm flex items-center gap-2 group"
                      >
                        {link.name}
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div> */}

              <div className={`space-y-6 transition-all duration-1000 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <h3 className="text-lg font-medium text-white">Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 group cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-slate-800/50 border border-slate-700/50 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                      <Mail className="w-4 h-4 text-slate-400 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm font-light">Email Us</p>
                      <p className="text-white text-sm">hello@chainsight.ai</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 group cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-slate-800/50 border border-slate-700/50 flex items-center justify-center group-hover:bg-green-600 transition-colors duration-300">
                      <Phone className="w-4 h-4 text-slate-400 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm font-light">Call Us</p>
                      <p className="text-white text-sm">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 group cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-slate-800/50 border border-slate-700/50 flex items-center justify-center group-hover:bg-purple-600 transition-colors duration-300">
                      <MapPin className="w-4 h-4 text-slate-400 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm font-light">Visit Us</p>
                      <p className="text-white text-sm">San Francisco, CA</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800/50">
            <div className="container mx-auto px-6 py-8">
              <div className={`flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0 transition-all duration-1000 delay-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                {/* Copyright */}
                <div className="flex items-center space-x-2 text-sm text-slate-400">
                  <span>© 2025 ChainSight.</span>
                  <span>Made with</span>
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  <span>in San Francisco</span>
                </div>

                {/* Legal Links */}
                <div className="flex flex-wrap justify-center lg:justify-end gap-6 text-sm">
                  {legalLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.href}
                      className="text-slate-400 hover:text-white transition-colors duration-300 font-light"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}