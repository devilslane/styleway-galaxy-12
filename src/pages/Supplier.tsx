
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { BarChart, Package, ClipboardList, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SupplierDashboard from '@/components/supplier/SupplierDashboard';
import SupplierInventory from '@/components/supplier/SupplierInventory';
import SupplierOrders from '@/components/supplier/SupplierOrders';
import SupplierSettings from '@/components/supplier/SupplierSettings';

const SupplierPortal = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inventory' | 'orders' | 'settings'>('dashboard');
  
  // Redirect if not authenticated or not supplier
  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
    } else if (!user.isSupplier) {
      navigate('/');
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the supplier portal.",
        variant: "destructive",
      });
    }
  }, [user, navigate]);

  if (!user || !user.isSupplier) {
    return null;
  }

  const menuItems = [
    { title: 'Dashboard', icon: BarChart, value: 'dashboard' },
    { title: 'Inventory', icon: Package, value: 'inventory' },
    { title: 'Orders', icon: ClipboardList, value: 'orders' },
    { title: 'Settings', icon: Settings, value: 'settings' },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-6 py-4">
              <Package className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg">Supplier Portal</span>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.value}>
                    <SidebarMenuButton 
                      onClick={() => setActiveTab(item.value as any)}
                      isActive={activeTab === item.value}
                      tooltip={item.title}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter>
            <div className="px-4 py-4">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2" 
                onClick={() => {
                  signOut();
                  navigate('/');
                }}
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset>
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight">
                {activeTab === 'dashboard' && 'Dashboard'}
                {activeTab === 'inventory' && 'Inventory Management'}
                {activeTab === 'orders' && 'Orders Management'}
                {activeTab === 'settings' && 'Settings'}
              </h1>
            </div>
            
            {activeTab === 'dashboard' && <SupplierDashboard />}
            {activeTab === 'inventory' && <SupplierInventory />}
            {activeTab === 'orders' && <SupplierOrders />}
            {activeTab === 'settings' && <SupplierSettings />}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default SupplierPortal;
