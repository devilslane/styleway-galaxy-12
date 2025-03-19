
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '@/data/products';
import { 
  Select, 
  SelectContent, 
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Heart } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  
  // Get related products (same category)
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== id)
    .slice(0, 4);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/products')}>
          Continue Shopping
        </Button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You need to select a size before adding to cart",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedColor) {
      toast({
        title: "Please select a color",
        description: "You need to select a color before adding to cart",
        variant: "destructive",
      });
      return;
    }
    
    addToCart(product, quantity, selectedSize, selectedColor);
  };
  
  const handleAddToWishlist = () => {
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist`,
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <button 
                key={index} 
                className={`w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 ${
                  selectedImage === index ? 'border-brand-navy' : 'border-transparent'
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img 
                  src={image} 
                  alt={`${product.name} - View ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-brand-navy mb-2">{product.name}</h1>
          
          <div className="text-2xl font-semibold text-brand-navy mb-6">
            ${product.price.toFixed(2)}
          </div>
          
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Color: {selectedColor}</h3>
            <div className="flex space-x-2">
              {product.colors.map(color => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full transition-all ${
                    selectedColor === color 
                      ? 'ring-2 ring-brand-navy ring-offset-2' 
                      : 'hover:scale-110'
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
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select ${color} color`}
                ></button>
              ))}
            </div>
          </div>
          
          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Size</h3>
            <Select
              value={selectedSize}
              onValueChange={setSelectedSize}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a size" />
              </SelectTrigger>
              <SelectContent>
                {product.sizes.map(size => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Quantity Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Quantity</h3>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-10 w-10 rounded-l-md rounded-r-none"
              >
                -
              </Button>
              <div className="h-10 w-14 flex items-center justify-center border-y border-gray-300">
                {quantity}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                className="h-10 w-10 rounded-r-md rounded-l-none"
              >
                +
              </Button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button 
              className="flex-1 bg-brand-navy hover:bg-brand-dark"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
            <Button 
              variant="outline" 
              className="border-brand-navy text-brand-navy hover:bg-brand-light"
              onClick={handleAddToWishlist}
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Additional Info */}
          <div className="mt-8 border-t pt-6">
            <div className="flex items-center">
              <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                In Stock
              </div>
              <span className="mx-2">•</span>
              <span className="text-sm text-gray-500">
                Category: {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
