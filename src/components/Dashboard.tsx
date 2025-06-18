
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { LogOut, Calendar, User, Settings, Film, Ticket, CreditCard, Star } from 'lucide-react';

interface DashboardProps {
  user: any;
}

const Dashboard = ({ user }: DashboardProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Signed out",
        description: "You've been successfully signed out.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const dashboardCards = [
    {
      title: "Browse Movies",
      description: "Discover and book tickets for the latest movies",
      icon: Film,
      action: () => navigate('/movies'),
      buttonText: "View Movies"
    },
    {
      title: "My Bookings",
      description: "View and manage your movie bookings",
      icon: Ticket,
      action: () => navigate('/profile'),
      buttonText: "View Bookings"
    },
    {
      title: "Profile",
      description: "Update your personal information and preferences",
      icon: User,
      action: () => navigate('/profile'),
      buttonText: "Edit Profile"
    },
    {
      title: "Payment Methods",
      description: "Manage your saved payment methods",
      icon: CreditCard,
      action: () => navigate('/profile'),
      buttonText: "Manage Payments"
    },
    {
      title: "Settings",
      description: "Customize your account settings and notifications",
      icon: Settings,
      action: () => navigate('/settings'),
      buttonText: "Open Settings"
    },
    {
      title: "Reviews",
      description: "Rate and review movies you've watched",
      icon: Star,
      action: () => navigate('/profile'),
      buttonText: "Write Reviews"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Welcome back!</h1>
            <p className="text-gray-600 mt-1">Hello, {user?.email}</p>
            <p className="text-sm text-gray-500 mt-1">Ready to book your next movie experience?</p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="border-orange-200 text-orange-600 hover:bg-orange-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Quick Actions */}
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              Quick Actions
            </CardTitle>
            <CardDescription>Jump to your most used features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={() => navigate('/movies')}
                className="bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500"
              >
                <Film className="h-4 w-4 mr-2" />
                Book Now
              </Button>
              <Button 
                onClick={() => navigate('/profile')}
                variant="outline"
                className="border-orange-200 text-orange-600 hover:bg-orange-50"
              >
                <Ticket className="h-4 w-4 mr-2" />
                My Tickets
              </Button>
              <Button 
                onClick={() => navigate('/settings')}
                variant="outline"
                className="border-orange-200 text-orange-600 hover:bg-orange-50"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {dashboardCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <Card key={index} className="backdrop-blur-sm bg-white/80 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <IconComponent className="h-6 w-6 text-orange-600 mr-3" />
                  <CardTitle className="text-lg">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {card.description}
                  </CardDescription>
                  <Button 
                    onClick={card.action}
                    className="w-full bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500"
                  >
                    {card.buttonText}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Account Information */}
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>User ID:</strong> {user?.uid}</p>
                <p><strong>Member Since:</strong> {new Date(user?.metadata?.creationTime).toLocaleDateString()}</p>
              </div>
              <div className="space-y-2">
                <p><strong>Last Sign In:</strong> {new Date(user?.metadata?.lastSignInTime).toLocaleDateString()}</p>
                <p><strong>Account Status:</strong> <span className="text-green-600 font-medium">Active</span></p>
                <p><strong>Membership Level:</strong> <span className="text-orange-600 font-medium">Standard</span></p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
