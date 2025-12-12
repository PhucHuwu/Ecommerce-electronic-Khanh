"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Container } from "@/components/layout/Container"
import { ProductCard } from "@/components/shared/ProductCard"
import { getProducts } from "@/lib/api"
import { Search } from "lucide-react"
import type { Product } from "@/lib/types"

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true)
      try {
        const results = await getProducts({ search: query })
        setSearchResults(results)
      } catch (error) {
        console.error('Failed to fetch search results:', error)
        setSearchResults([])
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchResults()
  }, [query])

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 py-8">
          <Container>
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            </div>
          </Container>
        </main>
        <Footer />
      </>
    )
  }
  
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-8">
        <Container>
          {/* Search Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Search className="w-6 h-6 text-gray-400" />
              <h1 className="text-2xl font-bold text-gray-900">
                Kết quả tìm kiếm: <span className="text-red-600">"{query}"</span>
              </h1>
            </div>
            <p className="text-gray-600">Tìm thấy {searchResults.length} sản phẩm</p>
          </div>

          {/* Results Grid */}
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {searchResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy sản phẩm</h3>
              <p className="text-gray-600">Vui lòng thử lại với từ khóa khác</p>
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResults />
    </Suspense>
  )
}
