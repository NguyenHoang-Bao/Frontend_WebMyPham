import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { UserCircle, LogOut, Home } from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();

  // Lấy user từ localStorage ngay khi khởi tạo state
  const [user] = useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) return null;
    try {
      return JSON.parse(storedUser);
    } catch {
      return null;
    }
  });

  // Nếu không có user thì redirect về login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black text-white pb-12">
      {/* Header riêng cho trang Profile */}
      <header className="border-b border-gray-800 py-4 mb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="text-xl font-extrabold uppercase tracking-widest text-white">
            SHOP THỜI TRANG NAM
          </Link>
          <Link to="/" className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
            <Home size={18} /> Trang Chủ
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Cột trái: Avatar & Hành động */}
          <div className="md:w-1/3">
            <div className="bg-neutral-900 p-8 rounded-xl border border-neutral-800 text-center flex flex-col items-center">
              <UserCircle size={80} className="text-gray-500 mb-4" />
              <h4 className="text-2xl font-bold mb-1">{user.name}</h4>
              <p className="text-gray-500 text-sm mb-8">Khách hàng thành viên</p>
              
              <button 
                onClick={handleLogout}
                className="w-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold py-2 px-4 rounded transition-colors flex items-center justify-center gap-2"
              >
                <LogOut size={18} /> Đăng Xuất
              </button>
            </div>
          </div>

          {/* Cột phải: Thông tin & Lịch sử */}
          <div className="md:w-2/3 space-y-8">
            <div className="bg-neutral-900 p-8 rounded-xl border border-neutral-800">
              <h4 className="text-xl font-bold uppercase border-b border-gray-800 pb-4 mb-6 text-white">
                Thông tin cá nhân
              </h4>
              <div className="space-y-4 text-gray-300">
                <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <strong className="text-white w-48">Email:</strong> 
                  <span className="text-gray-400">{user.email || 'Chưa cập nhật'}</span>
                </p>
                <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <strong className="text-white w-48">Số điện thoại:</strong> 
                  <span className="text-gray-400">{user.phone}</span>
                </p>
                <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <strong className="text-white w-48">Địa chỉ giao hàng:</strong> 
                  <span className="text-gray-400">{user.address ? user.address : 'Chưa cập nhật'}</span>
                </p>
              </div>
            </div>

            <div className="bg-neutral-900 p-8 rounded-xl border border-neutral-800">
              <h4 className="text-xl font-bold uppercase border-b border-gray-800 pb-4 mb-6 text-white">
                Lịch Sử Đơn Hàng
              </h4>
              <div className="text-center py-10 text-gray-500">
                Bạn chưa có đơn hàng nào.
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}