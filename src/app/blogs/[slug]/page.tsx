import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/wordpress';
import BlogPost from '@/view/blog/BlogPost';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPost post={post} />;
}

// Generate static params for existing posts (optional)
export async function generateStaticParams() {
  // This will run at build time to generate static pages
  // You can implement this to pre-generate pages for better performance
  return [];
}