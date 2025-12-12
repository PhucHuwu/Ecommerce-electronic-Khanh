// Product Types
export interface ProductVariant {
  id: string;
  name: string;
  priceAdjustment: number;
}

export interface ProductSpecs {
  cpu?: string;
  ram?: string;
  gpu?: string;
  storage?: string;
  display?: string;
  weight?: string;
  sensor?: string;
  dpi?: string;
  battery?: string;
  connectivity?: string;
  layout?: string;
  switch?: string;
  keycap?: string;
  size?: string;
  resolution?: string;
  refreshRate?: string;
  panelType?: string;
  responseTime?: string;
  cores?: string;
  threads?: string;
  baseClock?: string;
  boostClock?: string;
  socket?: string;
  [key: string]: string | undefined;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  mainImage: string;
  gallery: string[];
  specs: ProductSpecs;
  variants: ProductVariant[];
  description: string;
  highlightFeatures: string[];
  category: string;
  brand: string;
  badge?: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

// News Types
export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  thumbnail: string;
  publishedAt: string;
  category: string;
  author?: string;
}

// Promotion Types
export interface Promotion {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  link: string;
  bgColor: string;
  startDate: string;
  endDate: string;
  discount: string;
  terms: string[];
  featured: boolean;
}
