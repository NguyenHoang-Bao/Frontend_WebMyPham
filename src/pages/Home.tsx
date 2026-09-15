import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRight, BsCartPlus, BsChevronLeft, BsChevronRight, BsChevronDown } from 'react-icons/bs';

// Import Data
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import brandsData from '../data/brands.json';

// Hero Banner Images từ Unsplash (cosmetics & beauty)
const heroImg1 = 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=2070&q=80&auto=format&fit=crop';
const heroImg2 = 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=2070&q=80&auto=format&fit=crop';
const heroImg3 = 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=2070&q=80&auto=format&fit=crop';

// Import Video Banner & Triết Lý Làm Đẹp
import videoBanner from '../assets/video/videobanner.mp4';
import videoNhanSac from '../assets/video/video_nhansac.mp4';

// Khai báo kiểu cho đối tượng HeroSlide
interface HeroSlide {
  image: string;
  badge?: string; // Tùy chọn vì có cái null
  title: string;
  description?: string | null;
  buttonText: string;
  link: string;
}

const heroSlides: HeroSlide[] = [
  {
    image: heroImg1,
    badge: 'Bộ Sưu Tập Mới 2026',
    title: 'NUÔI DƯỠNG\nLÀN DA RẠNG RỠ',
    description: 'Khám phá các dòng sản phẩm dưỡng da chuyên sâu mới nhất. Tươi trẻ, thuần khiết và tỏa sáng tự nhiên trong từng khoảnh khắc.',
    buttonText: 'Khám Phá Ngay',
    link: '/products'
  },
  {
    image: heroImg2,
    badge: 'Skincare Organic',
    title: 'BÍ QUYẾT\nDA SÁNG MỊN',
    description: null,
    buttonText: 'Mua Ngay',
    link: '/products'
  },
  {
    image: heroImg3,
    badge: 'Natural Beauty',
    title: 'VẺ ĐẸP\nTHUẦN KHIẾT',
    description: null,
    buttonText: 'Xem Sản Phẩm',
    link: '/products'
  },
];

