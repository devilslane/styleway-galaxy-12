
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
    }, 1500);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-auto">
      <h3 className="text-2xl font-bold text-brand-navy mb-4 text-center">
        {isSubscribed ? 'Thanks for subscribing!' : 'Join Our Newsletter'}
      </h3>
      
      {!isSubscribed ? (
        <>
          <p className="text-gray-600 mb-6 text-center">
            Stay updated with the latest trends and exclusive offers.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              disabled={isSubmitting}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-brand-navy hover:bg-brand-navy/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
        </>
      ) : (
        <div className="text-center animate-fade-in">
          <p className="text-gray-600 mb-4">
            We've sent a confirmation to your email.
          </p>
          <Button
            variant="outline"
            onClick={() => setIsSubscribed(false)}
            className="border-brand-navy text-brand-navy"
          >
            Subscribe another email
          </Button>
        </div>
      )}
    </div>
  );
};

export default NewsletterSignup;
