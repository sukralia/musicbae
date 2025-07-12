'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Music, Heart, DollarSign, Users, Star, ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';

export default function Home() {
  const [stats, setStats] = useState({
    totalTips: 0,
    artists: 0,
    songs: 0,
  });

  useEffect(() => {
    // Simulate loading stats
    const timer = setTimeout(() => {
      setStats({
        totalTips: 15420,
        artists: 127,
        songs: 483,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-4 py-12">
      <Navigation />
      <div className="w-full max-w-6xl mx-auto text-center space-y-16">
        {/* Hero Section */}
        <section className="pt-32 pb-8">
          <h1 className="text-7xl md:text-8xl font-artist font-extrabold text-white text-glow mb-6 drop-shadow-2xl animate-float">
            MusicBae
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 mb-8 font-light animate-float" style={{ animationDelay: '0.5s' }}>
            Music Before Anyone Else
          </p>
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto animate-float" style={{ animationDelay: '1s' }}>
            Discover and support emerging artists through our revolutionary tipping platform. <span className="font-bold text-yellow-300">Create</span>, <span className="font-bold text-pink-300">Share</span>, <span className="font-bold text-purple-300">Receive</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-8">
            <Link href="/register?role=artist">
              <button className="btn-neon flex items-center gap-3 text-xl">
                <span className="animate-float">🎤</span> Join as Artist
              </button>
            </Link>
            <Link href="/register?role=fan">
              <button className="btn-neon flex items-center gap-3 text-xl">
                <span className="animate-float" style={{ animationDelay: '0.7s' }}>🎧</span> Join as Fan
              </button>
            </Link>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="glass-card p-10 flex flex-col items-center animated-border">
            <span className="text-5xl mb-3 animate-float">💸</span>
            <h3 className="text-4xl font-bold text-white mb-2">${stats.totalTips.toLocaleString()}</h3>
            <p className="text-white/80 text-lg">Total Tips Given</p>
          </div>
          <div className="glass-card p-10 flex flex-col items-center animated-border">
            <span className="text-5xl mb-3 animate-float" style={{ animationDelay: '0.3s' }}>🧑‍🎤</span>
            <h3 className="text-4xl font-bold text-white mb-2">{stats.artists}</h3>
            <p className="text-white/80 text-lg">Active Artists</p>
          </div>
          <div className="glass-card p-10 flex flex-col items-center animated-border">
            <span className="text-5xl mb-3 animate-float" style={{ animationDelay: '0.6s' }}>🎵</span>
            <h3 className="text-4xl font-bold text-white mb-2">{stats.songs}</h3>
            <p className="text-white/80 text-lg">Songs Available</p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-10">
          <h2 className="text-5xl md:text-6xl font-artist font-extrabold text-white text-glow mb-14">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="glass-card p-8 flex flex-col items-center">
              <span className="text-4xl mb-5 animate-float">🎤</span>
              <h3 className="text-2xl font-bold text-pink-200 mb-3">For Artists</h3>
              <ul className="text-white/90 text-left space-y-2 text-lg">
                <li>• Upload your best 4 songs</li>
                <li>• Get discovered by fans worldwide</li>
                <li>• Receive tips directly to your tip jar</li>
                <li>• Withdraw earnings (15% platform fee)</li>
              </ul>
            </div>
            <div className="glass-card p-8 flex flex-col items-center">
              <span className="text-4xl mb-5 animate-float" style={{ animationDelay: '0.3s' }}>🎧</span>
              <h3 className="text-2xl font-bold text-yellow-200 mb-3">For Fans</h3>
              <ul className="text-white/90 text-left space-y-2 text-lg">
                <li>• Discover fresh, high-quality music</li>
                <li>• Tip artists you love (default $5)</li>
                <li>• Get high-res downloads instantly</li>
                <li>• Play in our custom DJ boombox</li>
              </ul>
            </div>
            <div className="glass-card p-8 flex flex-col items-center">
              <span className="text-4xl mb-5 animate-float" style={{ animationDelay: '0.6s' }}>🌟</span>
              <h3 className="text-2xl font-bold text-purple-200 mb-3">Early Access</h3>
              <ul className="text-white/90 text-left space-y-2 text-lg">
                <li>• Get music before public release</li>
                <li>• Support artists directly</li>
                <li>• Build meaningful connections</li>
                <li>• Be part of the creative journey</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10">
          <h2 className="text-5xl md:text-6xl font-artist font-extrabold text-white text-glow mb-8">Ready to Get Started?</h2>
          <p className="text-2xl text-white/80 mb-10">Join thousands of artists and fans already using MusicBae</p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Link href="/artists">
              <button className="btn-neon text-xl">Discover Artists</button>
            </Link>
            <Link href="/register">
              <button className="btn-neon text-xl">Create Account</button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
