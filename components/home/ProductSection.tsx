"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Product } from "@/lib/types"
import { ProductCard } from "@/components/shared/ProductCard"
import { useRef, useState } from "react"

interface ProductSectionProps {
  title: string
  products: Product[]
  badges?: string[]
  filterTabs?: string[]
}

export function ProductSection({ title, products, badges, filterTabs }: ProductSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState(0)

  const filteredProducts =
    filterTabs && filterTabs[activeTab] && filterTabs[activeTab] !== "Tất cả"
      ? products.filter((product) => {
          const tab = filterTabs[activeTab]

          // Check if it's a category filter (for Gaming Gear section)
          if (tab === "Chuột" && product.category === "Chuột Gaming") return true
          if (tab === "Bàn phím" && product.category === "Bàn phím") return true
          if (tab === "Tai nghe" && product.category === "Tai nghe") return true

          // Check if it's a brand filter (for most sections)
          if (product.brand === tab) return true

          // For PC Gaming: check CPU brand in specs
          if (title.includes("PC Gaming") && product.specs?.cpu) {
            if (tab === "Intel" && product.specs.cpu.includes("Intel")) return true
            if (tab === "AMD" && product.specs.cpu.includes("AMD")) return true
          }

          return false
        })
      : products

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="space-y-4 bg-white rounded-md p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {badges && (
            <div className="flex gap-2">
              {badges.map((badge, index) => (
                <span key={index} className="bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Filter Tabs */}
        {filterTabs && (
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {filterTabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === index ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Products Carousel */}
      <div className="relative group">
        {/* Navigation Buttons */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-[280px] snap-start">
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <div className="w-full py-12 text-center text-gray-500">Không có sản phẩm nào trong danh mục này</div>
          )}
        </div>
      </div>
    </section>
  )
}
