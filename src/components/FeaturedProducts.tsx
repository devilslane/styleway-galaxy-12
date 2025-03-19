
import React, { useState, useEffect } from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import { Badge } from '@/components/ui/badge';

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  // Filter only featured products
  const allFeaturedProducts = products.filter(product => product.featured);
  
  // Get unique categories
  const categories = ['All', ...new Set(allFeaturedProducts.map(product => product.category))];
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [displayedProducts, setDisplayedProducts] = useState(allFeaturedProducts);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate loading delay for category change
    setTimeout(() => {
      if (selectedCategory === 'All') {
        setDisplayedProducts(allFeaturedProducts);
      } else {
        setDisplayedProducts(
          allFeaturedProducts.filter(product => product.category === selectedCategory)
        );
      }
      setIsLoading(false);
    }, 300);
  }, [selectedCategory, allFeaturedProducts]);
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-navy mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Our most popular pieces selected for their exceptional quality and style.</p>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(category => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`text-sm py-1 px-3 cursor-pointer hover:bg-brand-navy/10 capitalize ${
                selectedCategory === category ? 'bg-brand-navy hover:bg-brand-navy/90' : ''
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
        
        <div className="min-h-[400px]">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-gray-200 rounded-lg h-[350px]"></div>
              ))}
            </div>
          ) : (
            <>
              {displayedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {displayedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No products found in this category.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
