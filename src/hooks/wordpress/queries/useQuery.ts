import { useQuery } from '@tanstack/react-query';
import { WordPressPost, WordPressCategory } from '@/types/wordpress';

interface WordPressAuthor {
  id: number;
  name: string;
  avatar_urls?: { [key: string]: string };
  description?: string;
  slug?: string;
  link?: string;
  // Add other fields as needed
}

export const fetchPosts = async (): Promise<WordPressPost[]> => {
  const response = await fetch('/api/wordpress?action=getPosts');
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
};

export const fetchPostBySlug = async (slug: string, baseUrl?: string): Promise<WordPressPost | null> => {
  const url = baseUrl ? `${baseUrl}/api/wordpress?action=getPostBySlug&slug=${slug}` : `/api/wordpress?action=getPostBySlug&slug=${slug}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch post');
  return response.json();
};

export const fetchCategories = async (): Promise<WordPressCategory[]> => {
  const response = await fetch('/api/wordpress?action=getCategories');
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
};

export const fetchPostsByCategory = async (categoryId: string): Promise<WordPressPost[]> => {
  const response = await fetch(`/api/wordpress?action=getPostsByCategory&categoryId=${categoryId}`);
  if (!response.ok) throw new Error('Failed to fetch posts by category');
  return response.json();
};

export const fetchAuthors = async (): Promise<WordPressAuthor[]> => {
  const response = await fetch('/api/wordpress?action=getAuthors');
  if (!response.ok) throw new Error('Failed to fetch authors');
  return response.json();
};

// Specific hooks using TanStack Query
export function usePosts() {
  return useQuery({ queryKey: ['posts'], queryFn: fetchPosts });
}

export function usePostBySlug(slug: string) {
  return useQuery({ queryKey: ['post', slug], queryFn: () => fetchPostBySlug(slug) });
}

export function useCategories() {
  return useQuery({ queryKey: ['categories'], queryFn: fetchCategories });
}

export function usePostsByCategory(categoryId: number) {
  return useQuery({ queryKey: ['postsByCategory', categoryId], queryFn: () => fetchPostsByCategory(categoryId.toString()) });
}

export function useAuthors() {
  return useQuery({ queryKey: ['authors'], queryFn: fetchAuthors });
}