import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { BsArrowLeft, BsArrowRight, BsArrowRight as BsArrowRightIcon } from "react-icons/bs";

// 1. Định nghĩa cấu trúc của một danh mục (Category)
interface Category {
  title: string;
  image: string;
  link: string;
}

// 2. Định nghĩa kiểu cho Props truyền vào component
interface CategoryCarouselProps {
  categories: Category[];
}

export default function CategoryCarousel({ categories }: CategoryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(3);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  // Effect để xử lý responsive
  useEffect(() => {
    const handleResize = () => {
      let newItemsPerPage: number; // Định nghĩa kiểu number rõ ràng
      if (window.innerWidth >= 1024) {
        newItemsPerPage = 3;
      } else if (window.innerWidth >= 768) {
        newItemsPerPage = 2;
      } else {
        newItemsPerPage = 1;
      }
      setItemsPerPage(newItemsPerPage);
      
      // Adjust currentIndex if it's out of bounds
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.max(0, categories.length - newItemsPerPage);
        return prevIndex > maxIndex ? maxIndex : prevIndex;
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [categories.length]);

  // Effect để tự động trượt
  useEffect(() => {
    if (isHovering) return; // Dừng lại khi hover

    const autoPlay = setInterval(() => {
      nextSlide();
    }, 1500); // Tự động chuyển slide sau mỗi 1.5 giây

    return () => clearInterval(autoPlay); // Dọn dẹp interval khi component unmount hoặc isHovering thay đổi
  }, [currentIndex, isHovering]);

  const totalSlides = Math.max(0, categories.length - itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= totalSlides ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? totalSlides : prevIndex - 1));
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out" 
          style={{ transform: `translateX(-${(100 / itemsPerPage) * currentIndex}%)` }} 
        >
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="shrink-0 px-2" 
              style={{ width: `${100 / itemsPerPage}%` }}
            >
              <Link 
                to={category.link} 
                className="group relative block aspect-[3/4] h-[500px] overflow-hidden rounded-xl"
              >
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-white text-3xl font-bold uppercase">
                    {category.title}
                  </h3>
                  <span className="text-white text-sm uppercase tracking-widest mt-2 block hover:underline">
                    MUA NGAY <BsArrowRightIcon className="inline-block" />
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {categories.length > itemsPerPage && (
        <>
          <button 
            onClick={prevSlide} 
            className="absolute top-1/2 -translate-y-1/2 -left-4 bg-black/5 backdrop-blur-sm text-white p-3 rounded-full shadow-lg hover:bg-black/10 transition-all border border-white/10 z-10"
            aria-label="Previous slide"
          >
            <BsArrowLeft size={20} />
          </button>
          <button 
            onClick={nextSlide} 
            className="absolute top-1/2 -translate-y-1/2 -right-4 bg-black/5 backdrop-blur-sm text-white p-3 rounded-full shadow-lg hover:bg-black/10 transition-all border border-white/10 z-10"
            aria-label="Next slide"
          >
            <BsArrowRight size={20} />
          </button>
        </>
      )}

      {categories.length > itemsPerPage && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalSlides + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'bg-black w-6' : 'bg-black/30 hover:bg-black/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}