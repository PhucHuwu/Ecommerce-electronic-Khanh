import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Container } from "@/components/layout/Container"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { getCategories, getProducts } from "@/lib/api"
import CategoryClient from "./CategoryClient"

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const categories = await getCategories()
  const category = categories.find((c) => c.slug === slug)
  
  if (!category) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Container>
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Không tìm thấy danh mục</h3>
              <p className="text-gray-600 mb-6">Danh mục bạn đang tìm kiếm không tồn tại</p>
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Về trang chủ
              </Link>
            </div>
          </Container>
        </main>
        <Footer />
      </>
    )
  }
  
  const categoryProducts = await getProducts({ category: category.name })

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
              <span className="text-gray-900 font-medium">{category.name}</span>
            </div>
          </Container>
        </section>

        {/* Category Header */}
        <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-8">
          <Container>
            <div className="flex items-center gap-4">
              <div className="text-6xl">{category.icon}</div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
                <p className="text-red-100">Tìm thấy {categoryProducts.length} sản phẩm</p>
              </div>
            </div>
          </Container>
        </section>

        {/* Client Component for Filters & Products */}
        <CategoryClient categoryProducts={categoryProducts} />
      </main>
      <Footer />
    </>
  )
}