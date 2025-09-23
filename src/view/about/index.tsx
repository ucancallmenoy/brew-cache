'use client';
import Image from "next/image";
import { useAuthors } from '@/hooks/wordpress';

export default function About() {
  const { data: authors = [], isLoading, error } = useAuthors();

  return (
    <div className="bg-background-light min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-secondary to-accent py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-6xl animate-bounce delay-100">🍺</div>
          <div className="absolute top-40 right-20 text-4xl animate-bounce delay-300">🍻</div>
          <div className="absolute bottom-20 left-1/4 text-5xl animate-bounce delay-500">🥂</div>
          <div className="absolute bottom-40 right-1/3 text-3xl animate-bounce delay-700">🍺</div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <span className="text-white/90 text-sm font-medium">About Brew Cache</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            Our <span className="text-accent">Story</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light max-w-2xl mx-auto">
            Passionate beer lovers crafting the ultimate guide to craft brewing, reviews, and beer culture.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6 font-serif leading-tight">
              How It All <span className="text-accent">Started</span>
            </h2>
            <p className="text-lg text-text-light max-w-3xl mx-auto leading-relaxed">
              Brew Cache was born from a simple idea: to create a community where beer enthusiasts could share their passion, discover new brews, and learn the art of brewing. Founded by a group of craft beer aficionados, we have grown into a trusted resource for beer reviews, brewing guides, and brewery stories.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-4 font-serif">Our Vision</h3>
              <p className="text-text-light leading-relaxed mb-6">
                To be the go-to platform for craft beer lovers worldwide, providing authentic reviews, expert brewing knowledge, and connecting people with the stories behind their favorite beers.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-text font-medium">Authentic beer experiences</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-text font-medium">Community-driven content</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-text font-medium">Educational brewing resources</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary mb-4 font-serif">Our Mission</h3>
              <p className="text-text-light leading-relaxed mb-6">
                We are on a mission to democratize craft beer knowledge, making it accessible for everyone from casual drinkers to aspiring brewers. Through our platform, we aim to preserve brewing traditions while fostering innovation in the craft beer world.
              </p>
              <div className="bg-accent/10 p-6 rounded-xl">
                <p className="text-accent font-semibold mb-2">🍺 Fun Fact</p>
                <p className="text-text-light">
                  Our team has collectively tasted over 10,000 different beers from breweries across 50+ countries!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-20 px-4 bg-background-light">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-primary mb-4">Meet Our Team</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-lg text-text-light max-w-2xl mx-auto">
              The passionate brewmasters behind Brew Cache.
            </p>
          </div>
          {isLoading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/20 border-t-primary mx-auto mb-4"></div>
              <p className="text-text-light">Loading team members...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-text-light">Failed to load team members.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {authors.map((author) => (
                <div key={author.id} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 text-center">
                  <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                    {author.avatar_urls?.['96'] ? (
                      <Image
                        src={author.avatar_urls['96']}
                        alt={author.name}
                        width={80}
                        height={80}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl">👤</span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2 font-serif">{author.name}</h3>
                  <p className="text-accent font-medium mb-3">Author & Contributor</p>
                  <p className="text-text-light text-sm">
                    {author.description || 'Passionate about craft beer and sharing brewing knowledge.'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-primary">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-white mb-2">500+</p>
              <p className="text-white/80">Beer Reviews</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white mb-2">150+</p>
              <p className="text-white/80">Breweries Featured</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white mb-2">25k+</p>
              <p className="text-white/80">Community Members</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white mb-2">50+</p>
              <p className="text-white/80">Brewing Guides</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary via-secondary to-accent">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20">
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Join Our Beer Community
            </h3>
            <p className="text-white/90 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
              Ready to explore the world of craft beer? Join thousands of beer enthusiasts discovering their next favorite brew.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-accent hover:bg-accent/90 text-primary px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                Start Exploring
              </button>
              <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white/30 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
                Subscribe for Updates
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}