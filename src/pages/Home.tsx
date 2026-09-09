import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRight, BsCartPlus, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import CategoryCarousel from './CategoryCarousel';
import TopBarMarquee from '../components/TopBarMarquee';

import { Star } from 'lucide-react';
// Import Data
import aoKhoacData from '../data/ao-khoac.json';
import quanJeanData from '../data/quan-jean.json';
import aoThunData from '../data/ao-thun.json';
import baloData from '../data/balo.json';
import kinhMatData from '../data/kinh-mat.json';
import nonData from '../data/non.json';

// Import Hero Images
import heroImg1 from '../assets/img/About/pexels-badhon-35750806.jpg';
import heroImg2 from '../assets/img/pexels-ai25studioai-5264953.jpg';
import heroImg3 from '../assets/img/About/pexels-mart-production-7679722.jpg';

// Import Avatar Images
import avatar1 from '../assets/avatar/anh1.jpg';
import avatar2 from '../assets/avatar/1784354037388_269055715991937060_4221497371804169994_7288eb3a8877d20e3116cc9b6bb0ae30.jpg';
import avatar3 from '../assets/avatar/1784354037407_269055715991937060_4221497371804169994_ac69fba91a44fae527d07505692d1623.jpg';

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
    title: 'ĐỊNH HÌNH\nPHONG CÁCH CỦA BẠN',
    description: 'Khám phá những thiết kế mới nhất mang đậm chất riêng. Năng động, hiện đại và luôn tự tin trong từng sải bước.',
    buttonText: 'Mua Ngay',
    link: '/products'
  },
  {
    image: heroImg2,
    badge: 'Streetwear',
    title: 'BƯỚC ĐI\nĐẦY TỰ TIN',
    description: null,
    buttonText: 'Khám Phá',
    link: '/products'
  },
  {
    image: heroImg3,
    badge: 'Mùa Hè Năng Động',
    title: 'PHONG CÁCH\nĐƯỜNG PHỐ',
    description: null,
    buttonText: 'Mua Ngay',
    link: '/products'
  },
];

