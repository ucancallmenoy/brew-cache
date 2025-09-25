import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import BlogPost from '@/view/blog/BlogPost';
import { fetchPostBySlug, fetchPosts } from '@/hooks/wordpress/queries/useQuery';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  
  try {
    // Construct full base URL for server-side fetch
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = headersList.get('x-forwarded-proto') || 'http';
    const baseUrl = `${protocol}://${host}`;
    
    // Fetch post using the centralized function
    const post = await fetchPostBySlug(slug, baseUrl);
    
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
    // Fetch all posts to generate static paths
    const posts = await fetchPosts();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}