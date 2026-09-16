import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  name: string;
  discountPercent: number;
  inStock?: boolean;
}

export default function ProductGallery({ images, name, discountPercent, inStock }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState<number>(0);

  if (!images || images.length === 0) {
    return (
      <div className="lg:w-1/2 w-full aspect-square bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
        Chưa có ảnh sản phẩm
      </div>
    );
  }

  return (
    <div className="lg:w-1/2 flex flex-col gap-4">
      {/* Khung ảnh chính */}
      <div className="relative w-full aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 flex items-center justify-center p-4">
        <img 
          src={images[activeImage]} 
          alt={name} 
          className="w-full h-full object-contain transition-transform duration-300 hover:scale-105" 
        />
        {discountPercent > 0 && (
          <span className="absolute top-4 left-4 bg-rose-500 text-white font-bold text-xs uppercase px-2.5 py-1 rounded-md shadow-sm">
            -{discountPercent}%
          </span>
        )}
        <span className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 font-medium text-xs px-2.5 py-1 rounded-md border border-emerald-200">
          {inStock !== false ? 'Còn hàng' : 'Tạm hết'}
        </span>
      </div>

      {/* Danh sách ảnh thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
          {images.map((img, idx) => (
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
              <img src={img} alt={`${name} ${idx + 1}`} className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}