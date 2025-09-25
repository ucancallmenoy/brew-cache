'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePosts, useCategories } from '@/hooks/wordpress';
import Link from 'next/link';
import BlogArticlesGrid from '@/components/BlogArticlesGrid';
import BlogCategoriesSection from '@/components/BlogCategoriesSection';

export default function BlogView() {
  const { data: posts = [], isLoading: postsLoading, error: postsError } = usePosts();
  const { data: categories = [], isLoading: categoriesLoading, error: categoriesError } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const hasScrolled = useRef(false);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState('');

  useEffect(() => {
    const categorySlug = searchParams.get('category');
    if (categorySlug && categories.length > 0) {
      const category = categories.find(cat => cat.slug === categorySlug);
      if (category) {
        setSelectedCategory(category.id);
        if (!hasScrolled.current) {
          setTimeout(() => {
            document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' });
            hasScrolled.current = true;
          }, 100);
        }
      }
    }
  }, [searchParams, categories]);

  const handleLatestReviews = () => {
    const category = categories.find(cat => cat.slug === 'beer-reviews');
    if (category) {
      setSelectedCategory(category.id);
      setTimeout(() => {
        document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsNewsletterSubmitting(true);
    setNewsletterMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      if (response.ok) {
        setNewsletterMessage('Your email has sent to the administrator, wait for confirmation if you are qualified to brew some cache!');
        setNewsletterEmail('');
      } else {
        setNewsletterMessage('Oops! Something went wrong. Please try again.');
      }
    } catch (error) {
      setNewsletterMessage('Oops! Something went wrong. Please try again.');
    } finally {
      setIsNewsletterSubmitting(false);
    }
  };

  const filteredPosts = selectedCategory ? posts.filter(p => p.categories.includes(selectedCategory)) : posts;

  if (postsLoading || categoriesLoading) {
    return (
      <div className="bg-background-light min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary mx-auto mb-6"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">🍺</span>
            </div>
          </div>
          <h3 className="text-xl font-serif font-bold text-primary mb-2">Loading Beer Stories</h3>
          <p className="text-text-light">Preparing the perfect brew of content...</p>
        </div>
      </div>
    );
  }

  if (postsError || categoriesError) {
    return (
      <div className="bg-background-light min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">🍺</div>
          <h3 className="text-2xl font-serif font-bold text-primary mb-4">Oops! Something went wrong</h3>
          <p className="text-text-light text-lg">Unable to load content. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-light min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-secondary to-accent py-24 px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-6xl animate-bounce delay-100">🍺</div>
          <div className="absolute top-40 right-20 text-4xl animate-bounce delay-300">🍻</div>
          <div className="absolute bottom-20 left-1/4 text-5xl animate-bounce delay-500">🥂</div>
          <div className="absolute bottom-40 right-1/3 text-3xl animate-bounce delay-700">🍺</div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <span className="text-white/90 text-sm font-medium">Craft Beer Chronicles</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            Beer <span className="text-accent">Chronicles</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            Dive deep into the world of craft brewing with expert reviews, brewery stories, and brewing guides from passionate beer enthusiasts.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/beers" className="bg-accent hover:bg-accent/90 text-primary px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-block text-center">
              Explore Beer Collection
            </Link>
            <button onClick={handleLatestReviews} className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white/30 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 inline-block cursor-pointer">
              Latest Reviews
            </button>
          </div>
        </div>
      </section>

      <BlogCategoriesSection
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <BlogArticlesGrid posts={filteredPosts} />

      {/* Enhanced Newsletter Section */}
      <section className="relative bg-gradient-to-r from-primary via-secondary to-accent py-20 px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 text-4xl">🍺</div>
          <div className="absolute top-20 right-20 text-6xl">🍻</div>
          <div className="absolute bottom-10 left-1/4 text-5xl">🥂</div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <div className="text-4xl mb-6">📬</div>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Stay in the Loop
            </h3>
            <p className="text-white/90 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
              Get the finest beer reviews, brewing insights, and exclusive stories delivered straight to your inbox. Join our community of craft beer enthusiasts.
            </p>
            
            <div className="max-w-lg mx-auto">
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
                <input 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 rounded-full px-6 py-4 bg-white/20 backdrop-blur-sm placeholder-white/70 text-white outline-none focus:ring-2 focus:ring-accent border border-white/30 focus:border-white/50 transition-all duration-300" 
                  placeholder="Enter your email address" 
                  type="email" 
                  required
                />
                <button 
                  type="submit"
                  disabled={isNewsletterSubmitting}
                  className="bg-accent hover:bg-accent/90 text-primary rounded-full px-8 py-4 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isNewsletterSubmitting ? 'Subscribing...' : 'Subscribe Now'}
                </button>
              </form>
              {newsletterMessage && (
                <p className="mt-4 text-center text-sm font-medium text-accent">{newsletterMessage}</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}