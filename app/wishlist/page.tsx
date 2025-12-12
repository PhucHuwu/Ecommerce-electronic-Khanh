"use client"

import { Container } from "@/components/layout/Container"
import { ProductCard } from "@/components/shared/ProductCard"
import { getProducts } from "@/lib/api"
import type { Product } from "@/lib/types"
import { Heart, X } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function WishlistPage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadFavorites = async () => {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
      setFavoriteIds(favorites)
      
      if (favorites.length > 0) {
        try {
          const allProducts = await getProducts({})
          const filtered = allProducts.filter((product) => favorites.includes(product.id))
          setFavoriteProducts(filtered)
        } catch (error) {
          console.error('Failed to load favorite products:', error)
          setFavoriteProducts([])
        }
      } else {
        setFavoriteProducts([])
      }
      
      setIsLoading(false)
    }

    loadFavorites()

    const handleFavoritesChange = () => {
      loadFavorites()
    }

    window.addEventListener("favoritesChanged", handleFavoritesChange)
    return () => window.removeEventListener("favoritesChanged", handleFavoritesChange)
  }, [])

  const clearAllFavorites = () => {
    localStorage.setItem("favorites", "[]")
    setFavoriteIds([])
    setFavoriteProducts([])
    window.dispatchEvent(new Event("favoritesChanged"))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Container className="py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-8">
        {/* Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-3 rounded-lg">
                <Heart className="w-6 h-6 text-red-600 fill-red-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Sản phẩm yêu thích</h1>
                <p className="text-gray-600 text-sm mt-1">
                  {favoriteProducts.length} sản phẩm trong danh sách yêu thích
                </p>
              </div>
            </div>
            {favoriteProducts.length > 0 && (
              <button
                onClick={clearAllFavorites}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
                <span>Xóa tất cả</span>
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {favoriteProducts.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Chưa có sản phẩm yêu thích</h2>
            <p className="text-gray-600 mb-6">
              Hãy thêm sản phẩm vào danh sách yêu thích để dễ dàng theo dõi và mua sắm sau
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              Khám phá sản phẩm
            </Link>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {favoriteProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}
