import Link from "next/link"
import { Container } from "./Container"
import { Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Về GEARVN</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/tuyen-dung" className="hover:text-white transition-colors">
                  Tuyển dụng
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="hover:text-white transition-colors">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Chính sách</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/chinh-sach-bao-hanh" className="hover:text-white transition-colors">
                  Chính sách bảo hành
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach-giao-hang" className="hover:text-white transition-colors">
                  Chính sách giao hàng
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach-doi-tra" className="hover:text-white transition-colors">
                  Chính sách đổi trả
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach-bao-mat" className="hover:text-white transition-colors">
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Hỗ trợ</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/huong-dan-mua-hang" className="hover:text-white transition-colors">
                  Hướng dẫn mua hàng
                </Link>
              </li>
              <li>
                <Link href="/huong-dan-tra-gop" className="hover:text-white transition-colors">
                  Hướng dẫn trả góp
                </Link>
              </li>
              <li>
                <Link href="/tra-cuu-don-hang" className="hover:text-white transition-colors">
                  Tra cứu đơn hàng
                </Link>
              </li>
              <li>
                <Link href="/build-pc" className="hover:text-white transition-colors">
                  Build PC
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Hotline</p>
                  <a href="tel:1900.5301" className="hover:text-white">
                    1900.5301
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Email</p>
                  <a href="mailto:cskh@gearvn.com" className="hover:text-white">
                    cskh@gearvn.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Showroom</p>
                  <p className="text-sm">Hệ thống 20+ chi nhánh toàn quốc</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-800 py-6">
          <h4 className="text-white font-semibold mb-4">Phương thức thanh toán</h4>
          <div className="flex flex-wrap gap-3">
            <div className="bg-white rounded px-3 py-2 text-xs font-semibold text-gray-900">💳 Visa</div>
            <div className="bg-white rounded px-3 py-2 text-xs font-semibold text-gray-900">💳 Mastercard</div>
            <div className="bg-white rounded px-3 py-2 text-xs font-semibold text-gray-900">🏦 Chuyển khoản</div>
            <div className="bg-white rounded px-3 py-2 text-xs font-semibold text-gray-900">💵 Tiền mặt</div>
            <div className="bg-white rounded px-3 py-2 text-xs font-semibold text-gray-900">📱 MoMo</div>
            <div className="bg-white rounded px-3 py-2 text-xs font-semibold text-gray-900">💰 ZaloPay</div>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="border-t border-gray-800 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">© 2025 GEARVN. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <Youtube className="w-6 h-6" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
