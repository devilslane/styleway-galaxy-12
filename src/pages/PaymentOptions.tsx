
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { CreditCard, LayoutDashboard, Store } from 'lucide-react';

const PaymentOptions = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleOptionSelect = (path: string) => {
    navigate(path);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Select Your Portal</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        {user?.isAdmin && (
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center space-x-4">
              <LayoutDashboard className="h-6 w-6" />
              <CardTitle>Admin Portal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">Manage the entire platform</p>
              <Button 
                className="w-full"
                onClick={() => handleOptionSelect('/admin')}
              >
                Enter Admin Portal
              </Button>
            </CardContent>
          </Card>
        )}

        {user?.isSupplier && (
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center space-x-4">
              <Store className="h-6 w-6" />
              <CardTitle>Supplier Portal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">Manage your products</p>
              <Button 
                className="w-full"
                onClick={() => handleOptionSelect('/supplier')}
              >
                Enter Supplier Portal
              </Button>
            </CardContent>
          </Card>
        )}

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center space-x-4">
            <CreditCard className="h-6 w-6" />
            <CardTitle>Customer Portal</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">Shop and manage your orders</p>
            <Button 
              className="w-full"
              onClick={() => handleOptionSelect('/')}
            >
              Start Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentOptions;
