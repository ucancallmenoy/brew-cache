'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { stripHtml, formatDate } from '@/lib/wordpress';
import { usePosts, useCategories } from '@/hooks/wordpress';

export default function BlogView() {
  const { data: posts = [], isLoading: postsLoading, error: postsError } = usePosts();
  const { data: categories = [], isLoading: categoriesLoading, error: categoriesError } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

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
          <div className="absolute top-20 left-10 text-6xl">🍺</div>
          <div className="absolute top-40 right-20 text-4xl">🍻</div>
          <div className="absolute bottom-20 left-1/4 text-5xl">🥂</div>
          <div className="absolute bottom-40 right-1/3 text-3xl">🍺</div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <span className="text-white/90 text-sm font-medium">🍺 Craft Beer Chronicles</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            Beer <span className="text-accent">Chronicles</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            Dive deep into the world of craft brewing with expert reviews, brewery stories, and brewing guides from passionate beer enthusiasts.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-accent hover:bg-accent/90 text-primary px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
              Start Exploring
            </button>
            <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white/30 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
              Latest Reviews
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Categories Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">Explore by Category</h2>
            <p className="text-text-light">Discover content tailored to your brewing interests</p>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`group px-6 py-3 rounded-full border-2 font-semibold transition-all duration-300 ${
                selectedCategory === null 
                  ? 'bg-primary text-white border-primary shadow-lg' 
                  : 'border-primary/30 text-primary hover:border-primary hover:bg-primary hover:text-white hover:shadow-md'
              }`}
            >
              <span className="flex items-center gap-2">
                All Stories
              </span>
            </button>
            
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`group px-6 py-3 rounded-full border-2 font-semibold transition-all duration-300 ${
                  selectedCategory === cat.id 
                    ? 'bg-primary text-white border-primary shadow-lg' 
                    : 'border-primary/30 text-primary hover:border-primary hover:bg-primary hover:text-white hover:shadow-md'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Articles Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-primary mb-4">Latest Articles</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-lg text-text-light max-w-2xl mx-auto">
              Handcrafted stories from the world of brewing, reviewed by experts and enthusiasts alike.
            </p>
          </div>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map(post => {
              const media = post._embedded?.['wp:featuredmedia']?.[0];
              const imageSrc = media?.source_url;
              return (
                <article key={post.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-accent/20">
                  <Link href={`/blogs/${post.slug}`} className="block">
                    <div className="relative h-56 w-full overflow-hidden">
                      {imageSrc ? (
                        <Image
                          src={imageSrc}
                          alt={media.alt_text || post.title.rendered}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                        />
                      ) : (
                        <div className="h-56 w-full bg-gradient-to-br from-secondary/10 to-accent/10 flex items-center justify-center">
                          <span className="text-6xl opacity-60">🍻</span>
                        </div>
                      )}
                      
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Read more button overlay */}
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <span className="bg-accent text-primary px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
                          Read Article →
                        </span>
                      </div>
                    </div>

                    <div className="p-8">
                      <h3 className="text-xl font-serif font-bold text-primary mb-3 line-clamp-2 group-hover:text-accent transition-colors duration-300">
                        {post.title.rendered}
                      </h3>
                      
                      <p className="text-text-light text-sm mb-6 line-clamp-3 leading-relaxed">
                        {stripHtml(post.excerpt.rendered)}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="relative w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden group-hover:ring-2 group-hover:ring-accent/30 transition-all duration-300">
                            {post._embedded?.author?.[0]?.avatar_urls?.['96'] ? (
                              <Image
                                src={post._embedded.author[0].avatar_urls['96']}
                                alt={post._embedded.author[0].name}
                                width={40}
                                height={40}
                                className="object-cover rounded-full"
                              />
                            ) : (
                              <span className="text-sm font-bold text-primary">
                                {post._embedded?.author?.[0]?.name?.charAt(0) || 'A'}
                              </span>
                            )}
                          </div>
                          
                          <div>
                            <p className="text-sm font-semibold text-text group-hover:text-primary transition-colors duration-300">
                              {post._embedded?.author?.[0]?.name || 'Anonymous'}
                            </p>
                            <p className="text-xs text-text-light">{formatDate(post.date)}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-accent font-semibold text-sm group-hover:text-primary transition-colors duration-300">
                          <span>Read More</span>
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">🍺</div>
              <h3 className="text-2xl font-serif font-bold text-primary mb-4">No Stories Found</h3>
              <p className="text-text-light text-lg">Try selecting a different category to discover more content.</p>
            </div>
          )}
        </div>
      </section>

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
              <p className="text-white/70 text-sm mt-4">
                Join 25,000+ beer enthusiasts. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}