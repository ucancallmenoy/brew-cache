import Link from 'next/link';
import { formatDate } from '@/lib/wordpress';
import { WordPressPost } from '@/types/wordpress';

interface BlogPostProps {
  post: WordPressPost;
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <div className="bg-background-light min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-secondary to-accent py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link href="/blogs" className="text-white/80 hover:text-white text-sm">
              ← Back to Blog
            </Link>
          </nav>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif leading-tight">
            {post.title.rendered}
          </h1>

          {/* Author and Date */}
          <div className="flex items-center space-x-4 text-white/90">
            <div className="flex items-center space-x-3">
              {post._embedded?.author?.[0]?.avatar_urls?.['96'] ? (
                <img
                  src={post._embedded.author[0].avatar_urls['96']}
                  alt={post._embedded.author[0].name}
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="font-bold">
                    {post._embedded?.author?.[0]?.name?.charAt(0) || 'A'}
                  </span>
                </div>
              )}
              <div>
                <p className="font-medium">
                  {post._embedded?.author?.[0]?.name || 'Anonymous'}
                </p>
                <p className="text-sm text-white/70">{formatDate(post.date)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post._embedded?.['wp:featuredmedia']?.[0] && (
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <img
              src={post._embedded['wp:featuredmedia'][0].source_url}
              alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered}
              className="w-full h-96 object-cover rounded-2xl shadow-xl"
            />
          </div>
        </section>
      )}

      {/* Blog Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div 
            className="prose prose-lg max-w-none prose-headings:text-primary prose-headings:font-serif prose-a:text-accent prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </div>
      </section>

      {/* Back to Blog */}
      <section className="py-8 px-4 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <Link 
            href="/blogs"
            className="inline-flex items-center bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-medium transition-all duration-200"
          >
            ← Back to All Posts
          </Link>
        </div>
      </section>
    </div>
  );
}