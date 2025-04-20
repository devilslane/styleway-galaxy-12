
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, ShoppingBag, LogOut, Shield, Package } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to sign in if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/sign-in');
    }
  }, [user, navigate]);
  
  if (!user) {
    return null; // Will redirect via useEffect
  }
  
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>Your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:justify-between border-b pb-2">
                <span className="font-medium">Name:</span>
                <span>{user.name}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between border-b pb-2">
                <span className="font-medium">Email:</span>
                <span>{user.email}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between border-b pb-2">
                <span className="font-medium">Member since:</span>
                <span>Today</span>
              </div>
              {user.isAdmin && (
                <div className="flex flex-col sm:flex-row sm:justify-between border-b pb-2">
                  <span className="font-medium">Role:</span>
                  <span className="flex items-center text-blue-600">
                    <Shield className="mr-1 h-4 w-4" /> Administrator
                  </span>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Edit Profile</Button>
          </CardFooter>
        </Card>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingBag className="mr-2 h-5 w-5" />
              My Orders
            </CardTitle>
            <CardDescription>Your order history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6 text-gray-500">
              <p>You haven't placed any orders yet.</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate('/products')}>
              Start Shopping
            </Button>
          </CardFooter>
        </Card>
        
        {user.isAdmin && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Admin Access
              </CardTitle>
              <CardDescription>Manage your store</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                As an administrator, you have access to the store management dashboard.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => navigate('/admin')}>
                <Shield className="mr-2 h-4 w-4" />
                Go to Admin Portal
              </Button>
            </CardFooter>
          </Card>
        )}

        {user.isSupplier && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="mr-2 h-5 w-5" />
                Supplier Access
              </CardTitle>
              <CardDescription>Manage your products and orders</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                As a supplier, you have access to the supplier management portal.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => navigate('/supplier')}>
                <Package className="mr-2 h-4 w-4" />
                Go to Supplier Portal
              </Button>
            </CardFooter>
          </Card>
        )}
        
        <Button 
          variant="destructive" 
          className="w-full" 
          onClick={() => {
            signOut();
            navigate('/');
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Profile;
