
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <div className="relative h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070" 
          alt="Hero Image" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      <div className="relative container mx-auto h-full flex items-center">
        <div className="max-w-lg text-white p-6">
          <h1 className="text-5xl font-bold mb-6 leading-tight">Discover Your Style Journey</h1>
          <p className="text-xl mb-8">Explore our latest collection designed for the modern individual who appreciates quality and style.</p>
          <div className="flex space-x-4">
            <Button asChild className="bg-white text-brand-navy hover:bg-brand-cream border-0">
              <Link to="/products">Shop Now</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/20">
              <Link to="/products">Explore Collection</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
