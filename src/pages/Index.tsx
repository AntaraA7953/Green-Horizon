import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import CactoChan from '@/components/CactoChan';
import { 
  Leaf, 
  Navigation as NavigationIcon, 
  Users, 
  Recycle, 
  Wind, 
  ShoppingCart, 
  Calendar,
  ArrowRight,
  Sparkles,
  Globe,
  Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import heroBackground from '@/assets/hero-background.jpg';

const Index = () => {
  const features = [
    {
      name: 'Green Lane',
      description: 'Navigate through cleaner air routes and discover eco-friendly paths',
      icon: NavigationIcon,
      color: 'from-eco-leaf to-eco-mint',
      path: '/green-lane'
    },
    {
      name: 'Local Harvest',
      description: 'Find local, sustainable food sources and farmers markets',
      icon: ShoppingCart,
      color: 'from-eco-forest to-eco-DEFAULT',
      path: '/local-harvest'
    },
    {
      name: 'Air Buddy',
      description: 'Real-time air quality monitoring and breathing recommendations',
      icon: Wind,
      color: 'from-eco-mint to-primary-glow',
      path: '/air-buddy'
    },
    {
      name: 'Wasteless',
      description: 'Track recycling, reduce waste, and earn eco-rewards',
      icon: Recycle,
      color: 'from-eco-sage to-eco-forest',
      path: '/wasteless'
    },
    {
      name: 'Green Community',
      description: 'Connect with eco-conscious people and share sustainable tips',
      icon: Users,
      color: 'from-eco-DEFAULT to-eco-leaf',
      path: '/community'
    },
    {
      name: 'EcoFestivals',
      description: 'Discover sustainable events and eco-friendly festivals',
      icon: Calendar,
      color: 'from-primary to-eco-mint',
      path: '/eco-festivals'
    }
  ];

  const stats = [
    { label: 'CO₂ Saved', value: '2.5M kg', icon: Leaf },
    { label: 'Trees Planted', value: '15,420', icon: Sparkles },
    { label: 'Eco Warriors', value: '50,000+', icon: Users },
    { label: 'Cities Connected', value: '120', icon: Globe }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <CactoChan />

      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center text-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(34, 139, 34, 0.8), rgba(46, 204, 113, 0.7)), url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center pulse-glow">
                <Leaf className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 float-animation">
              Green Horizon
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl">
              Your personal co-pilot to a greener life. Navigate sustainably, track your impact, 
              and turn eco-actions into daily adventures.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-white/10 rounded-full float-animation opacity-60"></div>
        <div className="absolute bottom-32 right-16 w-12 h-12 bg-white/10 rounded-full float-animation opacity-40" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-white/10 rounded-full float-animation opacity-80" style={{ animationDelay: '4s' }}></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center group">
                <div className="w-16 h-16 bg-gradient-eco rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Your Sustainability Ecosystem
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Six powerful tools working together to make sustainable living effortless, 
              rewarding, and fun.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link key={feature.name} to={feature.path}>
                <Card className="feature-card glass-card group h-full stagger-animation">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                      {feature.name}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6">
                      {feature.description}
                    </p>

                    <Button variant="ghost" className="group-hover:text-primary group-hover:scale-105 transition-all duration-300">
                      Explore
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-eco">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Heart className="w-16 h-16 text-white mx-auto mb-6 animate-bounce-gentle" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of eco-warriors who are already making their daily choices count 
            for the planet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6">
              Join Green Horizon
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
              asChild
            >
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-eco rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl gradient-text">Green Horizon</span>
            </div>
            
            <div className="flex space-x-8 text-muted-foreground">
              <Link to="/about" className="hover:text-primary transition-colors">About</Link>
              <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 Green Horizon - Sustainable Solutions for a Better World</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
