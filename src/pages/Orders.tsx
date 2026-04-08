import { useStore } from '@/context/StoreContext';
import { Package } from 'lucide-react';

const statusColors: Record<string, string> = {
  pending: 'bg-warning/10 text-warning',
  processing: 'bg-primary/10 text-primary',
  shipped: 'bg-accent/10 text-accent',
  delivered: 'bg-success/10 text-success',
};

export default function Orders() {
  const { orders } = useStore();

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Package className="mx-auto h-16 w-16 text-muted-foreground" />
        <h2 className="mt-4 font-display text-2xl font-bold">No orders yet</h2>
        <p className="mt-2 text-muted-foreground">Your order history will appear here</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold">Your Orders</h1>
      <div className="mt-6 space-y-4">
        {orders.map(order => (
          <div key={order.id} className="rounded-xl border border-border bg-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="font-display font-semibold">{order.id}</span>
                <span className="ml-3 text-sm text-muted-foreground">{order.date}</span>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusColors[order.status]}`}>
                {order.status}
              </span>
            </div>
            <div className="mt-3 space-y-1 text-sm text-muted-foreground">
              {order.items.map(item => (
                <div key={item.product.id} className="flex justify-between">
                  <span>{item.product.name} × {item.quantity}</span>
                  <span>₹{(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-between border-t border-border pt-3 font-semibold">
              <span>Total</span>
              <span className="text-primary">₹{order.total.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
