import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Search, Star, Clock, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Movies = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('Telugu');
  const [selectedGenre, setSelectedGenre] = useState('all');

  const movies = [
    {
      id: '1',
      title: 'Oppenheimer',
      genre: 'Drama',
      language: 'English',
      duration: '3h',
      rating: '9.3',
      image: '/oppenheimer.jpg',
      releaseDate: '2023-07-21',
      showtimes: ['12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM'],
    },
    {
      id: '2',
      title: 'RRR',
      genre: 'Action',
      language: 'Telugu',
      duration: '3h 7m',
      rating: '8.8',
      image: '/rrr.jpg',
      releaseDate: '2022-03-25',
      showtimes: ['2:30 PM', '5:30 PM', '8:30 PM'],
    },
    {
      id: '3',
      title: 'K.G.F: Chapter 2',
      genre: 'Action',
      language: 'Kannada',
      duration: '2h 48m',
      rating: '8.4',
      image: '/kgf2.jpg',
      releaseDate: '2022-04-14',
      showtimes: ['1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM'],
    },
    {
      id: '4',
      title: 'Pushpa: The Rise',
      genre: 'Action',
      language: 'Telugu',
      duration: '2h 59m',
      rating: '7.6',
      image: '/pushpa.jpg',
      releaseDate: '2021-12-17',
      showtimes: ['11:30 AM', '2:30 PM', '5:30 PM'],
    },
    {
      id: '5',
      title: 'Baahubali: The Beginning',
      genre: 'Action',
      language: 'Telugu',
      duration: '2h 39m',
      rating: '8.2',
      image: '/baahubali.jpg',
      releaseDate: '2015-07-10',
      showtimes: ['3:30 PM', '6:30 PM', '9:30 PM'],
    },
    {
      id: '6',
      title: 'Avengers: Endgame',
      genre: 'Action',
      language: 'English',
      duration: '3h 2m',
      rating: '8.4',
      image: '/avengers.jpg',
      releaseDate: '2019-04-26',
      showtimes: ['12:30 PM', '4:30 PM', '8:30 PM'],
    },
    {
      id: '7',
      title: 'Interstellar',
      genre: 'Sci-Fi',
      language: 'English',
      duration: '2h 49m',
      rating: '8.6',
      image: '/interstellar.jpg',
      releaseDate: '2014-11-07',
      showtimes: ['1:30 PM', '5:30 PM', '9:30 PM'],
    },
  ];

  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          movie.genre.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLanguage = selectedLanguage === 'all' || movie.language === selectedLanguage;
      const matchesGenre = selectedGenre === 'all' || movie.genre.toLowerCase().includes(selectedGenre.toLowerCase());
      
      return matchesSearch && matchesLanguage && matchesGenre;
    });
  }, [searchTerm, selectedLanguage, selectedGenre]);

  const handleBookNow = (movieTitle: string) => {
    navigate('/booking', { 
      state: { 
        movie: movieTitle,
        language: selectedLanguage 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Now Showing</h1>
          <p className="text-gray-600">Book your favorite movies and enjoy the cinema experience</p>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-1">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search movies..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="md:col-span-1">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                <SelectItem value="Telugu">Telugu</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Kannada">Kannada</SelectItem>
                <SelectItem value="Hindi">Hindi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-1">
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                <SelectItem value="action">Action</SelectItem>
                <SelectItem value="drama">Drama</SelectItem>
                <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                <SelectItem value="comedy">Comedy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <Card key={movie.id} className="group hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-white/90 border-0 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-yellow-500 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      {movie.rating}
                    </Badge>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-orange-500 text-white">
                      {movie.language}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-bold line-clamp-1">{movie.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    {movie.genre}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {movie.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {movie.releaseDate}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {movie.showtimes.slice(0, 3).map((time, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {time}
                        </Badge>
                      ))}
                      {movie.showtimes.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{movie.showtimes.length - 3} more
                        </Badge>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500 text-white font-medium"
                      onClick={() => handleBookNow(movie.title)}
                    >
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No movies found matching your criteria</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Movies;
