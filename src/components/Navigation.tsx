'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Music, User, LogOut } from 'lucide-react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would come from auth context

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Music className="w-8 h-8 text-purple-400" />
            <span className="text-xl font-bold gradient-text">MusicBae</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.div whileHover={{ y: -2 }}>
              <Link href="/artists" className="text-white/80 hover:text-white transition-colors">
                Artists
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }}>
              <Link href="/about" className="text-white/80 hover:text-white transition-colors">
                About
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }}>
              <Link href="/faqs" className="text-white/80 hover:text-white transition-colors">
                FAQs
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }}>
              <Link href="/contact" className="text-white/80 hover:text-white transition-colors">
                Contact
              </Link>
            </motion.div>
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <button className="btn-secondary flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Dashboard
                  </button>
                </Link>
                <button className="text-white/80 hover:text-white transition-colors">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login">
                  <button className="text-white/80 hover:text-white transition-colors">
                    Login
                  </button>
                </Link>
                <Link href="/register">
                  <button className="btn-primary">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white/80 hover:text-white transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-effect border-t border-white/20"
          >
            <div className="px-4 py-6 space-y-4">
              <Link 
                href="/artists" 
                className="block text-white/80 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Artists
              </Link>
              <Link 
                href="/about" 
                className="block text-white/80 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/faqs" 
                className="block text-white/80 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQs
              </Link>
              <Link 
                href="/contact" 
                className="block text-white/80 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              {isLoggedIn ? (
                <div className="space-y-4 pt-4 border-t border-white/20">
                  <Link href="/dashboard">
                    <button className="btn-secondary w-full flex items-center justify-center gap-2">
                      <User className="w-4 h-4" />
                      Dashboard
                    </button>
                  </Link>
                  <button className="w-full text-white/80 hover:text-white transition-colors flex items-center gap-2">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-4 pt-4 border-t border-white/20">
                  <Link href="/login">
                    <button className="w-full text-white/80 hover:text-white transition-colors">
                      Login
                    </button>
                  </Link>
                  <Link href="/register">
                    <button className="btn-primary w-full">
                      Sign Up
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 