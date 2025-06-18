
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BookingItem {
  id: string;
  movie: string;
  date: string;
  showtime: string;
  seats: string[];
  amount: number;
  status: 'confirmed' | 'completed' | 'cancelled';
  bookingDate: string;
}

interface BookingContextType {
  bookings: BookingItem[];
  addBooking: (booking: Omit<BookingItem, 'id' | 'bookingDate'>) => void;
  getBookingHistory: () => BookingItem[];
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<BookingItem[]>([
    {
      id: 'TXN1234567890',
      movie: 'Avatar: The Way of Water',
      date: '2024-01-15',
      showtime: '7:00 PM',
      seats: ['A5', 'A6'],
      amount: 31.98,
      status: 'confirmed',
      bookingDate: '2024-01-10'
    },
    {
      id: 'TXN1234567891',
      movie: 'Top Gun: Maverick',
      date: '2024-01-10',
      showtime: '9:00 PM',
      seats: ['C3', 'C4'],
      amount: 29.98,
      status: 'completed',
      bookingDate: '2024-01-05'
    }
  ]);

  const addBooking = (booking: Omit<BookingItem, 'id' | 'bookingDate'>) => {
    const newBooking: BookingItem = {
      ...booking,
      id: `TXN${Date.now()}`,
      bookingDate: new Date().toISOString().split('T')[0]
    };
    setBookings(prev => [newBooking, ...prev]);
  };

  const getBookingHistory = () => {
    return bookings.sort((a, b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime());
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, getBookingHistory }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
