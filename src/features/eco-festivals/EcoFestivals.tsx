import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Music, MapPin, Leaf } from 'lucide-react';

const EcoFestivals = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-eco rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              EcoFestivals
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover sustainable events, eco-friendly festivals, and green gatherings that celebrate our planet.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-primary">250+</div>
                <div className="text-sm text-muted-foreground">Events Listed</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-primary">45</div>
                <div className="text-sm text-muted-foreground">Cities Covered</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Carbon Neutral</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-primary">30k+</div>
                <div className="text-sm text-muted-foreground">Attendees</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Music className="w-6 h-6 mr-2 text-primary" />
                  Green Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Find music festivals, art shows, and cultural events that prioritize sustainability.
                </p>
                <Badge variant="secondary">Zero Waste Events</Badge>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-6 h-6 mr-2 text-primary" />
                  Local Discovery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Discover eco-friendly events and gatherings happening in your local area.
                </p>
                <Badge variant="secondary">Location-based</Badge>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Leaf className="w-6 h-6 mr-2 text-primary" />
                  Impact Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  See the environmental impact of events and choose the most sustainable options.
                </p>
                <Badge variant="secondary">Impact Metrics</Badge>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" className="btn-eco">
              Explore Events
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoFestivals;