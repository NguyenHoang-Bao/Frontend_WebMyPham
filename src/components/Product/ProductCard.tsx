import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { BsCart } from 'react-icons/bs';

export interface Product {
  id: string | number;
  name: string;
  price: number;
  image: string;
  category: string;
  brand?: string;
  sizes?: string[];
  [key: string]: any;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
}

const CLOUDINARY_BASE_URL = import.meta.env.VITE_CLOUDINARY_BASE_URL || 'https://res.cloudinary.com/hb22fnuq/image/upload';
const getImageUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${CLOUDINARY_BASE_URL}/${path}`;
};

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`} className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow group flex flex-col">
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
        <div className="text-rose-600 font-extrabold text-lg mb-4">
          {product.price.toLocaleString('vi-VN')}₫
        </div>
        <button 
          className="mt-auto w-full bg-gray-900 hover:bg-rose-600 text-white font-bold py-2.5 rounded uppercase text-sm tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault(); 
            e.stopPropagation(); 
            onAddToCart(product, product.sizes?.[0] || '');
            alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
          }}
        >
          <BsCart /> Thêm
        </button>
      </div>
    </Link>
  );
}