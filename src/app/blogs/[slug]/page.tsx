import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import BlogPost from '@/view/blog/BlogPost';
import { fetchPostBySlug } from '@/hooks/wordpress/queries/useQuery';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  
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
}

export async function generateStaticParams() {
  // This will run at build time to generate static pages
  // You can implement this to pre-generate pages for better performance
  return [];
}