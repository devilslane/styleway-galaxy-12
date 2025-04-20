
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
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Package, BarChart, Truck, ClipboardList, Settings, LogOut } from 'lucide-react';
import SupplierDashboard from '@/components/supplier/SupplierDashboard';
import SupplierInventory from '@/components/supplier/SupplierInventory';
import SupplierOrders from '@/components/supplier/SupplierOrders';
import SupplierSettings from '@/components/supplier/SupplierSettings';

const SupplierPortal = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inventory' | 'orders' | 'settings'>('dashboard');
  
  // Redirect if not authenticated or not supplier
  React.useEffect(() => {
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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <Truck className="h-6 w-6 text-primary" />
              <div className="font-semibold text-xl">Supplier Portal</div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeTab === 'dashboard'} 
                    onClick={() => setActiveTab('dashboard')}
                    tooltip="Dashboard"
                  >
                    <BarChart className="h-5 w-5" />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeTab === 'inventory'} 
                    onClick={() => setActiveTab('inventory')}
                    tooltip="Inventory"
                  >
                    <Package className="h-5 w-5" />
                    <span>Inventory</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeTab === 'orders'} 
                    onClick={() => setActiveTab('orders')}
                    tooltip="Orders"
                  >
                    <ClipboardList className="h-5 w-5" />
                    <span>Orders</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeTab === 'settings'} 
                    onClick={() => setActiveTab('settings')}
                    tooltip="Settings"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="px-3 py-2">
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => {
                  signOut();
                  navigate('/');
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset>
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'inventory' && 'Inventory Management'}
              {activeTab === 'orders' && 'Orders Management'}
              {activeTab === 'settings' && 'Supplier Settings'}
            </h1>
            
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
