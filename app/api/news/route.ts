import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { News } from '@/lib/db/models';

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');

    let newsQuery = News.find({}).sort({ publishedAt: -1 });

    if (limit) {
      newsQuery = newsQuery.limit(parseInt(limit));
    }

    const news = await newsQuery.lean();

    const newsArticles = news.map((article: any) => ({
      id: article._id.toString(),
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      image: article.image,
      publishedAt: article.publishedAt,
      author: article.author,
    }));

    return NextResponse.json(newsArticles);
  } catch (error: any) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news', details: error.message },
      { status: 500 }
    );
  }
}
