import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Recycle, Target, Trophy, TrendingUp } from 'lucide-react';

const Wasteless = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-eco rounded-full flex items-center justify-center mx-auto mb-6">
              <Recycle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Wasteless
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Track recycling, reduce waste, and earn eco-rewards for sustainable disposal habits.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-primary">1,247</div>
                <div className="text-sm text-muted-foreground">Items Recycled</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-primary">89%</div>
                <div className="text-sm text-muted-foreground">Waste Reduced</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-primary">2,350</div>
                <div className="text-sm text-muted-foreground">Eco Points</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-primary">Level 7</div>
                <div className="text-sm text-muted-foreground">Eco Warrior</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-6 h-6 mr-2 text-primary" />
                  Waste Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Scan and log your recyclables, track reduction goals, and see your environmental impact.
                </p>
                <Badge variant="secondary">Barcode Scanner</Badge>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-6 h-6 mr-2 text-primary" />
                  Eco Rewards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Earn points for sustainable actions and redeem rewards from eco-friendly partners.
                </p>
                <Badge variant="secondary">Point System</Badge>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-primary" />
                  Progress Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Detailed insights into your waste reduction journey with goals and achievements.
                </p>
                <Badge variant="secondary">Progress Tracking</Badge>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" className="btn-eco">
              Start Tracking Waste
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wasteless;