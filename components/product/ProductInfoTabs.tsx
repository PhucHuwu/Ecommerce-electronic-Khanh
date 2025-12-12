"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { RatingStars } from "@/components/shared/RatingStars"

interface ProductInfoTabsProps {
  description: string
  highlightFeatures: string[]
  specs: Record<string, string | undefined>
}

export function ProductInfoTabs({ description, highlightFeatures, specs }: ProductInfoTabsProps) {
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description")

  const tabs = [
    { id: "description" as const, label: "Mô tả sản phẩm" },
    { id: "specs" as const, label: "Thông số kỹ thuật" },
    { id: "reviews" as const, label: "Đánh giá" },
  ]

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 py-4 px-6 font-semibold transition-colors",
              activeTab === tab.id ? "text-red-600 border-b-2 border-red-600" : "text-gray-600 hover:text-gray-900",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "description" && (
          <div className="space-y-6">
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-900">Tính năng nổi bật</h3>
              <ul className="space-y-3">
                {highlightFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-red-600 font-bold text-xl">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "specs" && (
          <div className="space-y-2">
            {Object.entries(specs)
              .filter(([_, value]) => value)
              .map(([key, value]) => (
                <div key={key} className="grid grid-cols-3 gap-4 p-4 border-b border-gray-100 last:border-0">
                  <div className="font-semibold text-gray-700 capitalize">{key}</div>
                  <div className="col-span-2 text-gray-900">{value}</div>
                </div>
              ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            {/* Review Summary */}
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-5xl font-bold text-gray-900 mb-2">4.8</div>
              <RatingStars rating={4.8} size="lg" showCount={false} />
              <p className="text-gray-600 mt-2">Dựa trên 127 đánh giá</p>
            </div>

            {/* Sample Reviews */}
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-b border-gray-200 pb-4 last:border-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">Nguyễn Văn A</p>
                      <RatingStars rating={5} size="sm" showCount={false} />
                    </div>
                    <span className="text-sm text-gray-500">15/01/2024</span>
                  </div>
                  <p className="text-gray-700">
                    Sản phẩm rất tốt, hiệu năng mạnh mẽ, chạy game mượt mà. Giao hàng nhanh, đóng gói cẩn thận. Rất hài
                    lòng!
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
