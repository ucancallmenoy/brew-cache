'use client'

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg border-b-2 border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3" onClick={() => setIsMenuOpen(false)}>
              <Image
                src="/logo.png"
                alt="Brew Cache Logo"
                width={100}
                height={100}
                className="h-20 w-auto"
              />
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold text-primary font-serif">
                  Brew Cache
                </h1>
                <p className="text-xs text-secondary font-medium">
                  Craft Beer Chronicles
                </p>
              </div>
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className="text-text hover:text-primary px-4 py-2 text-sm font-medium transition-colors duration-200 relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/blogs" 
              className="text-text hover:text-primary px-4 py-2 text-sm font-medium transition-colors duration-200 relative group"
            >
              Beer Blogs
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/beers" 
              className="text-text hover:text-primary px-4 py-2 text-sm font-medium transition-colors duration-200 relative group"
            >
              Beers
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/about" 
              className="text-text hover:text-primary px-4 py-2 text-sm font-medium transition-colors duration-200 relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/contact" 
              className="text-text hover:text-primary px-4 py-2 text-sm font-medium transition-colors duration-200 relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-200 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link 
              href="/subscribe"
              className="bg-accent hover:bg-accent/90 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Subscribe
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-text hover:text-primary focus:outline-none focus:text-primary transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <nav className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                href="/" 
                className="block px-3 py-2 text-base font-medium text-text hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/blogs" 
                className="block px-3 py-2 text-base font-medium text-text hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Beer Blogs
              </Link>
              <Link 
                href="/beers" 
                className="block px-3 py-2 text-base font-medium text-text hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Beers
              </Link>
              <Link 
                href="/about" 
                className="block px-3 py-2 text-base font-medium text-text hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="block px-3 py-2 text-base font-medium text-text hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 pb-2">
                <Link 
                  href="/subscribe"
                  className="block w-full bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-full text-base font-medium text-center transition-all duration-200 shadow-md hover:shadow-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Subscribe
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}