export interface WordPressPost {
  id: number;
  date: string;
  slug: string;
  status: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    author: Array<{
      id: number;
      name: string;
      description?: string;
      url?: string;
      avatar_urls: {
        '96': string;
      };
    }>;
    'wp:featuredmedia'?: Array<{
      id: number;
      source_url: string;
      alt_text: string;
    }>;
  };
}

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface WordPressAuthor {
  id: number;
  name: string;
  avatar_urls?: { [key: string]: string };
  description?: string;
  slug?: string;
  link?: string;
  roles?: string[];
}

export interface WordPressPage {
  id: number;
  date: string;
  slug: string;
  status: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt?: { rendered?: string };
  author?: number;
  _embedded?: {
    author?: Array<{
      id: number;
      name: string;
      avatar_urls?: { [key: string]: string };
    }>;
  };
}