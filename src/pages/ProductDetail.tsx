import { useState, useEffect, useContext, ChangeEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  BsCartPlus, 
  BsCheckCircleFill, 
  BsStarFill, 
  BsShieldCheck, 
  BsTruck, 
  BsArrowRepeat,
  BsBagCheck,
  BsPatchCheck,
  BsStars
} from 'react-icons/bs';

import { CartContext } from '../context/CartContext';
import RelatedProducts from '../components/RelatedProducts';
import Reviews from '../components/Reviews';

import WarrantyPolicy from '../components/WarrantyPolicy';
import ReturnPolicy from '../components/ReturnPolicy';
import ShippingPolicy from '../components/ShippingPolicy';

import productsData from '../data/products.json';

// Định nghĩa Interface cho Product Mỹ phẩm chi tiết
export interface Product {
  id: string;
  sku?: string;
  slug?: string;
  name: string;
  brand?: string;
  category?: string;
  subCategory?: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  capacity?: string;
  description?: string;
  benefits?: string[];
  keyIngredients?: string[];
  usage?: string;
  image: string;
  thumbnail?: string;
  images?: string[];
  inStock?: boolean;
  [key: string]: any;
}

interface CartContextType {
  addToCart: (product: Product, size?: string, quantity?: number) => void;
  openCart: () => void;
  [key: string]: any;
}

const allProductsWithCategory: Product[] = productsData.map(p => ({
  ...p,
  id: p.id.toString()
})) as Product[];