// Hàm helper để tạo URL ảnh từ Cloudinary
// Khai báo kiểu string cho tham số path
const CLOUDINARY_BASE_URL = import.meta.env.VITE_CLOUDINARY_BASE_URL || 'https://res.cloudinary.com/hb22fnuq/image/upload';
const getImageUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${CLOUDINARY_BASE_URL}/${path}`;
};

// Định nghĩa kiểu chung cho sản phẩm
interface Product {
  id: number | string;
  name: string;
  price: number;
  image: string;
  [key: string]: any; // Nếu có thêm data khác
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const totalSlides = heroSlides.length;

  // Lấy 4 sản phẩm đầu tiên làm Featured Products
  const featuredProducts: Product[] = productsData.slice(0, 4) as Product[];
  const flashSaleProducts: Product[] = productsData.slice(0, 5) as Product[];
  const flashSaleNotices = ['Giảm đến 60%', 'Miễn phí vận chuyển', 'Hàng chính hãng'];
  const [countdown, setCountdown] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });

  // Auto-play: chuyển slide sau 6 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearTimeout(timer);
  }, [currentSlide, totalSlides]);

  useEffect(() => {
    const end = new Date();
    end.setDate(end.getDate() + 2);
    end.setHours(23, 59, 59, 0);

    const tick = () => {
      const diff = Math.max(0, end.getTime() - Date.now());
      const pad = (n: number) => String(n).padStart(2, '0');
      setCountdown({
        days: pad(Math.floor(diff / (1000 * 60 * 60 * 24))),
        hours: pad(Math.floor((diff / (1000 * 60 * 60)) % 24)),
        minutes: pad(Math.floor((diff / (1000 * 60)) % 60)),
        seconds: pad(Math.floor((diff / 1000) % 60)),
      });
    };

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  const nextSlide = () => setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));

  return (
    <main className="bg-white text-black w-full">
      {/* ====== 1. HERO CAROUSEL ====== */}
      <section className="relative w-full h-[60vh] max-h-[550px] min-h-[380px] overflow-hidden">
        {/* Slides */}
        <div className="relative w-full h-full">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* Ảnh nền */}
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Lớp phủ tối */}
              <div className="absolute inset-0 bg-black/50 z-[1]"></div>

              {/* Nội dung text - căn trái, giữa dọc */}
              <div className="absolute inset-0 z-[2] flex items-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-lg">
                    {slide.badge && (
                      <span className="inline-block text-sm uppercase tracking-[3px] font-semibold text-gray-300 mb-4">
                        {slide.badge}
                      </span>
                    )}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 whitespace-pre-line">
                      {slide.title}
                    </h1>
                    {slide.description && (
                      <p className="text-base sm:text-lg text-gray-200/90 leading-relaxed mb-8 max-w-md">
                        {slide.description}
                      </p>
                    )}
                    <Link
                      to={slide.link}
                      className="inline-flex items-center gap-3 bg-rose-400 hover:bg-rose-500 text-white px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-full shadow-lg shadow-rose-400/30"
                    >
                      {slide.buttonText} <BsArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nút Previous */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -translate-y-1/2 left-4 z-20 bg-white/20 hover:bg-pink-500/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20"
          aria-label="Previous slide"
        >
          <BsChevronLeft size={22} />
        </button>

        {/* Nút Next */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 -translate-y-1/2 right-4 z-20 bg-white/20 hover:bg-pink-500/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20"
          aria-label="Next slide"
        >
          <BsChevronRight size={22} />
        </button>

        {/* Indicators (dots) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide ? 'bg-pink-400 w-8 h-2.5' : 'bg-white/50 hover:bg-pink-300/70 w-2.5 h-2.5'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ====== (MỚI) TRIẾT LÝ LÀM ĐẸP (EDITORIAL TEXT & IMG SO LE) ====== */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hàng 1: Text Trái - Ảnh Phải */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-20">
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="max-w-xl">
                <span className="text-xs font-bold text-rose-600 uppercase tracking-widest mb-4 block">01 / NGUỒN GỐC NGUYÊN BẢN</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
                  Từ Thành Phần Thiên Nhiên <br />Đến Vẻ Đẹp Thuần Khiết
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  Một làn da khỏe mạnh luôn bắt đầu từ sự lành tính. Những thành phần hữu cơ được tuyển chọn kỹ lưỡng, chiết xuất theo công nghệ hiện đại để giữ lại trọn vẹn dưỡng chất tinh túy nhất từ thiên nhiên.
                </p>
                <div className="border-l-4 border-rose-400 bg-rose-50/60 pl-6 py-3.5 pr-4 rounded-r-xl italic text-gray-800 text-base font-medium">
                  "Không paraben, không hương liệu nhân tạo. Nuôi dưỡng làn da rạng rỡ sâu từ bên trong với cam kết 100% an toàn và dịu nhẹ."
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=900&auto=format&fit=crop"
                  alt="Thành phần thiên nhiên"
                  className="w-full h-auto object-cover rounded-2xl shadow-lg border border-gray-100"
                />
                <span className="absolute -bottom-4 -left-4 bg-rose-500 text-white px-6 py-2 text-xs font-bold tracking-widest uppercase rounded-full shadow-md">ORGANIC INGREDIENTS</span>
              </div>
            </div>
          </div>

          {/* Hàng 2: Ảnh Trái - Text Phải (So Le) */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  src={videoNhanSac}
                  className="w-full h-auto object-cover rounded-2xl shadow-lg border border-gray-100"
                >
                  <source src={videoNhanSac} type="video/mp4" />
                </video>
                <span className="absolute -bottom-4 -right-4 bg-rose-500 text-white px-6 py-2 text-xs font-bold tracking-widest uppercase rounded-full shadow-md">CLINICAL SKINCARE</span>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="max-w-xl lg:pl-10">
                <span className="text-xs font-bold text-rose-600 uppercase tracking-widest mb-4 block">02 / HIỆU QUẢ CHUẨN Y KHOA</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
                  Công Nghệ Đột Phá — <br />Phục Hồi Từng Tế Bào
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  Sự kết hợp hoàn hảo giữa thiên nhiên và khoa học liễu da. Các công thức độc quyền được kiểm nghiệm lâm sàng giúp phục hồi hàng rào bảo vệ, cấp ẩm sâu và chống lại các dấu hiệu lão hóa hiệu quả.
                </p>
                <div className="border-l-4 border-rose-400 bg-rose-50/60 pl-6 py-3.5 pr-4 rounded-r-xl italic text-gray-800 text-base font-medium">
                  "Lắng nghe làn da để mang lại giải pháp chăm sóc cá nhân hóa, giúp bạn tự tin tỏa sáng với vẻ đẹp độc bản của chính mình."
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== 2. Danh mục nổi bật ====== */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 container mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-bold uppercase tracking-wider text-gray-900 flex items-center gap-2">
            <span className="text-rose-500">✿</span> DANH MỤC NỔI BẬT
          </h2>
          <Link to="/products" className="text-sm font-semibold text-rose-500 hover:text-rose-600 transition-colors">Xem tất cả »</Link>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
          {categoriesData.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?cat=${encodeURIComponent(cat.name)}`}
              className="flex flex-col items-center gap-2.5 group py-3 px-1 rounded-2xl hover:bg-rose-50/50 transition-colors"
            >
              <div className="w-20 h-20 flex items-center justify-center bg-white rounded-full shadow-sm border border-gray-100 group-hover:border-rose-200 group-hover:shadow-md transition-all">
                <img
                  src={getImageUrl(cat.banner)}
                  alt={cat.name}
                  className="w-14 h-14 object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-sm font-semibold text-center text-gray-800 group-hover:text-rose-600 transition-colors leading-tight">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ====== 3. FLASH SALE ====== */}
      <section id="section-flash-sale" className="pt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-pink-50 rounded-2xl p-5 sm:p-8 border border-rose-100">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide m-0 text-rose-600">
                Flash sale
              </h2>

              <div className="flex-1 min-w-0 overflow-hidden">
                <div className="flex whitespace-nowrap">
                  <div className="animate-marquee flex">
                    {flashSaleNotices.concat(flashSaleNotices).map((notice, index) => (
                      <span key={`notice-a-${index}`} className="px-6 text-sm font-bold text-rose-600">
                        {notice}
                      </span>
                    ))}
                  </div>
                  <div className="animate-marquee flex" aria-hidden="true">
                    {flashSaleNotices.concat(flashSaleNotices).map((notice, index) => (
                      <span key={`notice-b-${index}`} className="px-6 text-sm font-bold text-rose-600">
                        {notice}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <ul className="flex items-center justify-center gap-2">
                {[
                  { value: countdown.days, label: 'Ngày' },
                  { value: countdown.hours, label: 'Giờ' },
                  { value: countdown.minutes, label: 'Phút' },
                  { value: countdown.seconds, label: 'Giây' },
                ].map((item) => (
                  <li key={item.label} className="flex flex-col items-center min-w-[54px] bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-100">
                    <strong className="text-lg font-extrabold text-rose-600 leading-none">{item.value}</strong>
                    <small className="text-[11px] font-bold uppercase text-gray-600 mt-1">{item.label}</small>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {flashSaleProducts.map((product) => (
                <Link to={`/product/${product.id}`} key={product.id} className="group bg-white block rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative overflow-hidden bg-white aspect-[3/4]">
                    <img
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3.5">
                    <h3 className="text-gray-900 group-hover:text-rose-600 transition-colors text-[15px] font-bold mb-1.5 truncate">
                      {product.name}
                    </h3>
                    <p className="text-rose-600 font-extrabold text-base">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link to="/sale" className="inline-block border border-rose-400 text-rose-500 px-6 py-2 font-semibold hover:bg-rose-400 hover:text-white transition-colors">
                Xem tất cả »
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====== (MỚI) CHỌN THEO LOẠI DA ====== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-rose-400 font-bold uppercase text-xs tracking-widest">Lựa Chọn Hoàn Hảo Cho Bạn</span>
            <h2 className="text-3xl font-extrabold uppercase tracking-widest mt-2">Giải Pháp Theo Loại Da</h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">Dù bạn sở hữu làn da dầu mụn hay nhạy cảm dễ kích ứng, chúng tôi luôn có những sản phẩm chuyên biệt dành riêng cho bạn.</p>
            <div className="w-16 h-1 bg-rose-400 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Skin 1: Da Dầu Mụn */}
            <Link to="/products?cat=da-dau" className="group relative block h-80 overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600&auto=format&fit=crop"
                alt="Da Dầu Mụn"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="inline-block bg-white text-black text-[10px] font-bold px-2 py-1 mb-3 self-start tracking-wider uppercase">Làm Sạch & Kiểm Soát</span>
                <h4 className="font-bold text-xl text-white mb-2">Da Dầu & Mụn</h4>
                <p className="text-sm text-gray-200 line-clamp-2">Kiểm soát bã nhờn, se khít lỗ chân lông và làm dịu các nốt mụn viêm hiệu quả.</p>
              </div>
            </Link>

            {/* Skin 2: Da Khô */}
            <Link to="/products?cat=da-kho" className="group relative block h-80 overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop"
                alt="Da Khô Thiếu Ẩm"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="inline-block bg-white text-black text-[10px] font-bold px-2 py-1 mb-3 self-start tracking-wider uppercase">Cấp Ẩm Sâu</span>
                <h4 className="font-bold text-xl text-white mb-2">Da Khô Thiếu Ẩm</h4>
                <p className="text-sm text-gray-200 line-clamp-2">Bổ sung Hyaluronic Acid và Ceramide giúp da luôn ngậm nước, căng bóng mềm mịn.</p>
              </div>
            </Link>

            {/* Skin 3: Da Nhạy Cảm */}
            <Link to="/products?cat=da-nhay-cam" className="group relative block h-80 overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=600&auto=format&fit=crop"
                alt="Da Nhạy Cảm"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="inline-block bg-white text-black text-[10px] font-bold px-2 py-1 mb-3 self-start tracking-wider uppercase">Dịu Nhẹ & Phục Hồi</span>
                <h4 className="font-bold text-xl text-white mb-2">Da Nhạy Cảm</h4>
                <p className="text-sm text-gray-200 line-clamp-2">Công thức lành tính 100% không cồn, không hương liệu, củng cố hàng rào bảo vệ da.</p>
              </div>
            </Link>

            {/* Skin 4: Chống Lão Hóa */}
            <Link to="/products?cat=chong-lao-hoa" className="group relative block h-80 overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1512496015851-a9083890aef6?q=80&w=600&auto=format&fit=crop"
                alt="Chống Lão Hóa"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="inline-block bg-white text-black text-[10px] font-bold px-2 py-1 mb-3 self-start tracking-wider uppercase">Tái Tạo Tế Bào</span>
                <h4 className="font-bold text-xl text-white mb-2">Chống Lão Hóa</h4>
                <p className="text-sm text-gray-200 line-clamp-2">Kích thích tăng sinh Collagen với Retinol và Peptide, làm mờ nếp nhăn và săn chắc da.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ====== 4. THƯƠNG HIỆU NỔI BẬT ====== */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 container mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-bold uppercase tracking-widest text-gray-800 flex items-center gap-2">
            <span className="text-orange-500">⊞</span> THƯƠNG HIỆU NỔI BẬT
          </h2>
          <Link to="/products" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">Xem tất cả »</Link>
        </div>

        <div className="flex gap-3 border border-pink-100 rounded-2xl overflow-hidden p-3 bg-white">
          {/* Card banner bên trái */}
          <div className="hidden md:flex w-44 flex-shrink-0 flex-col justify-between bg-gradient-to-br from-pink-50 to-rose-100 rounded-xl p-3 border border-pink-100">
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Cam kết hàng chính hãng</p>
              <p className="text-sm font-bold text-gray-800 leading-tight">Thương hiệu mỹ phẩm uy tín toàn cầu</p>
            </div>
            <div className="grid grid-cols-3 gap-1 my-3">
              {brandsData.slice(0, 9).map(b => (
                <div key={b.id} className="bg-white rounded p-1 flex items-center justify-center h-8">
                  <img src={getImageUrl(b.logo)} alt={b.name} className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
            <p className="text-xs text-rose-600 font-semibold text-center">BASE MAKE UP</p>
          </div>

          {/* Grid brand logos bên phải */}
          <div className="flex-1 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
            {brandsData.map((brand) => (
              <Link
                key={brand.id}
                to={`/products`}
                className="flex flex-col items-center justify-center bg-white hover:bg-rose-50 hover:shadow-md hover:shadow-pink-100 border border-pink-100 rounded-xl p-2 aspect-square group transition-all duration-200"
                title={brand.name}
              >
                <img
                  src={getImageUrl(brand.logo)}
                  alt={brand.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ====== (MỚI) BACKGROUND VIDEO CINEMATIC (CHUYỆN LÀM ĐẸP) ====== */}
      {/* ====== (MỚI) BACKGROUND VIDEO CINEMATIC (CHUYỆN LÀM ĐẸP THEO MẪU) ====== */}
      <section className="relative w-full py-20 md:py-28 overflow-hidden my-12 flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            src={videoBanner}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoBanner} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white max-w-4xl">
          {/* Nhãn nhỏ trên cùng */}
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[4px] text-rose-300 mb-3 block">
            CHUYỆN LÀM ĐẸP HOÀNG BẢO
          </span>

          {/* Tiêu đề lớn, cân đối, ngắt dòng chuẩn */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight md:leading-snug mb-4 tracking-tight">
            Bí Quyết Thanh Xuân<br className="hidden sm:inline" /> Hành Trình Nuôi Dưỡng Làn Da Rạng Rỡ
          </h2>

          {/* Đoạn mô tả phụ chữ to, rõ ràng */}
          <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mx-auto mb-8 leading-relaxed font-light">
            Gìn giữ vẻ đẹp thuần khiết nguyên bản từ những thành phần tự nhiên lành tính, an toàn tuyệt đối cho mọi làn da.
          </p>

          {/* 3 Hộp nội dung chữ to cân đối, nổi bật và dễ đọc */}
          <div className="flex flex-col gap-3.5 max-w-3xl mx-auto mb-8 text-left">
            <div className="bg-black/50 backdrop-blur-md border border-white/15 rounded-lg px-6 py-4 flex items-center gap-4 hover:bg-black/60 transition-all">
              
              <p className="text-sm sm:text-base text-white/95 font-medium leading-relaxed">
                Tuyển chọn tiêu chuẩn thành phần hữu cơ sạch, lành tính và an toàn tuyệt đối cho cả mẹ bầu và làn da nhạy cảm nhất.
              </p>
            </div>

            <div className="bg-black/50 backdrop-blur-md border border-white/15 rounded-lg px-6 py-4 flex items-center gap-4 hover:bg-black/60 transition-all">
              
              <p className="text-sm sm:text-base text-white/95 font-medium leading-relaxed">
                Kỹ thuật chiết xuất & ủ dưỡng chất khép kín chuẩn GMP, lưu giữ trọn vẹn tinh chất và hiệu quả dược tính tự nhiên.
              </p>
            </div>

            <div className="bg-black/50 backdrop-blur-md border border-white/15 rounded-lg px-6 py-4 flex items-center gap-4 hover:bg-black/60 transition-all">
              
              <p className="text-sm sm:text-base text-white/95 font-medium leading-relaxed">
                Đóng gói cẩn trọng, thân thiện với môi trường, trao gửi tận tay khách hàng như một món quà ý nghĩa.
              </p>
            </div>
          </div>

          {/* Nút bấm cân đối, sắc nét */}
          <div>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-white hover:bg-rose-500 text-gray-900 hover:text-white border border-white/30 rounded-md px-8 py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-lg"
            >
              KHÁM PHÁ CÂU CHUYỆN
            </Link>
          </div>
        </div>
      </section>

      {/* ====== 5. Hàng Mới Về ====== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 container mx-auto bg-white">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-extrabold uppercase tracking-wide text-gray-900">Hàng Mới Về</h2>
            <div className="w-16 h-1 bg-rose-500 mt-4 rounded-full"></div>
          </div>
          <Link to="/products" className="hidden md:flex items-center gap-2 text-rose-500 hover:text-rose-600 transition-colors uppercase text-sm font-bold tracking-wider">
            Xem Tất Cả <BsArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="group cursor-pointer bg-white block rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100">
              <div className="relative overflow-hidden bg-white aspect-[3/4]">
                {/* Ảnh chính (mặt trước) */}
                <img
                  src={getImageUrl(product.image)}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0"
                />
                {/* Ảnh khi hover (mặt sau) */}
                <img
                  src={getImageUrl(product.image.replace('1.webp', '2.webp'))}
                  alt={`${product.name} (back view)`}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="w-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center gap-2 py-3 font-bold uppercase text-sm rounded-full transition-colors shadow-md">
                    <BsCartPlus size={18} /> Thêm vào giỏ
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-gray-900 group-hover:text-rose-600 transition-colors text-[15px] font-bold mb-1.5 truncate">
                  {product.name}
                </h3>
                <p className="text-rose-600 font-extrabold text-base md:text-lg">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ====== DỊCH VỤ & TRẢI NGHIỆM CHU ĐÁO (THEO MẪU EDITORIAL) ====== */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header: Tiêu đề bên trái - Mô tả bên phải */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">
                Dịch Vụ & Trải Nghiệm
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 m-0 tracking-tight">
                Trải Nghiệm Chu Đáo Tại Hoàng Bảo
              </h2>
            </div>
            <p className="text-gray-600 text-sm md:text-[15px] max-w-md lg:text-right leading-relaxed">
              Từ một thỏi son giao tận tay đến những bộ quà tặng chăm sóc da cao cấp, chúng tôi luôn chuẩn bị chu đáo để bạn an tâm làm đẹp.
            </p>
          </div>

          {/* 4 Cột chia làm 2 cụm có đường kẻ đen phía trên giống mẫu */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Cụm 1: 01 & 02 */}
            <div className="border-t-2 border-gray-900 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-2">
                  01 / TƯ VẤN ROUTINE
                </span>
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  Soi Da & Lên Phác Đồ
                </h3>
                <p className="text-gray-600 text-xs sm:text-[13px] leading-relaxed">
                  Phân tích tình trạng da miễn phí qua hình ảnh, hướng dẫn xây dựng routine chuẩn y khoa cá nhân hóa theo từng tình trạng da.
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-2">
                  02 / CHÍNH HÃNG
                </span>
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  Cam Kết Chuẩn Hãng
                </h3>
                <p className="text-gray-600 text-xs sm:text-[13px] leading-relaxed">
                  100% sản phẩm có hóa đơn chứng từ, tem phụ tiếng Việt rõ ràng. Cam kết đền bù gấp 10 lần nếu phát hiện hàng giả, hàng nhái.
                </p>
              </div>
            </div>

            {/* Cụm 2: 03 & 04 */}
            <div className="border-t-2 border-gray-900 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-2">
                  03 / PACKAGING
                </span>
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  Đóng Gói & Chống Sốc
                </h3>
                <p className="text-gray-600 text-xs sm:text-[13px] leading-relaxed">
                  Màng bóng khí đa lớp niêm phong cẩn trọng, hộp carton 3 lớp cứng cáp giữ chai lọ thủy tinh luôn an toàn nguyên vẹn khi giao xa.
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-2">
                  04 / MEMBERSHIP
                </span>
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  Tích Điểm Hội Viên
                </h3>
                <p className="text-gray-600 text-xs sm:text-[13px] leading-relaxed">
                  Tích điểm tự động bằng số điện thoại cho mỗi đơn đặt. Dễ dàng đổi điểm lấy voucher giảm giá và nhận quà tặng tháng sinh nhật.
                </p>
              </div>
            </div>
          </div>

          {/* Thanh chân trang dưới cùng */}
          <div className="mt-14 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-gray-600">
              Cần tư vấn da hoặc đặt trước số lượng lớn? Hotline hỗ trợ: <strong className="font-bold text-gray-900">0359 490 221</strong>
            </p>
            <Link
              to="/contact"
              className="text-xs sm:text-sm font-bold text-gray-900 hover:text-rose-600 underline underline-offset-4 transition-colors flex items-center gap-1"
            >
              Liên hệ tư vấn →
            </Link>
          </div>
        </div>
      </section>

      {/* ====== FAQ ACCORDION ====== */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-rose-500 font-bold uppercase text-xs tracking-widest">Hỗ Trợ Nhanh Chóng</span>
            <h2 className="text-3xl font-extrabold uppercase tracking-wide text-gray-900 mt-2">Câu Hỏi Thường Gặp</h2>
            <div className="w-16 h-1 bg-rose-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            <details className="group bg-white p-6 rounded-2xl border border-gray-200 shadow-sm [&_summary::-webkit-details-marker]:hidden hover:border-rose-300 transition-colors">
              <summary className="flex cursor-pointer items-center justify-between text-base font-bold text-gray-900">
                Làm sao để tôi biết da mình thuộc loại nào?
                <span className="transition duration-300 group-open:-rotate-180 text-rose-500">
                  <BsChevronDown />
                </span>
              </summary>
              <div className="mt-4 text-gray-700 leading-relaxed text-[15px] border-t border-gray-100 pt-4">
                Bạn có thể tự kiểm tra bằng cách rửa mặt sạch, không bôi bất kỳ sản phẩm nào và đợi 30 phút. Nếu da đổ bóng toàn mặt là da dầu, căng rát là da khô, đổ dầu vùng chữ T là da hỗn hợp. Hoặc inbox trực tiếp để chuyên viên soi da của chúng tôi hỗ trợ tư vấn hoàn toàn miễn phí!
              </div>
            </details>

            <details className="group bg-white p-6 rounded-2xl border border-gray-200 shadow-sm [&_summary::-webkit-details-marker]:hidden hover:border-rose-300 transition-colors">
              <summary className="flex cursor-pointer items-center justify-between text-base font-bold text-gray-900">
                Sản phẩm của shop có dùng được cho phụ nữ mang thai không?
                <span className="transition duration-300 group-open:-rotate-180 text-rose-500">
                  <BsChevronDown />
                </span>
              </summary>
              <div className="mt-4 text-gray-700 leading-relaxed text-[15px] border-t border-gray-100 pt-4">
                Đa số các dòng sản phẩm dưỡng ẩm, làm sạch thiên nhiên đều an toàn. Tuy nhiên, các dòng treatment chứa Retinol, BHA nồng độ cao thì mẹ bầu KHÔNG nên dùng. Vui lòng nhắn tin cho shop tình trạng thai kỳ để được lọc sản phẩm phù hợp và an toàn nhất.
              </div>
            </details>

            <details className="group bg-white p-6 rounded-2xl border border-gray-200 shadow-sm [&_summary::-webkit-details-marker]:hidden hover:border-rose-300 transition-colors">
              <summary className="flex cursor-pointer items-center justify-between text-base font-bold text-gray-900">
                Thời gian đổi trả hàng khi có lỗi là bao lâu?
                <span className="transition duration-300 group-open:-rotate-180 text-rose-500">
                  <BsChevronDown />
                </span>
              </summary>
              <div className="mt-4 text-gray-700 leading-relaxed text-[15px] border-t border-gray-100 pt-4">
                Chúng tôi hỗ trợ 1 đổi 1 miễn phí hoặc hoàn tiền 100% trong vòng 7 ngày nếu sản phẩm bị lỗi móp méo do vận chuyển, chảy kem, vòi pump hỏng hoặc giao sai phân loại. Yêu cầu có video quay lại quá trình mở hộp nguyên vẹn (Unbox).
              </div>
            </details>
          </div>
        </div>
      </section>


    </main>
  );
}