import { Link } from 'react-router-dom';
import { BsCartPlus } from 'react-icons/bs';

// Import dữ liệu sản phẩm để giả lập sale
import productsData from '../data/products.json';

// 1. Định nghĩa Interface cho sản phẩm Sale
interface SaleProduct {
  id: string | number;
  name: string;
  price: number;
  image: string;
  oldPrice: number;
  [key: string]: any; // Chấp nhận các thuộc tính dư thừa từ JSON
}

// 2. Định nghĩa kiểu chuỗi (string) cho path
const CLOUDINARY_BASE_URL = import.meta.env.VITE_CLOUDINARY_BASE_URL || 'https://res.cloudinary.com/hb22fnuq/image/upload';
const getImageUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${CLOUDINARY_BASE_URL}/${path}`;
};

// 3. Ép kiểu mảng này về cấu trúc SaleProduct[]
const saleProducts: SaleProduct[] = productsData.slice(0, 6).map(p => ({
  ...p,
  oldPrice: p.originalPrice ?? Math.round(p.price * 1.3),
})) as SaleProduct[];

export default function Sale() {
  return (
    <main className="bg-white text-black min-h-screen">
      {/* Hero Banner cho trang Sale */}
      <section 
        className="relative bg-cover bg-center text-white py-20 pt-40"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1570857502907-181688b15940?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-widest">Final Sale</h1>
          <p className="mt-4 text-xl text-gray-200">Cơ hội cuối cùng để sở hữu những item hot nhất với giá không tưởng!</p>
        </div>
      </section>

      {/* Lưới sản phẩm Sale */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {saleProducts.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="group cursor-pointer">
                <div className="relative overflow-hidden bg-gray-100 aspect-[3/4] mb-4">
                  <img 
                    src={getImageUrl(product.image)} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Sale Badge */}
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold uppercase px-3 py-1 rounded">
                    - {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button 
                      onClick={(e) => {
                        e.preventDefault(); // Ngăn Link chuyển trang khi bấm nút thêm giỏ hàng
                        // Thêm logic gọi hàm addToCart ở đây nếu cần
                      }}
                      className="w-full bg-white text-black flex items-center justify-center gap-2 py-3 font-bold uppercase text-sm hover:bg-gray-200 transition-colors"
                    >
                      <BsCartPlus size={18} /> Thêm vào giỏ
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="text-gray-600 group-hover:text-black transition-colors text-sm font-medium mb-1 truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <p className="text-red-600 font-bold text-lg">
                      {product.price.toLocaleString('vi-VN')}₫
                    </p>
                    <p className="text-gray-400 line-through text-sm">
                      {product.oldPrice.toLocaleString('vi-VN')}₫
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}