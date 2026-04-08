import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Order, CustomRequest } from '@/lib/types';
import { defaultProducts, COUPON_CODE, COUPON_DISCOUNT, GST_RATE } from '@/lib/data';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  customRequests: CustomRequest[];
  darkMode: boolean;
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  applyCoupon: (code: string) => boolean;
  couponApplied: boolean;
  getCartSubtotal: () => number;
  getCartDiscount: () => number;
  getCartGST: () => number;
  getCartTotal: () => number;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  placeOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  addCustomRequest: (req: CustomRequest) => void;
  toggleDarkMode: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => loadFromStorage('products', defaultProducts));
  const [cart, setCart] = useState<CartItem[]>(() => loadFromStorage('cart', []));
  const [wishlist, setWishlist] = useState<string[]>(() => loadFromStorage('wishlist', []));
  const [orders, setOrders] = useState<Order[]>(() => loadFromStorage('orders', []));
  const [customRequests, setCustomRequests] = useState<CustomRequest[]>(() => loadFromStorage('customRequests', []));
  const [couponApplied, setCouponApplied] = useState(false);
  const [darkMode, setDarkMode] = useState(() => loadFromStorage('darkMode', true));

  useEffect(() => { localStorage.setItem('products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem('orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('customRequests', JSON.stringify(customRequests)); }, [customRequests]);
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, []);

  const addToCart = (product: Product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQty = (productId: string, qty: number) => {
    if (qty <= 0) return removeFromCart(productId);
    setCart(prev => prev.map(item =>
      item.product.id === productId ? { ...item, quantity: qty } : item
    ));
  };

  const clearCart = () => { setCart([]); setCouponApplied(false); };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyCoupon = (code: string) => {
    if (code.toUpperCase() === COUPON_CODE) {
      setCouponApplied(true);
      return true;
    }
    return false;
  };

  const getCartSubtotal = () => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const getCartDiscount = () => couponApplied ? getCartSubtotal() * COUPON_DISCOUNT : 0;
  const getCartGST = () => (getCartSubtotal() - getCartDiscount()) * GST_RATE;
  const getCartTotal = () => getCartSubtotal() - getCartDiscount() + getCartGST();

  const addProduct = (product: Product) => setProducts(prev => [...prev, product]);
  const updateProduct = (product: Product) => setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  const deleteProduct = (productId: string) => setProducts(prev => prev.filter(p => p.id !== productId));

  const placeOrder = (order: Order) => setOrders(prev => [...prev, order]);
  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const addCustomRequest = (req: CustomRequest) => setCustomRequests(prev => [...prev, req]);
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <StoreContext.Provider value={{
      products, cart, wishlist, orders, customRequests, darkMode,
      addToCart, removeFromCart, updateCartQty, clearCart,
      toggleWishlist, isInWishlist,
      applyCoupon, couponApplied,
      getCartSubtotal, getCartDiscount, getCartGST, getCartTotal,
      addProduct, updateProduct, deleteProduct,
      placeOrder, updateOrderStatus,
      addCustomRequest, toggleDarkMode,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
