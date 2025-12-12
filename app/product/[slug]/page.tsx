import { notFound } from "next/navigation"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Container } from "@/components/layout/Container"
import { ProductGallery } from "@/components/product/ProductGallery"
import { ProductPrice } from "@/components/product/ProductPrice"
import { ProductSpecs } from "@/components/product/ProductSpecs"
import { ProductActions } from "@/components/product/ProductActions"
import { ProductInfoTabs } from "@/components/product/ProductInfoTabs"
import { ProductSection } from "@/components/home/ProductSection"
import { RatingStars } from "@/components/shared/RatingStars"
import { getProductBySlug, getProducts } from "@/lib/api"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  // Get related products
  const allCategoryProducts = await getProducts({ category: product.category })
  const relatedProducts = allCategoryProducts.filter((p) => p.id !== product.id).slice(0, 8)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <section className="bg-white border-b border-gray-200">
          <Container>
            <div className="flex items-center gap-2 py-4 text-sm text-gray-600">
              <Link href="/" className="hover:text-red-600 transition-colors">
                Trang chủ
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link
                href={`/category/${product.category.toLowerCase()}`}
                className="hover:text-red-600 transition-colors"
              >
                {product.category}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium line-clamp-1">{product.name}</span>
            </div>
          </Container>
        </section>

        {/* Product Details */}
        <section className="py-8">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Gallery */}
              <div>
                <ProductGallery images={product.gallery} productName={product.name} />
              </div>

              {/* Right: Info */}
              <div className="space-y-6">
                {/* Product Name */}
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
                  <div className="flex items-center gap-4 text-sm">
                    <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="md" />
                    <span className="text-gray-600">
                      SKU: <span className="font-medium">{product.id}</span>
                    </span>
                    <span className="text-gray-600">
                      Brand: <span className="font-medium">{product.brand}</span>
                    </span>
                  </div>
                </div>

                {/* Price */}
                <ProductPrice price={product.price} originalPrice={product.originalPrice} badge={product.badge} />

                {/* Specs */}
                <ProductSpecs specs={product.specs} />

                {/* Variants */}
                {product.variants.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900">Tùy chọn</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((variant) => (
                        <button
                          key={variant.id}
                          className="px-4 py-2 border-2 border-gray-300 hover:border-red-600 rounded-lg font-medium text-sm transition-colors"
                        >
                          {variant.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <ProductActions productId={product.id} />
              </div>
            </div>
          </Container>
        </section>

        {/* Product Info Tabs */}
        <section className="py-8">
          <Container>
            <ProductInfoTabs
              description={product.description}
              highlightFeatures={product.highlightFeatures}
              specs={product.specs}
            />
          </Container>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-8">
            <Container>
              <ProductSection title="Sản phẩm liên quan" products={relatedProducts} />
            </Container>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
