import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wind, Activity, Shield, AlertTriangle } from 'lucide-react';

const AirBuddy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-eco rounded-full flex items-center justify-center mx-auto mb-6">
              <Wind className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Air Buddy
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real-time air quality monitoring, breathing recommendations, and health insights for cleaner living.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-500 mb-2">Good</div>
                <div className="text-sm text-muted-foreground">Current AQI</div>
                <div className="text-2xl font-bold">45</div>
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
                <div className="text-2xl font-bold text-primary">12°C</div>
                <div className="text-sm text-muted-foreground">Temperature</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-primary">65%</div>
                <div className="text-sm text-muted-foreground">Humidity</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-6 h-6 mr-2 text-primary" />
                  Health Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Personalized breathing exercises and health recommendations based on current air quality.
                </p>
                <Badge variant="secondary">Breathing Exercises</Badge>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-6 h-6 mr-2 text-primary" />
                  Protection Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Smart alerts and protective measures for when air quality drops in your area.
                </p>
                <Badge variant="secondary">Smart Alerts</Badge>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-2 text-primary" />
                  Pollution Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Identify and avoid pollution hotspots with real-time environmental data.
                </p>
                <Badge variant="secondary">Pollution Mapping</Badge>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" className="btn-eco">
              Start Air Monitoring
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirBuddy;