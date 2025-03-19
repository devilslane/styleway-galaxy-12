
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

const AdminSettings = () => {
  return (
    <Tabs defaultValue="general">
      <TabsList className="mb-6">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      
      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>Store Information</CardTitle>
            <CardDescription>
              Update your store details and settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="store-name">Store Name</Label>
              <Input id="store-name" defaultValue="StyleHub Clothing" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="store-url">Website URL</Label>
              <Input id="store-url" defaultValue="stylehub.example.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="store-email">Support Email</Label>
              <Input id="store-email" defaultValue="support@stylehub.example.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="store-phone">Support Phone</Label>
              <Input id="store-phone" defaultValue="+1 (555) 123-4567" />
            </div>
            
            <Button>Save Changes</Button>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="appearance">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize how your store looks to customers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="primary-color">Primary Color</Label>
              <div className="flex gap-2">
                <Input id="primary-color" defaultValue="#3B82F6" />
                <div className="h-10 w-10 rounded-md bg-blue-500" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accent-color">Accent Color</Label>
              <div className="flex gap-2">
                <Input id="accent-color" defaultValue="#10B981" />
                <div className="h-10 w-10 rounded-md bg-green-500" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="logo-upload">Store Logo</Label>
              <Input id="logo-upload" type="file" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="favicon-upload">Favicon</Label>
              <Input id="favicon-upload" type="file" />
            </div>
            
            <Button>Save Appearance</Button>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>
              Configure email and system notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Order Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive alerts for new orders
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Inventory Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when product stock is low
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Customer Feedback</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications for customer reviews
                </p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Marketing Campaigns</Label>
                <p className="text-sm text-muted-foreground">
                  Get updates about ongoing marketing activities
                </p>
              </div>
              <Switch />
            </div>
            
            <Button>Save Notification Settings</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AdminSettings;
