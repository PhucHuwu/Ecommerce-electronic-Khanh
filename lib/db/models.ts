import mongoose, { Schema, Document } from 'mongoose';

// Category Model
export interface ICategory extends Document {
  name: string;
  slug: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: String,
}, {
  timestamps: true,
});

export const Category = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);

// Product Model
export interface IProduct extends Document {
  slug: string;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  mainImage?: string;
  gallery: string[];
  description?: string;
  category: string;
  brand?: string;
  badge?: string;
  specs: Record<string, string>;
  variants: Array<{
    name: string;
    priceAdjustment: number;
  }>;
  highlightFeatures: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  mainImage: String,
  gallery: [String],
  description: String,
  category: { type: String, required: true, index: true },
  brand: { type: String, index: true },
  badge: String,
  specs: { type: Map, of: String },
  variants: [{
    name: String,
    priceAdjustment: Number,
  }],
  highlightFeatures: [String],
}, {
  timestamps: true,
});

// Index for search
ProductSchema.index({ name: 'text', description: 'text' });

export const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

// News Model
export interface INews extends Document {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  author?: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const NewsSchema = new Schema<INews>({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  image: String,
  author: String,
  publishedAt: Date,
}, {
  timestamps: true,
});

export const News = mongoose.models.News || mongoose.model<INews>('News', NewsSchema);

// Promotion Model
export interface IPromotion extends Document {
  slug: string;
  title: string;
  description: string;
  image?: string;
  discountPercent?: number;
  discountText?: string;
  startDate?: Date;
  endDate?: Date;
  featured: boolean;
  terms: string[];
  createdAt: Date;
  updatedAt: Date;
}

const PromotionSchema = new Schema<IPromotion>({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
  discountPercent: Number,
  discountText: String,
  startDate: Date,
  endDate: Date,
  featured: { type: Boolean, default: false },
  terms: [String],
}, {
  timestamps: true,
});

export const Promotion = mongoose.models.Promotion || mongoose.model<IPromotion>('Promotion', PromotionSchema);
