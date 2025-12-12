import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Container } from "@/components/layout/Container"
import { HeroCarousel } from "@/components/home/HeroCarousel"
import { SideBanners } from "@/components/home/SideBanners"
import { SecondaryBanners } from "@/components/home/SecondaryBanners"
import { CategoryGrid } from "@/components/home/CategoryGrid"
import { ProductSection } from "@/components/home/ProductSection"
import { PromotionSection } from "@/components/home/PromotionSection"
import { NewsSection } from "@/components/home/NewsSection"
import { getProducts } from "@/lib/api"

export default async function HomePage() {
  // Fetch products with error handling
  const [laptopProducts, pcProducts, mouseProducts, keyboardProducts, monitorProducts] = await Promise.all([
    getProducts({ category: "Laptop Gaming" }).catch(() => []),
    getProducts({ category: "PC Gaming" }).catch(() => []),
    getProducts({ category: "Chuột Gaming" }).catch(() => []),
    getProducts({ category: "Bàn phím" }).catch(() => []),
    getProducts({ category: "Màn hình" }).catch(() => []),
  ])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100">
        {/* Hero Section */}
        <section className="py-6">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-9">
                <HeroCarousel />
              </div>
              <div className="lg:col-span-3">
                <SideBanners />
              </div>
            </div>

            <div className="mt-4">
              <SecondaryBanners />
            </div>
          </Container>
        </section>

        {/* Category Grid */}
        <section className="py-8">
          <Container>
            <div className="bg-white rounded-md p-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Danh mục sản phẩm</h2>
              <CategoryGrid />
            </div>
          </Container>
        </section>

        {/* Product Sections */}
        <section className="py-8">
          <Container>
            <div className="space-y-12">
              <ProductSection
                title="PC Gaming Bán Chạy"
                products={pcProducts}
                badges={["Tặng màn hình"]}
                filterTabs={["Intel", "AMD", "Tất cả"]}
              />

            <ProductSection
              title="Laptop Gaming Bán Chạy"
              products={laptopProducts}
              badges={["Giảm đến 20%", "Trả góp 0%"]}
              filterTabs={["ASUS", "MSI", "Acer", "Lenovo", "Dell"]}
            />

            <ProductSection
              title="Chuột Bán Chạy"
              products={mouseProducts}
              filterTabs={["Logitech", "Razer", "ASUS", "Corsair", "SteelSeries"]}
            />

            <ProductSection
              title="Bàn Phím Bán Chạy"
              products={keyboardProducts}
              badges={["Giảm 26%"]}
              filterTabs={["Keychron", "Corsair", "Razer", "Logitech", "AKKO"]}
            />

            <ProductSection
              title="Màn Hình Bán Chạy"
              products={monitorProducts}
              badges={["Bảo hành 1 đổi 1"]}
              filterTabs={["ASUS", "LG", "Samsung", "MSI", "Acer"]}
            />

              <ProductSection
                title="Gaming Gear Hot"
                products={[...mouseProducts, ...keyboardProducts]}
                filterTabs={["Chuột", "Bàn phím", "Tai nghe"]}
              />
            </div>
          </Container>
        </section>

        {/* Promotion Section */}
        <section className="py-8 bg-white rounded-md p-4">
          <Container>
            <PromotionSection />
          </Container>
        </section>

        {/* News Section */}
        <section className="py-8 bg-white rounded-md p-4">
          <Container>
            <NewsSection />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
