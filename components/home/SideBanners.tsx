import Image from "next/image"
import Link from "next/link"

export function SideBanners() {
  const banners = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=250&fit=crop",
      link: "/promotion/black-friday-build-pc",
      alt: "Black Friday Build PC",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=400&h=250&fit=crop",
      link: "/promotion/black-friday-keyboard",
      alt: "Black Friday Mechanical Keyboard",
    },
  ]

  return (
    <div className="hidden lg:flex flex-col gap-4 h-full">
      {banners.map((banner) => (
        <Link key={banner.id} href={banner.link} className="relative flex-1 rounded-xl overflow-hidden group">
          <Image
            src={banner.image || "/placeholder.svg"}
            alt={banner.alt}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="400px"
          />
        </Link>
      ))}
    </div>
  )
}