const CLOUDINARY_BASE_URL = import.meta.env.VITE_CLOUDINARY_BASE_URL || 'https://res.cloudinary.com/hb22fnuq/image/upload';
const getImageUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${CLOUDINARY_BASE_URL}/${path}`;
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeImage, setActiveImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeInfoTab, setActiveInfoTab] = useState<'benefits' | 'ingredients' | 'usage' | 'policy'>('benefits');
  const [addSuccessToast, setAddSuccessToast] = useState<boolean>(false);
  
  const { addToCart, openCart } = useContext(CartContext) as CartContextType;

  useEffect(() => {
    setLoading(true);
    const foundProduct = allProductsWithCategory.find(p => p.id === id || p.slug === id);
    if (foundProduct) {
      // Thu thập tất cả ảnh hợp lệ từ danh sách ảnh mỹ phẩm
      const imageList: string[] = [];
      if (foundProduct.images && Array.isArray(foundProduct.images) && foundProduct.images.length > 0) {
        foundProduct.images.forEach(img => {
          const url = getImageUrl(img);
          if (url && !imageList.includes(url)) imageList.push(url);
        });
      }
      if (imageList.length === 0 && foundProduct.image) {
        const url = getImageUrl(foundProduct.image);
        if (url) imageList.push(url);
      }
      if (imageList.length === 0 && foundProduct.thumbnail) {
        const url = getImageUrl(foundProduct.thumbnail);
        if (url) imageList.push(url);
      }

      setProduct({ ...foundProduct, images: imageList });
      setActiveImage(0);
      setQuantity(1);
    } else {
      setProduct(null);
    }
    setLoading(false);
  }, [id]);

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, Math.min(99, prev + delta)));
  };

  const handleQuantityInput = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1) {
      setQuantity(Math.min(99, val));
    } else if (e.target.value === '') {
      setQuantity(1);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, product.capacity || 'Tiêu chuẩn', quantity);
    setAddSuccessToast(true);
    setTimeout(() => setAddSuccessToast(false), 3000);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart(product, product.capacity || 'Tiêu chuẩn', quantity);
    if (openCart) openCart();
  };

  if (loading) {
    return (
      <div className="bg-white text-black min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-white text-black min-h-screen flex flex-col items-center justify-center text-center py-12 pt-28">
        <h2 className="text-2xl font-bold mb-4">404 - Không tìm thấy sản phẩm</h2>
        <p className="text-gray-600 mb-6">Sản phẩm mỹ phẩm bạn đang tìm kiếm không tồn tại hoặc đã tạm ngừng kinh doanh.</p>
        <Link to="/products" className="bg-rose-500 text-white px-6 py-3 font-bold uppercase tracking-wider rounded-lg hover:bg-rose-600 transition-colors">
          Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <main className="bg-white text-gray-900 min-h-screen py-10 pt-[100px] md:pt-[120px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* ====== BREADCRUMB ====== */}
        <nav className="mb-6 text-xs sm:text-sm text-gray-500 flex flex-wrap items-center gap-1.5">
          <Link to="/" className="hover:text-rose-600 transition-colors">Trang chủ</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-rose-600 transition-colors">Sản phẩm</Link>
          {product.category && (
            <>
              <span>/</span>
              <span className="text-gray-600">{product.category}</span>
            </>
          )}
          {product.subCategory && (
            <>
              <span>/</span>
              <span className="text-gray-600">{product.subCategory}</span>
            </>
          )}
          <span>/</span>
          <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-xs">{product.name}</span>
        </nav>

        {/* ====== THÔNG BÁO THÊM GIỎ HÀNG THÀNH CÔNG ====== */}
        {addSuccessToast && (
          <div className="fixed top-24 right-4 sm:right-8 z-50 bg-neutral-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-neutral-700 animate-bounce">
            <BsCheckCircleFill className="text-emerald-400" size={18} />
            <div className="text-xs sm:text-sm">
              <p className="font-semibold">Đã thêm vào giỏ hàng!</p>
              <p className="text-gray-300">Số lượng: {quantity} sản phẩm</p>
            </div>
          </div>
        )}

        {/* ====== KHỐI CHI TIẾT SẢN PHẨM CHÍNH (2 CỘT) ====== */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
          
          {/* CỘT 1: THƯ VIỆN ẢNH SẢN PHẨM */}
          <div className="lg:w-1/2 flex flex-col gap-4">
            {product.images && product.images.length > 0 ? (
              <>
                {/* Khung ảnh chính */}
                <div className="relative w-full aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 flex items-center justify-center p-4">
                  <img 
                    src={product.images[activeImage]} 
                    alt={product.name} 
                    className="w-full h-full object-contain transition-transform duration-300 hover:scale-105" 
                  />

                  {/* Badge giảm giá nếu có */}
                  {discountPercent > 0 && (
                    <span className="absolute top-4 left-4 bg-rose-500 text-white font-bold text-xs uppercase px-2.5 py-1 rounded-md shadow-sm">
                      -{discountPercent}%
                    </span>
                  )}

                  {/* Tình trạng kho */}
                  <span className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 font-medium text-xs px-2.5 py-1 rounded-md border border-emerald-200">
                    {product.inStock !== false ? 'Còn hàng' : 'Tạm hết'}
                  </span>
                </div>

                {/* Danh sách ảnh thumbnails */}
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImage(idx)}
                        className={`aspect-square bg-gray-50 rounded-xl border p-1 overflow-hidden transition-all cursor-pointer ${
                          activeImage === idx 
                            ? 'border-rose-500 ring-2 ring-rose-200 shadow-sm' 
                            : 'border-gray-200 hover:border-gray-400 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-contain" />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full aspect-square bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
                Chưa có ảnh sản phẩm
              </div>
            )}
          </div>

          {/* CỘT 2: THÔNG TIN SẢN PHẨM & MUA HÀNG */}
          <div className="lg:w-1/2 flex flex-col">
            
            {/* Thương hiệu & SKU */}
            <div className="flex flex-wrap items-center gap-3 mb-2">
              {product.brand && (
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                  {product.brand}
                </span>
              )}
              {product.sku && (
                <span className="text-xs text-gray-400 font-mono">
                  Mã SP: {product.sku}
                </span>
              )}
            </div>

            {/* Tên sản phẩm */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug mb-3">
              {product.name}
            </h1>

            {/* Đánh giá sao & lượt review */}
            <div className="flex items-center gap-2 mb-5 text-sm">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <BsStarFill key={i} size={14} className={i < Math.floor(product.rating || 5) ? 'text-amber-400' : 'text-gray-200'} />
                ))}
              </div>
              <span className="font-bold text-gray-900">{product.rating || 4.8}</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-500 underline cursor-pointer hover:text-rose-600">
                {product.reviewCount || 120} đánh giá
              </span>
              <span className="text-gray-400">|</span>
              <span className="text-emerald-600 text-xs font-medium bg-emerald-50 px-2 py-0.5 rounded">
                Chính hãng 100%
              </span>
            </div>

            {/* Khung Giá bán */}
            <div className="bg-rose-50/40 p-4 rounded-xl border border-rose-100 mb-6 flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-extrabold text-rose-600">
                {product.price.toLocaleString('vi-VN')}₫
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-base text-gray-400 line-through">
                  {product.originalPrice.toLocaleString('vi-VN')}₫
                </span>
              )}
              {discountPercent > 0 && (
                <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                  Tiết kiệm {discountPercent}%
                </span>
              )}
            </div>

            {/* Dung tích / Quy cách */}
            {product.capacity && (
              <div className="mb-6 flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                  Dung tích / Quy cách:
                </span>
                <span className="text-xs font-bold text-gray-900 bg-gray-100 border border-gray-300 px-3 py-1.5 rounded-lg shadow-2xs">
                  {product.capacity}
                </span>
              </div>
            )}

            {/* Tóm tắt công dụng nổi bật (Bullets) */}
            {product.benefits && product.benefits.length > 0 && (
              <div className="mb-6 p-4 rounded-xl bg-gray-50 border border-gray-200">
                <h4 className="text-xs uppercase font-bold text-gray-800 tracking-wider mb-2 flex items-center gap-1.5">
                  <BsStars className="text-rose-500" />
                  Hiệu quả nổi bật:
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-gray-600">
                  {product.benefits.slice(0, 3).map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <BsCheckCircleFill className="text-rose-500 mt-0.5 shrink-0" size={13} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Bộ chọn số lượng */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                Số lượng:
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white shadow-2xs">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(-1)}
                    className="w-10 h-10 flex items-center justify-center text-lg font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={quantity}
                    onChange={handleQuantityInput}
                    className="w-12 h-10 text-center text-sm font-semibold border-x border-gray-200 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(1)}
                    className="w-10 h-10 flex items-center justify-center text-lg font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-gray-500">
                  (Còn {product.inStock !== false ? 'sẵn hàng tại kho' : 'hết hàng'})
                </span>
              </div>
            </div>

            {/* Các nút bấm Mua Hàng & Thêm vào giỏ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-300 font-bold py-3.5 px-4 rounded-xl uppercase tracking-wider transition-all flex justify-center items-center gap-2 text-sm shadow-sm cursor-pointer"
              >
                <BsCartPlus size={18} />
                Thêm Vào Giỏ
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3.5 px-4 rounded-xl uppercase tracking-wider transition-all flex justify-center items-center gap-2 text-sm shadow-md shadow-rose-200 cursor-pointer"
              >
                <BsBagCheck size={18} />
                Mua Ngay
              </button>
            </div>

            {/* Cam kết mua sắm an tâm */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-200 text-center">
              <div className="p-2">
                <BsShieldCheck className="text-rose-500 mx-auto mb-1" size={20} />
                <p className="text-[11px] font-semibold text-gray-800">100% Chính Hãng</p>
                <p className="text-[10px] text-gray-400">Đền 200% nếu hàng giả</p>
              </div>
              <div className="p-2 border-x border-gray-100">
                <BsTruck className="text-rose-500 mx-auto mb-1" size={20} />
                <p className="text-[11px] font-semibold text-gray-800">Giao Toàn Quốc</p>
                <p className="text-[10px] text-gray-400">Được kiểm tra khi nhận</p>
              </div>
              <div className="p-2">
                <BsArrowRepeat className="text-rose-500 mx-auto mb-1" size={20} />
                <p className="text-[11px] font-semibold text-gray-800">Đổi Trả 7 Ngày</p>
                <p className="text-[10px] text-gray-400">Miễn phí nếu kích ứng</p>
              </div>
            </div>

          </div>
        </div>

        {/* ====== CÁC TAB THÔNG TIN CHI TIẾT SẢN PHẨM ====== */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center border-b border-gray-200 mb-8 gap-2 sm:gap-4">
            <button
              onClick={() => setActiveInfoTab('benefits')}
              className={`px-4 sm:px-6 py-3 font-bold uppercase tracking-wider text-xs sm:text-sm transition-all border-b-2 cursor-pointer ${
                activeInfoTab === 'benefits'
                  ? 'border-rose-500 text-rose-600 bg-rose-50/40 rounded-t-lg'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              Công dụng nổi bật
            </button>

            <button
              onClick={() => setActiveInfoTab('ingredients')}
              className={`px-4 sm:px-6 py-3 font-bold uppercase tracking-wider text-xs sm:text-sm transition-all border-b-2 cursor-pointer ${
                activeInfoTab === 'ingredients'
                  ? 'border-rose-500 text-rose-600 bg-rose-50/40 rounded-t-lg'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              Thành phần chính
            </button>

            <button
              onClick={() => setActiveInfoTab('usage')}
              className={`px-4 sm:px-6 py-3 font-bold uppercase tracking-wider text-xs sm:text-sm transition-all border-b-2 cursor-pointer ${
                activeInfoTab === 'usage'
                  ? 'border-rose-500 text-rose-600 bg-rose-50/40 rounded-t-lg'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              Hướng dẫn sử dụng
            </button>

            <button
              onClick={() => setActiveInfoTab('policy')}
              className={`px-4 sm:px-6 py-3 font-bold uppercase tracking-wider text-xs sm:text-sm transition-all border-b-2 cursor-pointer ${
                activeInfoTab === 'policy'
                  ? 'border-rose-500 text-rose-600 bg-rose-50/40 rounded-t-lg'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              Chính sách & Bảo hành
            </button>
          </div>

          {/* Nội dung Tab */}
          <div className="max-w-4xl mx-auto text-gray-700 leading-relaxed">
            
            {/* TAB 1: CÔNG DỤNG NỔI BẬT */}
            {activeInfoTab === 'benefits' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <BsPatchCheck className="text-rose-500" />
                    Mô tả sản phẩm
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed whitespace-pre-line bg-gray-50/60 p-5 rounded-xl border border-gray-200">
                    {product.description || 'Thông tin mô tả sản phẩm đang được cập nhật.'}
                  </p>
                </div>

                {product.benefits && product.benefits.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <BsStars className="text-rose-500" />
                      Hiệu quả & Lợi ích mang lại cho làn da
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-4 rounded-xl border border-rose-100 bg-rose-50/30">
                          <BsCheckCircleFill className="text-rose-500 mt-1 shrink-0" size={16} />
                          <span className="text-xs sm:text-sm text-gray-800 font-medium leading-relaxed">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: THÀNH PHẦN CHÍNH */}
            {activeInfoTab === 'ingredients' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <BsStars className="text-rose-500" />
                    Thành phần hoạt chất nổi bật
                  </h3>
                  {product.keyIngredients && product.keyIngredients.length > 0 ? (
                    <div className="flex flex-wrap gap-2.5">
                      {product.keyIngredients.map((ingredient, idx) => (
                        <span 
                          key={idx}
                          className="px-4 py-2 bg-pink-50 border border-pink-200 text-rose-700 text-xs sm:text-sm rounded-xl font-medium shadow-2xs"
                        >
                          ✦ {ingredient}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">Thành phần chi tiết đang được cập nhật theo tiêu chuẩn nhà sản xuất.</p>
                  )}
                </div>

                <div className="bg-neutral-50 p-5 rounded-xl border border-neutral-200">
                  <h4 className="text-sm font-bold text-gray-900 mb-2">Cam kết an toàn & lành tính:</h4>
                  <ul className="text-xs sm:text-sm text-gray-600 space-y-1.5 list-disc pl-5">
                    <li>Được kiểm nghiệm da liễu nghiêm ngặt, an toàn cho cả làn da nhạy cảm.</li>
                    <li>Không chứa cồn khô, không parabens gây hại cho sức khỏe.</li>
                    <li>Nguồn gốc xuất xứ rõ ràng, tem mác niêm phong đầy đủ.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 3: HƯỚNG DẪN SỬ DỤNG */}
            {activeInfoTab === 'usage' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <BsCheckCircleFill className="text-rose-500" />
                    Cách dùng chi tiết
                  </h3>
                  <div className="bg-rose-50/40 p-5 rounded-xl border border-rose-200/80 text-sm sm:text-base text-gray-800 leading-relaxed">
                    {product.usage || 'Lấy một lượng vừa đủ sản phẩm, thoa đều lên da và mát-xa nhẹ nhàng để dưỡng chất thẩm thấu tối ưu.'}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-3">Gợi ý chu trình chăm sóc da chuẩn:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center text-xs">
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                      <span className="font-bold text-rose-600 block mb-1">Bước 1</span>
                      <span>Làm sạch sâu (Tẩy trang & Rửa mặt)</span>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                      <span className="font-bold text-rose-600 block mb-1">Bước 2</span>
                      <span>Cân bằng ẩm (Toner / Nước hoa hồng)</span>
                    </div>
                    <div className="p-3 bg-rose-50 rounded-xl border border-rose-300 font-medium">
                      <span className="font-bold text-rose-600 block mb-1">Bước 3</span>
                      <span>Dưỡng chuyên sâu (Sản phẩm này)</span>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                      <span className="font-bold text-rose-600 block mb-1">Bước 4</span>
                      <span>Bảo vệ ban ngày (Kem chống nắng)</span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-500 bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <strong>Lưu ý bảo quản:</strong> Để nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp hoặc nhiệt độ cao. Đậy kín nắp sau khi sử dụng để tránh oxy hóa sản phẩm.
                </div>
              </div>
            )}

            {/* TAB 4: CHÍNH SÁCH ĐỔI TRẢ & BẢO HÀNH */}
            {activeInfoTab === 'policy' && (
              <div className="space-y-6">
                <WarrantyPolicy />
                <ReturnPolicy />
                <ShippingPolicy />
              </div>
            )}

          </div>
        </div>

        {/* ====== ĐÁNH GIÁ & SẢN PHẨM LIÊN QUAN ====== */}
        <div className="mt-16">
          <Reviews product={product} />
          <RelatedProducts currentProduct={product} />
        </div>

      </div>
    </main>
  );
}