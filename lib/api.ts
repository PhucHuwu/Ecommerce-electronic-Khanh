// API Helper Functions

// Get base URL - works for both client and server side
function getBaseUrl() {
  // Client side
  if (typeof window !== 'undefined') {
    return '';
  }
  // Server side - use localhost during development
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
}

// Products
export async function getProducts(params?: {
  category?: string;
  limit?: number;
  search?: string;
}) {
  const searchParams = new URLSearchParams();
  if (params?.category) searchParams.append('category', params.category);
  if (params?.limit) searchParams.append('limit', params.limit.toString());
  if (params?.search) searchParams.append('search', params.search);

  const url = `${getBaseUrl()}/api/products${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
  const res = await fetch(url, { cache: 'no-store' });
  
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return res.json();
}

export async function getProductBySlug(slug: string) {
  const res = await fetch(`${getBaseUrl()}/api/products/${slug}`, { 
    cache: 'no-store' 
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  
  return res.json();
}

// Categories
export async function getCategories() {
  const res = await fetch(`${getBaseUrl()}/api/categories`, { 
    cache: 'no-store' 
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  
  return res.json();
}

// News
export async function getNews(params?: { limit?: number }) {
  const url = params?.limit 
    ? `${getBaseUrl()}/api/news?limit=${params.limit}` 
    : `${getBaseUrl()}/api/news`;
    
  const res = await fetch(url, { cache: 'no-store' });
  
  if (!res.ok) {
    throw new Error('Failed to fetch news');
  }
  
  return res.json();
}

export async function getNewsBySlug(slug: string) {
  const res = await fetch(`${getBaseUrl()}/api/news/${slug}`, { 
    cache: 'no-store' 
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch news article');
  }
  
  return res.json();
}

// Promotions
export async function getPromotions(params?: { featured?: boolean }) {
  const url = params?.featured 
    ? `${getBaseUrl()}/api/promotions?featured=true` 
    : `${getBaseUrl()}/api/promotions`;
    
  const res = await fetch(url, { cache: 'no-store' });
  
  if (!res.ok) {
    throw new Error('Failed to fetch promotions');
  }
  
  return res.json();
}

export async function getPromotionBySlug(slug: string) {
  const res = await fetch(`${getBaseUrl()}/api/promotions/${slug}`, { 
    cache: 'no-store' 
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch promotion');
  }
  
  return res.json();
}
