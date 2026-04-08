import { Link } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/ProductCard';

export default function Wishlist() {
  const { products, wishlist, toggleWishlist } = useStore();
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Heart className="mx-auto h-16 w-16 text-muted-foreground" />
        <h2 className="mt-4 font-display text-2xl font-bold">Your wishlist is empty</h2>
        <p className="mt-2 text-muted-foreground">Save products you love for later</p>
        <Link to="/products" className="mt-6 inline-block rounded-xl bg-primary px-6 py-3 font-display font-semibold text-primary-foreground">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold">Wishlist</h1>
      <p className="mt-1 text-muted-foreground">{wishlistProducts.length} items saved</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {wishlistProducts.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
