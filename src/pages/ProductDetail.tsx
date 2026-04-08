import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { ShoppingCart, Heart, ArrowLeft, Minus, Plus } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { motion } from 'framer-motion';

export default function ProductDetail() {
  const { id } = useParams();
  const { products, addToCart, toggleWishlist, isInWishlist } = useStore();
  const product = products.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Product not found.</p>
        <Link to="/products" className="mt-4 inline-block text-primary hover:underline">← Back to Shop</Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to Shop
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {/* Images */}
        <div>
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-square overflow-hidden rounded-xl border border-border"
          >
            <img src={product.images[selectedImage]} alt={product.name} className="h-full w-full object-cover" />
          </motion.div>
          <div className="mt-3 flex gap-3">
            {product.images.map((img, i) => (
              <button key={i} onClick={() => setSelectedImage(i)}
                className={`h-16 w-16 overflow-hidden rounded-lg border-2 transition-all ${
                  i === selectedImage ? 'border-primary' : 'border-border hover:border-primary/50'
                }`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium capitalize text-primary">{product.category}</span>
          <h1 className="mt-3 font-display text-3xl font-bold">{product.name}</h1>
          <p className="mt-2 text-3xl font-bold text-primary">₹{product.price.toLocaleString()}</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="mt-2 text-sm text-muted-foreground">
            {product.stock > 0 ? (
              <span className="text-success">✓ In stock ({product.stock} available)</span>
            ) : (
              <span className="text-destructive">Out of stock</span>
            )}
          </div>

          {/* Qty */}
          <div className="mt-6 flex items-center gap-4">
            <span className="text-sm font-medium">Quantity:</span>
            <div className="flex items-center rounded-lg border border-border">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 text-muted-foreground hover:text-foreground"><Minus className="h-4 w-4" /></button>
              <span className="w-10 text-center font-medium">{qty}</span>
              <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="px-3 py-2 text-muted-foreground hover:text-foreground"><Plus className="h-4 w-4" /></button>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button onClick={() => addToCart(product, qty)}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-display font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-95">
              <ShoppingCart className="h-5 w-5" /> Add to Cart
            </button>
            <Link to="/cart" onClick={() => addToCart(product, qty)}
              className="rounded-xl border border-primary bg-primary/10 px-6 py-3 font-display font-semibold text-primary transition-all hover:bg-primary/20">
              Buy Now
            </Link>
            <button onClick={() => toggleWishlist(product.id)}
              className={`rounded-xl border p-3 transition-all ${wishlisted ? 'border-accent bg-accent/10 text-accent' : 'border-border text-muted-foreground hover:border-accent hover:text-accent'}`}>
              <Heart className={`h-5 w-5 ${wishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Reviews */}
          <div className="mt-10">
            <h3 className="font-display text-lg font-semibold">Reviews ({product.reviews.length})</h3>
            {product.reviews.length === 0 && <p className="mt-2 text-sm text-muted-foreground">No reviews yet.</p>}
            <div className="mt-4 space-y-4">
              {product.reviews.map(r => (
                <div key={r.id} className="rounded-lg border border-border bg-muted/30 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{r.name}</span>
                    <span className="text-xs text-muted-foreground">{r.date}</span>
                  </div>
                  <div className="mt-1 flex gap-0.5 text-sm text-primary">
                    {Array.from({ length: r.rating }).map((_, j) => <span key={j}>★</span>)}
                    {Array.from({ length: 5 - r.rating }).map((_, j) => <span key={j} className="text-muted-foreground">★</span>)}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
