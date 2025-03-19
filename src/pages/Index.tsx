
import React from 'react';
import HeroSection from '@/components/HeroSection';
import CategorySection from '@/components/CategorySection';
import FeaturedProducts from '@/components/FeaturedProducts';
import { categories, products } from '@/data/products';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedProducts products={products} />
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
    </div>
  );
};

export default Index;
