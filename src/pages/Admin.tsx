import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Users, Package, LogOut, Home, LucideIcon } from 'lucide-react';

// Giả sử đây là các component con cho từng mục
const DashboardView = () => <div className="text-2xl font-bold">Tổng quan</div>;
const ProductsView = () => <div className="text-2xl font-bold">Quản lý Sản phẩm</div>;
const OrdersView = () => <div className="text-2xl font-bold">Quản lý Đơn hàng</div>;
const UsersView = () => <div className="text-2xl font-bold">Quản lý Người dùng</div>;

// 1. Định nghĩa Interface cho dữ liệu User
interface User {
  name: string;
  role: string;
  [key: string]: any; // Dành cho các thuộc tính khác (email, id, ...)
}

// 2. Định nghĩa Interface cho cấu hình Sidebar Menu
interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export default function Admin() {
  const navigate = useNavigate();
  
  // 3. Khai báo kiểu cho State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<string>('dashboard');

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser) as User;
        
        // Kiểm tra vai trò của người dùng
        if (user.role === 'ADMIN' || user.role === 'STAFF') {
          setCurrentUser(user);
        } else {
          // Nếu không phải admin/staff, chuyển hướng về trang chủ
          alert('Bạn không có quyền truy cập trang này.');
          navigate('/');
        }
      } catch (error) {
        // Fallback an toàn nếu chuỗi JSON bị lỗi
        navigate('/login');
      }
    } else {
      // Nếu chưa đăng nhập, chuyển hướng về trang login
      alert('Vui lòng đăng nhập để truy cập.');
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'products':
        return <ProductsView />;
      case 'orders':
        return <OrdersView />;
      case 'users':
        return <UsersView />;
      default:
        return <DashboardView />;
    }
  };

  // Nếu chưa xác thực xong, hiển thị loading
  // Bước check này cũng đóng vai trò là "Type Guard", 
  // xuống bên dưới TypeScript sẽ tự hiểu currentUser chắc chắn là `User` (không còn null nữa)
  if (!currentUser) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
      </div>
    );
  }

  // 4. Gán kiểu NavItem[] cho mảng
  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard },
    { id: 'products', label: 'Sản phẩm', icon: Package },
    { id: 'orders', label: 'Đơn hàng', icon: ShoppingCart },
    // Chỉ admin mới thấy mục quản lý người dùng
    ...(currentUser.role === 'ADMIN' ? [{ id: 'users', label: 'Người dùng', icon: Users }] : []),
  ];

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-neutral-900 text-white flex flex-col">
        <div className="h-20 flex items-center justify-center border-b border-neutral-700">
          <Link to="/" className="text-2xl font-extrabold uppercase tracking-widest">
            Admin
          </Link>
        </div>
        <nav className="flex-grow px-4 py-6">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeView === item.id
                      ? 'bg-orange-500 text-white'
                      : 'hover:bg-neutral-800'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-semibold">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-neutral-700">
           <Link to="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-neutral-800 mb-2">
              <Home size={20} />
              <span className="font-semibold">Về trang chủ</span>
           </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500 hover:text-white transition-colors"
          >
            <LogOut size={20} />
            <span className="font-semibold">Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h1 className="text-xl font-bold capitalize">{activeView}</h1>
          <div className="text-right">
            <p className="font-semibold">{currentUser.name}</p>
            <p className="text-sm text-gray-500">{currentUser.role}</p>
          </div>
        </header>
        <div className="flex-1 p-8 overflow-y-auto">
          {renderView()}
        </div>
      </main>
    </div>
  );
}