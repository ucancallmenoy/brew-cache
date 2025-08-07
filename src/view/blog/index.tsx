'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPosts, getCategories, stripHtml, formatDate } from '@/lib/wordpress';
import { WordPressPost, WordPressCategory } from '@/types/wordpress';

export default function BlogView() {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [categories, setCategories] = useState<WordPressCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [postsData, categoriesData] = await Promise.all([
          getPosts(),
          getCategories()
        ]);
        
        setPosts(postsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching WordPress data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredPosts = selectedCategory 
    ? posts.filter(post => post.categories.includes(selectedCategory))
    : posts;

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  if (loading) {
    return (
      <div className="bg-background-light min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-light">Loading beer stories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-light min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-secondary to-accent py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-serif">
            Beer Chronicles
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Dive into the world of craft beer with our expert insights, brewing guides, and brewery spotlights.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-8 font-serif text-center">Featured Article</h2>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  {featuredPost._embedded?.['wp:featuredmedia']?.[0] ? (
                    <img
                      src={featuredPost._embedded['wp:featuredmedia'][0].source_url}
                      alt={featuredPost._embedded['wp:featuredmedia'][0].alt_text || featuredPost.title.rendered}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  ) : (
                    <div className="h-64 md:h-full bg-secondary/20 flex items-center justify-center">
                      <span className="text-6xl">🍺</span>
                    </div>
                  )}
                </div>
                <div className="md:w-1/2 p-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4 font-serif">
                    {featuredPost.title.rendered}
                  </h3>
                  <p className="text-text-light mb-6 leading-relaxed">
                    {stripHtml(featuredPost.excerpt.rendered)}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        {featuredPost._embedded?.author?.[0]?.avatar_urls?.['96'] ? (
                          <img
                            src={featuredPost._embedded.author[0].avatar_urls['96']}
                            alt={featuredPost._embedded.author[0].name}
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <span className="text-sm font-bold text-primary">
                            {featuredPost._embedded?.author?.[0]?.name?.charAt(0) || 'A'}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-text">
                          {featuredPost._embedded?.author?.[0]?.name || 'Anonymous'}
                        </p>
                        <p className="text-sm text-text-light">{formatDate(featuredPost.date)}</p>
                      </div>
                    </div>
                    <Link 
                      href={`/blogs/${featuredPost.slug}`}
                      className="bg-accent hover:bg-accent/90 text-white px-6 py-2 rounded-full font-medium transition-all duration-200"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-2 rounded-full border-2 font-medium transition-all duration-200 ${
                selectedCategory === null
                  ? 'bg-primary text-white border-primary'
                  : 'border-primary text-primary hover:bg-primary hover:text-white'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full border-2 font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white border-primary'
                    : 'border-primary text-primary hover:bg-primary hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-8 font-serif text-center">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
                {post._embedded?.['wp:featuredmedia']?.[0] ? (
                  <img
                    src={post._embedded['wp:featuredmedia'][0].source_url}
                    alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="h-48 bg-secondary/20 flex items-center justify-center">
                    <span className="text-4xl">🍻</span>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-3 font-serif line-clamp-2">
                    {post.title.rendered}
                  </h3>
                  <p className="text-text-light mb-4 text-sm leading-relaxed line-clamp-3">
                    {stripHtml(post.excerpt.rendered)}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        {post._embedded?.author?.[0]?.avatar_urls?.['96'] ? (
                          <img
                            src={post._embedded.author[0].avatar_urls['96']}
                            alt={post._embedded.author[0].name}
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <span className="text-xs font-bold text-primary">
                            {post._embedded?.author?.[0]?.name?.charAt(0) || 'A'}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text">
                          {post._embedded?.author?.[0]?.name || 'Anonymous'}
                        </p>
                        <p className="text-xs text-text-light">{formatDate(post.date)}</p>
                      </div>
                    </div>
                    <Link 
                      href={`/blogs/${post.slug}`}
                      className="text-accent hover:text-accent/80 font-medium text-sm transition-colors duration-200"
                    >
                      Read →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text-light text-lg">No posts found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-serif">
            Stay Updated
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Get the latest beer news, brewing tips, and exclusive brewery spotlights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full border-none outline-none text-text"
            />
            <button className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-full font-medium transition-all duration-200 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}