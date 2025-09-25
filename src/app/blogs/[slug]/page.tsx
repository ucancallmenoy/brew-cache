import { notFound } from 'next/navigation';
import BlogPost from '@/view/blog/BlogPost';
import { fetchFromWordPress } from '@/lib/wordpress'; 
import type { WordPressPost } from '@/types/wordpress';  
interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  
  try {
    const posts = await fetchFromWordPress(`/posts?slug=${slug}&_embed`);
    const post = posts.length > 0 ? posts[0] : null;
    
    if (!post) {
      notFound();
    }
    
    return <BlogPost post={post} />;
  } catch (error) {
    console.error('Error fetching post:', error);
    notFound();
  }
}

export async function generateStaticParams() {
  try {
    // Fetch posts directly from WordPress for static generation
    const posts = await fetchFromWordPress('/posts?_embed&per_page=100');
    return posts.map((post: WordPressPost) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}