'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Heart, DollarSign, Upload, Download, Settings } from 'lucide-react';
import Navigation from '@/components/Navigation';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'artist' | 'fan';
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, []);

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

  if (!user) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Please log in to access your dashboard</h1>
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
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Welcome back, {user.name}!
            </h1>
            <p className="text-white/70">
              {user.role === 'artist' ? 'Manage your music and track your earnings' : 'Access your downloaded music and support artists'}
            </p>
          </motion.div>

          {user.role === 'artist' ? (
            <ArtistDashboard />
          ) : (
            <FanDashboard />
          )}
        </div>
      </div>
    </div>
  );
}

function ArtistDashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="music-card text-center">
          <DollarSign className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">$0.00</h3>
          <p className="text-white/70">Tip Jar Balance</p>
        </div>
        <div className="music-card text-center">
          <Music className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">0</h3>
          <p className="text-white/70">Songs Uploaded</p>
        </div>
        <div className="music-card text-center">
          <Heart className="w-12 h-12 text-pink-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">0</h3>
          <p className="text-white/70">Total Tips</p>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="music-card"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="btn-primary flex items-center justify-center gap-2">
            <Upload className="w-5 h-5" />
            Upload New Song
          </button>
          <button className="btn-secondary flex items-center justify-center gap-2">
            <Settings className="w-5 h-5" />
            Edit Profile
          </button>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="music-card"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
        <div className="text-center py-8">
          <Music className="w-16 h-16 text-white/40 mx-auto mb-4" />
          <p className="text-white/60">No recent activity</p>
          <p className="text-white/40 text-sm">Start by uploading your first song!</p>
        </div>
      </motion.div>
    </div>
  );
}

function FanDashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="music-card text-center">
          <Download className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">0</h3>
          <p className="text-white/70">Songs Downloaded</p>
        </div>
        <div className="music-card text-center">
          <Heart className="w-12 h-12 text-pink-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">0</h3>
          <p className="text-white/70">Artists Supported</p>
        </div>
        <div className="music-card text-center">
          <DollarSign className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">$0.00</h3>
          <p className="text-white/70">Total Tips Given</p>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="music-card"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="btn-primary flex items-center justify-center gap-2">
            <Music className="w-5 h-5" />
            Discover Artists
          </button>
          <button className="btn-secondary flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            My Downloads
          </button>
        </div>
      </motion.div>

      {/* Downloaded Music */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="music-card"
      >
        <h2 className="text-2xl font-bold text-white mb-6">My Music Library</h2>
        <div className="text-center py-8">
          <Music className="w-16 h-16 text-white/40 mx-auto mb-4" />
          <p className="text-white/60">No downloaded songs yet</p>
          <p className="text-white/40 text-sm">Start discovering and supporting artists!</p>
        </div>
      </motion.div>
    </div>
  );
} 