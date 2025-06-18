import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useBooking } from '@/contexts/BookingContext';
import { User, Mail, Phone, MapPin, Calendar, Ticket, CreditCard } from 'lucide-react';

const Profile = () => {
  const { toast } = useToast();
  const { getBookingHistory } = useBooking();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-01-15',
    address: '123 Main St, City, State 12345'
  });

  const bookingHistory = getBookingHistory();

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account information and view booking history</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile Info</TabsTrigger>
            <TabsTrigger value="bookings">Booking History ({bookingHistory.length})</TabsTrigger>
            <TabsTrigger value="payments">Payment Methods</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>
                      Update your account details and personal information
                    </CardDescription>
                  </div>
                  <Button
                    variant={isEditing ? "default" : "outline"}
                    onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                    className={isEditing ? "bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500" : ""}
                  >
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="dob"
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="address"
                      value={profileData.address}
                      onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="h-5 w-5" />
                  Booking History
                </CardTitle>
                <CardDescription>
                  View all your past and upcoming movie bookings ({bookingHistory.length} total)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {bookingHistory.length > 0 ? (
                  <div className="space-y-4">
                    {bookingHistory.map((booking) => (
                      <Card key={booking.id} className="border border-gray-200">
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <h3 className="font-semibold text-lg">{booking.movie}</h3>
                              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                <p><strong>Date:</strong> {booking.date}</p>
                                <p><strong>Showtime:</strong> {booking.showtime}</p>
                                <p><strong>Seats:</strong> {booking.seats.join(', ')}</p>
                                <p><strong>Amount:</strong> ${booking.amount}</p>
                              </div>
                              <p className="text-xs text-gray-500">
                                Booking ID: {booking.id} | Booked on: {booking.bookingDate}
                              </p>
                            </div>
                            <Badge 
                              variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                              className={booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : ''}
                            >
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Ticket className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg mb-2">No booking history found</p>
                    <p className="text-gray-400 text-sm">Your movie bookings will appear here once you make a reservation.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Methods
                </CardTitle>
                <CardDescription>
                  Manage your saved payment methods and billing information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Card className="border border-gray-200">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-8 w-8 text-blue-600" />
                        <div>
                          <p className="font-medium">•••• •••• •••• 1234</p>
                          <p className="text-sm text-gray-500">Expires 12/26</p>
                        </div>
                      </div>
                      <Badge>Primary</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Button 
                  variant="outline" 
                  className="w-full border-orange-200 text-orange-600 hover:bg-orange-50"
                >
                  Add New Payment Method
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
