
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Menu, X, Search, User, LogOut } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CartItem from './CartItem';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items, totalItems, totalPrice } = useCart();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsMenuOpen(false);
    navigate('/payment-options');
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-brand-navy">STYLISH</Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="nav-link font-medium">Home</Link>
            <Link to="/products/men" className="nav-link font-medium">Men</Link>
            <Link to="/products/women" className="nav-link font-medium">Women</Link>
            <Link to="/products" className="nav-link font-medium">Shop All</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuLabel className="font-normal text-sm text-gray-500">{user.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="text-red-500 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" asChild>
                <Link to="/sign-in">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            )}
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingBag className="h-5 w-5" />
                  {totalItems > 0 && (
                    <Badge variant="secondary" className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-brand-navy text-white text-xs">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Your Cart</SheetTitle>
                  <SheetDescription>
                    {totalItems === 0 ? "Your cart is empty" : `You have ${totalItems} items in your cart`}
                  </SheetDescription>
                </SheetHeader>
                
                <div className="py-6 space-y-4 overflow-y-auto max-h-[60vh]">
                  {items.map((item) => (
                    <CartItem key={`${item.product.id}-${item.size}-${item.color}`} item={item} />
                  ))}
                </div>
                
                {totalItems > 0 && (
                  <SheetFooter>
                    <div className="w-full space-y-4">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total:</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                      <SheetClose asChild>
                        <Button 
                          className="w-full btn-primary"
                          onClick={handleCheckout}
                        >
                          Proceed to Payment
                        </Button>
                      </SheetClose>
                    </div>
                  </SheetFooter>
                )}
              </SheetContent>
            </Sheet>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-white z-50 flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <Link to="/" className="text-2xl font-bold text-brand-navy">STYLISH</Link>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex flex-col p-4 space-y-4">
              <Link to="/" className="text-lg nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/products/men" className="text-lg nav-link" onClick={() => setIsMenuOpen(false)}>Men</Link>
              <Link to="/products/women" className="text-lg nav-link" onClick={() => setIsMenuOpen(false)}>Women</Link>
              <Link to="/products" className="text-lg nav-link" onClick={() => setIsMenuOpen(false)}>Shop All</Link>
              
              {user ? (
                <>
                  <Link to="/profile" className="text-lg nav-link" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                  <Link to="/orders" className="text-lg nav-link" onClick={() => setIsMenuOpen(false)}>My Orders</Link>
                  <button 
                    className="text-lg text-left text-red-500" 
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <Link to="/sign-in" className="text-lg nav-link" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
