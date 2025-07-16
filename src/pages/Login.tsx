import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Leaf, Mail, Lock, Chrome, Facebook } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signInWithProvider } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await signIn(formData.email, formData.password);
    if (!error) {
      navigate('/');
    }
    setIsLoading(false);
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
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
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full float-animation opacity-60"></div>
        <div className="absolute bottom-20 right-16 w-24 h-24 bg-mint-green/10 rounded-full float-animation opacity-40" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-leaf-green/10 rounded-full float-animation opacity-80" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-forest-green/10 rounded-full float-animation opacity-50" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="w-full max-w-md">
        <Card className="glass-card slide-in-up shadow-2xl border-0">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-eco rounded-full flex items-center justify-center pulse-glow">
                <Leaf className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl gradient-text mb-2">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your Green Horizon account and continue your sustainable journey 🌱
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            {/* Social Login Buttons */}
            <div className="space-y-3">
              <Button 
                variant="outline"
                className="w-full h-12 hover:scale-105 transition-all duration-300 hover:shadow-md"
                onClick={() => handleSocialLogin('google')}
                disabled={isLoading}
              >
                <Chrome className="w-4 h-4 mr-2" />
                Continue with Google
              </Button>
              <Button 
                variant="outline"
                className="w-full h-12 hover:scale-105 transition-all duration-300 hover:shadow-md"
                onClick={() => handleSocialLogin('facebook')}
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
                <span className="bg-card px-4 text-muted-foreground font-medium">Or continue with email</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
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
                    placeholder="Enter your password"
                    className="pl-10 h-12 form-input"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="rounded border-border w-4 h-4 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline hover:scale-105 transition-transform"
                >
                  Forgot password?
                </Link>
              </div>

              <Button className="w-full btn-eco ripple h-12 text-lg font-semibold" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="text-center text-sm pt-4">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link to="/signup" className="text-primary hover:underline font-semibold hover:scale-105 transition-transform inline-block">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;