import { useState, useMemo, useCallback, useContext, ChangeEvent, MouseEvent } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { BsCart, BsChevronDown, BsChevronUp } from 'react-icons/bs';

// Xóa đuôi .js
import { CartContext } from '../context/CartContext';
import Pagination from '../components/Pagination/Pagination';

// Import Data
import productsData from '../data/products.json';

// 1. Định nghĩa Interface cho Product và Context
interface Product {
  id: string | number;
  name: string;
  price: number;
  image: string;
  category: string;
  sizes?: string[];
  [key: string]: any;
}

interface CartContextType {
  addToCart: (product: Product, size: string, quantity?: number) => void;
  [key: string]: any;
}

// 2. Khai báo kiểu string cho path
const CLOUDINARY_BASE_URL = import.meta.env.VITE_CLOUDINARY_BASE_URL || 'https://res.cloudinary.com/hb22fnuq/image/upload';
const getImageUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${CLOUDINARY_BASE_URL}/${path}`;
};

// Gộp tất cả sản phẩm và ép kiểu mảng về Product[]
const allProducts: Product[] = productsData as Product[];

// Định nghĩa Type cho các key của Accordion
type AccordionSection = 'csd' | 'toc' | 'trangdiem' | 'price';

export default function Products() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('cat') || 'all';

  const [openAccordion, setOpenAccordion] = useState<Record<AccordionSection, boolean>>({
    csd: true,
    toc: false,
    trangdiem: false,
    price: true
  });

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  const { addToCart } = useContext(CartContext) as CartContextType;
  const PRODUCTS_PER_PAGE = 12;

  // 3. Khai báo kiểu tham số chặt chẽ
  const toggleAccordion = useCallback((section: AccordionSection) => {
    setOpenAccordion(prev => ({ ...prev, [section]: !prev[section] }));
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  }, []);

  const handlePriceFilterChange = useCallback((price: string) => {
    setPriceFilter(price);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...allProducts];

    // Lọc danh mục
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Lọc giá
    if (priceFilter === 'under200') {
      result = result.filter(p => p.price < 200000);
    } else if (priceFilter === '200to500') {
      result = result.filter(p => p.price >= 200000 && p.price <= 500000);
    } else if (priceFilter === 'above500') {
      result = result.filter(p => p.price > 500000);
    }

    // Sắp xếp
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [activeCategory, priceFilter, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredAndSortedProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredAndSortedProducts, currentPage]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <main className="bg-gray-50 min-h-screen py-10 text-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-8 mt-4">
          
          <aside className="w-full lg:w-1/4 lg:sticky lg:top-[90px] self-start">
            <h5 className="font-bold uppercase mb-4 tracking-wide text-gray-900">Danh Mục</h5>
            
            <button 
              onClick={() => handleCategoryChange('all')}
              className={`w-full text-left font-bold mb-4 py-2 border-b ${activeCategory === 'all' ? 'text-orange-600 border-orange-600' : 'text-gray-900 border-gray-200'}`}
            >
              TẤT CẢ SẢN PHẨM
            </button>

            <div className="mb-8 border border-gray-200 bg-white rounded-md">
              {/* Nhóm Chăm Sóc Da */}
              <div className="border-b border-gray-200">
                <button onClick={() => toggleAccordion('csd')} className="w-full flex justify-between items-center py-3 px-4 font-bold uppercase text-gray-900">
                  Chăm Sóc Da {openAccordion.csd ? <BsChevronUp /> : <BsChevronDown />}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openAccordion.csd ? 'max-h-60' : 'max-h-0'}`}>
                  <ul className="px-4 pb-3 space-y-2">
                    {['Chăm sóc da|Chăm sóc da', 'Chăm sóc da & Cơ thể|Chăm sóc da & Cơ thể', 'Chăm sóc mắt|Chăm sóc mắt', 'Chăm sóc môi|Chăm sóc môi'].map(item => {
                      const [val, label] = item.split('|');
                      return (
                        <li key={val}>
                          <button 
                            onClick={() => handleCategoryChange(val)}
                            className={`hover:text-orange-600 font-medium ${activeCategory === val ? 'text-orange-600' : 'text-gray-600'}`}
                          >
                            {label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* Nhóm Tóc & Cơ Thể */}
              <div className="border-b border-gray-200">
                <button onClick={() => toggleAccordion('toc')} className="w-full flex justify-between items-center py-3 px-4 font-bold uppercase text-gray-900">
                  Tóc & Cơ Thể {openAccordion.toc ? <BsChevronUp /> : <BsChevronDown />}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openAccordion.toc ? 'max-h-60' : 'max-h-0'}`}>
                  <ul className="px-4 pb-3 space-y-2">
                    {['Chăm sóc tóc|Chăm sóc tóc', 'Chăm sóc cơ thể|Chăm sóc cơ thể', 'Chăm sóc cơ thể & Da nắng|Cơ thể & Da nắng', 'Chăm sóc cá nhân & Trẻ em|Cá nhân & Trẻ em'].map(item => {
                      const [val, label] = item.split('|');
                      return (
                        <li key={val}>
                          <button 
                            onClick={() => handleCategoryChange(val)}
                            className={`hover:text-orange-600 font-medium ${activeCategory === val ? 'text-orange-600' : 'text-gray-600'}`}
                          >
                            {label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* Nhóm Trang Điểm & Hương */}
              <div>
                <button onClick={() => toggleAccordion('trangdiem')} className="w-full flex justify-between items-center py-3 px-4 font-bold uppercase text-gray-900">
                  Trang Điểm & Hương {openAccordion.trangdiem ? <BsChevronUp /> : <BsChevronDown />}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openAccordion.trangdiem ? 'max-h-60' : 'max-h-0'}`}>
                  <ul className="px-4 pb-3 space-y-2">
                    {['Trang điểm|Trang điểm', 'Nước hoa|Nước hoa'].map(item => {
                      const [val, label] = item.split('|');
                      return (
                        <li key={val}>
                          <button 
                            onClick={() => handleCategoryChange(val)}
                            className={`hover:text-orange-600 font-medium ${activeCategory === val ? 'text-orange-600' : 'text-gray-600'}`}
                          >
                            {label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            <h5 className="font-bold uppercase mb-4 tracking-wide text-gray-900">Lọc Thêm</h5>
            <div className="border border-gray-200 bg-white rounded-md">
              <button onClick={() => toggleAccordion('price')} className="w-full flex justify-between items-center py-3 px-4 font-bold uppercase text-gray-900">
                Mức Giá {openAccordion.price ? <BsChevronUp /> : <BsChevronDown />}
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openAccordion.price ? 'max-h-60' : 'max-h-0'}`}>
                <div className="px-4 pb-4 space-y-3">
                  {[
                    { id: 'all', label: 'Tất cả' },
                    { id: 'under200', label: 'Dưới 200.000₫' },
                    { id: '200to500', label: '200.000₫ - 500.000₫' },
                    { id: 'above500', label: 'Trên 500.000₫' }
                  ].map(price => (
                    <div key={price.id} className="flex items-center">
                      <input
                        type="radio"
                        id={`price-${price.id}`}
                        name="priceFilter"
                        value={price.id}
                        checked={priceFilter === price.id}
                        // Thêm ChangeEvent cho input radio
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handlePriceFilterChange(e.target.value)}
                        className="w-4 h-4 text-gray-900 border-gray-300 focus:ring-gray-900 cursor-pointer"
                      />
                      <label htmlFor={`price-${price.id}`} className="ml-2 text-gray-600 cursor-pointer hover:text-gray-900">
                        {price.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="w-full lg:w-3/4">
            
            <div className="flex justify-end items-center mb-6 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <label htmlFor="sortSelect" className="text-gray-600 font-medium whitespace-nowrap">Sắp xếp:</label>
                <select
                  id="sortSelect"
                  value={sortBy}
                  // Thêm ChangeEvent cho thẻ select
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => handleSortChange(e.target.value)}
                  className="border border-gray-300 text-gray-700 text-sm rounded-md focus:ring-gray-900 focus:border-gray-900 block p-2 cursor-pointer outline-none"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="price-asc">Giá: Thấp đến Cao</option>
                  <option value="price-desc">Giá: Cao đến Thấp</option>
                </select>
              </div>
            </div>

            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-20 w-full bg-white rounded-lg border border-gray-200">
                <h5 className="text-gray-500 text-xl font-medium">Không tìm thấy sản phẩm nào</h5>
                <button onClick={() => { handleCategoryChange('all'); setPriceFilter('all'); setCurrentPage(1); }} className="mt-4 text-orange-600 underline font-medium">Xóa bộ lọc</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <Link to={`/product/${product.id}`} key={product.id} className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow group flex flex-col">
                    <div className="relative overflow-hidden aspect-[3/4] bg-gray-100">
                      <img 
                        src={getImageUrl(product.image)} 
                        alt={product.name} 
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0"
                      />
                      <img 
                        src={getImageUrl(product.image.replace('1.webp', '2.webp'))} 
                        alt={`${product.name} (back view)`} 
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-bold text-gray-900 mb-2 truncate text-sm uppercase tracking-wide">
                        {product.name}
                      </h3>
                      <div className="text-orange-600 font-extrabold text-lg mb-4">
                        {product.price.toLocaleString('vi-VN')}₫
                      </div>
                      <button 
                        className="mt-auto w-full bg-gray-900 hover:bg-black text-white font-bold py-2.5 rounded uppercase text-sm tracking-wider transition-colors flex items-center justify-center gap-2"
                        // Thêm kiểu MouseEvent cho sự kiện onClick của thẻ button
                        onClick={(e: MouseEvent<HTMLButtonElement>) => {
                          e.preventDefault(); 
                          e.stopPropagation(); 
                          addToCart(product, product.sizes?.[0] || '');
                          alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
                        }}
                      >
                        <BsCart /> Thêm
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />

          </div>
        </div>
      </div>
    </main>
  );
}