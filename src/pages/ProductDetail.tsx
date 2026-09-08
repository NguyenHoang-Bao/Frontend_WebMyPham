import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BsCartPlus } from 'react-icons/bs';

// Xóa các đuôi .js
import { CartContext } from '../context/CartContext';
import RelatedProducts from '../components/RelatedProducts';
import Reviews from '../components/Reviews';

import WarrantyPolicy from '../components/WarrantyPolicy';
import ReturnPolicy from '../components/ReturnPolicy';
import ShippingPolicy from '../components/ShippingPolicy';

// Import tất cả dữ liệu sản phẩm
import aoKhoacData from '../data/ao-khoac.json';
import aoPoloData from '../data/ao-polo.json';
import aoSoMiData from '../data/ao-so-mi.json';
import aoThunData from '../data/ao-thun.json';
import quanJeanData from '../data/quan-jean.json';
import quanJoggerData from '../data/quan-jogger.json';
import quanShortData from '../data/quan-short.json';
import quanTayData from '../data/quan-tay.json';
import baloData from '../data/balo.json';
import tuiToteData from '../data/tui-tote.json';
import kinhMatData from '../data/kinh-mat.json';
import nonData from '../data/non.json';
import trangSucData from '../data/trang-suc.json';

// 1. Định nghĩa Interface cho Product
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  sizes?: string[];
  images?: string[]; // Mảng ảnh được tạo thêm lúc runtime
  [key: string]: any;
}

// 2. Định nghĩa Interface cho Context
interface CartContextType {
  addToCart: (product: Product, size: string, quantity: number) => void;
  [key: string]: any;
}

const allProductsWithCategory: Product[] = [
  ...aoKhoacData.map(p => ({ ...p, category: 'ao-khoac' })), ...aoPoloData.map(p => ({ ...p, category: 'ao-polo' })), ...aoSoMiData.map(p => ({ ...p, category: 'ao-so-mi' })), ...aoThunData.map(p => ({ ...p, category: 'ao-thun' })),
  ...quanJeanData.map(p => ({ ...p, category: 'quan-jean' })), ...quanJoggerData.map(p => ({ ...p, category: 'quan-jogger' })), ...quanShortData.map(p => ({ ...p, category: 'quan-short' })), ...quanTayData.map(p => ({ ...p, category: 'quan-tay' })),
  ...baloData.map(p => ({ ...p, category: 'balo' })), ...tuiToteData.map(p => ({ ...p, category: 'balo' })), ...kinhMatData.map(p => ({ ...p, category: 'kinh-mat' })), ...nonData.map(p => ({ ...p, category: 'non' })), ...trangSucData.map(p => ({ ...p, category: 'trang-suc' }))
].map(p => ({ ...p, id: p.id.toString() })) as Product[];

// 3. Khai báo kiểu string cho path
const getImageUrl = (path: string) => {
  try {
    return new URL(path, import.meta.url).href;
  } catch (e) {
    console.error("Failed to create image URL", e);
    return ''; 
  }
};

