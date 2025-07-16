import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, MapPin, Calendar, Leaf } from 'lucide-react';

const LocalHarvest = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-eco rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Local Harvest
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover local, sustainable food sources, support local farmers, and reduce food miles with every purchase.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-6 h-6 mr-2 text-primary" />
                  Local Markets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Find farmers markets, organic stores, and local food producers near you.
                </p>
                <Badge variant="secondary">Real-time Locations</Badge>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-primary" />
                  Seasonal Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Learn what's in season and when to buy for maximum freshness and sustainability.
                </p>
                <Badge variant="secondary">Seasonal Alerts</Badge>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Leaf className="w-6 h-6 mr-2 text-primary" />
                  Carbon Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Track the carbon footprint of your food choices and see your impact.
                </p>
                <Badge variant="secondary">Food Miles Tracker</Badge>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" className="btn-eco">
              Find Local Food
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalHarvest;