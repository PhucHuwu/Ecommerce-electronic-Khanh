import { notFound } from "next/navigation"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Container } from "@/components/layout/Container"
import { ProductCard } from "@/components/shared/ProductCard"
import { getPromotionBySlug, getProducts } from "@/lib/api"
import { ChevronRight, Calendar, Tag, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface PromotionPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function PromotionPage({ params }: PromotionPageProps) {
  const { slug } = await params

  const promotion = await getPromotionBySlug(slug)
  if (!promotion) {
    notFound()
  }

  const allProducts = await getProducts({})
  const featuredProducts = allProducts.slice(0, 8)

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
              <Link href="/#promotions" className="hover:text-red-600 transition-colors">
                Khuyến mãi
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium">{promotion.title}</span>
            </div>
          </Container>
        </section>

        {/* Promotion Hero */}
        <section className={`${promotion.bgColor} text-white py-16`}>
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                  <Tag className="w-4 h-4" />
                  <span className="text-sm font-medium">{promotion.discount}</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">{promotion.title}</h1>
                <p className="text-xl text-white/90 mb-6">{promotion.description}</p>

                <div className="flex flex-col gap-3 mb-8">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-white/80" />
                    <span className="text-white/90">
                      Từ {new Date(promotion.startDate).toLocaleDateString("vi-VN")} đến{" "}
                      {new Date(promotion.endDate).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-white/80" />
                    <span className="text-white/90">Còn lại 15 ngày</span>
                  </div>
                </div>

                <Link
                  href="#products"
                  className="inline-block px-8 py-4 bg-white text-red-600 font-semibold rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
                >
                  Xem sản phẩm khuyến mãi
                </Link>
              </div>

              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={promotion.image || "/placeholder.svg"}
                  alt={promotion.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Promotion Terms */}
        <section className="py-12 bg-white">
          <Container>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Điều kiện & Điều khoản</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {promotion.terms.map((term, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{term}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Featured Products */}
        <section id="products" className="py-12">
          <Container>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Sản phẩm khuyến mãi</h2>
              <Link href="/category/all" className="text-red-600 hover:text-red-700 font-medium">
                Xem tất cả →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Đừng bỏ lỡ cơ hội!</h2>
              <p className="text-xl text-red-100 mb-8">
                Chương trình chỉ áp dụng đến {new Date(promotion.endDate).toLocaleDateString("vi-VN")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="#products"
                  className="px-8 py-4 bg-white text-red-600 font-semibold rounded-xl hover:bg-gray-100 transition-all"
                >
                  Mua ngay
                </Link>
                <Link
                  href="/"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all border-2 border-white/30"
                >
                  Về trang chủ
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
