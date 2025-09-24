import Image from 'next/image';
import Link from 'next/link';
import { stripHtml, formatDate } from '@/lib/wordpress';
import type { WordPressPost } from '@/types/wordpress';

interface BlogArticlesGridProps {
  posts: WordPressPost[];
  title?: string;
  description?: string;
}

export default function BlogArticlesGrid({
  posts,
  title = "Latest Articles",
  description = "Handcrafted stories from the world of brewing, reviewed by experts and enthusiasts alike."
}: BlogArticlesGridProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-primary mb-4">{title}</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => {
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

        {posts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🍺</div>
            <h3 className="text-2xl font-serif font-bold text-primary mb-4">No Stories Found</h3>
            <p className="text-text-light text-lg">Try selecting a different category to discover more content.</p>
          </div>
        )}
      </div>
    </section>
  );
}