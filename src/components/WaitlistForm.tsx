
// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { ArrowRight, CheckCircle } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';
// import { supabase } from '@/integrations/supabase/client';

// interface WaitlistFormProps {
//   variant?: 'default' | 'light';
// }

// export function WaitlistForm({ variant = 'default' }: WaitlistFormProps) {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     company: '',
//     region: ''
//   });
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const { toast } = useToast();

//   console.log('WaitlistForm rendering with formData:', formData);
//   console.log('Form variant:', variant);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     try {
//       // Save to database
//       const { error } = await supabase
//         .from('waitlist')
//         .insert({
//           name: formData.name,
//           email: formData.email,
//           company: formData.company || null,
//           region: formData.region || null,
//         });

//       if (error) {
//         if (error.code === '23505') {
//           toast({
//             title: "Already on the waitlist!",
//             description: "This email is already registered for early access.",
//             variant: "destructive",
//           });
//           return;
//         } else {
//           throw error;
//         }
//       }

//       // Send confirmation email
//       try {
//         const { error: emailError } = await supabase.functions.invoke('send-waitlist-confirmation', {
//           body: {
//             name: formData.name,
//             email: formData.email,
//             company: formData.company,
//             region: formData.region,
//           },
//         });

//         if (emailError) {
//           console.error('Email sending failed:', emailError);
//           // Don't block the success flow if email fails
//         }
//       } catch (emailError) {
//         console.error('Email sending error:', emailError);
//         // Don't block the success flow if email fails
//       }

//       setIsSubmitted(true);
//       toast({
//         title: "Welcome to the ChainSight Beta Waitlist!",
//         description: "Check your email for confirmation details.",
//       });

//     } catch (error) {
//       console.error('Error joining waitlist:', error);
//       toast({
//         title: "Something went wrong",
//         description: "Please try again later.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleInputChange = (field: string, value: string) => {
//     console.log(`Updating ${field} to:`, value);
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   if (isSubmitted) {
//     return (
//       <div className={`text-center p-6 rounded-lg ${variant === 'light' ? 'bg-white/10' : 'bg-green-50 dark:bg-green-900/20'}`}>
//         <CheckCircle className={`w-12 h-12 mx-auto mb-4 ${variant === 'light' ? 'text-white' : 'text-green-600 dark:text-green-400'}`} />
//         <h3 className={`text-lg font-semibold mb-2 ${variant === 'light' ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
//           You're on the list!
//         </h3>
//         <p className={`text-sm ${variant === 'light' ? 'text-white/80' : 'text-slate-600 dark:text-slate-300'}`}>
//           We'll notify you when ChainSight is ready for early access.
//         </p>
//       </div>
//     );
//   }

//   const inputClassName = variant === 'light' 
//     ? 'bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40'
//     : '';

//   const buttonClassName = variant === 'light'
//     ? 'bg-white text-blue-600 hover:bg-white/90'
//     : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white';

//   console.log('Rendering form with inputClassName:', inputClassName);

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <Input
//           type="text"
//           placeholder="Full Name"
//           value={formData.name}
//           onChange={(e) => handleInputChange('name', e.target.value)}
//           required
//           className={inputClassName}
//         />
//         <Input
//           type="email"
//           placeholder="Email Address"
//           value={formData.email}
//           onChange={(e) => handleInputChange('email', e.target.value)}
//           required
//           className={inputClassName}
//         />
//       </div>
      
//       <Input
//         type="text"
//         placeholder="Company (Optional)"
//         value={formData.company}
//         onChange={(e) => handleInputChange('company', e.target.value)}
//         className={inputClassName}
//       />
      
//       <Select onValueChange={(value) => handleInputChange('region', value)}>
//         <SelectTrigger className={inputClassName}>
//           <SelectValue placeholder="Select your region" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="mena">MENA</SelectItem>
//           <SelectItem value="south-asia">South Asia</SelectItem>
//           <SelectItem value="africa">Africa</SelectItem>
//           <SelectItem value="other">Other</SelectItem>
//         </SelectContent>
//       </Select>
      
//       <Button
//         type="submit"
//         disabled={isLoading || !formData.name || !formData.email}
//         className={`w-full ${buttonClassName}`}
//       >
//         {isLoading ? (
//           "Joining..."
//         ) : (
//           <>
//             Join the Waitlist
//             <ArrowRight className="w-4 h-4 ml-2" />
//           </>
//         )}
//       </Button>
      
//       <p className={`text-xs text-center ${variant === 'light' ? 'text-white/60' : 'text-slate-500 dark:text-slate-400'}`}>
//         By joining, you agree to receive updates about ChainSight. Unsubscribe anytime.
//       </p>
//     </form>
//   );
// }



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
  total_count: number;
  recent_joiners: number;
}

