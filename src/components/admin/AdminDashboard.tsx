import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageEditor } from './PageEditor';
import { ServicesManager } from './ServicesManager';
import { AppointmentsManager } from './AppointmentsManager';
import { BlogManager } from './BlogManager';
import { 
  LogOut, 
  FileText, 
  Stethoscope, 
  Calendar, 
  BookOpen,
  Users,
  BarChart3,
  Settings
} from 'lucide-react';

export const AdminDashboard = () => {
  const { userData, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <h1 className="text-xl font-semibold">AyurCare Admin</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {userData?.fullName}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="hover:bg-destructive hover:text-destructive-foreground"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r border-border min-h-[calc(100vh-4rem)]">
          <nav className="p-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical">
              <TabsList className="grid w-full grid-cols-1 h-auto bg-transparent p-0">
                <TabsTrigger 
                  value="overview" 
                  className="w-full justify-start px-4 py-3 data-[state=active]:bg-accent"
                >
                  <BarChart3 className="w-4 h-4 mr-3" />
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="pages" 
                  className="w-full justify-start px-4 py-3 data-[state=active]:bg-accent"
                >
                  <FileText className="w-4 h-4 mr-3" />
                  Pages
                </TabsTrigger>
                <TabsTrigger 
                  value="services" 
                  className="w-full justify-start px-4 py-3 data-[state=active]:bg-accent"
                >
                  <Stethoscope className="w-4 h-4 mr-3" />
                  Services
                </TabsTrigger>
                <TabsTrigger 
                  value="appointments" 
                  className="w-full justify-start px-4 py-3 data-[state=active]:bg-accent"
                >
                  <Calendar className="w-4 h-4 mr-3" />
                  Appointments
                </TabsTrigger>
                <TabsTrigger 
                  value="blog" 
                  className="w-full justify-start px-4 py-3 data-[state=active]:bg-accent"
                >
                  <BookOpen className="w-4 h-4 mr-3" />
                  Blog
                </TabsTrigger>
                <TabsTrigger 
                  value="users" 
                  className="w-full justify-start px-4 py-3 data-[state=active]:bg-accent"
                >
                  <Users className="w-4 h-4 mr-3" />
                  Users
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="overview" className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
                <p className="text-muted-foreground">
                  Manage your AyurCare hospital website content and settings.
                </p>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">6</div>
                    <p className="text-xs text-muted-foreground">
                      Active website pages
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Services</CardTitle>
                    <Stethoscope className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">
                      Medical services offered
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Appointments</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground">
                      Pending appointments
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8</div>
                    <p className="text-xs text-muted-foreground">
                      Published articles
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="pages">
              <PageEditor />
            </TabsContent>

            <TabsContent value="services">
              <ServicesManager />
            </TabsContent>

            <TabsContent value="appointments">
              <AppointmentsManager />
            </TabsContent>

            <TabsContent value="blog">
              <BlogManager />
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Manage user accounts and permissions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">User management coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};