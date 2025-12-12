import Image from "next/image"
import Link from "next/link"
import { getPromotions } from "@/lib/api"

export async function PromotionSection() {
  const promotions = await getPromotions({ featured: true })
  
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Chương trình khuyến mãi</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {promotions.map((promo) => (
          <Link key={promo.id} href={`/promotion/${promo.slug}`} className="group relative aspect-[4/3] rounded-xl overflow-hidden">
            <Image
              src={promo.image || "/placeholder.svg"}
              alt={promo.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-center text-white">
              <h3 className="text-2xl font-bold mb-2">{promo.title}</h3>
              <p className="text-sm">{promo.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
