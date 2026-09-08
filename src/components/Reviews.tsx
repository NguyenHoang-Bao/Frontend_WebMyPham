import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Định nghĩa các Interface cho TypeScript
interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  text: string;
}

interface User {
  name: string;
  [key: string]: any; // Có thể chứa thêm các thông tin khác như email, phone...
}

interface Product {
  name: string;
  [key: string]: any;
}

// Mock data for reviews
const initialReviews: Review[] = [
  {
    id: 1,
    author: 'Nguyễn Văn A',
    rating: 5,
    date: '20/07/2024',
    text: 'Sản phẩm tuyệt vời, chất vải mát, form đẹp. Sẽ ủng hộ shop dài dài.',
  },
  {
    id: 2,
    author: 'Trần Thị B',
    rating: 4,
    date: '15/07/2024',
    text: 'Áo đẹp, giao hàng nhanh. Tuy nhiên size L hơi rộng so với mình.',
  },
];

// 2. Khai báo kiểu cho props của StarRating
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
};

// 3. Khai báo kiểu cho props của Reviews
const Reviews = ({ product }: { product: Product }) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newReview, setNewReview] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  
  // 4. Khai báo rõ ràng User hoặc null để tránh lỗi type 'never'
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
      }
    } catch (error) {
      setCurrentUser(null);
    }
  }, []);
  
  const hasPurchased = true; // Giả định người dùng đã mua sản phẩm này

  // 5. Thêm FormEvent cho sự kiện submit
  const handleReviewSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUser) {
      if (window.confirm('Bạn cần đăng nhập để gửi đánh giá. Bạn có muốn đăng nhập ngay không?')) {
        navigate('/login');
      }
      return;
    }

    if (newReview.trim() === '') {
      alert('Vui lòng nhập đánh giá của bạn.');
      return;
    }

    const reviewToAdd: Review = {
      id: reviews.length + 1,
      author: currentUser.name, // Bây giờ TypeScript đã hiểu currentUser có thuộc tính name
      rating,
      date: new Date().toLocaleDateString('vi-VN'),
      text: newReview,
    };

    setReviews([reviewToAdd, ...reviews]);
    setNewReview('');
    setRating(5);
  };

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-center mb-8">Đánh giá sản phẩm</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Review Submission Form */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Viết đánh giá của bạn</h3>
          <form onSubmit={handleReviewSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Đánh giá của bạn</label>
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <button
                      type="button"
                      key={ratingValue}
                      onClick={() => setRating(ratingValue)}
                      className="focus:outline-none"
                    >
                      <svg
                        className={`w-6 h-6 ${ratingValue <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    </button>
                  );
                })}
              </div>
            </div>
            <textarea
              value={newReview}
              // 6. Thêm ChangeEvent cho sự kiện gõ phím
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNewReview(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
              rows={4}
              placeholder={`Bạn nghĩ sao về sản phẩm ${product.name}?`}
            ></textarea>
            <button
              type="submit"
              className="mt-4 w-full bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Gửi đánh giá
            </button>
          </form>
        </div>

        {/* Existing Reviews */}
        <div className="max-h-[500px] overflow-y-auto pr-4">
            {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-4 mb-4">
                <div className="flex items-center mb-2">
                    <div className="flex-1">
                        <p className="font-bold text-sm">{review.author}</p>
                        <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                    <StarRating rating={review.rating} />
                </div>
                <p className="text-gray-700 text-sm">{review.text}</p>
                </div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default Reviews;