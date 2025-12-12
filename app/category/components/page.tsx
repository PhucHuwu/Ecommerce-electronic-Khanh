import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Container } from "@/components/layout/Container"
import { ProductCard } from "@/components/shared/ProductCard"
import { getProducts } from "@/lib/api"
import { ChevronRight, SlidersHorizontal } from "lucide-react"
import Link from "next/link"

export default async function ComponentsPage() {
  const allProducts = await getProducts({})
  const componentProducts = allProducts.filter(
    (p) =>
      p.category.toLowerCase().includes("cpu") ||
      p.category.toLowerCase().includes("vga") ||
      p.category.toLowerCase().includes("monitor"),
  )

  const brands = Array.from(new Set(componentProducts.map((p) => p.brand)))

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
              <span className="text-gray-900 font-medium">Linh kiện máy tính</span>
            </div>
          </Container>
        </section>

        {/* Category Header */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8">
          <Container>
            <div className="flex items-center gap-4">
              <div className="text-6xl">⚙️</div>
              <div>
                <h1 className="text-3xl font-bold mb-2">Linh kiện máy tính</h1>
                <p className="text-blue-100">
                  CPU, VGA, Màn hình và nhiều hơn nữa - {componentProducts.length} sản phẩm
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Filters & Products */}
        <section className="py-8">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar Filters */}
              <aside className="lg:col-span-1">
                <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
                  <div className="flex items-center gap-2 mb-6">
                    <SlidersHorizontal className="w-5 h-5 text-gray-700" />
                    <h2 className="text-lg font-bold text-gray-900">Bộ lọc</h2>
                  </div>

                  {/* Category Filter */}
                  <div className="space-y-4 mb-6">
                    <h3 className="font-semibold text-gray-900">Danh mục</h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-red-600 rounded" />
                        <span className="text-sm text-gray-700">CPU - Bộ xử lý</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-red-600 rounded" />
                        <span className="text-sm text-gray-700">VGA - Card đồ họa</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-red-600 rounded" />
                        <span className="text-sm text-gray-700">Màn hình Gaming</span>
                      </label>
                    </div>
                  </div>

                  {/* Brand Filter */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Thương hiệu</h3>
                    <div className="space-y-2">
                      {brands.slice(0, 8).map((brand) => (
                        <label key={brand} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 text-red-600 rounded" />
                          <span className="text-sm text-gray-700">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div className="mt-6 space-y-4">
                    <h3 className="font-semibold text-gray-900">Khoảng giá</h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-red-600 rounded" />
                        <span className="text-sm text-gray-700">Dưới 5 triệu</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-red-600 rounded" />
                        <span className="text-sm text-gray-700">5 - 10 triệu</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-red-600 rounded" />
                        <span className="text-sm text-gray-700">10 - 20 triệu</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-red-600 rounded" />
                        <span className="text-sm text-gray-700">Trên 20 triệu</span>
                      </label>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Product Grid */}
              <div className="lg:col-span-3">
                {/* Sort Bar */}
                <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-sm text-gray-600">Sắp xếp theo:</span>
                    <div className="flex flex-wrap gap-2">
                      <button className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg">
                        Nổi bật
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                        Bán chạy
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                        Giá thấp
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                        Giá cao
                      </button>
                    </div>
                  </div>
                </div>

                {/* Products */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {componentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
