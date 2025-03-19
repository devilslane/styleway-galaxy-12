
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, Product } from '../types';
import { toast } from '@/components/ui/use-toast';

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.items.findIndex(
        (item) => 
          item.product.id === action.payload.product.id && 
          item.size === action.payload.size && 
          item.color === action.payload.color
      );

      let newItems;

      if (existingItemIndex >= 0) {
        newItems = [...state.items];
        newItems[existingItemIndex].quantity += action.payload.quantity;
      } else {
        newItems = [...state.items, action.payload];
      }

      const totalItems = newItems.reduce((total, item) => total + item.quantity, 0);
      const totalPrice = newItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
      };
    }
    
    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter((item) => item.product.id !== action.payload);
      const totalItems = newItems.reduce((total, item) => total + item.quantity, 0);
      const totalPrice = newItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map((item) => {
        if (item.product.id === action.payload.productId) {
          return {
            ...item,
            quantity: action.payload.quantity,
          };
        }
        return item;
      });

      const totalItems = newItems.reduce((total, item) => total + item.quantity, 0);
      const totalPrice = newItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
      };
    }
    
    case 'CLEAR_CART':
      return initialState;
    
    default:
      return state;
  }
};

interface CartContextType extends CartState {
  addToCart: (product: Product, quantity: number, size: string, color: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product: Product, quantity: number, size: string, color: string) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { product, quantity, size, color },
    });
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} (${size}, ${color})`,
    });
  };

  const removeFromCart = (productId: string) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: productId,
    });
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart",
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { productId, quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
