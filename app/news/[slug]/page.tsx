import { notFound } from "next/navigation"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Container } from "@/components/layout/Container"
import { getNewsBySlug, getNews } from "@/lib/api"
import { ChevronRight, Calendar, Tag, Share2, Facebook, Twitter, LinkIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface NewsPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { slug } = await params

  // Find article
  const article = await getNewsBySlug(slug)
  if (!article) {
    notFound()
  }

  // Get related articles (same category, excluding current)
  const allNews = await getNews({})
  const relatedArticles = allNews.filter((a) => a.category === article.category && a.id !== article.id).slice(0, 3)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <section className="bg-white border-b">
          <Container>
            <div className="flex items-center gap-2 py-4 text-sm text-gray-600">
              <Link href="/" className="hover:text-red-600 transition-colors">
                Trang chủ
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/#news" className="hover:text-red-600 transition-colors">
                Tin tức
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium line-clamp-1">{article.title}</span>
            </div>
          </Container>
        </section>

        <section className="py-8">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Article */}
              <article className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  {/* Featured Image */}
                  <div className="relative aspect-video w-full bg-gray-100">
                    <Image
                      src={article.thumbnail || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Article Content */}
                  <div className="p-6 lg:p-8">
                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(article.publishedAt).toLocaleDateString("vi-VN")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        <span className="text-red-600 font-medium">{article.category}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-balance">{article.title}</h1>

                    {/* Excerpt */}
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">{article.excerpt}</p>

                    {/* Share Buttons */}
                    <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
                      <span className="text-sm font-medium text-gray-700">Chia sẻ:</span>
                      <div className="flex gap-2">
                        <button className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                          <Facebook className="w-5 h-5" />
                        </button>
                        <button className="p-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition-colors">
                          <Twitter className="w-5 h-5" />
                        </button>
                        <button className="p-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">
                          <LinkIcon className="w-5 h-5" />
                        </button>
                        <button className="p-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Article Body */}
                    <div className="prose prose-lg max-w-none mt-8">
                      <h2>Giới thiệu</h2>
                      <p>
                        Trong thời đại công nghệ phát triển như hiện nay, việc lựa chọn được sản phẩm phù hợp với nhu
                        cầu sử dụng là điều vô cùng quan trọng. Bài viết này sẽ giúp bạn hiểu rõ hơn về những thông tin
                        cần thiết để đưa ra quyết định mua sắm thông minh.
                      </p>

                      <h2>Những điểm nổi bật</h2>
                      <p>
                        Sản phẩm công nghệ hiện đại không chỉ mang lại hiệu suất cao mà còn được tích hợp nhiều tính
                        năng thông minh, giúp người dùng tối ưu hóa trải nghiệm. Với thiết kế tinh tế và chất lượng cao,
                        các sản phẩm gaming gear ngày nay đáp ứng được cả nhu cầu sử dụng hàng ngày lẫn chơi game chuyên
                        nghiệp.
                      </p>

                      <h2>Đánh giá chi tiết</h2>
                      <p>
                        Hiệu năng là yếu tố quan trọng hàng đầu khi đánh giá một sản phẩm công nghệ. Với cấu hình mạnh
                        mẽ, khả năng xử lý nhanh chóng và ổn định, các sản phẩm trong phân khúc cao cấp luôn đáp ứng
                        được mọi nhu cầu từ cơ bản đến chuyên nghiệp.
                      </p>

                      <h2>Kết luận</h2>
                      <p>
                        Tóm lại, việc lựa chọn sản phẩm phù hợp cần dựa trên nhiều yếu tố như nhu cầu sử dụng, ngân sách
                        và các tính năng cụ thể. Hi vọng bài viết này đã cung cấp những thông tin hữu ích giúp bạn đưa
                        ra quyết định đúng đắn.
                      </p>
                    </div>
                  </div>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                {/* Related Articles */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Bài viết liên quan</h2>
                  <div className="space-y-4">
                    {relatedArticles.map((related) => (
                      <Link
                        key={related.id}
                        href={`/news/${related.slug}`}
                        className="group flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                      >
                        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={related.thumbnail || "/placeholder.svg"}
                            alt={related.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm line-clamp-2 text-gray-900 group-hover:text-red-600 transition-colors mb-1">
                            {related.title}
                          </h3>
                          <p className="text-xs text-gray-600">
                            {new Date(related.publishedAt).toLocaleDateString("vi-VN")}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* View All Button */}
                  <Link
                    href="/#news"
                    className="block w-full mt-6 py-2 px-4 text-center text-sm font-medium text-red-600 border-2 border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                  >
                    Xem tất cả tin tức
                  </Link>
                </div>
              </aside>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
