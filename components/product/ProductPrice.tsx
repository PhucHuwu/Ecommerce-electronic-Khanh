import { formatPrice, calculateDiscount } from "@/lib/utils"
import { Badge } from "@/components/shared/Badge"

interface ProductPriceProps {
  price: number
  originalPrice: number
  badge?: string
}

export function ProductPrice({ price, originalPrice, badge }: ProductPriceProps) {
  const discount = calculateDiscount(originalPrice, price)

  return (
    <div className="space-y-3 p-4 bg-gray-50 rounded-xl">
      {/* Badges */}
      {badge && (
        <div className="flex gap-2">
          <Badge variant="hot">{badge}</Badge>
          {discount > 0 && <Badge variant="sale">Giảm {discount}%</Badge>}
        </div>
      )}

      {/* Prices */}
      <div className="space-y-1">
        {originalPrice > price && (
          <div className="flex items-center gap-3">
            <span className="text-lg text-gray-400 line-through">{formatPrice(originalPrice)}</span>
            <span className="bg-red-100 text-red-600 text-sm font-semibold px-2 py-1 rounded">-{discount}%</span>
          </div>
        )}
        <div className="text-3xl font-bold text-red-600">{formatPrice(price)}</div>
      </div>

      {/* Promotion Note */}
      <div className="text-sm text-gray-600">
        <p>✓ Giá đã bao gồm 10% VAT</p>
        <p>✓ Miễn phí giao hàng toàn quốc</p>
      </div>
    </div>
  )
}
