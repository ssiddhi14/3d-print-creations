import { Printer } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
              <Printer className="h-5 w-5 text-primary" />
              <span className="text-gradient">Print3D</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Bringing your ideas to life with precision 3D printing technology.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold">Shop</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/products?category=figurines" className="hover:text-primary">Figurines</Link></li>
              <li><Link to="/products?category=utility" className="hover:text-primary">Utility</Link></li>
              <li><Link to="/products?category=decor" className="hover:text-primary">Home Decor</Link></li>
              <li><Link to="/products?category=keychains" className="hover:text-primary">Keychains</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold">Services</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/upload-design" className="hover:text-primary">Custom Printing</Link></li>
              <li><Link to="/products?category=custom" className="hover:text-primary">Prototyping</Link></li>
              <li><Link to="/orders" className="hover:text-primary">Order Tracking</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>hello@print3d.in</li>
              <li>+91 98765 43210</li>
              <li>Mumbai, India</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © 2024 Print3D. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
