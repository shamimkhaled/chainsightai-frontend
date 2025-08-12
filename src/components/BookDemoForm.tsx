import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, CheckCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BookDemoFormProps {
  variant?: 'default' | 'light';
}

export function BookDemoForm({ variant = 'default' }: BookDemoFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    jobTitle: '',
    preferredTime: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Demo booking submission:', formData);
    
    setIsSubmitted(true);
    setIsLoading(false);
    
    toast({
      title: "Demo Scheduled!",
      description: "We'll contact you within 24 hours to confirm your demo time.",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <div className={`text-center p-6 rounded-lg ${variant === 'light' ? 'bg-white/10' : 'bg-green-50 dark:bg-green-900/20'}`}>
        <CheckCircle className={`w-12 h-12 mx-auto mb-4 ${variant === 'light' ? 'text-white' : 'text-green-600 dark:text-green-400'}`} />
        <h3 className={`text-lg font-semibold mb-2 ${variant === 'light' ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
          Demo Request Received!
        </h3>
        <p className={`text-sm ${variant === 'light' ? 'text-white/80' : 'text-slate-600 dark:text-slate-300'}`}>
          Our team will reach out within 24 hours to schedule your personalized demo.
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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          type="text"
          placeholder="Company"
          value={formData.company}
          onChange={(e) => handleInputChange('company', e.target.value)}
          required
          className={inputClassName}
        />
        <Input
          type="text"
          placeholder="Job Title"
          value={formData.jobTitle}
          onChange={(e) => handleInputChange('jobTitle', e.target.value)}
          className={inputClassName}
        />
      </div>
      
      <Select onValueChange={(value) => handleInputChange('preferredTime', value)}>
        <SelectTrigger className={inputClassName}>
          <SelectValue placeholder="Preferred demo time" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
          <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
          <SelectItem value="evening">Evening (5 PM - 8 PM)</SelectItem>
          <SelectItem value="flexible">I'm flexible</SelectItem>
        </SelectContent>
      </Select>
      
      <Textarea
        placeholder="Tell us about your use case or specific questions (optional)"
        value={formData.message}
        onChange={(e) => handleInputChange('message', e.target.value)}
        className={`min-h-[80px] ${inputClassName}`}
      />
      
      <Button
        type="submit"
        disabled={isLoading || !formData.name || !formData.email || !formData.company}
        className={`w-full ${buttonClassName}`}
      >
        {isLoading ? (
          "Scheduling..."
        ) : (
          <>
            <Calendar className="w-4 h-4 mr-2" />
            Book Demo
          </>
        )}
      </Button>
      
      <p className={`text-xs text-center ${variant === 'light' ? 'text-white/60' : 'text-slate-500 dark:text-slate-400'}`}>
        <Clock className="w-3 h-3 inline mr-1" />
        30-minute personalized demo • No commitment required
      </p>
    </form>
  );
}