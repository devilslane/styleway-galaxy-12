
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

const SupplierSettings = () => {
  return (
    <Tabs defaultValue="profile">
      <TabsList className="mb-6">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="shipping">Shipping</TabsTrigger>
      </TabsList>
      
      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Supplier Profile</CardTitle>
            <CardDescription>
              Manage your supplier information and settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" defaultValue="StyleHub Suppliers Inc." />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contact-name">Contact Person</Label>
              <Input id="contact-name" defaultValue="John Smith" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="contact@stylehub-suppliers.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" defaultValue="+1 (555) 123-4567" />
            </div>
            
            <Button>Save Changes</Button>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>
              Choose how you want to receive updates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Order Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications for new orders
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Low Stock Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when inventory is running low
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Payment Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about payments
                </p>
              </div>
              <Switch />
            </div>
            
            <Button>Save Preferences</Button>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="shipping">
        <Card>
          <CardHeader>
            <CardTitle>Shipping Settings</CardTitle>
            <CardDescription>
              Configure your shipping preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="warehouse">Warehouse Address</Label>
              <Input id="warehouse" defaultValue="123 Warehouse St, Industry City, ST 12345" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="shipping-method">Default Shipping Method</Label>
              <Input id="shipping-method" defaultValue="Standard Ground" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-fulfill Orders</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically process and ship orders when received
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Button>Save Shipping Settings</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default SupplierSettings;
