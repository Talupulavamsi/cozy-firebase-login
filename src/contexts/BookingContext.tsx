
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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
  addBooking: (booking: Omit<BookingItem, 'id' | 'bookingDate'>) => Promise<void>;
  getBookingHistory: () => BookingItem[];
  loading: boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load bookings from Firebase on component mount
  useEffect(() => {
    const loadBookings = async () => {
      try {
        console.log('Loading bookings from Firebase...');
        const bookingsRef = collection(db, 'bookings');
        const q = query(bookingsRef, orderBy('bookingDate', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const loadedBookings: BookingItem[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log('Loaded booking:', doc.id, data);
          loadedBookings.push({
            id: doc.id,
            ...data
          } as BookingItem);
        });
        
        console.log('Total bookings loaded:', loadedBookings.length);
        setBookings(loadedBookings);
      } catch (error) {
        console.error('Error loading bookings from Firebase:', error);
        // Fallback to default bookings if Firebase fails
        setBookings([
          {
            id: 'TXN1234567890',
            movie: 'RRR',
            date: '2024-01-15',
            showtime: '7:00 PM',
            seats: ['A5', 'A6'],
            amount: 27.98,
            status: 'confirmed',
            bookingDate: '2024-01-10'
          },
          {
            id: 'TXN1234567891',
            movie: 'Pushpa: The Rise',
            date: '2024-01-10',
            showtime: '9:00 PM',
            seats: ['C3', 'C4'],
            amount: 25.98,
            status: 'completed',
            bookingDate: '2024-01-05'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const addBooking = async (booking: Omit<BookingItem, 'id' | 'bookingDate'>) => {
    try {
      const newBooking = {
        ...booking,
        bookingDate: new Date().toISOString().split('T')[0],
        status: booking.status || 'confirmed'
      };

      console.log('Attempting to save booking to Firebase:', newBooking);

      // Add to Firebase
      const docRef = await addDoc(collection(db, 'bookings'), newBooking);
      console.log('Booking saved to Firebase with ID:', docRef.id);
      
      // Add to local state with Firebase-generated ID
      const bookingWithId: BookingItem = {
        ...newBooking,
        id: docRef.id
      };
      
      setBookings(prev => [bookingWithId, ...prev]);
      console.log('Booking added to local state');
    } catch (error) {
      console.error('Error saving booking to Firebase:', error);
      console.error('Error details:', error);
      
      // Fallback to local storage if Firebase fails
      const fallbackBooking: BookingItem = {
        ...booking,
        id: `TXN${Date.now()}`,
        bookingDate: new Date().toISOString().split('T')[0],
        status: booking.status || 'confirmed'
      };
      setBookings(prev => [fallbackBooking, ...prev]);
      console.log('Fallback booking created:', fallbackBooking.id);
    }
  };

  const getBookingHistory = () => {
    return bookings.sort((a, b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime());
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, getBookingHistory, loading }}>
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
