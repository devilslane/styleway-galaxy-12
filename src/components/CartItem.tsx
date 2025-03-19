
import React from 'react';
import { CartItem as CartItemType } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Minus, Plus, X } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity, size, color } = item;

  const handleIncreaseQuantity = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };

  return (
    <div className="flex border-b pb-4">
      <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="ml-4 flex-grow">
        <div className="flex justify-between">
          <h3 className="font-medium">{product.name}</h3>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6" 
            onClick={() => removeFromCart(product.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-gray-500">
          {size} / {color}
        </p>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-6 w-6 rounded-full" 
              onClick={handleDecreaseQuantity}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="text-sm">{quantity}</span>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-6 w-6 rounded-full" 
              onClick={handleIncreaseQuantity}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <span className="font-medium">${(product.price * quantity).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
