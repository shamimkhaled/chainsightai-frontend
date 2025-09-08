import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, CheckCircle, Users, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface WaitlistFormProps {
  variant?: 'default' | 'light';
}

interface WaitlistStats {
  total_members: number;
  by_region: { region: string; count: number }[];
}

interface FormData {
  name: string;
  email: string;
  company: string;
  region: string;
}

interface WaitlistStatsResponse {
  success: boolean;
  data: WaitlistStats;
}

interface JoinWaitlistResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    full_name: string;
    email: string;
    company: string | null;
    region: string | null;
    created_at: string;
    updated_at: string;
    is_active: boolean;
  };
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://chainsightai-app-34v92.ondigitalocean.app/api/v1';

export function WaitlistForm({ variant = 'default' }: WaitlistFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    region: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [waitlistStats, setWaitlistStats] = useState<WaitlistStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchWaitlistStats().catch(error => console.error('Error in stats fetch:', error));
  }, []);

  const fetchWaitlistStats = async () => {
    setIsLoadingStats(true);
    try {
      const response = await fetch(`${API_BASE_URL}/waitlist/stats/`);
      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }
      const stats: WaitlistStatsResponse = await response.json();
      if (!stats.success) {
        console.error('API error: Failed to fetch waitlist stats');
        setWaitlistStats({
          total_members: 1247,
          by_region: []
        });
        return;
      }
      setWaitlistStats(stats.data);
    } catch (error) {
      console.error('Error fetching waitlist stats:', error);
      setWaitlistStats({
        total_members: 1247,
        by_region: []
      });
    } finally {
      setIsLoadingStats(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/waitlist/join/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          company: formData.company.trim() || null,
          region: formData.region || null,
        }),
      });

      if (!response.ok) {
        if (response.status === 409) {
          toast({
            title: "Already on the waitlist!",
            description: "This email is already registered for early access.",
            variant: "destructive",
          });
          return;
        } else {
          throw new Error('Failed to join waitlist');
        }
      }

      const result: JoinWaitlistResponse = await response.json();
      
      if (!result.success) {
        toast({
          title: "Error joining waitlist",
          description: result.message || "Please try again.",
          variant: "destructive",
        });
        return;
      }

      setIsSubmitted(true);
      setShowModal(false);
      
      await fetchWaitlistStats();
      
      toast({
        title: "Welcome to the ChainSight Beta Waitlist!",
        description: "Check your email for confirmation details.",
      });

    } catch (error) {
      console.error('Error joining waitlist:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const openModal = () => {
    setShowModal(true);
    setFormData({ name: '', email: '', company: '', region: '' });
    setIsSubmitted(false);
    setErrors({});
  };

  if (isSubmitted) {
    return (
      <div 
        className={`text-center p-6 rounded-lg ${
          variant === 'light' ? 'bg-white/10' : 'bg-green-50 dark:bg-green-900/20'
        }`}
        role="alert"
        aria-live="polite"
      >
        <CheckCircle 
          className={`w-12 h-12 mx-auto mb-4 ${
            variant === 'light' ? 'text-white' : 'text-green-600 dark:text-green-400'
          }`}
          aria-hidden="true"
        />
        <h3 className={`text-lg font-semibold mb-2 ${
          variant === 'light' ? 'text-white' : 'text-slate-900 dark:text-white'
        }`}>
          You're on the list!
        </h3>
        <p className={`text-sm ${
          variant === 'light' ? 'text-white/80' : 'text-slate-600 dark:text-slate-300'
        }`}>
          We'll notify you when ChainSight is ready for early access.
        </p>
        {waitlistStats && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Users className="w-3 h-3" aria-hidden="true" />
              {(waitlistStats.total_members || 0).toLocaleString()} joined
            </Badge>
          </div>
        )}
      </div>
    );
  }

  const inputClassName = variant === 'light' 
    ? 'bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40'
    : '';

  const buttonClassName = variant === 'light'
    ? 'bg-white text-blue-600 hover:bg-white/90'
    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white';

  return (
    <div className="space-y-4">
      {/* Waitlist Stats Display */}
      {isLoadingStats ? (
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-20 h-4 bg-gray-200 animate-pulse rounded"></div>
        </div>
      ) : (
        waitlistStats && (
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div 
                className="w-2 h-2 bg-green-500 rounded-full animate-pulse" 
                aria-hidden="true"
              ></div>
              <span className={`text-sm font-medium ${
                variant === 'light' ? 'text-white/90' : 'text-slate-700 dark:text-slate-300'
              }`}>
                {(waitlistStats.total_members || 0).toLocaleString()} early access members
              </span>
            </div>
          </div>
        )
      )}

      {/* Join Waitlist Button */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogTrigger asChild>
          <Button
            onClick={openModal}
            className={`w-full ${buttonClassName} relative overflow-hidden group`}
            aria-label="Join the ChainSight waitlist"
          >
            <span className="relative z-10 flex items-center justify-center">
              Join the Waitlist
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-pulse" aria-hidden="true"></div>
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" aria-hidden="true" />
              Join ChainSight Waitlist
            </DialogTitle>
            <DialogDescription>
              Get early access to AI-powered risk intelligence for global trade.
            </DialogDescription>
            {waitlistStats && (
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Users className="w-3 h-3" aria-hidden="true" />
                  {(waitlistStats.total_members || 0).toLocaleString()} members
                </Badge>
              </div>
            )}
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  aria-label="Full Name"
                  aria-required="true"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-sm text-red-600 mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  aria-label="Email Address"
                  aria-required="true"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-red-600 mt-1">{errors.email}</p>
                )}
              </div>
            </div>
            
            <Input
              type="text"
              placeholder="Company (Optional)"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              aria-label="Company (Optional)"
            />
            
            <Select onValueChange={(value) => handleInputChange('region', value)}>
              <SelectTrigger aria-label="Select your region">
                <SelectValue placeholder="Select your region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MENA">MENA</SelectItem>
                <SelectItem value="South Asia">South Asia</SelectItem>
                <SelectItem value="Africa">Africa</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              type="submit"
              disabled={isLoading || !formData.name || !formData.email}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              aria-busy={isLoading}
            >
              {isLoading ? (
                "Joining..."
              ) : (
                <>
                  Join the Waitlist
                  <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </>
              )}
            </Button>
            
            <p className="text-xs text-center text-slate-500 dark:text-slate-400">
              By joining, you agree to receive updates about ChainSight. Unsubscribe anytime.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}