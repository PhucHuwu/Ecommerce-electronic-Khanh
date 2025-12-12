import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { Product } from '@/lib/db/models';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();

    const { slug } = await params;

    // Get product by slug
    const product = await Product.findOne({ slug }).lean();

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Convert Map to plain object if needed
    let specs = {};
    if (product.specs) {
      if (product.specs instanceof Map) {
        specs = Object.fromEntries(product.specs);
      } else if (typeof product.specs === 'object') {
        specs = product.specs;
      }
    }

    const productWithDetails = {
      id: product._id.toString(),
      slug: product.slug,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      rating: product.rating,
      reviewCount: product.reviewCount,
      mainImage: product.mainImage,
      gallery: product.gallery || [],
      specs,
      variants: product.variants || [],
      description: product.description,
      highlightFeatures: product.highlightFeatures || [],
      category: product.category,
      brand: product.brand,
      badge: product.badge,
    };

    return NextResponse.json(productWithDetails);
  } catch (error: any) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product', details: error.message },
      { status: 500 }
    );
  }
}
