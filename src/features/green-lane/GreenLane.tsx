import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navigation as NavigationIcon, MapPin, Leaf, Clock, Route } from 'lucide-react';

const GreenLane = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-eco rounded-full flex items-center justify-center mx-auto mb-6">
              <NavigationIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Green Lane
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Navigate through cleaner air routes, discover eco-friendly paths, and reduce your carbon footprint with every journey.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-primary">2.3M</div>
                <div className="text-sm text-muted-foreground">kg CO₂ Saved</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-primary">15k</div>
                <div className="text-sm text-muted-foreground">Green Routes</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-primary">87%</div>
                <div className="text-sm text-muted-foreground">Air Quality</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-primary">4.2</div>
                <div className="text-sm text-muted-foreground">Avg Rating</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Features */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Route className="w-6 h-6 mr-2 text-primary" />
                  Smart Route Planning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  AI-powered routing that prioritizes clean air zones, bike lanes, and eco-friendly transportation options.
                </p>
                <div className="space-y-2">
                  <Badge variant="secondary">Air Quality Optimization</Badge>
                  <Badge variant="secondary">Carbon Footprint Tracking</Badge>
                  <Badge variant="secondary">Multi-modal Transport</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-6 h-6 mr-2 text-primary" />
                  Real-time Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Live updates on air quality, traffic conditions, and sustainable transport availability along your route.
                </p>
                <div className="space-y-2">
                  <Badge variant="secondary">Live Air Quality</Badge>
                  <Badge variant="secondary">Traffic Updates</Badge>
                  <Badge variant="secondary">Green Zones</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* How it Works */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-center">How Green Lane Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">1. Set Destination</h3>
                  <p className="text-sm text-muted-foreground">
                    Enter your destination and transport preferences
                  </p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Leaf className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">2. Get Green Routes</h3>
                  <p className="text-sm text-muted-foreground">
                    AI analyzes air quality, emissions, and sustainability factors
                  </p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">3. Track Impact</h3>
                  <p className="text-sm text-muted-foreground">
                    Monitor your environmental impact and earn eco-points
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Button size="lg" className="btn-eco">
              Start Green Navigation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreenLane;