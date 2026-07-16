export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  shortDescription: string;
  fullDescription: string;
  stock: number;
  featured: boolean;
  trending: boolean;
  specifications: Record<string, string>;
  colors?: string[];
  warranty: string;
}

export interface CartItem {
  product: Product;
  qty: number;
}

export interface Category {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export interface Testimonial {
  name: string;
  role: string;
  rating: number;
  text: string;
  avatarSeed: string;
}

export interface FilterState {
  categories: Set<string>;
  brands: Set<string>;
  maxPrice: number;
  minRating: number;
}