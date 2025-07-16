import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { UserAccount } from '@/components/UserAccount';
import { useAuth } from '@/hooks/useAuth';
import { Menu, X, Leaf } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Green Lane', path: '/green-lane' },
    { name: 'Local Harvest', path: '/local-harvest' },
    { name: 'Air Buddy', path: '/air-buddy' },
    { name: 'Wasteless', path: '/wasteless' },
    { name: 'Community', path: '/community' },
    { name: 'EcoFestivals', path: '/eco-festivals' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-eco rounded-full flex items-center justify-center pulse-glow group-hover:scale-110 transition-transform">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl gradient-text group-hover:scale-105 transition-transform">Green Horizon</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-link transition-all duration-300 ${
                  isActive(item.path)
                    ? 'text-primary font-medium active'
                    : 'text-muted-foreground hover:text-primary hover:scale-105'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <UserAccount />
            ) : (
              <>
                <Button variant="outline" asChild className="hover:scale-105 transition-transform">
                  <Link to="/login">Login</Link>
                </Button>
                <Button className="btn-eco ripple" asChild>
                  <Link to="/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="hover:scale-110 transition-transform"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden slide-in-up">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 stagger-animation hover:scale-105 ${
                    isActive(item.path)
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-primary hover:bg-muted'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 px-3 pt-4">
                {user ? (
                  <div className="flex justify-center">
                    <UserAccount />
                  </div>
                ) : (
                  <>
                    <Button variant="outline" asChild className="hover:scale-105 transition-transform">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button className="btn-eco ripple" asChild>
                      <Link to="/signup">Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;