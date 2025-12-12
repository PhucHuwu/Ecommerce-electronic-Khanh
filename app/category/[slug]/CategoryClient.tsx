"use client"

import { useState, useEffect } from "react"
import { Container } from "@/components/layout/Container"
import { ProductCard } from "@/components/shared/ProductCard"
import type { Product } from "@/lib/types"
import { SlidersHorizontal, X } from "lucide-react"
import Link from "next/link"

type SortOption = "featured" | "bestseller" | "price-asc" | "price-desc" | "newest"

interface CategoryClientProps {
  categoryProducts: Product[]
}

export default function CategoryClient({ categoryProducts }: CategoryClientProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortOption>("featured")
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(categoryProducts)

  useEffect(() => {
    let result = [...categoryProducts]

    // Apply brand filter
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand))
    }

    // Apply price range filter
    if (selectedPriceRanges.length > 0) {
      result = result.filter((p) => selectedPriceRanges.some((range) => checkPriceRange(p.price, range)))
    }

    // Apply sorting
    switch (sortBy) {
      case "bestseller":
        result.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
        break
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "newest":
        result.reverse()
        break
      case "featured":
      default:
        result.sort((a, b) => b.rating - a.rating)
        break
    }

    setFilteredProducts(result)
  }, [selectedBrands, selectedPriceRanges, sortBy, categoryProducts])

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const togglePriceRange = (range: string) => {
    setSelectedPriceRanges((prev) => (prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]))
  }

  const clearFilters = () => {
    setSelectedBrands([])
    setSelectedPriceRanges([])
  }

  const hasActiveFilters = selectedBrands.length > 0 || selectedPriceRanges.length > 0

  const checkPriceRange = (price: number, range: string): boolean => {
    switch (range) {
      case "under-20":
        return price < 20000000
      case "20-40":
        return price >= 20000000 && price < 40000000
      case "40-60":
        return price >= 40000000 && price < 60000000
      case "above-60":
        return price >= 60000000
      default:
        return true
    }
  }

  const brands = Array.from(new Set(categoryProducts.map((p) => p.brand)))

  return (
    <section className="py-8">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-gray-700" />
                  <h2 className="text-lg font-bold text-gray-900">Bộ lọc</h2>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    Xóa
                  </button>
                )}
              </div>

              {/* Brand Filter */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Thương hiệu</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer hover:text-red-600">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                      />
                      <span className="text-sm text-gray-700">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mt-6 space-y-4">
                <h3 className="font-semibold text-gray-900">Khoảng giá</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer hover:text-red-600">
                    <input
                      type="checkbox"
                      checked={selectedPriceRanges.includes("under-20")}
                      onChange={() => togglePriceRange("under-20")}
                      className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">Dưới 20 triệu</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-red-600">
                    <input
                      type="checkbox"
                      checked={selectedPriceRanges.includes("20-40")}
                      onChange={() => togglePriceRange("20-40")}
                      className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">20 - 40 triệu</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-red-600">
                    <input
                      type="checkbox"
                      checked={selectedPriceRanges.includes("40-60")}
                      onChange={() => togglePriceRange("40-60")}
                      className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">40 - 60 triệu</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-red-600">
                    <input
                      type="checkbox"
                      checked={selectedPriceRanges.includes("above-60")}
                      onChange={() => togglePriceRange("above-60")}
                      className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">Trên 60 triệu</span>
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
                  <button
                    onClick={() => setSortBy("featured")}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      sortBy === "featured" ? "bg-red-600 text-white" : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Nổi bật
                  </button>
                  <button
                    onClick={() => setSortBy("bestseller")}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      sortBy === "bestseller" ? "bg-red-600 text-white" : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Bán chạy
                  </button>
                  <button
                    onClick={() => setSortBy("price-asc")}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      sortBy === "price-asc" ? "bg-red-600 text-white" : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Giá thấp
                  </button>
                  <button
                    onClick={() => setSortBy("price-desc")}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      sortBy === "price-desc" ? "bg-red-600 text-white" : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Giá cao
                  </button>
                  <button
                    onClick={() => setSortBy("newest")}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      sortBy === "newest" ? "bg-red-600 text-white" : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Mới nhất
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Không tìm thấy sản phẩm</h3>
                <p className="text-gray-600">Vui lòng thử lại với bộ lọc khác hoặc quay lại trang chủ</p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="inline-block mt-4 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors mr-3"
                  >
                    Xóa bộ lọc
                  </button>
                )}
                <Link
                  href="/"
                  className="inline-block mt-4 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Về trang chủ
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
