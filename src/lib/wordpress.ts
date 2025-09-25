const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export async function fetchFromWordPress(endpoint: string) {
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

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, '');
}

// Utility function to format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}