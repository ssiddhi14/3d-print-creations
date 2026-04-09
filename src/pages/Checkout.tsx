import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '@/context/StoreContext';
import { useAuth } from '@/context/AuthContext';
import { CustomerInfo, Order } from '@/lib/types';
import { toast } from 'sonner';
import { LogIn } from 'lucide-react';

export default function Checkout() {
  const { cart, getCartSubtotal, getCartDiscount, getCartGST, getCartTotal, couponApplied, placeOrder, clearCart } = useStore();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState<CustomerInfo>({
    name: user?.name || '', email: user?.email || '', phone: '', address: '', city: '', state: '', pincode: ''
  });

  const handleChange = (field: keyof CustomerInfo, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.address || !form.city || !form.state || !form.pincode) {
      toast.error('Please fill in all fields.');
      return;
    }

    const order: Order = {
      id: 'ORD-' + Date.now().toString(36).toUpperCase(),
      items: [...cart],
      customer: form,
      subtotal: getCartSubtotal(),
      discount: getCartDiscount(),
      gst: Math.round(getCartGST()),
      total: Math.round(getCartTotal()),
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      couponCode: couponApplied ? 'PRAGYA20' : undefined,
    };

    placeOrder(order);
    clearCart();
    toast.success('Order placed successfully!');
    navigate('/orders');
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center px-4 py-16 text-center">
        <LogIn className="mb-4 h-12 w-12 text-muted-foreground" />
        <h2 className="font-display text-2xl font-bold">Please login to place your order</h2>
        <p className="mt-2 text-muted-foreground">You need to be signed in to proceed with checkout.</p>
        <Link to="/auth" state={{ from: '/checkout' }}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-display font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-95">
          Sign In / Sign Up
        </Link>
      </div>
    );
  }

  const fields: { key: keyof CustomerInfo; label: string; type?: string; placeholder: string }[] = [
    { key: 'name', label: 'Full Name', placeholder: 'John Doe' },
    { key: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com' },
    { key: 'phone', label: 'Phone', type: 'tel', placeholder: '+91 98765 43210' },
    { key: 'address', label: 'Address', placeholder: '123 Main Street' },
    { key: 'city', label: 'City', placeholder: 'Mumbai' },
    { key: 'state', label: 'State', placeholder: 'Maharashtra' },
    { key: 'pincode', label: 'Pincode', placeholder: '400001' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold">Checkout</h1>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-8 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-display text-lg font-semibold">Shipping Information</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {fields.map(f => (
                <div key={f.key} className={f.key === 'address' ? 'sm:col-span-2' : ''}>
                  <label className="mb-1 block text-sm font-medium">{f.label}</label>
                  <input
                    type={f.type || 'text'}
                    value={form[f.key]}
                    onChange={e => handleChange(f.key, e.target.value)}
                    placeholder={f.placeholder}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-display text-lg font-semibold">Order Summary</h3>
          <div className="mt-4 space-y-3">
            {cart.map(item => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.product.name} × {item.quantity}</span>
                <span>₹{(item.product.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{getCartSubtotal().toLocaleString()}</span></div>
            {couponApplied && <div className="flex justify-between text-success"><span>Discount</span><span>-₹{getCartDiscount().toLocaleString()}</span></div>}
            <div className="flex justify-between"><span className="text-muted-foreground">GST (18%)</span><span>₹{Math.round(getCartGST()).toLocaleString()}</span></div>
            <div className="flex justify-between border-t border-border pt-3 text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">₹{Math.round(getCartTotal()).toLocaleString()}</span>
            </div>
          </div>
          <button type="submit"
            className="mt-6 w-full rounded-xl bg-primary px-6 py-3 font-display font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-95">
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}
