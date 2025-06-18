
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, CreditCard, Lock, Calendar, User } from 'lucide-react';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const bookingData = location.state;

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [processing, setProcessing] = useState(false);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) {
      setCardNumber(formatted);
    }
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    if (formatted.length <= 5) {
      setExpiryDate(formatted);
    }
  };

  const validatePaymentForm = () => {
    if (paymentMethod === 'card') {
      if (!cardNumber.replace(/\s/g, '') || cardNumber.replace(/\s/g, '').length < 16) {
        toast({
          title: "Invalid Card Number",
          description: "Please enter a valid 16-digit card number",
          variant: "destructive",
        });
        return false;
      }
      if (!expiryDate || expiryDate.length < 5) {
        toast({
          title: "Invalid Expiry Date",
          description: "Please enter a valid expiry date (MM/YY)",
          variant: "destructive",
        });
        return false;
      }
      if (!cvv || cvv.length < 3) {
        toast({
          title: "Invalid CVV",
          description: "Please enter a valid CVV",
          variant: "destructive",
        });
        return false;
      }
      if (!cardName.trim()) {
        toast({
          title: "Cardholder Name Required",
          description: "Please enter the cardholder name",
          variant: "destructive",
        });
        return false;
      }
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validatePaymentForm()) {
      return;
    }

    setProcessing(true);
    
    // Simulate payment processing with realistic delay
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setProcessing(false);
      toast({
        title: "Payment Successful!",
        description: "Your tickets have been booked successfully",
      });
      
      navigate('/booking-confirmation', {
        state: {
          ...bookingData,
          paymentMethod,
          transactionId: 'TXN' + Date.now(),
          bookingDate: new Date().toISOString(),
          cardLast4: cardNumber.slice(-4).replace(/\s/g, '')
        }
      });
    } catch (error) {
      setProcessing(false);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg">
          <CardContent className="p-8 text-center">
            <p className="text-lg mb-4">No booking data found.</p>
            <Button onClick={() => navigate('/movies')}>Return to Movies</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button 
            onClick={() => navigate(-1)}
            variant="outline"
            className="mb-4 border-orange-200 text-orange-600 hover:bg-orange-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Seat Selection
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment</h1>
          <p className="text-gray-600">Complete your booking payment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payment Form */}
          <div>
            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Details
                </CardTitle>
                <CardDescription>
                  Enter your payment information securely
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="payment-method">Payment Method</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="card">Credit/Debit Card</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="apple">Apple Pay</SelectItem>
                      <SelectItem value="google">Google Pay</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {paymentMethod === 'card' && (
                  <>
                    <div>
                      <Label htmlFor="card-name">Cardholder Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="card-name"
                          placeholder="John Doe"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="card-number">Card Number</Label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="card-number"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={expiryDate}
                            onChange={handleExpiryDateChange}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <Button 
                  onClick={handlePayment}
                  className="w-full bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500"
                  disabled={processing}
                >
                  {processing ? 'Processing Payment...' : `Pay $${bookingData.totalPrice.toFixed(2)}`}
                </Button>

                <div className="flex items-center justify-center text-sm text-gray-500 mt-4">
                  <Lock className="h-4 w-4 mr-2" />
                  Your payment information is secure and encrypted
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{bookingData.movie.title}</h3>
                  <p className="text-gray-600">{bookingData.movie.genre}</p>
                  <p className="text-gray-600">Duration: {bookingData.movie.duration}</p>
                  <p className="text-gray-600">Language: {bookingData.movie.language}</p>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Showtime:</span>
                    <span>{bookingData.showtime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Seats:</span>
                    <span>{bookingData.seats.map((seat: any) => seat.id).join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Number of Tickets:</span>
                    <span>{bookingData.seats.length}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="space-y-2">
                    {bookingData.seats.map((seat: any) => (
                      <div key={seat.id} className="flex justify-between text-sm">
                        <span>Seat {seat.id}</span>
                        <span>${seat.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${bookingData.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