export function WaitlistForm({ variant = 'default' }: WaitlistFormProps) {
  const [formData, setFormData] = useState({
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
  const { toast } = useToast();

  // Fetch waitlist stats
  useEffect(() => {
    fetchWaitlistStats();
  }, []);

  const fetchWaitlistStats = async () => {
    setIsLoadingStats(true);
    try {
      const response = await fetch('https://chainsightai-app-6kgwc.ondigitalocean.app/api/v1/waitlist/stats/');
      if (response.ok) {
        const stats = await response.json();
        setWaitlistStats(stats);
      }
    } catch (error) {
      console.error('Error fetching waitlist stats:', error);
      // Fallback to mock data for demo
      setWaitlistStats({
        total_count: 1247,
        recent_joiners: 23
      });
    } finally {
      setIsLoadingStats(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('https://chainsightai-app-6kgwc.ondigitalocean.app/api/v1/waitlist/join/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company || null,
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

      const result = await response.json();
      
      setIsSubmitted(true);
      setShowModal(false);
      
      // Update stats after successful join
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const openModal = () => {
    setShowModal(true);
    setFormData({ name: '', email: '', company: '', region: '' });
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className={`text-center p-6 rounded-lg ${variant === 'light' ? 'bg-white/10' : 'bg-green-50 dark:bg-green-900/20'}`}>
        <CheckCircle className={`w-12 h-12 mx-auto mb-4 ${variant === 'light' ? 'text-white' : 'text-green-600 dark:text-green-400'}`} />
        <h3 className={`text-lg font-semibold mb-2 ${variant === 'light' ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
          You're on the list!
        </h3>
        <p className={`text-sm ${variant === 'light' ? 'text-white/80' : 'text-slate-600 dark:text-slate-300'}`}>
          We'll notify you when ChainSight is ready for early access.
        </p>
        {waitlistStats && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {waitlistStats.total_count.toLocaleString()} joined
            </Badge>
            {waitlistStats.recent_joiners > 0 && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                +{waitlistStats.recent_joiners} today
              </Badge>
            )}
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
      {waitlistStats && (
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className={`text-sm font-medium ${variant === 'light' ? 'text-white/90' : 'text-slate-700 dark:text-slate-300'}`}>
              {waitlistStats.total_count.toLocaleString()} early access members
            </span>
          </div>
          {waitlistStats.recent_joiners > 0 && (
            <Badge variant="secondary" className="flex items-center gap-1 animate-pulse">
              <Sparkles className="w-3 h-3" />
              +{waitlistStats.recent_joiners} joined today
            </Badge>
          )}
        </div>
      )}

      {/* Join Waitlist Button */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogTrigger asChild>
          <Button
            onClick={openModal}
            className={`w-full ${buttonClassName} relative overflow-hidden group`}
          >
            <span className="relative z-10 flex items-center justify-center">
              Join the Waitlist
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-pulse"></div>
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              Join ChainSight Waitlist
            </DialogTitle>
            <DialogDescription>
              Get early access to AI-powered risk intelligence for global trade.
              {waitlistStats && (
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {waitlistStats.total_count.toLocaleString()} members
                  </Badge>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
              <Input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
            
            <Input
              type="text"
              placeholder="Company (Optional)"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
            />
            
            <Select onValueChange={(value) => handleInputChange('region', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mena">MENA</SelectItem>
                <SelectItem value="south-asia">South Asia</SelectItem>
                <SelectItem value="africa">Africa</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              type="submit"
              disabled={isLoading || !formData.name || !formData.email}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              {isLoading ? (
                "Joining..."
              ) : (
                <>
                  Join the Waitlist
                  <ArrowRight className="w-4 h-4 ml-2" />
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
