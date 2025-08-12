
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface WaitlistFormProps {
  variant?: 'default' | 'light';
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
  const { toast } = useToast();

  console.log('WaitlistForm rendering with formData:', formData);
  console.log('Form variant:', variant);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Save to database
      const { error } = await supabase
        .from('waitlist')
        .insert({
          name: formData.name,
          email: formData.email,
          company: formData.company || null,
          region: formData.region || null,
        });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Already on the waitlist!",
            description: "This email is already registered for early access.",
            variant: "destructive",
          });
          return;
        } else {
          throw error;
        }
      }

      // Send confirmation email
      try {
        const { error: emailError } = await supabase.functions.invoke('send-waitlist-confirmation', {
          body: {
            name: formData.name,
            email: formData.email,
            company: formData.company,
            region: formData.region,
          },
        });

        if (emailError) {
          console.error('Email sending failed:', emailError);
          // Don't block the success flow if email fails
        }
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Don't block the success flow if email fails
      }

      setIsSubmitted(true);
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
    console.log(`Updating ${field} to:`, value);
    setFormData(prev => ({ ...prev, [field]: value }));
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
      </div>
    );
  }

  const inputClassName = variant === 'light' 
    ? 'bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40'
    : '';

  const buttonClassName = variant === 'light'
    ? 'bg-white text-blue-600 hover:bg-white/90'
    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white';

  console.log('Rendering form with inputClassName:', inputClassName);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          required
          className={inputClassName}
        />
        <Input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          required
          className={inputClassName}
        />
      </div>
      
      <Input
        type="text"
        placeholder="Company (Optional)"
        value={formData.company}
        onChange={(e) => handleInputChange('company', e.target.value)}
        className={inputClassName}
      />
      
      <Select onValueChange={(value) => handleInputChange('region', value)}>
        <SelectTrigger className={inputClassName}>
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
        className={`w-full ${buttonClassName}`}
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
      
      <p className={`text-xs text-center ${variant === 'light' ? 'text-white/60' : 'text-slate-500 dark:text-slate-400'}`}>
        By joining, you agree to receive updates about ChainSight. Unsubscribe anytime.
      </p>
    </form>
  );
}
