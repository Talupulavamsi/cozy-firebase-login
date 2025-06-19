
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Calendar, Clock, MapPin, CreditCard, Download, Home } from 'lucide-react';
import { useBooking } from '@/contexts/BookingContext';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addBooking } = useBooking();
  const bookingData = location.state;

  useEffect(() => {
    // Save booking to Firebase when component mounts
    if (bookingData) {
      const saveBooking = async () => {
        try {
          await addBooking({
            movie: bookingData.movie.title,
            date: new Date().toISOString().split('T')[0],
            showtime: bookingData.showtime,
            seats: bookingData.seats.map((seat: any) => seat.id),
            amount: bookingData.totalPrice,
            status: 'confirmed'
          });
          console.log('Booking saved successfully to Firebase');
        } catch (error) {
          console.error('Failed to save booking:', error);
        }
      };
      
      saveBooking();
    }
  }, [bookingData, addBooking]);

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No booking data found.</p>
      </div>
    );
  }

  const handleDownloadTicket = () => {
    // In a real app, this would generate a PDF ticket
    alert('Ticket download feature would be implemented here');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Your movie tickets have been successfully booked and saved</p>
        </div>

        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Booking Details
              <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Movie Info */}
            <div className="flex items-start gap-4">
              <img 
                src={bookingData.movie.image} 
                alt={bookingData.movie.title}
                className="w-20 h-28 object-cover rounded"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1489599433114-0134b4b7b4b8?w=400&h=600&fit=crop';
                }}
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{bookingData.movie.title}</h3>
                <p className="text-gray-600 mb-2">{bookingData.movie.genre}</p>
                <p className="text-sm text-gray-500">Duration: {bookingData.movie.duration}</p>
                <Badge className="mt-2 bg-blue-100 text-blue-800">{bookingData.movie.language}</Badge>
              </div>
            </div>

            {/* Booking Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{new Date().toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-500">Showtime</p>
                    <p className="font-medium">{bookingData.showtime}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-500">Seats</p>
                    <p className="font-medium">{bookingData.seats.map((seat: any) => seat.id).join(', ')}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-500">Total Paid</p>
                    <p className="font-medium">${bookingData.totalPrice.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Info */}
            <div className="border-t pt-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Booking ID</p>
                  <p className="font-mono">{bookingData.transactionId}</p>
                </div>
                <div>
                  <p className="text-gray-500">Payment Method</p>
                  <p className="capitalize">{bookingData.paymentMethod}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={handleDownloadTicket}
            className="flex-1 bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Ticket
          </Button>
          
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            className="flex-1 border-orange-200 text-orange-600 hover:bg-orange-50"
          >
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Important Notice */}
        <Card className="backdrop-blur-sm bg-blue-50/80 border-blue-200 shadow-lg mt-6">
          <CardContent className="pt-6">
            <h4 className="font-semibold text-blue-800 mb-2">Important Information</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Please arrive at least 15 minutes before showtime</li>
              <li>• Bring a valid ID for verification</li>
              <li>• Show this confirmation or your downloaded ticket at the entrance</li>
              <li>• Outside food and beverages are not allowed</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingConfirmation;
