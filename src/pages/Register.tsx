import { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Loader2 } from 'lucide-react'; 
import AuthBanner from '../components/Auth/AuthBanner';

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

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
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Đã xảy ra lỗi hệ thống.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  type FieldKey = keyof typeof formData;
  const formFields: { key: FieldKey; label: string; type: string }[] = [
    { key: 'name', label: 'Họ và tên', type: 'text' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'phone', label: 'Số điện thoại', type: 'tel' },
    { key: 'address', label: 'Địa chỉ nhận hàng', type: 'text' },
    { key: 'password', label: 'Mật khẩu', type: 'password' },
    { key: 'confirmPassword', label: 'Xác nhận mật khẩu', type: 'password' },
  ];

  return (
    <div className="flex h-screen bg-white">
      {/* Nửa Trái: Banner 1 hình ảnh */}
      <AuthBanner />

      {/* Nửa Phải: Form Đăng Ký */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative py-12 px-4 overflow-y-auto">
        <Link to="/" className="absolute top-6 right-6 text-gray-400 hover:text-rose-600 transition-colors">
          <X size={28} />
        </Link>

        <div className="w-full max-w-md my-auto">
          <h2 className="text-3xl font-bold text-gray-900 uppercase mb-8">Đăng Ký</h2>
          
          {error && <div className="text-red-500 mb-4 text-sm font-medium">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {formFields.map(({ key, label, type }) => (
              <div className="relative" key={key}>
                <input
                  type={type}
                  name={key}
                  id={`register-${key}`}
                  className="peer w-full bg-transparent border-0 border-b border-gray-300 text-gray-900 focus:outline-none focus:border-rose-500 focus:ring-0 placeholder-transparent py-2 transition-colors"
                  placeholder={label}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                />
                <label 
                  htmlFor={`register-${key}`}
                  className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-rose-600"
                >
                  {label}
                </label>
              </div>
            ))}

            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white font-bold py-3 uppercase tracking-wider transition-colors mt-8 flex justify-center items-center gap-2 cursor-pointer"
            >
              {isLoading && <Loader2 className="animate-spin" size={20} />}
              {isLoading ? 'Đang xử lý...' : 'Đăng Ký'}
            </button>

            <div className="text-center mt-6 text-sm text-gray-500">
              Đã có tài khoản?{' '}
              <Link to="/login" className="text-rose-500 font-semibold hover:text-rose-700 transition-colors ml-1">
                Đăng nhập
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}