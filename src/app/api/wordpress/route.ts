import { NextRequest, NextResponse } from 'next/server';

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

// Helper function to fetch from WordPress API
async function fetchFromWordPress(endpoint: string) {
  const response = await fetch(`${WORDPRESS_API_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  try {
    switch (action) {
      case 'getPosts': {
        const posts = await fetchFromWordPress('/posts?_embed&per_page=100');
        return NextResponse.json(posts);
      }
      case 'getPostBySlug': {
        const slug = searchParams.get('slug');
        if (!slug) return NextResponse.json({ error: 'Slug required' }, { status: 400 });
        console.log('Fetching slug:', slug);
        const posts = await fetchFromWordPress(`/posts?slug=${slug}&_embed`);
        console.log('Posts found:', posts.length);
        const post = posts.length > 0 ? posts[0] : null;
        return NextResponse.json(post);
      }
      case 'getPageBySlug': {
        const slug = searchParams.get('slug');
        if (!slug) return NextResponse.json({ error: 'Slug required' }, { status: 400 });
        // request page with embed if available
        const pages = await fetchFromWordPress(`/pages?slug=${slug}&_embed`);
        const page = pages.length > 0 ? pages[0] : null;
        return NextResponse.json(page);
      }
      case 'getCategories': {
        const categories = await fetchFromWordPress('/categories');
        return NextResponse.json(categories);
      }
      case 'getPostsByCategory': {
        const categoryId = searchParams.get('categoryId');
        if (!categoryId) return NextResponse.json({ error: 'Category ID required' }, { status: 400 });
        const posts = await fetchFromWordPress(`/posts?categories=${categoryId}&_embed`);
        return NextResponse.json(posts);
      }
      case 'getAuthors': {
        const authors = await fetchFromWordPress('/users?roles[]=administrator&roles[]=author&roles[]=editor&roles[]=contributor&roles[]=subscriber&per_page=100');
        return NextResponse.json(authors);
      }
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}