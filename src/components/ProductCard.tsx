import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/types';
import { useStore } from '@/context/StoreContext';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [hovered, setHovered] = useState(false);
  const wishlisted = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={hovered && product.images[1] ? product.images[1] : product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {product.featured && (
            <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
              Featured
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display font-semibold transition-colors group-hover:text-primary">{product.name}</h3>
          <p className="mt-1 text-lg font-bold text-primary">₹{product.price.toLocaleString()}</p>
        </Link>
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={() => addToCart(product)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-95"
          >
            <ShoppingCart className="h-4 w-4" /> Add to Cart
          </button>
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`rounded-lg border p-2 transition-all active:scale-95 ${
              wishlisted ? 'border-accent bg-accent/10 text-accent' : 'border-border text-muted-foreground hover:border-accent hover:text-accent'
            }`}
          >
            <Heart className={`h-4 w-4 ${wishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
