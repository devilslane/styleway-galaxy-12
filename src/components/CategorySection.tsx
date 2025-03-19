
import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '@/types';
import { Card, CardContent } from '@/components/ui/card';

interface CategorySectionProps {
  categories: Category[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
  return (
    <section className="py-16 bg-brand-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-navy mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Discover our extensive collection of quality apparel for every occasion and style preference.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link to={`/products/${category.id}`} key={category.id}>
              <Card className="overflow-hidden h-full group">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-bold">{category.name}</h3>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
