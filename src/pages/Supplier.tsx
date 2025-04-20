
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Truck, Settings } from 'lucide-react';

const SupplierPortal = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user?.isSupplier) {
    navigate('/sign-in');
    return null;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Supplier Portal</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center space-x-4">
            <Package className="h-6 w-6" />
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">Manage your product inventory</p>
            <Button className="w-full">View Products</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-x-4">
            <Truck className="h-6 w-6" />
            <CardTitle>Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">Track and manage orders</p>
            <Button className="w-full">View Orders</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-x-4">
            <Settings className="h-6 w-6" />
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">Manage account settings</p>
            <Button className="w-full">View Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupplierPortal;
