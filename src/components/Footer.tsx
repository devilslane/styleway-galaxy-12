
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Footer: React.FC = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Subscribed!",
      description: "You've been added to our newsletter.",
    });
    // Reset input
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  return (
    <footer className="bg-brand-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">STYLISH</h2>
            <p className="text-gray-300">
              Premium quality clothing for the modern individual, combining style, comfort, and sustainability.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-brand-accent" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="hover:text-brand-accent" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" className="hover:text-brand-accent" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com" className="hover:text-brand-accent" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Shopping Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/products/men" className="text-gray-300 hover:text-white">Men's Collection</Link></li>
              <li><Link to="/products/women" className="text-gray-300 hover:text-white">Women's Collection</Link></li>
              <li><Link to="/products/new" className="text-gray-300 hover:text-white">New Arrivals</Link></li>
              <li><Link to="/products/sale" className="text-gray-300 hover:text-white">Sale</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-white">All Products</Link></li>
            </ul>
          </div>
          
          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
              <li><Link to="/careers" className="text-gray-300 hover:text-white">Careers</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-brand-dark border-gray-700 text-white placeholder:text-gray-400"
                required
              />
              <Button type="submit" className="w-full bg-white text-brand-navy hover:bg-brand-cream">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} STYLISH. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-gray-300 text-sm flex items-center">
              <Mail size={16} className="mr-2" />
              support@stylish.com
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
