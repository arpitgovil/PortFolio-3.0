import { BarChart3, FolderOpen, MessageSquare, Settings, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

interface AdminDashboardProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export function AdminDashboard({ activeTab, onTabChange, onLogout }: AdminDashboardProps) {
  const stats = [
    {
      title: 'Total Projects',
      value: '6',
      description: '2 featured projects',
      icon: FolderOpen,
      color: 'text-blue-600'
    },
    {
      title: 'Messages',
      value: '23',
      description: '5 unread messages',
      icon: MessageSquare,
      color: 'text-green-600'
    },
    {
      title: 'Page Views',
      value: '1,234',
      description: 'This month',
      icon: BarChart3,
      color: 'text-purple-600'
    }
  ];

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'about', label: 'About Me', icon: Settings },
    { id: 'messages', label: 'Messages', icon: MessageSquare }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-card border-r border-border min-h-screen">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold text-primary">Admin Panel</h2>
            <p className="text-sm text-muted-foreground">Portfolio Management</p>
          </div>
          
          <nav className="p-4 space-y-2">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => onTabChange(item.id)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </nav>
          
          <div className="absolute bottom-4 left-4 right-4">
            <Button 
              variant="outline" 
              className="w-full justify-start text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
              onClick={onLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === 'dashboard' && (
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back! Here's an overview of your portfolio.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat) => (
                  <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground">{stat.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New message from John Doe</p>
                        <p className="text-sm text-muted-foreground">2 hours ago</p>
                      </div>
                      <Badge variant="secondary">New</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Updated E-Commerce Platform project</p>
                        <p className="text-sm text-muted-foreground">1 day ago</p>
                      </div>
                      <Badge variant="outline">Updated</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Added new skill: Docker</p>
                        <p className="text-sm text-muted-foreground">3 days ago</p>
                      </div>
                      <Badge variant="outline">Added</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" onClick={() => onTabChange('projects')}>
                      <FolderOpen className="mr-2 h-4 w-4" />
                      Add New Project
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => onTabChange('about')}>
                      <Settings className="mr-2 h-4 w-4" />
                      Update About Me
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => onTabChange('messages')}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      View Messages
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}