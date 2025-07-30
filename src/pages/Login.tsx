import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Leaf, Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
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

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/green.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-0" />

      {/* Login Card with image background */}
      <div className="w-full max-w-md z-10 px-4">
        <Card
          className="relative rounded-xl overflow-hidden shadow-2xl border-0 h-[700px] bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage: 'url("https://i.pinimg.com/736x/1d/c5/1d/1dc51d2866cf141b5e3c0dbb53e045d3.jpg")'
          }}
        >
          {/* Form container */}
          <div className="bg-white/5 backdrop-blur-md rounded-xl w-[90%] max-w-sm mx-auto p-6">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl text-green-700 mb-2">Welcome Back</CardTitle>
              <CardDescription className="text-gray-700 text-sm">
                Sign in to your Green Horizon account and continue your sustainable journey 🌱
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
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
                    className="text-sm text-green-700 hover:underline hover:scale-105 transition-transform"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-white h-12 text-lg font-semibold"
                  type="submit"
                  disabled={isLoading}
                >
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
                <span className="text-white">Don't have an account? </span>
                <Link
                  to="/signup"
                  className="text-black hover:underline font-semibold hover:scale-105 transition-transform inline-block"
                >
                  Sign up
                </Link>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
