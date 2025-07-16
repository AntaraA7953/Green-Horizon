import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Leaf, Mail, Lock, User, Chrome, Facebook } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, signInWithProvider } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return;
    }

    setIsLoading(true);
    const { error } = await signUp(
      formData.email,
      formData.password,
      formData.firstName,
      formData.lastName
    );
    
    if (!error) {
      navigate('/');
    }
    setIsLoading(false);
  };

  const handleSocialSignup = async (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    const { error } = await signInWithProvider(provider);
    if (!error) {
      navigate('/');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 hero-background">
        <div className="absolute top-20 right-10 w-28 h-28 bg-primary/10 rounded-full float-animation opacity-70"></div>
        <div className="absolute bottom-32 left-16 w-36 h-36 bg-mint-green/10 rounded-full float-animation opacity-50" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-leaf-green/10 rounded-full float-animation opacity-60" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-forest-green/10 rounded-full float-animation opacity-40" style={{ animationDelay: '2.5s' }}></div>
      </div>
      
      <div className="w-full max-w-md">
        <Card className="glass-card slide-in-up shadow-2xl border-0">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-eco rounded-full flex items-center justify-center pulse-glow">
                <Leaf className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl gradient-text mb-2">Join Green Horizon</CardTitle>
            <CardDescription>
              Start your sustainable journey today and make a positive impact on the planet 🌍
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            {/* Social Signup Buttons */}
            <div className="space-y-3">
              <Button 
                variant="outline"
                className="w-full h-12 hover:scale-105 transition-all duration-300 hover:shadow-md"
                onClick={() => handleSocialSignup('google')}
                disabled={isLoading}
              >
                <Chrome className="w-4 h-4 mr-2" />
                Continue with Google
              </Button>
              <Button 
                variant="outline"
                className="w-full h-12 hover:scale-105 transition-all duration-300 hover:shadow-md"
                onClick={() => handleSocialSignup('facebook')}
                disabled={isLoading}
              >
                <Facebook className="w-4 h-4 mr-2" />
                Continue with Facebook
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="bg-border/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-4 text-muted-foreground font-medium">Or create account with email</span>
              </div>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="John"
                      className="pl-10 h-12 form-input"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Doe"
                      className="pl-10 h-12 form-input"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    className="pl-10 h-12 form-input"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a strong password"
                    className="pl-10 h-12 form-input"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    className="pl-10 h-12 form-input"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <Button className="w-full btn-eco ripple h-12 text-lg font-semibold" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>

            <div className="text-center text-sm pt-4">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link to="/login" className="text-primary hover:underline font-semibold hover:scale-105 transition-transform inline-block">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;