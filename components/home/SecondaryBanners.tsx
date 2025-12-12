import Image from "next/image"
import Link from "next/link"

export function SecondaryBanners() {
  const banners = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?w=600&h=300&fit=crop",
      link: "/category/laptop",
      alt: "Laptop Gaming",
      title: "LAPTOP GAMING",
      subtitle: "Ưu đãi nâng cấp RAM, SSD",
      badge: "VOUCHER 500K",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=300&fit=crop",
      link: "/category/laptop",
      alt: "Laptop Office",
      title: "LAPTOP OFFICE",
      subtitle: "Giá tốt cho học tập, văn phòng",
      badge: "Trả góp 0%",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1587202372583-49330a15584d?w=600&h=300&fit=crop",
      link: "/category/pc-gaming",
      alt: "PC I5/5060",
      title: "PC I5/5060",
      subtitle: "HSSV giảm đến 500.000đ",
      badge: "HOT",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {banners.map((banner) => (
        <Link key={banner.id} href={banner.link} className="relative aspect-[16/7] rounded-xl overflow-hidden group">
          <Image
            src={banner.image || "/placeholder.svg"}
            alt={banner.alt}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              {banner.badge && (
                <span className="inline-block bg-red-600 text-white text-xs font-bold px-2 py-1 rounded mb-2">
                  {banner.badge}
                </span>
              )}
              <h3 className="text-white font-bold text-lg mb-1">{banner.title}</h3>
              <p className="text-white/90 text-sm">{banner.subtitle}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