// Hàm helper để Vite có thể xử lý đúng đường dẫn ảnh từ file JSON
// Khai báo kiểu string cho tham số path
const getImageUrl = (path: string) => {
  return new URL(path, import.meta.url).href;
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

  // Trộn data áo khoác và quần jean, lấy 4 sản phẩm đầu tiên làm Flash Sale
  const featuredProducts: Product[] = [...aoKhoacData.slice(0, 2), ...quanJeanData.slice(0, 2)];
  const flashSaleProducts: Product[] = [
    ...aoKhoacData.slice(0, 2),
    ...quanJeanData.slice(0, 2),
    ...aoThunData.slice(0, 1),
  ];
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

  // Dữ liệu cho Category Carousel
  const featuredCategories = [
    {
      title: 'Áo Khoác',
      image: getImageUrl(aoKhoacData[0].image),
      link: '/products?cat=ao-khoac'
    },
    {
      title: 'Áo Thun',
      image: getImageUrl(aoThunData[0].image),
      link: '/products?cat=ao-thun'
    },
    {
      title: 'Quần Jean',
      image: getImageUrl(quanJeanData[0].image),
      link: '/products?cat=quan-jean'
    },
    {
      title: 'Balo',
      image: getImageUrl(baloData[0].image),
      link: '/products?cat=balo-tui-xach'
    },
    {
      title: 'Kính Mắt',
      image: getImageUrl(kinhMatData[0].image),
      link: '/products?cat=kinh-mat'
    },
    {
      title: 'Mũ Nón',
      image: getImageUrl(nonData[0].image),
      link: '/products?cat=mu-non'
    },
  ];

  const goToSlide = (index: number) => setCurrentSlide(index);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  const nextSlide = () => setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));

  return (
    <main className="bg-white text-black w-full">
      {/* ====== 1. HERO FULLSCREEN CAROUSEL ====== */}
      <section className="relative w-full h-screen max-h-[800px] min-h-[500px] overflow-hidden">
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
                      className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-gray-200 transition-all duration-300 rounded-none"
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
          className="absolute top-1/2 -translate-y-1/2 left-4 z-20 bg-white/20 hover:bg-white/40 text-black p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-black/10"
          aria-label="Previous slide"
        >
          <BsChevronLeft size={24} />
        </button>

        {/* Nút Next */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 -translate-y-1/2 right-4 z-20 bg-white/20 hover:bg-white/40 text-black p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-black/10"
          aria-label="Next slide"
        >
          <BsChevronRight size={24} />
        </button>

        {/* Indicators (dots) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide ? 'bg-black w-8 h-2.5' : 'bg-black/40 hover:bg-black/60 w-2.5 h-2.5'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ====== MARQUEE ANNOUNCEMENT ====== */}
      <TopBarMarquee />

      {/* ====== 2. Danh mục nổi bật ====== */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 container mx-auto">
        <div className="mb-12 flex justify-between items-center">
          <h2 className="text-3xl font-bold uppercase tracking-widest">DANH MỤC NỔI BẬT</h2>
          <a href="/products" >Xem tất cả »</a>
        </div>

        <div className="grid grid-cols-7 gap-2 items-center text-center">
          {/* cot1 */}
          <div>
            <div className='grid grid-cols gap-2'>
              <a href="">
                <img src="" alt="" />
              </a>
              <div>
                <a href="">Son Môi</a>
              </div>
            </div>
            {/* hang2 */}
            <div className='grid grid-cols gap-2'>
              <a href="">
                <img src="" alt="" />
              </a>
              <div>
                <a href="">Sữa rửa mặt</a>
              </div>
            </div>
          </div>
          {/* cot2 */}
          <div>
            <div className='grid grid-cols gap-2'>
              <a href="">
                <img src="" alt="" />
              </a>
              <div>
                <a href="">Tẩy Da Chết</a>
              </div>
            </div>
            {/* hang2 */}
            <div className='grid grid-cols gap-2'>
              <a href="">
                <img src="" alt="" />
              </a>
              <div>
                <a href="">Kem Chống Nắng</a>
              </div>
            </div>
          </div>
          
          {/* cot3 */}
          <div>
            <div className='grid grid-cols gap-2'>
              <a href="">
                <img src="" alt="" />
              </a>
              <div>
                <a href="">Tẩy Trang</a>
              </div>
            </div>
            {/* hang2 */}
            <div className='grid grid-cols gap-2'>
              <a href="">
                <img src="" alt="" />
              </a>
              <div>
                <a href="">Cushion</a>
              </div>
            </div>
          </div>

          {/* cot4 */}
          <div>
            <div className='grid grid-cols gap-2'>
              <a href="">
                <img src="" alt="" />
              </a>
              <div>
                <a href="">Mặt Nạ</a>
              </div>
            </div>
            {/* hang2 */}
            <div className='grid grid-cols gap-2'>
              <a href="">
                <img src="" alt="" />
              </a>
              <div>
                <a href="">Thực Phẩm Chức Năng</a>
              </div>
            </div>
          </div>

          {/* cot5 */}
          <div>
            <div className='grid grid-cols gap-2'>
              <a href="">
                <img src="" alt="" />
              </a>
              <div>
                <a href="">Kem Dưỡng</a>
              </div>
            </div>
            {/* hang2 */}
            <div className='grid grid-cols gap-2'>
              <a href="">
                <img src="" alt="" />
              </a>
              <div>
                <a href="">Tinh Chất</a>
              </div>
            </div>
          </div>

          {/* cot6 */}
          <div>
            <div className='grid grid-cols gap-2'>
              <a href="">
                <img src="" alt="" />
              </a>
              <div>
                <a href="">Kem Dưỡng Mắt</a>
              </div>
            </div>
            {/* hang2 */}
            <div className='grid grid-cols gap-2'>
              <a href="">
                <img src="" alt="" />
              </a>
              <div>
                <a href="">Kem Lót/Nền</a>
              </div>
            </div>
          </div>

        </div>
      </section>
      
      {/* ====== 3. FLASH SALE ====== */}
      <section id="section-flash-sale" className="pt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-pink-50 rounded-xl p-5 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-widest m-0 bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
                Flash sale
              </h2>

              <div className="flex-1 min-w-0 overflow-hidden">
                <div className="flex whitespace-nowrap">
                  <div className="animate-marquee flex">
                    {flashSaleNotices.concat(flashSaleNotices).map((notice, index) => (
                      <span key={`notice-a-${index}`} className="px-6 text-sm font-semibold text-pink-600">
                        {notice}
                      </span>
                    ))}
                  </div>
                  <div className="animate-marquee flex" aria-hidden="true">
                    {flashSaleNotices.concat(flashSaleNotices).map((notice, index) => (
                      <span key={`notice-b-${index}`} className="px-6 text-sm font-semibold text-pink-600">
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
                  <li key={item.label} className="flex flex-col items-center min-w-[52px] bg-white rounded-md px-3 py-2 shadow-sm">
                    <strong className="text-lg font-bold text-pink-600 leading-none">{item.value}</strong>
                    <small className="text-[10px] uppercase text-gray-500 mt-1">{item.label}</small>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {flashSaleProducts.map((product) => (
                <Link to={`/product/${product.id}`} key={product.id} className="group bg-white block rounded-lg overflow-hidden">
                  <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                    <img
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-gray-600 group-hover:text-pink-600 transition-colors text-sm font-medium mb-1 truncate">
                      {product.name}
                    </h3>
                    <p className="text-pink-600 font-bold">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link to="/sale" className="inline-block border border-pink-500 text-pink-600 px-6 py-2 font-semibold hover:bg-pink-500 hover:text-white transition-colors">
                Xem tất cả »
              </Link>
            </div>
          </div>
        </div>
      </section>
      
 
      {/* ====== 4. BRAND ====== */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 container mx-auto">
        <div className="mb-12 flex justify-between items-center">
          <h2 className="text-3xl font-bold uppercase tracking-widest">THƯƠNG HIỆU NỔI BẬT</h2>
          <a href="/products" >Xem tất cả »</a>
        </div>
      </section>
        
      {/* ====== 5.  Danh muc====== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 container mx-auto bg-white">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold uppercase tracking-widest">Hàng Mới Về</h2>
            <div className="w-16 h-1 bg-black mt-4"></div>
          </div>
          <Link to="/products" className="hidden md:flex items-center gap-2 text-gray-400 hover:text-black transition-colors uppercase text-sm font-semibold tracking-wider">
            Xem Tất Cả <BsArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="group cursor-pointer bg-white block">
              <div className="relative overflow-hidden bg-gray-100 aspect-[3/4] mb-4">
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
                  <button className="w-full bg-white text-black flex items-center justify-center gap-2 py-3 font-bold uppercase text-sm hover:bg-gray-200 transition-colors">
                    <BsCartPlus size={18} /> Thêm vào giỏ
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-gray-600 group-hover:text-black transition-colors text-sm font-medium mb-1 truncate">
                  {product.name}
                </h3>
                <p className="text-black font-bold">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ====== 5. CUSTOMER REVIEWS (Góc Feedback) ====== */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold uppercase tracking-widest">Anh em nói gì về chúng tôi?</h2>
            <div className="w-16 h-1 bg-black mx-auto mt-4"></div>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">Những đánh giá chân thực từ khách hàng đã trải nghiệm sản phẩm của Hoàng Bảo Shop.</p>
          </div>

          {/* Grid of Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center flex flex-col items-center">
              <img src={avatar1} alt="Customer 1" className="w-24 h-24 rounded-full mx-auto mb-5 object-cover" />
              <div className="flex justify-center mb-4 text-yellow-500">
                {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={20} />)}
              </div>
              <p className="text-gray-600 italic mb-6">"Chất vải áo thun rất đỉnh, mặc mát và không bị xù lông sau nhiều lần giặt. Form áo đứng, tôn dáng cực kỳ. Sẽ ủng hộ shop dài dài!"</p>
              <h4 className="font-bold text-gray-900 mt-auto">Trần Minh Quân</h4>
              <p className="text-sm text-gray-500">Nhân viên văn phòng</p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center flex flex-col items-center">
              <img src={avatar2} alt="Customer 2" className="w-24 h-24 rounded-full mx-auto mb-5 object-cover" />
              <div className="flex justify-center mb-4 text-yellow-500">
                {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={20} />)}
              </div>
              <p className="text-gray-600 italic mb-6">"Quần jean ở đây là một sự đầu tư xứng đáng. Vải dày dặn, đường may chắc chắn. Mặc vào cảm giác rất tự tin và thoải mái vận động."</p>
              <h4 className="font-bold text-gray-900 mt-auto">Lê Hoàng Anh</h4>
              <p className="text-sm text-gray-500">Sinh viên</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center flex flex-col items-center">
              <img src={avatar3} alt="Customer 3" className="w-24 h-24 rounded-full mx-auto mb-5 object-cover" />
              <div className="flex justify-center mb-4 text-yellow-500">
                {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={20} />)}
              </div>
              <p className="text-gray-600 italic mb-6">"Giao hàng nhanh, đóng gói cẩn thận. Sản phẩm y hình, thậm chí còn đẹp hơn. Rất hài lòng với dịch vụ của shop."</p>
              <h4 className="font-bold text-gray-900 mt-auto">Nguyễn Việt Dũng</h4>
              <p className="text-sm text-gray-500">Freelancer</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}