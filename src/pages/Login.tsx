import { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Loader2 } from 'lucide-react';
import AuthBanner from '../components/Auth/AuthBanner';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: formData.email, password: formData.password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Email hoặc mật khẩu không chính xác.');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('currentUser', JSON.stringify(data.user));

      alert('Đăng nhập thành công!');
      navigate('/'); 
    } catch (err) {
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
    <div className="flex h-screen bg-white">
      {/* Nửa Trái: Banner 1 hình ảnh */}
      <AuthBanner />

      {/* Nửa Phải: Form Đăng Nhập */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative py-12 px-4">
        <Link to="/" className="absolute top-6 right-6 text-gray-400 hover:text-rose-600 transition-colors">
          <X size={28} />
        </Link>

        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-900 uppercase mb-8">Đăng Nhập</h2>
          
          {error && <div className="text-red-500 mb-4 text-sm font-medium">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative">
              <input
                type="text"
                name="email" 
                id="login-email"
                className="peer w-full bg-transparent border-0 border-b border-gray-300 text-gray-900 focus:outline-none focus:border-rose-500 focus:ring-0 placeholder-transparent py-2 transition-colors"
                placeholder="Số điện thoại / Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label 
                htmlFor="login-email" 
                className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-rose-600"
              >
                Số điện thoại / Email
              </label>
            </div>

            <div className="relative">
              <input
                type="password"
                name="password"
                id="login-password"
                className="peer w-full bg-transparent border-0 border-b border-gray-300 text-gray-900 focus:outline-none focus:border-rose-500 focus:ring-0 placeholder-transparent py-2 transition-colors"
                placeholder="Mật khẩu"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label 
                htmlFor="login-password" 
                className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-rose-600"
              >
                Mật khẩu
              </label>
            </div>

            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-gray-500 hover:text-rose-600 transition-colors">
                Quên mật khẩu?
              </Link>
            </div>

            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white font-bold py-3 uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 className="animate-spin" size={20} />}
              {isLoading ? 'Đang xử lý...' : 'Đăng Nhập'}
            </button>

            <div className="text-center mt-6 text-sm text-gray-500">
              Chưa có tài khoản?{' '}
              <Link to="/register" className="text-rose-500 font-semibold hover:text-rose-700 transition-colors ml-1">
                Đăng ký ngay
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}