
import React, { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import CategorySection from '@/components/CategorySection';
import NewsletterSignup from '@/components/NewsletterSignup';
import { categories } from '@/data/products';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  
  useEffect(() => {
    // Show welcome dialog after a short delay
    const timer = setTimeout(() => {
      // Check if user hasn't seen the welcome message before
      const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
      if (!hasSeenWelcome) {
        setShowWelcome(true);
        localStorage.setItem('hasSeenWelcome', 'true');
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategorySection categories={categories} />
      
      {/* Promotional Banner */}
      <section className="py-12 bg-brand-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Free Shipping on Orders Over $100</h2>
          <p className="text-xl mb-6">Limited time offer. Don't miss out!</p>
          <div className="inline-block border-b-2 border-white pb-1 hover:pb-2 transition-all">
            <a href="/products" className="text-lg font-medium">Shop Now</a>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <NewsletterSignup />
        </div>
      </section>
      
      {/* Welcome Dialog */}
      <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome to Our Store!</DialogTitle>
            <DialogDescription>
              Discover our latest collections and exclusive offers.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4">
            <p className="mb-4">
              Use promo code <span className="font-bold text-brand-navy">WELCOME10</span> for 10% off your first order.
            </p>
            <Button 
              className="w-full bg-brand-navy" 
              onClick={() => setShowWelcome(false)}
            >
              Start Shopping
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
