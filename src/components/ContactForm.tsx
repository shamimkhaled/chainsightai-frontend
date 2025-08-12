
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Contact form submission:', formData);
    
    toast({
      title: "Message Sent!",
      description: "We'll get back to you soon.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    
    setIsLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-sm">
      <div className="space-y-1">
        <Label htmlFor="name" className="text-white text-sm">
          Name
        </Label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/70 h-8 text-sm"
          placeholder="Your name"
        />
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="email" className="text-white text-sm">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/70 h-8 text-sm"
          placeholder="your@email.com"
        />
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="message" className="text-white text-sm">
          Message
        </Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          required
          rows={2}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/70 text-sm resize-none"
          placeholder="Your message..."
        />
      </div>
      
      <Button
        type="submit"
        disabled={isLoading || !formData.name || !formData.email || !formData.message}
        className="w-full bg-white text-blue-600 hover:bg-white/90 font-medium h-8 text-sm"
      >
        {isLoading ? (
          "Sending..."
        ) : (
          <>
            Send Message
            <Send className="w-3 h-3 ml-1" />
          </>
        )}
      </Button>
    </form>
  );
}
