import { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Product } from '@/lib/types';
import { Plus, Pencil, Trash2, Package, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import { categories } from '@/lib/data';

export default function Admin() {
  const { products, orders, customRequests, addProduct, updateProduct, deleteProduct, updateOrderStatus } = useStore();
  const [tab, setTab] = useState<'products' | 'orders' | 'requests'>('products');
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const emptyProduct: Product = {
    id: '', name: '', price: 0, category: 'figurines', description: '', images: [''], stock: 0, featured: false, reviews: []
  };

  const [form, setForm] = useState<Product>(emptyProduct);

  const openAdd = () => { setForm({ ...emptyProduct, id: Date.now().toString() }); setEditing(null); setShowForm(true); };
  const openEdit = (p: Product) => { setForm({ ...p }); setEditing(p); setShowForm(true); };

  const handleSave = () => {
    if (!form.name || !form.price) { toast.error('Name and price are required.'); return; }
    if (editing) {
      updateProduct(form);
      toast.success('Product updated!');
    } else {
      addProduct(form);
      toast.success('Product added!');
    }
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    toast.success('Product deleted.');
  };

  const tabs = [
    { id: 'products' as const, label: 'Products', icon: ShoppingBag, count: products.length },
    { id: 'orders' as const, label: 'Orders', icon: Package, count: orders.length },
    { id: 'requests' as const, label: 'Custom Requests', icon: Package, count: customRequests.length },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="mt-6 flex gap-2 border-b border-border">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-all ${
              tab === t.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}>
            <t.icon className="h-4 w-4" /> {t.label} <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{t.count}</span>
          </button>
        ))}
      </div>

      {/* Products Tab */}
      {tab === 'products' && (
        <div className="mt-6">
          <button onClick={openAdd} className="mb-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
            <Plus className="h-4 w-4" /> Add Product
          </button>

          {showForm && (
            <div className="mb-6 rounded-xl border border-border bg-card p-6">
              <h3 className="font-display font-semibold">{editing ? 'Edit Product' : 'Add Product'}</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">Name</label>
                  <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Price (₹)</label>
                  <input type="number" value={form.price} onChange={e => setForm(p => ({ ...p, price: Number(e.target.value) }))}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Category</label>
                  <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value as Product['category'] }))}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary">
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Stock</label>
                  <input type="number" value={form.stock} onChange={e => setForm(p => ({ ...p, stock: Number(e.target.value) }))}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium">Description</label>
                  <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium">Image URL</label>
                  <input value={form.images[0]} onChange={e => setForm(p => ({ ...p, images: [e.target.value, ...(p.images.slice(1))] }))}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={form.featured} onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))} className="accent-primary" />
                  <label className="text-sm">Featured product</label>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={handleSave} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">Save</button>
                <button onClick={() => setShowForm(false)} className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">Cancel</button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Product</th>
                  <th className="px-4 py-3 text-left font-medium">Category</th>
                  <th className="px-4 py-3 text-left font-medium">Price</th>
                  <th className="px-4 py-3 text-left font-medium">Stock</th>
                  <th className="px-4 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium">{p.name}</td>
                    <td className="px-4 py-3 capitalize text-muted-foreground">{p.category}</td>
                    <td className="px-4 py-3">₹{p.price.toLocaleString()}</td>
                    <td className="px-4 py-3">{p.stock}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(p)} className="text-muted-foreground hover:text-primary"><Pencil className="h-4 w-4" /></button>
                        <button onClick={() => handleDelete(p.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {tab === 'orders' && (
        <div className="mt-6 space-y-4">
          {orders.length === 0 && <p className="text-muted-foreground">No orders yet.</p>}
          {orders.map(order => (
            <div key={order.id} className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="font-display font-semibold">{order.id}</span>
                  <span className="ml-2 text-sm text-muted-foreground">{order.date}</span>
                  <span className="ml-2 text-sm text-muted-foreground">— {order.customer.name}</span>
                </div>
                <select
                  value={order.status}
                  onChange={e => updateOrderStatus(order.id, e.target.value as any)}
                  className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm outline-none focus:border-primary"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {order.items.map(i => `${i.product.name} ×${i.quantity}`).join(', ')}
              </div>
              <div className="mt-2 font-semibold text-primary">Total: ₹{order.total.toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}

      {/* Custom Requests Tab */}
      {tab === 'requests' && (
        <div className="mt-6 space-y-4">
          {customRequests.length === 0 && <p className="text-muted-foreground">No custom requests yet.</p>}
          {customRequests.map(req => (
            <div key={req.id} className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <span className="font-display font-semibold">{req.id}</span>
                <span className="rounded-full bg-warning/10 px-3 py-1 text-xs font-medium capitalize text-warning">{req.status}</span>
              </div>
              <p className="mt-2 text-sm"><strong>From:</strong> {req.name} ({req.email})</p>
              <p className="mt-1 text-sm text-muted-foreground">{req.description}</p>
              {req.fileName && <p className="mt-1 text-xs text-muted-foreground">File: {req.fileName}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
