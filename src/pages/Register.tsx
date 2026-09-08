import { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bgImg from '../assets/img/About/pexels-badhon-35750806.jpg';
import { X, Loader2 } from 'lucide-react'; // Thêm Loader2 để làm icon loading nếu cần

export default function Register() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '', 
    email: '', 
    phone: '', 
    address: '', 
    password: '', 
    confirmPassword: ''
  });
  
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 1. Thêm ChangeEvent cho input
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Thêm FormEvent cho submit form
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp!');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.name,
          phoneNumber: formData.phone,
          email: formData.email,
          address: formData.address,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Đăng ký không thành công. Vui lòng thử lại.');
      }

      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      navigate('/login');
    } catch (err) {
      // 3. Bắt lỗi an toàn cho biến unknown
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Đã xảy ra lỗi hệ thống.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Khai báo rõ kiểu cho mảng chứa các field để tránh lỗi TS7053
  type FieldKey = keyof typeof formData;
  const formFields: FieldKey[] = ['name', 'email', 'phone', 'address', 'password', 'confirmPassword'];

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
          <h2 className="text-3xl font-bold text-white uppercase mb-8">Đăng Ký</h2>
          
          {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Vòng lặp map qua mảng đã được định nghĩa kiểu */}
            {formFields.map((field, index) => (
              <div className="relative" key={index}>
                <input
                  type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'}
                  name={field}
                  id={`register-${field}`}
                  className="peer w-full bg-transparent border-0 border-b border-gray-500 text-white focus:outline-none focus:border-orange-500 focus:ring-0 placeholder-transparent py-2 transition-colors"
                  placeholder={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
                <label 
                  htmlFor={`register-${field}`}
                  className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-white capitalize"
                >
                  {field === 'confirmPassword' ? 'Xác nhận mật khẩu' : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
              </div>
            ))}

            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-800 text-white font-bold py-3 uppercase tracking-wider transition-colors mt-8 flex justify-center items-center gap-2"
            >
              {isLoading && <Loader2 className="animate-spin" size={20} />}
              {isLoading ? 'Đang xử lý...' : 'Đăng Ký'}
            </button>

            <div className="text-center mt-6 text-sm text-gray-400">
              Đã có tài khoản?{' '}
              <Link to="/login" className="text-orange-500 font-semibold hover:text-white transition-colors ml-1">
                Đăng nhập
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}