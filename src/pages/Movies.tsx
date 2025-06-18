import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Star, Calendar, Search, Filter, HelpCircle } from 'lucide-react';
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
  language: string;
}

const Movies = () => {
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedGenre, setSelectedGenre] = useState('all');

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
      showtimes: ['10:00 AM', '2:00 PM', '6:00 PM', '10:00 PM'],
      language: 'English'
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
      showtimes: ['11:00 AM', '3:00 PM', '7:00 PM', '10:30 PM'],
      language: 'English'
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
      showtimes: ['12:00 PM', '4:00 PM', '8:00 PM', '11:00 PM'],
      language: 'English'
    },
    {
      id: '4',
      title: 'RRR',
      genre: 'Action/Drama',
      duration: '3h 7m',
      rating: 4.7,
      price: 13.99,
      image: 'https://images.unsplash.com/photo-1489599433114-0134b4b7b4b8?w=400&h=600&fit=crop',
      description: 'A fictional story about two legendary revolutionaries away from home before they started fighting for their country.',
      showtimes: ['1:00 PM', '5:00 PM', '9:00 PM'],
      language: 'Hindi'
    },
    {
      id: '5',
      title: 'Parasite',
      genre: 'Thriller/Drama',
      duration: '2h 12m',
      rating: 4.6,
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1489599433114-0134b4b7b4b8?w=400&h=600&fit=crop',
      description: 'Greed and class discrimination threaten the newly formed symbiotic relationship.',
      showtimes: ['2:00 PM', '6:00 PM', '10:00 PM'],
      language: 'Korean'
    }
  ];

  const languages = ['all', 'English', 'Hindi', 'Korean'];
  const genres = ['all', 'Action/Adventure', 'Action/Drama', 'Sci-Fi/Adventure', 'Thriller/Drama'];

  const filteredMovies = movies.filter(movie => {
    console.log('Search query:', searchQuery);
    console.log('Movie title:', movie.title);
    console.log('Movie description:', movie.description);
    
    const searchLower = searchQuery.toLowerCase().trim();
    const titleMatch = movie.title.toLowerCase().includes(searchLower);
    const descriptionMatch = movie.description.toLowerCase().includes(searchLower);
    const genreMatch = movie.genre.toLowerCase().includes(searchLower);
    
    const matchesSearch = searchQuery === '' || titleMatch || descriptionMatch || genreMatch;
    const matchesLanguage = selectedLanguage === 'all' || movie.language === selectedLanguage;
    const matchesGenre = selectedGenre === 'all' || movie.genre === selectedGenre;
    
    console.log('Matches search:', matchesSearch, 'Matches language:', matchesLanguage, 'Matches genre:', matchesGenre);
    
    return matchesSearch && matchesLanguage && matchesGenre;
  });

  console.log('Filtered movies count:', filteredMovies.length);

  const handleBookTicket = (movie: Movie) => {
    navigate('/booking', { state: { movie } });
  };

  const handleHelp = () => {
    navigate('/help');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold text-gray-800">Now Showing</h1>
            <Button
              onClick={handleHelp}
              variant="outline"
              className="border-orange-200 text-orange-600 hover:bg-orange-50"
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              Help
            </Button>
          </div>
          <p className="text-gray-600">Choose your favorite movie and book your tickets</p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-4">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((language) => (
                    <SelectItem key={language} value={language}>
                      {language === 'all' ? 'All Languages' : language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre === 'all' ? 'All Genres' : genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Filter className="h-4 w-4" />
            Showing {filteredMovies.length} of {movies.length} movies
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMovies.map((movie) => (
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
                <Badge className="absolute top-4 left-4 bg-blue-500 text-white">
                  {movie.language}
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

        {filteredMovies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No movies found matching your criteria.</p>
            <Button 
              onClick={() => {
                setSearchQuery('');
                setSelectedLanguage('all');
                setSelectedGenre('all');
              }}
              variant="outline"
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;
