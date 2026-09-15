import { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ShoppingBag, 
  LogIn, 
  Phone, 
  Calendar, 
  MapPin, 
  ChevronRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

interface OrderItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipping' | 'delivered' | 'cancelled';
  statusText: string;
  total: number;
  shippingAddress: string;
  phone: string;
  customerName: string;
  paymentMethod: string;
  items: OrderItem[];
}

export default function OrderTracking() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>('all');
  
  // State for guest lookup
  const [searchCode, setSearchCode] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState('');

  // Orders list
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    try {
      const u = localStorage.getItem('currentUser');
      if (u) {
        const parsed = JSON.parse(u);
        setCurrentUser(parsed);
        
        const savedOrders = localStorage.getItem(`orders_${parsed.phone || parsed.email || parsed.id || 'default'}`);
        if (savedOrders) {
          try {
            setOrders(JSON.parse(savedOrders));
          } catch {
            setOrders(getDefaultOrders(parsed.name, parsed.phone));
          }
        } else {
          setOrders(getDefaultOrders(parsed.name, parsed.phone));
        }
      } else {
        setCurrentUser(null);
      }
    } catch {
      setCurrentUser(null);
    }
  }, []);

  function getDefaultOrders(name = 'Quý khách', phone = '0359490221'): Order[] {
    return [
      {
        id: 'HBC-82914',
        date: '14/09/2026 - 10:30',
        status: 'shipping',
        statusText: 'Đang vận chuyển',
        total: 580000,
        customerName: name,
        phone: phone || '0359490221',
        shippingAddress: '140 Lê Trọng Tấn, P. Tây Thạnh, Q. Tân Phú, TP. HCM',
        paymentMethod: 'Thanh toán khi nhận hàng (COD)',
        items: [
          {
            id: 1,
            name: 'Son Kem Lì Mịn Mượt Môi Dưỡng Ẩm Hoàng Bảo',
            price: 290000,
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80&auto=format&fit=crop'
          }
        ]
      },
      {
        id: 'HBC-71822',
        date: '02/09/2026 - 15:45',
        status: 'delivered',
        statusText: 'Đã giao hàng thành công',
        total: 850000,
        customerName: name,
        phone: phone || '0359490221',
        shippingAddress: '140 Lê Trọng Tấn, P. Tây Thạnh, Q. Tân Phú, TP. HCM',
        paymentMethod: 'Chuyển khoản ngân hàng',
        items: [
          {
            id: 2,
            name: 'Tinh Chất Serum Phục Hồi Và Làm Sáng Da Căng Bóng',
            price: 450000,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80&auto=format&fit=crop'
          },
          {
            id: 3,
            name: 'Kem Chống Nắng Dịu Nhẹ Nâng Tone Kiềm Dầu SPF50+',
            price: 400000,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80&auto=format&fit=crop'
          }
        ]
      }
    ];
  }

  const handleGuestSearch = (e: FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    setSearchError('');
    setSearchedOrder(null);

    const cleanCode = searchCode.trim().toUpperCase();
    const cleanPhone = searchPhone.trim();

    if (!cleanCode) {
      setSearchError('Vui lòng nhập mã đơn hàng.');
      return;
    }

    const sampleGuestOrders: Order[] = [
      ...getDefaultOrders('Nguyễn Văn A', cleanPhone || '0987654321'),
      {
        id: 'HBC-99999',
        date: '15/09/2026 - 09:15',
        status: 'processing',
        statusText: 'Đang chuẩn bị hàng',
        total: 350000,
        customerName: 'Khách hàng',
        phone: cleanPhone || '0901234567',
        shippingAddress: 'Tân Bình, TP. Hồ Chí Minh',
        paymentMethod: 'COD',
        items: [
          {
            id: 4,
            name: 'Nước Hoa Hồng Cân Bằng Cấp Ẩm Chuyên Sâu',
            price: 350000,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1608248597359-593645b23d53?w=400&q=80&auto=format&fit=crop'
          }
        ]
      }
    ];

    const found = sampleGuestOrders.find(
      o => o.id.toUpperCase() === cleanCode || o.id.replace('HBC-', '') === cleanCode.replace('HBC-', '')
    );

    if (found) {
      setSearchedOrder(found);
    } else {
      setSearchError(`Không tìm thấy đơn hàng "${cleanCode}". Vui lòng kiểm tra lại mã hoặc số điện thoại.`);
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
            <Clock size={13} /> Chờ xác nhận
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
            <Package size={13} /> Đang chuẩn bị hàng
          </span>
        );
      case 'shipping':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
            <Truck size={13} /> Đang vận chuyển
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 size={13} /> Đã giao hàng
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
            <AlertCircle size={13} /> Đã hủy
          </span>
        );
      default:
        return null;
    }
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    return order.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* 1. Header Banner */}
      <section className="bg-white border-b border-gray-200 py-8 md:py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <nav className="text-xs text-gray-500 mb-2 flex items-center gap-1.5">
            <Link to="/" className="hover:text-rose-600 transition-colors">Trang chủ</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">Tra cứu đơn hàng</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                Tra Cứu Đơn Hàng
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Theo dõi hành trình và cập nhật tình trạng giao nhận đơn hàng của bạn
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 max-w-5xl">

        {/* ── TRƯỜNG HỢP: CHƯA ĐĂNG NHẬP ── */}
        {!currentUser ? (
          <div className="space-y-6">
            
            {/* Card thông báo Mua sắm để theo dõi */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wide bg-rose-50 text-rose-600 border border-rose-200 mb-3">
                  <ShoppingBag size={13} />
                  Theo dõi đơn hàng
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  Mua sắm để theo dõi
                </h2>

                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Bạn chưa đăng nhập vào hệ thống. Đăng nhập tài khoản giúp bạn dễ dàng theo dõi chi tiết quá trình giao hàng, kiểm tra lịch sử đặt hàng và quản lý thông tin thuận tiện hơn.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm transition-colors shadow-sm"
                  >
                    <LogIn size={16} />
                    Đăng Nhập
                  </Link>

                  <Link
                    to="/products"
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-semibold text-sm transition-colors shadow-sm"
                  >
                    <ShoppingBag size={16} />
                    Mua Sắm Ngay
                  </Link>
                </div>
              </div>
            </div>

            {/* Mục Tra cứu nhanh qua Mã đơn hàng */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm">
              <div className="border-b border-gray-100 pb-4 mb-6">
                <h3 className="text-base md:text-lg font-bold text-gray-900">
                  Hoặc tra cứu nhanh bằng mã đơn hàng
                </h3>
                <p className="text-gray-500 text-xs md:text-sm mt-0.5">
                  Dành cho khách hàng chưa đăng nhập hoặc đặt hàng nhanh
                </p>
              </div>

              <form onSubmit={handleGuestSearch} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">
                      Mã đơn hàng <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchCode}
                        onChange={e => setSearchCode(e.target.value)}
                        placeholder="VD: HBC-82914"
                        className="w-full pl-3.5 pr-10 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-sm uppercase transition-colors"
                        required
                      />
                      <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">
                      Số điện thoại nhận hàng
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={searchPhone}
                        onChange={e => setSearchPhone(e.target.value)}
                        placeholder="VD: 0359490221"
                        className="w-full pl-3.5 pr-10 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-sm transition-colors"
                      />
                      <Phone size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md bg-gray-900 hover:bg-black text-white font-semibold text-sm transition-colors"
                  >
                    <Search size={15} /> Tra Cứu Đơn Hàng
                  </button>
                </div>
              </form>

              {/* Thông báo lỗi khi không tìm thấy */}
              {searchError && (
                <div className="mt-6 p-4 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-3">
                  <AlertCircle size={18} className="shrink-0 mt-0.5 text-rose-500" />
                  <div>
                    <p className="font-semibold">{searchError}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Cần hỗ trợ? Vui lòng liên hệ hotline: <a href="tel:0359490221" className="font-semibold text-rose-600 underline">0359 490 221</a>
                    </p>
                  </div>
                </div>
              )}

              {/* Kết quả tra cứu */}
              {searchedOrder && (
                <div className="mt-6 border border-gray-200 rounded-md p-5 bg-gray-50/50">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-3 mb-4">
                    <div>
                      <span className="text-xs text-gray-500 block">Mã đơn hàng</span>
                      <strong className="text-base text-gray-900 font-bold">{searchedOrder.id}</strong>
                    </div>
                    <div>{getStatusBadge(searchedOrder.status)}</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 text-xs text-gray-600">
                    <p className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-gray-400 shrink-0" />
                      <span>Ngày đặt: <strong>{searchedOrder.date}</strong></span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Phone size={14} className="text-gray-400 shrink-0" />
                      <span>Số điện thoại: <strong>{searchedOrder.phone}</strong></span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-gray-400 shrink-0" />
                      <span className="truncate">Địa chỉ: <strong>{searchedOrder.shippingAddress}</strong></span>
                    </p>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2">Chi tiết sản phẩm</h4>
                    <div className="space-y-2">
                      {searchedOrder.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-3 py-1.5 bg-white p-2.5 rounded border border-gray-200">
                          <div className="flex items-center gap-2.5 min-w-0">
                            {item.image && (
                              <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded border border-gray-200" />
                            )}
                            <div className="truncate">
                              <p className="text-xs font-semibold text-gray-800 truncate">{item.name}</p>
                              <span className="text-[11px] text-gray-500">Số lượng: x{item.quantity}</span>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-gray-900 whitespace-nowrap">
                            {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 mt-4 pt-3 flex justify-between items-center">
                    <span className="text-xs font-semibold text-gray-700">Tổng thanh toán:</span>
                    <span className="text-base font-bold text-rose-600">{searchedOrder.total.toLocaleString('vi-VN')}₫</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (

          /* ── TRƯỜNG HỢP: ĐÃ ĐĂNG NHẬP ── */
          <div className="space-y-6">
            {/* Header chào mừng người dùng */}
            <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-rose-600 font-semibold uppercase tracking-wider">Khách hàng thành viên</span>
                <h2 className="text-xl font-bold text-gray-900 mt-0.5">
                  Xin chào, {currentUser.name || 'Quý khách'}!
                </h2>
                <p className="text-gray-500 text-xs mt-0.5">
                  Quản lý và tra cứu trạng thái đơn hàng của bạn
                </p>
              </div>

              <Link
                to="/products"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                <ShoppingBag size={14} /> Mua Sắm Thêm
              </Link>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-gray-200">
              {[
                { id: 'all', label: 'Tất cả đơn' },
                { id: 'pending', label: 'Chờ xác nhận' },
                { id: 'processing', label: 'Đang chuẩn bị' },
                { id: 'shipping', label: 'Đang vận chuyển' },
                { id: 'delivered', label: 'Đã hoàn thành' },
                { id: 'cancelled', label: 'Đã hủy' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'bg-rose-500 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Danh sách đơn hàng */}
            {filteredOrders.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg p-10 text-center">
                <div className="w-12 h-12 mx-auto rounded-md bg-gray-100 flex items-center justify-center text-gray-400 mb-3">
                  <Package size={24} />
                </div>
                <h3 className="text-base font-bold text-gray-800 mb-1">Chưa có đơn hàng nào</h3>
                <p className="text-gray-500 text-xs mb-4 max-w-sm mx-auto">
                  Bạn hiện chưa có đơn hàng nào trong mục này. Hãy ghé xem các sản phẩm mỹ phẩm chính hãng của chúng tôi!
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs uppercase tracking-wider transition-colors"
                >
                  Khám Phá Sản Phẩm <ChevronRight size={14} />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map(order => (
                  <div
                    key={order.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                  >
                    {/* Header đơn */}
                    <div className="p-4 bg-gray-50/70 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-md bg-rose-100 flex items-center justify-center text-rose-600 font-bold">
                          <Package size={16} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900 text-sm">{order.id}</span>
                            <span className="text-xs text-gray-300">|</span>
                            <span className="text-xs text-gray-500">{order.date}</span>
                          </div>
                          <span className="text-[11px] text-gray-500">PTTT: {order.paymentMethod}</span>
                        </div>
                      </div>

                      <div>{getStatusBadge(order.status)}</div>
                    </div>

                    {/* Danh sách món hàng */}
                    <div className="p-4 divide-y divide-gray-100">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="py-2.5 first:pt-0 last:pb-0 flex items-center gap-3">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded border border-gray-200 shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-800 text-xs md:text-sm truncate">{item.name}</h4>
                            <p className="text-[11px] text-gray-500 mt-0.5">Số lượng: x{item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900 text-xs md:text-sm">
                              {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer đơn */}
                    <div className="p-4 bg-gray-50/40 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="text-xs text-gray-500 flex items-center gap-1.5">
                        <MapPin size={13} className="text-gray-400 shrink-0" />
                        <span className="truncate max-w-md">{order.shippingAddress}</span>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                        <div className="text-right">
                          <span className="text-[11px] text-gray-500 block">Tổng thanh toán:</span>
                          <span className="text-base font-bold text-rose-600">
                            {order.total.toLocaleString('vi-VN')}₫
                          </span>
                        </div>

                        <Link
                          to="/contact"
                          className="px-3 py-1.5 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium text-xs transition-colors"
                        >
                          Hỗ trợ
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
