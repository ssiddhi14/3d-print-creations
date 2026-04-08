import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Zap, Shield } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { categories, testimonials } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { motion } from 'framer-motion';

export default function Home() {
  const { products } = useStore();
  const featured = products.filter(p => p.featured).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Precision 3D Printing
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight md:text-6xl">
              Bring Your Ideas to Life with{' '}
              <span className="text-gradient">3D Printing</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              From custom figurines to functional prototypes — we transform digital designs into stunning physical reality with premium 3D printing technology.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-display font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-95 glow-primary"
              >
                Shop Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/upload-design"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 font-display font-semibold transition-all hover:border-primary/50 hover:bg-primary/5"
              >
                Customize Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-border bg-card/50">
        <div className="container mx-auto grid gap-0 divide-y divide-border px-4 md:grid-cols-3 md:divide-x md:divide-y-0">
          {[
            { icon: Layers, title: 'Premium Quality', desc: 'High-resolution printing with 0.05mm layer precision' },
            { icon: Zap, title: 'Fast Delivery', desc: 'Most orders shipped within 3-5 business days' },
            { icon: Shield, title: 'Satisfaction Guaranteed', desc: '30-day return policy on all products' },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-6">
              <f.icon className="h-8 w-8 shrink-0 text-primary" />
              <div>
                <h3 className="font-display font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-center font-display text-3xl font-bold">Browse Categories</h2>
        <p className="mt-2 text-center text-muted-foreground">Find the perfect 3D printed product</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((cat, i) => (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Link
                to={`/products?category=${cat.id}`}
                className="group flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <span className="text-4xl">{cat.icon}</span>
                <h3 className="mt-3 font-display font-semibold group-hover:text-primary">{cat.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{cat.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-muted/30">
        <div className="container mx-auto px-4 py-20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold">Featured Products</h2>
              <p className="mt-1 text-muted-foreground">Our most popular picks</p>
            </div>
            <Link to="/products" className="text-sm font-medium text-primary hover:underline">View All →</Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-center font-display text-3xl font-bold">What Our Customers Say</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex gap-1 text-primary">
                {Array.from({ length: t.rating }).map((_, j) => <span key={j}>★</span>)}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">"{t.comment}"</p>
              <div className="mt-4">
                <p className="font-display font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="font-display text-3xl font-bold">Have a Custom Design?</h2>
          <p className="mt-3 text-muted-foreground">Upload your 3D model and we'll print it for you</p>
          <Link
            to="/upload-design"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-display font-semibold text-accent-foreground transition-all hover:opacity-90 active:scale-95 glow-accent"
          >
            Upload Your Design <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
