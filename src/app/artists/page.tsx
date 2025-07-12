'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Music, Heart, Share2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Link from 'next/link';

interface Artist {
  id: string;
  name: string;
  photoUrl: string;
  bio: string;
  genre: string;
  totalTips: number;
  songs: Array<{
    id: string;
    name: string;
    description: string;
    previewUrl: string;
    totalTips: number;
  }>;
}

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const genres = ['All', 'Pop', 'Rock', 'Hip Hop', 'Electronic', 'Jazz', 'Classical', 'Country', 'R&B', 'Indie'];

  useEffect(() => {
    fetchArtists();
  }, []);

  useEffect(() => {
    filterArtists();
  }, [artists, searchTerm, selectedGenre]);

  const fetchArtists = async () => {
    try {
      const response = await fetch('/api/artists');
      const data = await response.json();
      
      if (response.ok) {
        setArtists(data.artists);
      } else {
        console.error('Failed to fetch artists:', data.error);
      }
    } catch (error) {
      console.error('Error fetching artists:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterArtists = () => {
    let filtered = artists;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(artist =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.genre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by genre
    if (selectedGenre && selectedGenre !== 'All') {
      filtered = filtered.filter(artist =>
        artist.genre.toLowerCase() === selectedGenre.toLowerCase()
      );
    }

    setFilteredArtists(filtered);
  };

  const shareArtist = (artist: Artist) => {
    if (navigator.share) {
      navigator.share({
        title: `Check out ${artist.name} on MusicBae`,
        text: `Discover amazing music by ${artist.name}`,
        url: `${window.location.origin}/artists/${artist.id}`,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/artists/${artist.id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Discover Artists
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Explore amazing musicians and support them through our tipping platform
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 space-y-4"
          >
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <input
                type="text"
                placeholder="Search artists or genres..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field w-full pl-10"
              />
            </div>

            {/* Genre Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre === 'All' ? '' : genre)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    (selectedGenre === genre) || (genre === 'All' && !selectedGenre)
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Artists Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredArtists.map((artist, index) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="music-card group"
              >
                {/* Artist Image */}
                <div className="relative mb-4">
                  <div className="w-full h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                    {artist.photoUrl ? (
                      <img
                        src={artist.photoUrl}
                        alt={artist.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <Music className="w-16 h-16 text-white/40" />
                    )}
                  </div>
                  <button
                    onClick={() => shareArtist(artist)}
                    className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white/80 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Artist Info */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white">{artist.name}</h3>
                  <p className="text-purple-400 font-medium">{artist.genre}</p>
                  <p className="text-white/70 text-sm line-clamp-2">{artist.bio}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-green-400">
                      <Heart className="w-4 h-4" />
                      <span>${artist.totalTips}</span>
                    </div>
                    <span className="text-white/60">{artist.songs.length} songs</span>
                  </div>

                  {/* Action Button */}
                  <Link href={`/artists/${artist.id}`}>
                    <button className="btn-primary w-full mt-4">
                      View Profile
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* No Results */}
          {filteredArtists.length === 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Music className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No artists found</h3>
              <p className="text-white/60">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 