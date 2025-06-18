
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Calendar, User, Settings } from 'lucide-react';

interface DashboardProps {
  user: any;
}

const Dashboard = ({ user }: DashboardProps) => {
  const { toast } = useToast();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome back!</h1>
            <p className="text-gray-600 mt-1">Hello, {user?.email}</p>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              <CardTitle className="text-lg ml-2">My Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                View and manage your upcoming reservations
              </CardDescription>
              <Button className="w-full mt-4 bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500">
                View Bookings
              </Button>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <User className="h-5 w-5 text-orange-600" />
              <CardTitle className="text-lg ml-2">Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Update your personal information and preferences
              </CardDescription>
              <Button className="w-full mt-4 bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500">
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Settings className="h-5 w-5 text-orange-600" />
              <CardTitle className="text-lg ml-2">Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Customize your account settings and notifications
              </CardDescription>
              <Button className="w-full mt-4 bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500">
                Open Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 backdrop-blur-sm bg-white/80 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>User ID:</strong> {user?.uid}</p>
              <p><strong>Account created:</strong> {user?.metadata?.creationTime}</p>
              <p><strong>Last sign in:</strong> {user?.metadata?.lastSignInTime}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
