import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Package, Shield, MapPin, CreditCard, Phone, LogOut } from 'lucide-react';
import { useEffect } from 'react';

const sections = [
  { icon: Package, title: 'Your Orders', desc: 'Track, return, or buy things again', to: '/orders' },
  { icon: Shield, title: 'Login & Security', desc: 'Edit login, name, and mobile number', to: '/account' },
  { icon: MapPin, title: 'Your Addresses', desc: 'Edit addresses for orders', to: '/account' },
  { icon: CreditCard, title: 'Payment Options', desc: 'Edit or add payment methods', to: '/account' },
  { icon: Phone, title: 'Contact & Support', desc: 'Get help with your account', to: '/contact' },
];

export default function Account() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate('/auth');
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold">Your Account</h1>
      <p className="mt-1 text-muted-foreground">Hello, {user.name}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map(s => (
          <Link
            key={s.title}
            to={s.to}
            className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-lg"
          >
            <div className="rounded-lg bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <s.icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display font-semibold">{s.title}</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          </Link>
        ))}

        <button
          onClick={handleLogout}
          className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 text-left transition-all hover:border-destructive/40 hover:shadow-lg"
        >
          <div className="rounded-lg bg-destructive/10 p-3 text-destructive transition-colors group-hover:bg-destructive group-hover:text-destructive-foreground">
            <LogOut className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-display font-semibold">Logout</h3>
            <p className="mt-0.5 text-sm text-muted-foreground">Sign out of your account</p>
          </div>
        </button>
      </div>

      {/* Account Info */}
      <div className="mt-10 rounded-xl border border-border bg-card p-6">
        <h2 className="font-display text-lg font-semibold">Account Details</h2>
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <span className="w-20 font-medium text-muted-foreground">Name</span>
            <span>{user.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-20 font-medium text-muted-foreground">Email</span>
            <span>{user.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
