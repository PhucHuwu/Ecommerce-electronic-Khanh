import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { Category } from '@/lib/db/models';

export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find({})
      .sort({ name: 1 })
      .lean();

    const categoriesData = categories.map((cat: any) => ({
      id: cat._id.toString(),
      name: cat.name,
      slug: cat.slug,
      image: cat.image,
    }));

    return NextResponse.json(categoriesData);
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories', details: error.message },
      { status: 500 }
    );
  }
}
