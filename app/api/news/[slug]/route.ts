import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { News } from '@/lib/db/models';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();

    const { slug } = await params;

    const article = await News.findOne({ slug }).lean();

    if (!article) {
      return NextResponse.json(
        { error: 'News article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: article._id.toString(),
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      image: article.image,
      publishedAt: article.publishedAt,
      author: article.author,
    });
  } catch (error: any) {
    console.error('Error fetching news article:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news article', details: error.message },
      { status: 500 }
    );
  }
}