export default function ProductDetail() {
  // 4. Khai báo kiểu cho useParams
  const { id } = useParams<{ id: string }>();
  
  // 5. Khai báo kiểu cho các State
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [activeImage, setActiveImage] = useState<number>(0);
  const [activeInfoTab, setActiveInfoTab] = useState<string>('warranty'); 
  
  // Ép kiểu useContext
  const { addToCart } = useContext(CartContext) as CartContextType;

  useEffect(() => {
    setLoading(true);
    const foundProduct = allProductsWithCategory.find(p => p.id === id);
    if (foundProduct) {
      const images = [
        getImageUrl(foundProduct.image),
        getImageUrl(foundProduct.image.replace('1.webp', '2.webp'))
      ].filter(Boolean); 
      
      setProduct({ ...foundProduct, images });
      setSelectedSize(foundProduct.sizes?.[0] || '');
      setActiveImage(0);
    } else {
      setProduct(null);
    }
    setLoading(false);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert('Vui lòng chọn size trước khi thêm vào giỏ hàng!');
      return;
    }
    addToCart(product, selectedSize, 1);
    alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  if (loading) {
    return (
      <div className="bg-white text-black min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-white text-black min-h-screen flex flex-col items-center justify-center text-center py-12">
        <h2 className="text-2xl font-bold mb-4">404 - Không tìm thấy sản phẩm</h2>
        <p className="text-gray-600 mb-6">Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <Link to="/products" className="bg-black text-white px-6 py-3 font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors">
          Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-white text-black min-h-screen py-12 pt-[120px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-6 text-sm text-gray-500">
          <Link to="/" className="hover:text-black">Trang chủ</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-black">Sản phẩm</Link>
          <span className="mx-2">/</span>
          <span className="text-black font-medium">{product.name}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
          {/* Cột ảnh sản phẩm */}
          <div className="md:w-1/2 flex flex-col gap-4">
            {product.images && product.images.length > 0 ? (
                <>
                    <div className="w-full aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                        <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {product.images.map((img, idx) => (
                            <div 
                            key={idx} 
                            className={`aspect-[3/4] bg-gray-100 rounded border overflow-hidden cursor-pointer transition-all ${activeImage === idx ? 'border-black' : 'border-gray-200 hover:border-gray-400'}`}
                            onClick={() => setActiveImage(idx)}
                            >
                            <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="w-full aspect-[3/4] bg-gray-100 rounded-lg flex items-center justify-center">
                    <p>Image not available</p>
                </div>
            )}
          </div>

          {/* Cột thông tin */}
          <div className="md:w-1/2 flex flex-col">
            <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-wide mb-4 text-black">
              {product.name}
            </h1>
            <div className="text-3xl font-bold text-orange-600 mb-6">
              {product.price.toLocaleString('vi-VN')}₫
            </div>
            <p className="text-gray-600 leading-relaxed mb-8 text-base whitespace-pre-line">
              {product.description}
            </p>

            {/* Chọn Size */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold uppercase tracking-wider text-sm">Kích cỡ: {selectedSize || 'Chưa chọn'}</span>
                </div>
                <div className="flex gap-3 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 flex items-center justify-center font-bold text-lg border-2 rounded transition-colors ${
                        selectedSize === size
                          ? 'bg-black text-white border-black'
                          : 'bg-transparent text-black border-gray-300 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Nút Thêm vào giỏ */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 rounded uppercase tracking-widest transition-colors flex justify-center items-center gap-3 text-lg mt-4"
            >
              <BsCartPlus className="text-2xl" />
              Thêm Vào Giỏ Hàng
            </button>
          </div>
        </div>
        
        {/* Phần Tab thông tin chi tiết & chính sách */}
        <div className="mt-20 pt-12 border-t border-gray-200">
          {/* Tab Headers */}
          <div className="flex justify-center border-b border-gray-200 mb-8">
            <button
              onClick={() => setActiveInfoTab('warranty')}
              className={`px-6 py-3 font-bold uppercase tracking-wider text-sm transition-all ${activeInfoTab === 'warranty' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'}`}
            >
              Bảo hành
            </button>
            <button
              onClick={() => setActiveInfoTab('return')}
              className={`px-6 py-3 font-bold uppercase tracking-wider text-sm transition-all ${activeInfoTab === 'return' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'}`}
            >
              Đổi trả
            </button>
            <button
              onClick={() => setActiveInfoTab('shipping')}
              className={`px-6 py-3 font-bold uppercase tracking-wider text-sm transition-all ${activeInfoTab === 'shipping' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'}`}
            >
              Giao hàng
            </button>
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto text-gray-600 leading-relaxed space-y-4">
            {activeInfoTab === 'warranty' && <WarrantyPolicy />}
            {activeInfoTab === 'return' && <ReturnPolicy />}
            {activeInfoTab === 'shipping' && <ShippingPolicy />}
          </div>
        </div>

        {/* Phần đánh giá và sản phẩm liên quan */}
        <div className="mt-12">
          <Reviews product={product} />
          <RelatedProducts currentProduct={product} />
        </div>
      </div>
    </main>
  );
}