import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { Product } from '@/lib/db/models';

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');
    const search = searchParams.get('search');

    // Build query
    const query: any = {};

    // Filter by category
    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }

    // Search by name
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    // Execute query
    let productsQuery = Product.find(query)
      .sort({ rating: -1, reviewCount: -1 });

    // Limit results
    if (limit) {
      productsQuery = productsQuery.limit(parseInt(limit));
    }

    const products = await productsQuery.lean();

    // Transform MongoDB documents to API response format
    const productsWithDetails = products.map((product: any) => {
      // Convert Map to plain object if needed
      let specs = {};
      if (product.specs) {
        if (product.specs instanceof Map) {
          specs = Object.fromEntries(product.specs);
        } else if (typeof product.specs === 'object') {
          specs = product.specs;
        }
      }

      return {
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
    });

    return NextResponse.json(productsWithDetails);
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error.message },
      { status: 500 }
    );
  }
}
