
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  gender: 'men' | 'women' | 'unisex';
  images: string[];
  sizes: string[];
  colors: string[];
  inStock: boolean;
  featured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}
