import { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bgImg from '../assets/img/About/pexels-badhon-35750806.jpg';
import { X } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // 1. Thêm kiểu ChangeEvent cho sự kiện thay đổi input
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Thêm kiểu FormEvent cho sự kiện submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Thay đổi URL thành endpoint API của bạn
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Backend của bạn có thể mong đợi 'phoneNumber' thay vì 'email'
        body: JSON.stringify({ phoneNumber: formData.email, password: formData.password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Ném lỗi nếu response không thành công (status 4xx, 5xx)
        throw new Error(data.message || 'Email hoặc mật khẩu không chính xác.');
      }

      // Lưu token và thông tin người dùng vào localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('currentUser', JSON.stringify(data.user));

      alert('Đăng nhập thành công!');
      navigate('/'); // Chuyển hướng về trang chủ
    } catch (err) {
      // 3. Xử lý an toàn biến err kiểu unknown
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Đã xảy ra lỗi không xác định.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-neutral-900">
      {/* Nửa Trái: Background Image */}
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

      {/* Nửa Phải: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative py-12 px-4">
        <Link to="/" className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors">
          <X size={28} />
        </Link>

        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-white uppercase mb-8">Đăng Nhập</h2>
          
          {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative">
              <input
                type="email"
                name="email" // Giữ nguyên name để handleChange hoạt động
                id="login-email"
                className="peer w-full bg-transparent border-0 border-b border-gray-500 text-white focus:outline-none focus:border-orange-500 focus:ring-0 placeholder-transparent py-2 transition-colors"
                placeholder="Số điện thoại / Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="login-email" className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-white">Số điện thoại / Email</label>
            </div>

            <div className="relative">
              <input
                type="password"
                name="password"
                id="login-password"
                className="peer w-full bg-transparent border-0 border-b border-gray-500 text-white focus:outline-none focus:border-orange-500 focus:ring-0 placeholder-transparent py-2 transition-colors"
                placeholder="Mật khẩu"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label htmlFor="login-password" className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-white">Mật khẩu</label>
            </div>

            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-gray-400 hover:text-white transition-colors">Quên mật khẩu?</Link>
            </div>

            <button type="submit" disabled={isLoading} className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-800 text-white font-bold py-3 uppercase tracking-wider transition-colors">
              {isLoading ? 'Đang xử lý...' : 'Đăng Nhập'}
            </button>

            <div className="text-center mt-6 text-sm text-gray-400">
              Chưa có tài khoản? <Link to="/register" className="text-orange-500 font-semibold hover:text-white transition-colors ml-1">Đăng ký ngay</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}