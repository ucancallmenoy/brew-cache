'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { formatDate } from '@/lib/wordpress';
import { useCategories } from '@/hooks/wordpress';
import type { WordPressPost } from '@/types/wordpress';

interface BlogPostProps {
  post: WordPressPost;
}

export default function BlogPost({ post }: BlogPostProps) {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  const imageSrc = media?.source_url;
  const { data: categories = [] } = useCategories();
  const [categoryName, setCategoryName] = useState<string>('');
  const [shareMessage, setShareMessage] = useState<string>('');

  useEffect(() => {
    if (post.categories.length > 0) {
      const cat = categories.find(c => c.id === post.categories[0]);
      setCategoryName(cat ? cat.name : 'Uncategorized');
    }
  }, [categories, post.categories]);

  const handleShare = async () => {
    const url = window.location.href;
    const title = post.title.rendered;
    const text = `Check out this post: ${title}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (error) {
        console.error("Share failed:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setShareMessage("Link copied to clipboard!");
        setTimeout(() => setShareMessage(''), 3000);
      } catch (error) {
        console.error("Failed to copy link:", error);
        setShareMessage("Failed to copy link. Please copy manually: " + url);
        setTimeout(() => setShareMessage(''), 5000);
      }
    }
  };

  return (
    <div className="bg-background-light min-h-screen">
      {/* Simplified Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-secondary to-accent py-20 px-4 overflow-hidden">
        {/* Animated Beer Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-6xl animate-bounce delay-100">🍺</div>
          <div className="absolute top-40 right-20 text-4xl animate-bounce delay-300">🍻</div>
          <div className="absolute bottom-20 left-1/4 text-5xl animate-bounce delay-500">🥂</div>
          <div className="absolute bottom-40 right-1/3 text-3xl animate-bounce delay-700">🍺</div>
        </div>
        
        {/* Grain/Hops Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" 
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                 backgroundSize: '30px 30px'
               }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <nav className="mb-8">
            <Link 
              href="/blogs" 
              className="inline-flex items-center gap-3 text-white/90 hover:text-white text-base font-medium bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 transition-all duration-300 hover:bg-white/30 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </nav>

          {/* Dynamic Category Badge */}
          {categoryName && (
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm text-accent border border-accent/30 px-4 py-2 rounded-full text-sm font-semibold">
                {categoryName}
              </span>
            </div>
          )}

          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight drop-shadow-lg">
            {post.title.rendered}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 text-white/90">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-white/30 shadow-lg">
                {post._embedded?.author?.[0]?.avatar_urls?.['96'] ? (
                  <Image
                    src={post._embedded.author[0].avatar_urls['96']}
                    alt={post._embedded.author[0].name}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 bg-white/20 flex items-center justify-center">
                    <span className="font-bold text-white text-xl">
                      {post._embedded?.author?.[0]?.name?.charAt(0) || 'B'}
                    </span>
                  </div>
                )}
              </div>
              
              <div>
                <p className="font-semibold text-white text-lg">
                  {post._embedded?.author?.[0]?.name || 'Author'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>5 min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Content Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            
            {/* Social Share Bar */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
              <div className="flex items-center gap-3 text-sm text-text">
                <span className="font-medium">Share this post:</span>
                {shareMessage && <span className="text-accent font-medium">{shareMessage}</span>}
              </div>
              <div className="flex items-center gap-3">
                <button onClick={handleShare} className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-500 cursor-pointer hover:text-white text-gray-500 flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </button>
              </div>
            </div>

            {imageSrc && (
              <div className="px-8 md:px-12 py-6 flex justify-center">
                <div className="relative group">
                  <Image
                    src={imageSrc}
                    alt={media?.alt_text || post.title.rendered}
                    width={520}
                    height={400}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
              </div>
            )}

            {/* Article Content */}
            <div className="px-8 md:px-12 py-12">
              <style dangerouslySetInnerHTML={{
                __html: `
                  .prose ul {
                    list-style-type: disc !important;
                    padding-left: 1.5rem !important;
                  }
                  .prose ol {
                    list-style-type: decimal !important;
                    padding-left: 1.5rem !important;
                  }
                  .prose li {
                    margin-bottom: 0.5rem !important;
                    color: var(--text) !important;
                  }
                  .prose p {
                    color: var(--text) !important;
                  }
                  .prose h1 {
                    font-size: 2.25rem !important;
                    line-height: 2.5rem !important;
                  }
                  .prose h2 {
                    font-size: 2rem !important;
                    line-height: 4.55rem !important;
                  }
                  .prose h3 {
                    font-size: 1.5rem !important;
                    line-height: 3rem !important;
                  }
                  .prose p, .prose li {
                  
                    font-size: 1.125rem !important;
                    line-height: 1.75rem !important;
                  }
                `
              }} />
               <div 
                className="prose prose-xl max-w-none
                  prose-headings:text-text prose-headings:font-serif prose-headings:font-bold
                  prose-h1:text-4xl prose-h1:text-primary prose-h1:mb-8 prose-h1:mt-12
                  prose-h2:text-3xl prose-h2:text-primary prose-h2:mb-6 prose-h2:mt-8
                  prose-h3:text-2xl prose-h3:text-primary prose-h3:mb-4 prose-h3:mt-6
                  prose-p:text-black prose-p:leading-relaxed prose-p:mb-4 prose-p:text-lg
                  prose-strong:text-text prose-strong:font-semibold
                  prose-em:text-text prose-em:italic
                  prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                  prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:bg-accent/5 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:my-6 prose-blockquote:rounded-r-lg
                  prose-ul:my-6 prose-ul:pl-6 prose-ul:list-disc
                  prose-ol:my-6 prose-ol:pl-6 prose-ol:list-decimal
                  prose-li:text-text prose-li:leading-relaxed prose-li:mb-2
                  prose-li:marker:text-accent
                  prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:text-primary
                  prose-pre:bg-gray-900 prose-pre:text-white prose-pre:overflow-x-auto prose-pre:rounded-lg prose-pre:p-4
                  prose-img:rounded-lg prose-img:shadow-md prose-img:my-6
                "
              >
                <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
              </div>
            </div>

            {/* Author Bio */}
            <div className="px-8 md:px-12 py-8 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-primary/20 shadow-lg">
                    {post._embedded?.author?.[0]?.avatar_urls?.['96'] ? (
                      <Image
                        src={post._embedded.author[0].avatar_urls['96']}
                        alt={post._embedded.author[0].name}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-primary/10 flex items-center justify-center">
                        <span className="font-bold text-primary text-2xl">
                          {post._embedded?.author?.[0]?.name?.charAt(0) || 'B'}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <p className="font-bold text-primary text-xl mb-1">
                      {post._embedded?.author?.[0]?.name || 'Author'}
                    </p>
                    <p className="text-text-light text-base">Author</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary via-secondary to-accent">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20">
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Explore More Content
            </h3>
            <p className="text-white/90 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
              Discover more stories and insights from our collection.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/blogs"
                className="inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                View All Posts
              </Link>
              
              <Link href="/subscribe" className="bg-accent hover:bg-accent/90 text-primary px-8 py-4 rounded-full cursor-pointer font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-block text-center">
                Subscribe for Updates
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}