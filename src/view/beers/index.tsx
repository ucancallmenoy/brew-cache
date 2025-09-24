'use client';

import { useCategoryBySlug, usePostsByCategory } from '@/hooks/wordpress';
import Link from 'next/link';
import BeersGrid from '@/components/BeersGrid';

export default function BeersView() {
  const { data: category, isLoading: categoryLoading, error: categoryError } = useCategoryBySlug('beer-reviews');
  const { data: beers = [], isLoading: beersLoading, error: beersError } = usePostsByCategory(category?.id || 0);

  if (categoryLoading || beersLoading) {
    return (
      <div className="bg-background-light min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary mx-auto mb-6"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">🍺</span>
            </div>
          </div>
          <h3 className="text-xl font-serif font-bold text-primary mb-2">Loading Beer Reviews</h3>
          <p className="text-text-light">Pouring the perfect selection...</p>
        </div>
      </div>
    );
  }

  if (categoryError || beersError || !category) {
    return (
      <div className="bg-background-light min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">🍺</div>
          <h3 className="text-2xl font-serif font-bold text-primary mb-4">Oops! Something went wrong</h3>
          <p className="text-text-light text-lg">Unable to load the beer reviews. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-light min-h-screen">
      {/* Redesigned Hero Section with Dark Brown Theme */}
      <section className="relative bg-gradient-to-br from-[#3E2723] via-[#5D4037] to-[#4E342E] py-24 px-4 overflow-hidden">
        {/* Unique Beer Glass Silhouette Pattern Background */}
        <div className="absolute inset-0 opacity-8">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="beerGlasses" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M20 10 L20 70 L15 80 L15 85 L25 85 L25 80 L20 70 Z" fill="none" stroke="#8D6E63" strokeWidth="1" opacity="0.3" />
                <path d="M60 10 L60 70 L55 80 L55 85 L65 85 L65 80 L60 70 Z" fill="none" stroke="#8D6E63" strokeWidth="1" opacity="0.3" />
                <path d="M80 10 L80 70 L75 80 L75 85 L85 85 L85 80 L80 70 Z" fill="none" stroke="#8D6E63" strokeWidth="1" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#beerGlasses)" />
          </svg>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <span className="text-white/90 text-sm font-medium">Team-Tasted Beers</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            Beers We&rsquo;ve <span className="text-accent">Tasted</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            Discover our team&rsquo;s honest reviews and tasting notes from craft beers we&rsquo;ve personally sampled. From hoppy IPAs to rich stouts, get insider insights on what makes each brew special.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/blogs?category=beer-reviews" className="bg-accent hover:bg-accent/90 text-primary px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-block text-center">
              Read Reviews
            </Link>
          </div>
        </div>
      </section>

      <BeersGrid beers={beers} />

      {/* Newsletter Section */}
      <section className="relative bg-gradient-to-r from-primary via-secondary to-accent py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="beerFoam" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="#ffffff" opacity="0.8" />
                <circle cx="10" cy="10" r="0.5" fill="#ffffff" opacity="0.6" />
                <circle cx="30" cy="30" r="0.8" fill="#ffffff" opacity="0.7" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#beerFoam)" />
          </svg>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <div className="text-4xl mb-6">📬</div>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Stay in the Loop
            </h3>
            <p className="text-white/90 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
              Get the latest beer reviews, tasting notes, and brewery news delivered straight to your inbox. Join our community of craft beer enthusiasts.
            </p>
            
            <div className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  className="flex-1 rounded-full px-6 py-4 bg-white/20 backdrop-blur-sm placeholder-white/70 text-white outline-none focus:ring-2 focus:ring-accent border border-white/30 focus:border-white/50 transition-all duration-300" 
                  placeholder="Enter your email address" 
                  type="email" 
                />
                <button className="bg-accent hover:bg-accent/90 text-primary rounded-full px-8 py-4 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 whitespace-nowrap">
                  Subscribe Now
                </button>
              </div>
              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}