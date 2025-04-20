
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LineChart, ResponsiveContainer, Bar, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import { Package, Truck, DollarSign, TrendingUp } from 'lucide-react';

const salesData = [
  { name: 'Jan', sales: 3000, orders: 234 },
  { name: 'Feb', sales: 4000, orders: 345 },
  { name: 'Mar', sales: 3500, orders: 290 },
  { name: 'Apr', sales: 5000, orders: 456 },
  { name: 'May', sales: 4800, orders: 423 },
  { name: 'Jun', sales: 6000, orders: 578 },
];

const SupplierDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Products</p>
                <h3 className="text-2xl font-bold mt-1">124</h3>
                <p className="text-xs text-muted-foreground mt-1">+7 this week</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Package className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Orders</p>
                <h3 className="text-2xl font-bold mt-1">18</h3>
                <p className="text-xs text-muted-foreground mt-1">4 pending</p>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-full">
                <Truck className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                <h3 className="text-2xl font-bold mt-1">$18,420</h3>
                <p className="text-xs text-muted-foreground mt-1">+12.5% this month</p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-full">
                <DollarSign className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Growth</p>
                <h3 className="text-2xl font-bold mt-1">+15%</h3>
                <p className="text-xs text-muted-foreground mt-1">vs last quarter</p>
              </div>
              <div className="p-3 bg-yellow-500/10 rounded-full">
                <TrendingUp className="h-5 w-5 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="orders" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupplierDashboard;
