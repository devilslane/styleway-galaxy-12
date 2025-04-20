import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LogIn, AlertCircle, Shield, Package } from 'lucide-react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (email: string, password: string) => {
    try {
      await signIn(email, password);
      navigate('/payment-options');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred during sign in');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await handleSignIn(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during sign in');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail('demo@example.com');
    setPassword('password');
  };
  
  const fillAdminCredentials = () => {
    setEmail('admin@example.com');
    setPassword('admin');
  };

  const fillSupplierCredentials = () => {
    setEmail('supplier@example.com');
    setPassword('supplier');
  };

  return (
    <div className="container mx-auto max-w-md py-12">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your@email.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link 
                  to="#" 
                  className="text-sm text-brand-navy hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'} 
              {!isSubmitting && <LogIn className="ml-2 h-4 w-4" />}
            </Button>
          </form>
          
          <div className="mt-4 space-y-2">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={fillDemoCredentials}
            >
              Use demo account
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center" 
              onClick={fillAdminCredentials}
            >
              <Shield className="mr-2 h-4 w-4 text-blue-600" />
              Use admin account
            </Button>

            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center" 
              onClick={fillSupplierCredentials}
            >
              <Package className="mr-2 h-4 w-4 text-green-600" />
              Use supplier account
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-gray-500">
            Don't have an account? {' '}
            <Link to="/sign-up" className="text-brand-navy hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
