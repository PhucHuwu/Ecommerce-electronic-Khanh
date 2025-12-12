import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { Promotion } from '@/lib/db/models';

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');

    const query: any = {};

    if (featured === 'true') {
      query.featured = true;
    }

    const promotions = await Promotion.find(query)
      .sort({ startDate: -1 })
      .lean();

    const promotionsWithTerms = promotions.map((promo: any) => ({
      id: promo._id.toString(),
      slug: promo.slug,
      title: promo.title,
      description: promo.description,
      image: promo.image,
      discountPercent: promo.discountPercent,
      discountText: promo.discountText,
      startDate: promo.startDate,
      endDate: promo.endDate,
      terms: promo.terms || [],
      featured: promo.featured,
    }));

    return NextResponse.json(promotionsWithTerms);
  } catch (error: any) {
    console.error('Error fetching promotions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch promotions', details: error.message },
      { status: 500 }
    );
  }
}
