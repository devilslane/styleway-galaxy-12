
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { Card, CardContent } from '@/components/ui/card';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`}>
      <Card className="product-card h-full group transition-all duration-300 hover:scale-[1.02]">
        <div className="aspect-[3/4] overflow-hidden relative">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.featured && (
            <div className="absolute top-2 left-2 bg-brand-navy text-white text-xs px-2 py-1 rounded">
              Featured
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-lg">{product.name}</h3>
          <div className="flex justify-between items-center mt-1">
            <p className="text-brand-navy font-bold">${product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500">{product.gender === 'unisex' ? 'Unisex' : product.gender === 'men' ? 'Men' : 'Women'}</p>
          </div>
          <div className="mt-2 flex space-x-1">
            {product.colors.slice(0, 3).map((color) => (
              <div 
                key={color} 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: color === 'White' ? '#ffffff' : 
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
                       border: color === 'White' ? '1px solid #e5e7eb' : 'none' }}
              ></div>
            ))}
            {product.colors.length > 3 && (
              <div className="text-xs text-gray-500 ml-1">+{product.colors.length - 3}</div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
