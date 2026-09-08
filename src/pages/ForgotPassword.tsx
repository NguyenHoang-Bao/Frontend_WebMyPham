import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bgImg from '../assets/img/About/pexels-badhon-35750806.jpg';
import { X, Loader2 } from 'lucide-react';

// Định nghĩa cấu trúc cho biến State lưu trữ trạng thái thông báo
interface StatusState {
  type: 'error' | 'success' | '';
  message: string;
}

export default function ForgotPassword() {
  const [input, setInput] = useState<string>('');
  const [status, setStatus] = useState<StatusState>({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Khai báo kiểu FormEvent cho sự kiện submit form
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
    const isPhone = /^[0-9]{10}$/.test(input.replace(/\s+/g, ""));

    if (!isEmail && !isPhone) {
      setStatus({ type: 'error', message: 'Vui lòng nhập email hoặc số điện thoại 10 số hợp lệ.' });
      return;
    }

    setIsLoading(true);
    // Giả lập API call mất 1.5s
    setTimeout(() => {
      setIsLoading(false);
      setStatus({ type: 'success', message: 'Mã khôi phục đã được gửi. Vui lòng kiểm tra điện thoại/email.' });
      setTimeout(() => navigate('/login'), 2500); // Tự chuyển trang
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-neutral-900">
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImg})` }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>
        <h1 className="relative z-10 text-5xl font-extrabold text-white tracking-[8px] uppercase text-center px-4">
          HOÀNG BẢO SHOP
        </h1>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center relative py-12 px-4">
        <Link to="/login" className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors">
          <X size={28} />
        </Link>

        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-white uppercase mb-2">Khôi Phục Mật Khẩu</h2>
          <p className="text-gray-400 text-sm mb-8">Nhập số điện thoại hoặc email bạn đã đăng ký để nhận mã khôi phục.</p>
          
          {status.message && (
            <div className={`mb-6 text-sm font-medium ${status.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative">
              <input
                type="text"
                id="reset-input"
                className="peer w-full bg-transparent border-0 border-b border-gray-500 text-white focus:outline-none focus:border-orange-500 focus:ring-0 placeholder-transparent py-2 transition-colors"
                placeholder="Số điện thoại / Email"
                value={input}
                // Sự kiện onChange này TypeScript tự động hiểu kiểu thông qua nội suy (inference)
                onChange={(e) => setInput(e.target.value)}
                required
              />
              <label 
                htmlFor="reset-input"
                className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-white"
              >
                Số điện thoại / Email
              </label>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-800 text-white font-bold py-3 uppercase tracking-wider transition-colors flex justify-center items-center gap-2"
            >
              {isLoading && <Loader2 className="animate-spin" size={20} />}
              {isLoading ? 'Đang xử lý...' : 'Gửi Mã Khôi Phục'}
            </button>

            <div className="text-center">
              <Link to="/login" className="text-gray-400 hover:text-white text-sm font-semibold transition-colors">
                Quay lại Đăng nhập
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}