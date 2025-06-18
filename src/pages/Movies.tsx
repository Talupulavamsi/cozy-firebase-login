
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Star, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Movie {
  id: string;
  title: string;
  genre: string;
  duration: string;
  rating: number;
  price: number;
  image: string;
  description: string;
  showtimes: string[];
}

const Movies = () => {
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const movies: Movie[] = [
    {
      id: '1',
      title: 'Avatar: The Way of Water',
      genre: 'Sci-Fi/Adventure',
      duration: '3h 12m',
      rating: 4.5,
      price: 15.99,
      image: 'https://images.unsplash.com/photo-1489599433114-0134b4b7b4b8?w=400&h=600&fit=crop',
      description: 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora.',
      showtimes: ['10:00 AM', '2:00 PM', '6:00 PM', '10:00 PM']
    },
    {
      id: '2',
      title: 'Top Gun: Maverick',
      genre: 'Action/Drama',
      duration: '2h 37m',
      rating: 4.8,
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1489599433114-0134b4b7b4b8?w=400&h=600&fit=crop',
      description: 'After thirty years, Maverick is still pushing the envelope as a top naval aviator.',
      showtimes: ['11:00 AM', '3:00 PM', '7:00 PM', '10:30 PM']
    },
    {
      id: '3',
      title: 'Black Panther: Wakanda Forever',
      genre: 'Action/Adventure',
      duration: '2h 41m',
      rating: 4.3,
      price: 16.99,
      image: 'https://images.unsplash.com/photo-1489599433114-0134b4b7b4b8?w=400&h=600&fit=crop',
      description: 'The people of Wakanda fight to protect their home from intervening world powers.',
      showtimes: ['12:00 PM', '4:00 PM', '8:00 PM', '11:00 PM']
    }
  ];

  const handleBookTicket = (movie: Movie) => {
    navigate('/booking', { state: { movie } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Now Showing</h1>
          <p className="text-gray-600">Choose your favorite movie and book your tickets</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <Card key={movie.id} className="backdrop-blur-sm bg-white/80 border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img 
                  src={movie.image} 
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-orange-500 text-white">
                  ${movie.price}
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl">{movie.title}</CardTitle>
                <CardDescription className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {movie.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {movie.rating}
                  </span>
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Badge variant="secondary" className="mb-3">{movie.genre}</Badge>
                <p className="text-sm text-gray-600 mb-4">{movie.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Showtimes
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {movie.showtimes.map((time, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {time}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleBookTicket(movie)}
                  className="w-full bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500"
                >
                  Book Tickets
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;
