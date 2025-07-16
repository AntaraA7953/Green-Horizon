import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, MessageSquare, Share2, Award } from 'lucide-react';

const GreenCommunity = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-eco rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Green Community
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with eco-conscious people, share sustainable tips, and build a greener world together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-primary">50,000+</div>
                <div className="text-sm text-muted-foreground">Active Members</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-primary">12,500</div>
                <div className="text-sm text-muted-foreground">Eco Tips Shared</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-primary">1,200</div>
                <div className="text-sm text-muted-foreground">Local Groups</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-primary">3,400</div>
                <div className="text-sm text-muted-foreground">Events Hosted</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-6 h-6 mr-2 text-primary" />
                  Discussion Forums
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Join conversations about sustainability, share experiences, and learn from the community.
                </p>
                <Badge variant="secondary">Topic-based Forums</Badge>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Share2 className="w-6 h-6 mr-2 text-primary" />
                  Tip Sharing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Share your eco-friendly tips and discover new ways to live sustainably from others.
                </p>
                <Badge variant="secondary">Peer Learning</Badge>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-6 h-6 mr-2 text-primary" />
                  Challenges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Participate in community challenges and compete in eco-friendly activities.
                </p>
                <Badge variant="secondary">Group Challenges</Badge>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="btn-eco"
              onClick={() => window.location.href = 'https://green-community-six.vercel.app/'}
            >
              Join Community
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreenCommunity;
