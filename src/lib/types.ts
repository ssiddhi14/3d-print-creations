export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'figurines' | 'utility' | 'decor' | 'custom' | 'keychains';
  description: string;
  images: string[];
  stock: number;
  featured: boolean;
  reviews: Review[];
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: CustomerInfo;
  subtotal: number;
  discount: number;
  gst: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
  couponCode?: string;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface CustomRequest {
  id: string;
  name: string;
  email: string;
  description: string;
  fileName?: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  date: string;
}
