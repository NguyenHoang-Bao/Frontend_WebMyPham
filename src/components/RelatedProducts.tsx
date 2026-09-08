import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import all product data
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
  id: number | string;
  name: string;
  category?: string;
  price: number;
  image: string;
  description?: string;
  stock?: number;
  sizes?: string[];
}

// 2. Gán kiểu Record<string, Product[]> để TypeScript hiểu cấu trúc Object
const allProductsByCategory: Record<string, Product[]> = {
  'ao-khoac': aoKhoacData,
  'ao-polo': aoPoloData,
  'ao-so-mi': aoSoMiData,
  'ao-thun': aoThunData,
  'quan-jean': quanJeanData,
  'quan-jogger': quanJoggerData,
  'quan-short': quanShortData,
  'quan-tay': quanTayData,
  'balo': [...baloData, ...tuiToteData], // Gộp balo và túi tote
  'kinh-mat': kinhMatData,
  'non': nonData,
  'trang-suc': trangSucData,
};

// 3. Khai báo kiểu string cho path
const getImageUrl = (path: string) => {
  try {
    return new URL(path, import.meta.url).href;
  } catch (e) {
    console.error("Failed to load image", e);
    return ''; // return a fallback image or empty string
  }
};

// 4. Khai báo kiểu cho props của ProductCard
const ProductCard = ({ product }: { product: Product }) => {
  const mainImage = getImageUrl(product.image);
  const hoverImageUrl = getImageUrl(product.image.replace('1.webp', '2.webp'));

  return (
    <Link to={`/product/${product.id}`} className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow group flex flex-col">
      <div className="relative overflow-hidden aspect-[3/4] bg-gray-100">
        {/* Ảnh chính (mặt trước) */}
        <img
          src={mainImage}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0"
        />
        {/* Ảnh khi hover (mặt sau) */}
        <img
          src={hoverImageUrl}
          alt={`${product.name} (back view)`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-gray-900 mb-2 truncate text-sm uppercase tracking-wide">{product.name}</h3>
        <p className="text-orange-600 font-extrabold text-lg mt-auto">{product.price.toLocaleString('vi-VN')}₫</p>
      </div>
    </Link>
  );
};

// 5. Khai báo kiểu cho props của RelatedProducts
const RelatedProducts = ({ currentProduct }: { currentProduct: Product | null }) => {
  // 6. Khai báo state là mảng chứa Product
  const [related, setRelated] = useState<Product[]>([]);

  useEffect(() => {
    if (currentProduct) {
      const productCategory = currentProduct.category;
      if (productCategory && allProductsByCategory[productCategory]) {
        const categoryProducts = allProductsByCategory[productCategory];
        // 7. Ép kiểu 'p' là Product và thêm .toString() để so sánh an toàn tuyệt đối
        const filteredProducts = categoryProducts.filter((p: Product) => p.id.toString() !== currentProduct.id.toString())
                                                 .sort(() => 0.5 - Math.random()); // Xáo trộn mảng
        setRelated(filteredProducts.slice(0, 4));
      }
    }
  }, [currentProduct]);

  if (related.length === 0) {
    return null;
  }

  return (
    <div className="mt-20 pt-12 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-center mb-10 uppercase tracking-wider">Có thể bạn cũng thích</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {related.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;