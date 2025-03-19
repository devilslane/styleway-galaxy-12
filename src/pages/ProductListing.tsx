
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CheckIcon, SlidersHorizontal, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Product } from '@/types';

const ProductListing = () => {
  const { category } = useParams<{ category?: string }>();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('featured');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  
  // Get unique categories, colors, and sizes
  const allCategories = Array.from(new Set(products.map(p => p.category)));
  const allColors = Array.from(new Set(products.flatMap(p => p.colors)));
  const allSizes = Array.from(new Set(products.flatMap(p => p.sizes)));
  
  // Filter and sort products
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter from URL parameter
    if (category) {
      if (category === 'men' || category === 'women') {
        result = result.filter(p => p.gender === category);
      } else {
        result = result.filter(p => p.category === category);
      }
    }
    
    // Apply color filter
    if (selectedColors.length > 0) {
      result = result.filter(p => 
        selectedColors.some(color => p.colors.includes(color))
      );
    }
    
    // Apply size filter
    if (selectedSizes.length > 0) {
      result = result.filter(p => 
        selectedSizes.some(size => p.sizes.includes(size))
      );
    }
    
    // Apply category filter (from checkbox selection)
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }
    
    // Apply price filter
    result = result.filter(p => 
      p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortOrder) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'featured':
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      default:
        break;
    }
    
    setFilteredProducts(result);
  }, [category, sortOrder, selectedColors, selectedSizes, selectedCategories, priceRange]);
  
  const toggleColorFilter = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };
  
  const toggleSizeFilter = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };
  
  const toggleCategoryFilter = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) 
        ? prev.filter(c => c !== cat)
        : [...prev, cat]
    );
  };
  
  const clearAllFilters = () => {
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedCategories([]);
    setPriceRange([0, 200]);
  };
  
  const getTitleFromCategory = () => {
    if (!category) return 'All Products';
    if (category === 'men') return "Men's Collection";
    if (category === 'women') return "Women's Collection";
    return category.charAt(0).toUpperCase() + category.slice(1);
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{getTitleFromCategory()}</h1>
      
      {/* Mobile filters button */}
      <div className="lg:hidden mb-6 flex justify-between items-center">
        <Button 
          variant="outline" 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center"
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
        </Button>
        
        <Select
          value={sortOrder}
          onValueChange={setSortOrder}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="name-asc">Name: A to Z</SelectItem>
            <SelectItem value="name-desc">Name: Z to A</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex flex-col lg:flex-row">
        {/* Filters sidebar */}
        <div className={`
          lg:w-1/4 lg:pr-8 lg:block
          ${showFilters ? 'fixed inset-0 z-50 bg-white p-4 overflow-y-auto' : 'hidden'}
        `}>
          {showFilters && (
            <div className="flex justify-between items-center mb-4 lg:hidden">
              <h2 className="text-xl font-bold">Filters</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          )}
          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">Filters</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-sm text-gray-500"
              onClick={clearAllFilters}
            >
              Clear all
            </Button>
          </div>
          
          <Accordion type="multiple" defaultValue={['categories', 'colors', 'sizes']} className="space-y-4">
            {/* Categories */}
            <AccordionItem value="categories" className="border-b">
              <AccordionTrigger className="text-md font-medium">Categories</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {allCategories.map(cat => (
                    <div key={cat} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`category-${cat}`} 
                        checked={selectedCategories.includes(cat)} 
                        onCheckedChange={() => toggleCategoryFilter(cat)}
                      />
                      <label 
                        htmlFor={`category-${cat}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                      >
                        {cat}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Colors */}
            <AccordionItem value="colors" className="border-b">
              <AccordionTrigger className="text-md font-medium">Colors</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-2">
                  {allColors.map(color => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        selectedColors.includes(color) 
                          ? 'ring-2 ring-brand-navy ring-offset-2' 
                          : ''
                      }`}
                      style={{ 
                        backgroundColor: color === 'White' ? '#ffffff' : 
                                        color === 'Black' ? '#000000' : 
                                        color === 'Gray' ? '#888888' : 
                                        color === 'Blue' ? '#3b82f6' : 
                                        color === 'Navy' ? '#1e3a8a' : 
                                        color === 'Brown' ? '#92400e' :
                                        color === 'Light Blue' ? '#93c5fd' :
                                        color === 'Dark Blue' ? '#1e40af' :
                                        color === 'Burgundy' ? '#9f1239' :
                                        color === 'Floral Blue' ? '#6366f1' :
                                        color === 'Floral Pink' ? '#ec4899' : '#cccccc',
                        border: color === 'White' ? '1px solid #e5e7eb' : 'none' 
                      }}
                      onClick={() => toggleColorFilter(color)}
                      aria-label={`Filter by ${color}`}
                    >
                      {selectedColors.includes(color) && <CheckIcon className="h-4 w-4 text-white" />}
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Sizes */}
            <AccordionItem value="sizes" className="border-b">
              <AccordionTrigger className="text-md font-medium">Sizes</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-2">
                  {allSizes.map(size => (
                    <button
                      key={size}
                      className={`min-w-[40px] h-8 px-2 rounded border ${
                        selectedSizes.includes(size)
                          ? 'bg-brand-navy text-white border-brand-navy'
                          : 'bg-white text-gray-800 border-gray-300 hover:border-brand-navy'
                      }`}
                      onClick={() => toggleSizeFilter(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          {showFilters && (
            <div className="mt-8 lg:hidden">
              <Button className="w-full" onClick={() => setShowFilters(false)}>
                Apply Filters
              </Button>
            </div>
          )}
        </div>
        
        {/* Products grid */}
        <div className="lg:w-3/4">
          {/* Desktop sorting */}
          <div className="hidden lg:flex justify-end mb-6">
            <Select
              value={sortOrder}
              onValueChange={setSortOrder}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="name-desc">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters to find what you're looking for.</p>
              <Button variant="outline" onClick={clearAllFilters}>
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
