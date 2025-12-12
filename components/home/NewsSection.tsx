import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"
import { getNews } from "@/lib/api"

export async function NewsSection() {
  const newsArticles = await getNews({ limit: 4 })
  
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Tin tức công nghệ</h2>
        <Link href="/news" className="text-red-600 hover:text-red-700 font-medium flex items-center gap-1">
          Xem tất cả
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {newsArticles.map((article) => (
          <Link
            key={article.id}
            href={`/news/${article.slug}`}
            className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={article.thumbnail || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                <time>{new Date(article.publishedAt).toLocaleDateString("vi-VN")}</time>
                <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded">{article.category}</span>
              </div>
              <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
