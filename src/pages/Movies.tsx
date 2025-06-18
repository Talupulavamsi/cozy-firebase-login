
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
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=600&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=600&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=600&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=600&fit=crop',
      description: 'Greed and class discrimination threaten the newly formed symbiotic relationship.',
      showtimes: ['2:00 PM', '6:00 PM', '10:00 PM'],
      language: 'Korean'
    },
    {
      id: '6',
      title: 'Dune: Part Two',
      genre: 'Sci-Fi/Adventure',
      duration: '2h 46m',
      rating: 4.4,
      price: 17.99,
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop',
      description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators.',
      showtimes: ['11:30 AM', '3:30 PM', '7:30 PM', '10:45 PM'],
      language: 'English'
    }
  ];

  const languages = ['all', 'English', 'Hindi', 'Korean'];
  const genres = ['all', 'Action/Adventure', 'Action/Drama', 'Sci-Fi/Adventure', 'Thriller/Drama'];

  const filteredMovies = movies.filter(movie => {
    const searchLower = searchQuery.toLowerCase().trim();
    const titleMatch = movie.title.toLowerCase().includes(searchLower);
    const descriptionMatch = movie.description.toLowerCase().includes(searchLower);
    const genreMatch = movie.genre.toLowerCase().includes(searchLower);
    
    const matchesSearch = searchQuery === '' || titleMatch || descriptionMatch || genreMatch;
    const matchesLanguage = selectedLanguage === 'all' || movie.language === selectedLanguage;
    const matchesGenre = selectedGenre === 'all' || movie.genre === selectedGenre;
    
    return matchesSearch && matchesLanguage && matchesGenre;
  });

  const handleBookTicket = (movie: Movie) => {
    navigate('/booking', { state: { movie } });
  };

  const handleHelp = () => {
    navigate('/help');
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedLanguage('all');
    setSelectedGenre('all');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">Now Showing</h1>
              <p className="text-gray-300 text-lg">Discover and book your favorite movies</p>
            </div>
            <Button
              onClick={handleHelp}
              variant="outline"
              className="border-purple-400 text-purple-300 hover:bg-purple-800 hover:text-white transition-all duration-300"
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              Help
            </Button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search movies by title, genre, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:bg-white/30 transition-all duration-300"
              />
            </div>
            
            <div className="flex gap-4">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-48 h-12 bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder="Select Language" />
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
                <SelectTrigger className="w-56 h-12 bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder="Select Genre" />
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

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Filter className="h-4 w-4" />
              Showing {filteredMovies.length} of {movies.length} movies
            </div>
            
            {(searchQuery !== '' || selectedLanguage !== 'all' || selectedGenre !== 'all') && (
              <Button
                onClick={clearAllFilters}
                variant="outline"
                size="sm"
                className="border-purple-400 text-purple-300 hover:bg-purple-700 hover:text-white"
              >
                Clear All Filters
              </Button>
            )}
          </div>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <Card key={movie.id} className="group backdrop-blur-sm bg-white/10 border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:scale-105">
              <div className="relative overflow-hidden">
                <img 
                  src={movie.image} 
                  alt={movie.title}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1489599433114-0134b4b7b4b8?w=400&h=600&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-3 py-1">
                  ${movie.price}
                </Badge>
                <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold px-3 py-1">
                  {movie.language}
                </Badge>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{movie.rating}</span>
                    <Clock className="h-4 w-4 ml-2" />
                    <span className="text-sm">{movie.duration}</span>
                  </div>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-white group-hover:text-purple-300 transition-colors duration-300">
                  {movie.title}
                </CardTitle>
                <Badge variant="secondary" className="w-fit bg-purple-600/20 text-purple-200 border-purple-400/30">
                  {movie.genre}
                </Badge>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-sm text-gray-300 mb-4 line-clamp-2">{movie.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2 text-white">
                    <Calendar className="h-4 w-4" />
                    Showtimes
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {movie.showtimes.slice(0, 3).map((time, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-purple-400/50 text-purple-300 hover:bg-purple-600/20">
                        {time}
                      </Badge>
                    ))}
                    {movie.showtimes.length > 3 && (
                      <Badge variant="outline" className="text-xs border-gray-400/50 text-gray-400">
                        +{movie.showtimes.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleBookTicket(movie)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Book Tickets
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results State */}
        {filteredMovies.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">No movies found</h3>
              <p className="text-gray-300 text-lg mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button 
                onClick={clearAllFilters}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-3"
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;
