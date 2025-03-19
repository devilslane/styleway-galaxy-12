
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
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
import { Shield, Package, Users, BarChart, Settings, LogOut } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminProducts from '@/components/admin/AdminProducts';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminSettings from '@/components/admin/AdminSettings';

const Admin = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'users' | 'settings'>('dashboard');
  
  // Redirect if not authenticated or not admin
  React.useEffect(() => {
    if (!user) {
      navigate('/sign-in');
    } else if (!user.isAdmin) {
      navigate('/');
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin portal.",
        variant: "destructive",
      });
    }
  }, [user, navigate]);
  
  if (!user || !user.isAdmin) {
    return null; // Will redirect via useEffect
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <Shield className="h-6 w-6 text-primary" />
              <div className="font-semibold text-xl">Admin Portal</div>
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
                    isActive={activeTab === 'products'} 
                    onClick={() => setActiveTab('products')}
                    tooltip="Products"
                  >
                    <Package className="h-5 w-5" />
                    <span>Products</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeTab === 'users'} 
                    onClick={() => setActiveTab('users')}
                    tooltip="Users"
                  >
                    <Users className="h-5 w-5" />
                    <span>Users</span>
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
              {activeTab === 'products' && 'Products Management'}
              {activeTab === 'users' && 'User Management'}
              {activeTab === 'settings' && 'Admin Settings'}
            </h1>
            
            {activeTab === 'dashboard' && <AdminDashboard />}
            {activeTab === 'products' && <AdminProducts />}
            {activeTab === 'users' && <AdminUsers />}
            {activeTab === 'settings' && <AdminSettings />}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Admin;
