import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { Promotion } from '@/lib/db/models';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();

    const { slug } = await params;

    const promo = await Promotion.findOne({ slug }).lean();

    if (!promo) {
      return NextResponse.json(
        { error: 'Promotion not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
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
    });
  } catch (error: any) {
    console.error('Error fetching promotion:', error);
    return NextResponse.json(
      { error: 'Failed to fetch promotion', details: error.message },
      { status: 500 }
    );
  }
}
