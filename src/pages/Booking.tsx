
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Users, Clock, MapPin } from 'lucide-react';

interface Seat {
  id: string;
  row: string;
  number: number;
  isBooked: boolean;
  price: number;
}

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const movie = location.state?.movie;

  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [ticketQuantity, setTicketQuantity] = useState(1);

  // Generate seats for the theater
  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    
    rows.forEach(row => {
      for (let i = 1; i <= 10; i++) {
        seats.push({
          id: `${row}${i}`,
          row,
          number: i,
          isBooked: Math.random() < 0.3, // 30% chance of being booked
          price: row <= 'C' ? movie?.price + 5 : movie?.price || 15.99
        });
      }
    });
    
    return seats;
  };

  const [seats] = useState<Seat[]>(generateSeats());

  const handleSeatClick = (seat: Seat) => {
    if (seat.isBooked) return;
    
    const isSelected = selectedSeats.find(s => s.id === seat.id);
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else if (selectedSeats.length < ticketQuantity) {
      setSelectedSeats([...selectedSeats, seat]);
    } else {
      toast({
        title: "Seat Limit Reached",
        description: `You can only select ${ticketQuantity} seat(s)`,
        variant: "destructive",
      });
    }
  };

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  const handleProceedToPayment = () => {
    if (!selectedShowtime || selectedSeats.length === 0) {
      toast({
        title: "Incomplete Selection",
        description: "Please select showtime and seats",
        variant: "destructive",
      });
      return;
    }

    navigate('/payment', {
      state: {
        movie,
        showtime: selectedShowtime,
        seats: selectedSeats,
        totalPrice
      }
    });
  };

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No movie selected. Please go back and select a movie.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button 
            onClick={() => navigate('/movies')}
            variant="outline"
            className="mb-4 border-orange-200 text-orange-600 hover:bg-orange-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Movies
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Book Tickets</h1>
          <p className="text-gray-600">{movie.title}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Movie Info & Selection */}
          <div className="lg:col-span-1">
            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Select Showtime
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedShowtime} onValueChange={setSelectedShowtime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose time" />
                  </SelectTrigger>
                  <SelectContent>
                    {movie.showtimes.map((time: string, index: number) => (
                      <SelectItem key={index} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Number of Tickets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={ticketQuantity.toString()} onValueChange={(value) => setTicketQuantity(parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} Ticket{num > 1 ? 's' : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Movie:</strong> {movie.title}</p>
                  <p><strong>Showtime:</strong> {selectedShowtime || 'Not selected'}</p>
                  <p><strong>Seats:</strong> {selectedSeats.map(s => s.id).join(', ') || 'None selected'}</p>
                  <div className="border-t pt-2 mt-2">
                    <p className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Seat Selection */}
          <div className="lg:col-span-2">
            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Select Your Seats
                </CardTitle>
                <CardDescription>
                  Click on available seats to select them
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Screen */}
                <div className="w-full h-4 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg mb-8 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-600">
                    SCREEN
                  </div>
                </div>

                {/* Seats Grid */}
                <div className="space-y-2">
                  {['A', 'B', 'C', 'D', 'E', 'F'].map(row => (
                    <div key={row} className="flex items-center gap-2">
                      <div className="w-8 text-center font-medium text-gray-600">{row}</div>
                      <div className="flex gap-1">
                        {seats.filter(seat => seat.row === row).map(seat => (
                          <button
                            key={seat.id}
                            onClick={() => handleSeatClick(seat)}
                            disabled={seat.isBooked}
                            className={`
                              w-8 h-8 rounded text-xs font-medium transition-all
                              ${seat.isBooked 
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                : selectedSeats.find(s => s.id === seat.id)
                                  ? 'bg-orange-500 text-white'
                                  : 'bg-green-200 hover:bg-green-300 text-green-800'
                              }
                            `}
                          >
                            {seat.number}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="flex justify-center gap-6 mt-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-200 rounded"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    <span>Selected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-300 rounded"></div>
                    <span>Booked</span>
                  </div>
                </div>

                <Button 
                  onClick={handleProceedToPayment}
                  className="w-full mt-6 bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500"
                  disabled={selectedSeats.length === 0 || !selectedShowtime}
                >
                  Proceed to Payment (${totalPrice.toFixed(2)})
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
