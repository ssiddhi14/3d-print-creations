import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight, Tag } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Cart() {
  const { cart, updateCartQty, removeFromCart, couponApplied, applyCoupon, getCartSubtotal, getCartDiscount, getCartGST, getCartTotal } = useStore();
  const [couponInput, setCouponInput] = useState('');

  const handleCoupon = () => {
    if (applyCoupon(couponInput)) {
      toast.success('Coupon applied! 20% discount added.');
    } else {
      toast.error('Invalid coupon code.');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-6xl">🛒</p>
        <h2 className="mt-4 font-display text-2xl font-bold">Your cart is empty</h2>
        <p className="mt-2 text-muted-foreground">Add some products to get started</p>
        <Link to="/products" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-display font-semibold text-primary-foreground transition-all hover:opacity-90">
          Shop Now <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold">Shopping Cart</h1>
      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.product.id} className="flex gap-4 rounded-xl border border-border bg-card p-4">
              <img src={item.product.images[0]} alt={item.product.name} className="h-24 w-24 rounded-lg object-cover" />
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link to={`/product/${item.product.id}`} className="font-display font-semibold hover:text-primary">{item.product.name}</Link>
                  <p className="text-sm text-muted-foreground">₹{item.product.price.toLocaleString()} each</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-border">
                    <button onClick={() => updateCartQty(item.product.id, item.quantity - 1)} className="px-2 py-1 text-muted-foreground hover:text-foreground"><Minus className="h-3 w-3" /></button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateCartQty(item.product.id, item.quantity + 1)} className="px-2 py-1 text-muted-foreground hover:text-foreground"><Plus className="h-3 w-3" /></button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-primary">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                    <button onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-display text-lg font-semibold">Order Summary</h3>

          {/* Coupon */}
          <div className="mt-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={couponInput}
                  onChange={e => setCouponInput(e.target.value)}
                  placeholder="Coupon code"
                  disabled={couponApplied}
                  className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-3 text-sm outline-none focus:border-primary disabled:opacity-50"
                />
              </div>
              <button onClick={handleCoupon} disabled={couponApplied}
                className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-all hover:bg-primary hover:text-primary-foreground disabled:opacity-50">
                Apply
              </button>
            </div>
            {couponApplied && <p className="mt-2 text-xs text-success">✓ PRAGYA20 applied — 20% off!</p>}
          </div>

          <div className="mt-6 space-y-3 border-t border-border pt-4 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{getCartSubtotal().toLocaleString()}</span></div>
            {couponApplied && <div className="flex justify-between text-success"><span>Discount (20%)</span><span>-₹{getCartDiscount().toLocaleString()}</span></div>}
            <div className="flex justify-between"><span className="text-muted-foreground">GST (18%)</span><span>₹{Math.round(getCartGST()).toLocaleString()}</span></div>
            <div className="flex justify-between border-t border-border pt-3 text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">₹{Math.round(getCartTotal()).toLocaleString()}</span>
            </div>
          </div>

          <Link to="/checkout" className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-display font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-95">
            Proceed to Checkout <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
