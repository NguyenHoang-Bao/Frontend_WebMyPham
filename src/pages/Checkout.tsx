import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  MapPin, 
  CreditCard, 
  QrCode, 
  ChevronRight, 
  ArrowLeft, 
  Truck, 
  ShieldCheck, 
  Copy, 
  Check, 
  Clock, 
  ExternalLink, 
  ShoppingBag, 
  Ticket 
} from 'lucide-react';
import { CartContext } from '../context/CartContext';

// Kiểu dữ liệu giỏ hàng
interface CartItem {
  cartItemId: string;
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}

interface CartContextType {
  cart: CartItem[];
  clearCart: () => void;
}

// Thông tin ngân hàng nhận thanh toán (Chuẩn VietQR)
const BANK_CONFIG = {
  bankId: 'MB', // MB Bank
  bankName: 'MB Bank (Ngân hàng Quân Đội)',
  accountNo: '0359490221',
  accountName: 'NGUYEN HOANG BAO',
};

// Danh sách mã Voucher có thể dùng
const AVAILABLE_VOUCHERS = [
  { code: 'MEGA30K', discount: 30000, minOrder: 299000, desc: 'Giảm 30.000₫ cho đơn từ 299K' },
  { code: 'BEAUTY50K', discount: 50000, minOrder: 499000, desc: 'Giảm 50.000₫ cho đơn từ 499K' },
  { code: 'VIP100K', discount: 100000, minOrder: 899000, desc: 'Giảm 100.000₫ cho đơn từ 899K' },
  { code: 'FREESHIP', discountType: 'shipping', minOrder: 199000, desc: 'Miễn phí giao hàng toàn quốc' }
];

const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/hb22fnuq/image/upload';
const DEFAULT_PLACEHOLDER = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80&auto=format&fit=crop';

const getImageUrl = (path: string) => {
  if (!path) return DEFAULT_PLACEHOLDER;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.includes('assets/')) {
    try {
      return new URL(path, import.meta.url).href;
    } catch {
      return DEFAULT_PLACEHOLDER;
    }
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${CLOUDINARY_BASE_URL}/${cleanPath}`;
};

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useContext(CartContext) as CartContextType;

  // Bước hiện tại: 1 - Thông tin, 2 - Vận chuyển & Thanh toán, 3 - Hoàn tất & QR
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form Thông tin giao hàng (Bước 1)
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    phone: '',
    email: '',
    province: 'Hồ Chí Minh',
    district: '',
    ward: '',
    address: '',
    note: '',
    saveInfo: true
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Lựa chọn vận chuyển & thanh toán (Bước 2)
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'qr_bank' | 'cod' | 'momo'>('qr_bank');

  // Voucher
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<{ code: string; discountAmount: number } | null>(null);
  const [voucherError, setVoucherError] = useState('');

  // Đơn hàng đã tạo (Bước 3)
  const [createdOrder, setCreatedOrder] = useState<any>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);

  // Tự động load thông tin người dùng nếu đã đăng nhập
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const u = JSON.parse(storedUser);
        setShippingInfo(prev => ({
          ...prev,
          fullName: u.name || u.fullName || prev.fullName,
          phone: u.phone || u.phoneNumber || prev.phone,
          email: u.email || prev.email,
          address: u.address || prev.address
        }));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Tính toán tiền hàng
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Phí vận chuyển: Miễn phí nếu đơn >= 500k ở chuẩn, hỏa tốc 50k
  const baseShippingFee = subtotal >= 500000 ? 0 : 30000;
  const shippingFee = shippingMethod === 'express' ? 50000 : baseShippingFee;

  // Giảm giá từ voucher
  let discountAmount = appliedVoucher ? appliedVoucher.discountAmount : 0;
  if (appliedVoucher?.code === 'FREESHIP') {
    discountAmount = shippingFee;
  }

  const finalTotal = Math.max(0, subtotal + shippingFee - discountAmount);

  // Xử lý áp dụng voucher
  const handleApplyVoucher = (codeToApply?: string) => {
    const code = (codeToApply || voucherCode).trim().toUpperCase();
    setVoucherError('');

    if (!code) {
      setVoucherError('Vui lòng nhập mã giảm giá.');
      return;
    }

    const found = AVAILABLE_VOUCHERS.find(v => v.code === code);
    if (!found) {
      setVoucherError('Mã giảm giá không hợp lệ hoặc đã hết hạn.');
      return;
    }

    if (subtotal < found.minOrder) {
      setVoucherError(`Đơn hàng cần tối thiểu ${found.minOrder.toLocaleString('vi-VN')}₫ để dùng mã này.`);
      return;
    }

    let discount = 0;
    if (found.code === 'FREESHIP') {
      discount = shippingFee;
    } else if (found.discount) {
      discount = found.discount;
    }

    setAppliedVoucher({ code: found.code, discountAmount: discount });
    setVoucherCode(found.code);
  };

  const handleRemoveVoucher = () => {
    setAppliedVoucher(null);
    setVoucherCode('');
    setVoucherError('');
  };

  // Kiểm tra hợp lệ form Bước 1
  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    if (!shippingInfo.fullName.trim()) {
      errors.fullName = 'Vui lòng nhập họ và tên người nhận';
    }
    const phoneClean = shippingInfo.phone.trim().replace(/\s+/g, '');
    if (!phoneClean) {
      errors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^(0[3|5|7|8|9])[0-9]{8}$/.test(phoneClean)) {
      errors.phone = 'Số điện thoại không hợp lệ (cần 10 chữ số)';
    }

    if (!shippingInfo.province.trim()) {
      errors.province = 'Vui lòng chọn hoặc nhập Tỉnh/Thành phố';
    }
    if (!shippingInfo.address.trim()) {
      errors.address = 'Vui lòng nhập địa chỉ cụ thể (số nhà, tên đường)';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Tiến sang Bước 2
  const handleProceedToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Xác nhận đặt hàng ở Bước 2 -> Chuyển sang Bước 3
  const handleConfirmOrder = () => {
    if (cart.length === 0) {
      alert('Giỏ hàng của bạn đang trống!');
      return;
    }

    // Sinh mã đơn hàng dạng HBC-XXXXX
    const orderId = `HBC-${Math.floor(10000 + Math.random() * 90000)}`;
    const fullAddress = [
      shippingInfo.address,
      shippingInfo.ward,
      shippingInfo.district,
      shippingInfo.province
    ].filter(Boolean).join(', ');

    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} - ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const paymentMethodText = 
      paymentMethod === 'qr_bank' 
        ? 'Chuyển khoản QR Ngân hàng (VietQR)' 
        : paymentMethod === 'cod' 
          ? 'Thanh toán khi nhận hàng (COD)' 
          : 'Ví điện tử MoMo';

    const newOrder = {
      id: orderId,
      date: formattedDate,
      status: paymentMethod === 'qr_bank' ? 'pending' : 'processing',
      statusText: paymentMethod === 'qr_bank' ? 'Chờ thanh toán QR' : 'Đang chuẩn bị hàng',
      total: finalTotal,
      subtotal,
      shippingFee,
      discountAmount,
      shippingAddress: fullAddress,
      phone: shippingInfo.phone.trim(),
      customerName: shippingInfo.fullName.trim(),
      email: shippingInfo.email.trim(),
      note: shippingInfo.note.trim(),
      paymentMethod: paymentMethodText,
      paymentCode: paymentMethod,
      shippingMethod: shippingMethod === 'express' ? 'Giao hàng hỏa tốc' : 'Giao hàng tiêu chuẩn',
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size || 'Mặc định',
        image: item.image
      }))
    };

    // 1. Lưu vào danh sách đơn của số điện thoại này
    const phoneKey = `orders_${shippingInfo.phone.trim()}`;
    let existingOrders: any[] = [];
    try {
      const saved = localStorage.getItem(phoneKey);
      if (saved) existingOrders = JSON.parse(saved);
    } catch {
      existingOrders = [];
    }
    localStorage.setItem(phoneKey, JSON.stringify([newOrder, ...existingOrders]));

    // 2. Lưu vào danh sách tra cứu chung của toàn sàn (để tra cứu khách vãng lai)
    try {
      const allOrders = JSON.parse(localStorage.getItem('all_placed_orders') || '[]');
      localStorage.setItem('all_placed_orders', JSON.stringify([newOrder, ...allOrders]));
    } catch {
      localStorage.setItem('all_placed_orders', JSON.stringify([newOrder]));
    }

    setCreatedOrder(newOrder);
    clearCart(); // Xóa giỏ hàng
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Copy thông tin chuyển khoản
  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  // Đường link ảnh VietQR tự động
  const qrImageUrl = createdOrder 
    ? `https://img.vietqr.io/image/${BANK_CONFIG.bankId}-${BANK_CONFIG.accountNo}-compact2.png?amount=${createdOrder.total}&addInfo=${createdOrder.id}&accountName=${encodeURIComponent(BANK_CONFIG.accountName)}`
    : '';

  // Khi giỏ hàng trống và chưa tạo đơn thành công
  if (cart.length === 0 && currentStep !== 3) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
          <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Giỏ hàng của bạn đang trống</h2>
          <p className="text-sm text-slate-500 mt-2 mb-6">
            Hãy lựa chọn những sản phẩm mỹ phẩm yêu thích trước khi tiến hành thanh toán nhé!
          </p>
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm transition-colors shadow-sm"
          >
            Khám Phá Sản Phẩm Ngay <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      {/* Header thanh toán & Thanh Stepper 3 bước */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link to="/" className="text-lg font-black tracking-tight text-rose-600">
                BEAUTY STORE
              </Link>
              <span className="text-slate-300">|</span>
              <span className="text-sm font-semibold text-slate-700">Thanh Toán Đơn Hàng</span>
            </div>

            {/* Stepper Navigation */}
            <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm font-medium">
              {/* Bước 1 */}
              <button
                type="button"
                onClick={() => currentStep === 2 && setCurrentStep(1)}
                disabled={currentStep === 3}
                className={`flex items-center gap-1.5 transition-colors ${
                  currentStep === 1 
                    ? 'text-rose-600 font-bold' 
                    : currentStep > 1 
                      ? 'text-emerald-600 cursor-pointer hover:underline' 
                      : 'text-slate-400'
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  currentStep > 1 
                    ? 'bg-emerald-100 text-emerald-600' 
                    : currentStep === 1 
                      ? 'bg-rose-600 text-white font-bold' 
                      : 'bg-slate-200 text-slate-600'
                }`}>
                  {currentStep > 1 ? <Check size={14} /> : '1'}
                </span>
                <span className="hidden sm:inline">1. Thông tin giao hàng</span>
                <span className="sm:hidden">Thông tin</span>
              </button>

              <ChevronRight size={14} className="text-slate-300 shrink-0" />

              {/* Bước 2 */}
              <button
                type="button"
                onClick={() => currentStep === 3 ? null : validateStep1() && setCurrentStep(2)}
                disabled={currentStep === 3 || currentStep < 2}
                className={`flex items-center gap-1.5 transition-colors ${
                  currentStep === 2 
                    ? 'text-rose-600 font-bold' 
                    : currentStep > 2 
                      ? 'text-emerald-600' 
                      : 'text-slate-400 cursor-not-allowed'
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  currentStep > 2 
                    ? 'bg-emerald-100 text-emerald-600' 
                    : currentStep === 2 
                      ? 'bg-rose-600 text-white font-bold' 
                      : 'bg-slate-200 text-slate-500'
                }`}>
                  {currentStep > 2 ? <Check size={14} /> : '2'}
                </span>
                <span className="hidden sm:inline">2. Vận chuyển & Thanh toán</span>
                <span className="sm:hidden">Thanh toán</span>
              </button>

              <ChevronRight size={14} className="text-slate-300 shrink-0" />

              {/* Bước 3 */}
              <div className={`flex items-center gap-1.5 ${
                currentStep === 3 ? 'text-rose-600 font-bold' : 'text-slate-400'
              }`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  currentStep === 3 
                    ? 'bg-rose-600 text-white font-bold' 
                    : 'bg-slate-200 text-slate-500'
                }`}>
                  3
                </span>
                <span className="hidden sm:inline">3. Hoàn tất & QR</span>
                <span className="sm:hidden">Hoàn tất</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* CỘT TRÁI: NỘI DUNG TỪNG BƯỚC */}
          <div className={currentStep === 3 ? "lg:col-span-12" : "lg:col-span-7 xl:col-span-8"}>
            
            {/* ── BƯỚC 1: THÔNG TIN GIAO HÀNG ── */}
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">Thông Tin Giao Hàng</h2>
                      <p className="text-xs text-slate-500">Vui lòng điền địa chỉ để nhận hàng chính xác</p>
                    </div>
                  </div>
                  <Link to="/" className="text-xs text-slate-500 hover:text-rose-600 inline-flex items-center gap-1">
                    <ArrowLeft size={14} /> Quay lại trang chủ
                  </Link>
                </div>

                <form onSubmit={handleProceedToStep2} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Họ và tên */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Họ và tên người nhận <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Nguyễn Văn A"
                        value={shippingInfo.fullName}
                        onChange={(e) => {
                          setShippingInfo({ ...shippingInfo, fullName: e.target.value });
                          if (formErrors.fullName) setFormErrors({ ...formErrors, fullName: '' });
                        }}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                          formErrors.fullName 
                            ? 'border-rose-300 bg-rose-50/30 focus:border-rose-500' 
                            : 'border-slate-200 focus:border-rose-500'
                        }`}
                      />
                      {formErrors.fullName && (
                        <p className="text-rose-500 text-xs mt-1">{formErrors.fullName}</p>
                      )}
                    </div>

                    {/* Số điện thoại */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Số điện thoại <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="0987654321"
                        value={shippingInfo.phone}
                        onChange={(e) => {
                          setShippingInfo({ ...shippingInfo, phone: e.target.value });
                          if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                        }}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                          formErrors.phone 
                            ? 'border-rose-300 bg-rose-50/30 focus:border-rose-500' 
                            : 'border-slate-200 focus:border-rose-500'
                        }`}
                      />
                      {formErrors.phone && (
                        <p className="text-rose-500 text-xs mt-1">{formErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Địa chỉ Email (Nhận thông báo hóa đơn)
                    </label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-rose-500 transition-colors"
                    />
                  </div>

                  {/* Địa chỉ: Tỉnh/TP, Quận/Huyện, Phường/Xã */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Tỉnh / Thành phố <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={shippingInfo.province}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, province: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-rose-500 bg-white"
                      >
                        <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
                        <option value="Hà Nội">Hà Nội</option>
                        <option value="Đà Nẵng">Đà Nẵng</option>
                        <option value="Cần Thơ">Cần Thơ</option>
                        <option value="Hải Phòng">Hải Phòng</option>
                        <option value="Bình Dương">Bình Dương</option>
                        <option value="Đồng Nai">Đồng Nai</option>
                        <option value="Khác">Tỉnh / Thành khác</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Quận / Huyện
                      </label>
                      <input
                        type="text"
                        placeholder="VD: Quận 1, Cầu Giấy..."
                        value={shippingInfo.district}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, district: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-rose-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Phường / Xã
                      </label>
                      <input
                        type="text"
                        placeholder="VD: Phường Bến Nghé..."
                        value={shippingInfo.ward}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, ward: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  </div>

                  {/* Địa chỉ chi tiết */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Địa chỉ cụ thể (Số nhà, tên đường, tòa nhà) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Số 140 Lê Trọng Tấn, P. Tây Thạnh"
                      value={shippingInfo.address}
                      onChange={(e) => {
                        setShippingInfo({ ...shippingInfo, address: e.target.value });
                        if (formErrors.address) setFormErrors({ ...formErrors, address: '' });
                      }}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                        formErrors.address 
                          ? 'border-rose-300 bg-rose-50/30 focus:border-rose-500' 
                          : 'border-slate-200 focus:border-rose-500'
                      }`}
                    />
                    {formErrors.address && (
                      <p className="text-rose-500 text-xs mt-1">{formErrors.address}</p>
                    )}
                  </div>

                  {/* Ghi chú */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Ghi chú đơn hàng (Tùy chọn)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi giao 15 phút..."
                      value={shippingInfo.note}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, note: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-rose-500 transition-colors"
                    />
                  </div>

                  {/* Lưu thông tin */}
                  <div className="pt-2">
                    <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-slate-600 select-none">
                      <input
                        type="checkbox"
                        checked={shippingInfo.saveInfo}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, saveInfo: e.target.checked })}
                        className="rounded border-slate-300 text-rose-600 focus:ring-rose-500 w-4 h-4"
                      />
                      <span>Lưu thông tin giao hàng này cho những đơn đặt tiếp theo</span>
                    </label>
                  </div>

                  {/* Nút hành động */}
                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Tiếp Tục: Chọn Phương Thức Thanh Toán <ChevronRight size={16} />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ── BƯỚC 2: VẬN CHUYỂN & THANH TOÁN ── */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Khối Phương thức vận chuyển */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-slate-100">
                    <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                      <Truck size={20} />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">1. Chọn Phương Thức Vận Chuyển</h2>
                      <p className="text-xs text-slate-500">Đơn vị vận chuyển liên kết toàn quốc</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Tiêu chuẩn */}
                    <div
                      onClick={() => setShippingMethod('standard')}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                        shippingMethod === 'standard'
                          ? 'border-rose-500 bg-rose-50/20 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-bold text-sm text-slate-900">Giao hàng Tiêu Chuẩn</p>
                          <p className="text-xs text-slate-500 mt-1">Nhận sau 2 - 3 ngày làm việc</p>
                        </div>
                        <input
                          type="radio"
                          checked={shippingMethod === 'standard'}
                          onChange={() => setShippingMethod('standard')}
                          className="mt-1 text-rose-600 focus:ring-rose-500"
                        />
                      </div>
                      <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500">Phí giao hàng:</span>
                        <span className="font-bold text-slate-900">
                          {baseShippingFee === 0 ? (
                            <span className="text-emerald-600 font-bold">MIỄN PHÍ</span>
                          ) : (
                            `${baseShippingFee.toLocaleString('vi-VN')}₫`
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Hỏa tốc */}
                    <div
                      onClick={() => setShippingMethod('express')}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                        shippingMethod === 'express'
                          ? 'border-rose-500 bg-rose-50/20 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="font-bold text-sm text-slate-900">Giao Hỏa Tốc 2H</p>
                            <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold">Nội thành</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">Giao ngay trong 2 - 4 giờ</p>
                        </div>
                        <input
                          type="radio"
                          checked={shippingMethod === 'express'}
                          onChange={() => setShippingMethod('express')}
                          className="mt-1 text-rose-600 focus:ring-rose-500"
                        />
                      </div>
                      <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500">Phí giao hàng:</span>
                        <span className="font-bold text-slate-900">50.000₫</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Khối Phương thức thanh toán */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-slate-100">
                    <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                      <CreditCard size={20} />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">2. Chọn Hình Thức Thanh Toán</h2>
                      <p className="text-xs text-slate-500">Bảo mật thông tin thanh toán 100%</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Chuyển khoản QR Ngân hàng (VietQR) */}
                    <div
                      onClick={() => setPaymentMethod('qr_bank')}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'qr_bank'
                          ? 'border-rose-500 bg-rose-50/20 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                            <QrCode size={22} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-sm text-slate-900">Chuyển khoản QR Ngân Hàng (VietQR 24/7)</p>
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-600">
                                Khuyên dùng
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                              Tự động tạo mã QR chính xác số tiền & nội dung đơn ở bước tiếp theo. Quét được từ tất cả ngân hàng.
                            </p>
                          </div>
                        </div>
                        <input
                          type="radio"
                          checked={paymentMethod === 'qr_bank'}
                          onChange={() => setPaymentMethod('qr_bank')}
                          className="mt-1 text-rose-600 focus:ring-rose-500"
                        />
                      </div>

                      {paymentMethod === 'qr_bank' && (
                        <div className="mt-3.5 pt-3 border-t border-rose-100 text-xs text-slate-600 bg-white/70 p-3 rounded-lg flex items-center gap-2">
                          <QrCode size={16} className="text-rose-500 shrink-0" />
                          <span>Mã QR cá nhân hóa sẽ hiển thị ngay khi bạn ấn Xác Nhận Đặt Hàng.</span>
                        </div>
                      )}
                    </div>

                    {/* Thanh toán khi nhận hàng (COD) */}
                    <div
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-rose-500 bg-rose-50/20 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                            <Truck size={22} />
                          </div>
                          <div>
                            <p className="font-bold text-sm text-slate-900">Thanh toán khi nhận hàng (COD)</p>
                            <p className="text-xs text-slate-500 mt-1">
                              Kiểm tra hàng trước khi thanh toán bằng tiền mặt cho shipper
                            </p>
                          </div>
                        </div>
                        <input
                          type="radio"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                          className="mt-1 text-rose-600 focus:ring-rose-500"
                        />
                      </div>
                    </div>

                    {/* Ví điện tử MoMo */}
                    <div
                      onClick={() => setPaymentMethod('momo')}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'momo'
                          ? 'border-rose-500 bg-rose-50/20 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-pink-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                            MoMo
                          </div>
                          <div>
                            <p className="font-bold text-sm text-slate-900">Ví Điện Tử MoMo</p>
                            <p className="text-xs text-slate-500 mt-1">
                              Quét mã qua ứng dụng ví điện tử MoMo tiện lợi
                            </p>
                          </div>
                        </div>
                        <input
                          type="radio"
                          checked={paymentMethod === 'momo'}
                          onChange={() => setPaymentMethod('momo')}
                          className="mt-1 text-rose-600 focus:ring-rose-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Nút hành động */}
                <div className="flex items-center justify-between gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-3 rounded-xl border border-slate-200 hover:bg-slate-100 font-semibold text-xs text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft size={16} /> Quay lại thông tin
                  </button>

                  <button
                    type="button"
                    onClick={handleConfirmOrder}
                    className="px-8 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    Xác Nhận Đặt Hàng <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* ── BƯỚC 3: HOÀN TẤT & TẠO MÃ QR THANH TOÁN ── */}
            {currentStep === 3 && createdOrder && (
              <div className="max-w-3xl mx-auto space-y-6 animate-in zoom-in-95 duration-300">
                {/* Banner chúc mừng thành công */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-200 shadow-sm text-center">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={36} />
                  </div>
                  <h1 className="text-2xl font-black text-slate-900">Đặt Hàng Thành Công!</h1>
                  <p className="text-sm text-slate-600 mt-1">
                    Cảm ơn bạn đã tin tưởng mua sắm mỹ phẩm tại Beauty Store.
                  </p>
                  <div className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold">
                    <span>Mã đơn hàng:</span>
                    <strong className="text-rose-600 font-mono text-sm">{createdOrder.id}</strong>
                    <button 
                      onClick={() => handleCopy(createdOrder.id, 'orderId')}
                      className="text-slate-400 hover:text-slate-700"
                      title="Sao chép mã"
                    >
                      {copiedField === 'orderId' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>

                {/* NẾU LÀ PHƯƠNG THỨC CHUYỂN KHOẢN QR */}
                {createdOrder.paymentCode === 'qr_bank' && (
                  <div className="bg-white rounded-2xl p-6 sm:p-8 border border-rose-200 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-rose-500 to-pink-500 text-white text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider">
                      VietQR 24/7 Tự Động
                    </div>

                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2.5 rounded-xl bg-pink-50 text-pink-600">
                        <QrCode size={24} />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-slate-900">Quét Mã QR Để Thanh Toán</h2>
                        <p className="text-xs text-slate-500">Mở ứng dụng ngân hàng và quét mã bên dưới</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                      {/* Ảnh QR VietQR động */}
                      <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-200">
                        <div className="bg-white p-2.5 rounded-xl shadow-xs border border-slate-200 max-w-[240px]">
                          <img
                            src={qrImageUrl}
                            alt="VietQR Payment"
                            className="w-full h-auto object-contain rounded-lg"
                          />
                        </div>
                        <span className="text-[11px] text-slate-400 mt-2 flex items-center gap-1 font-medium">
                          ⚡ Tự động điền số tiền & nội dung
                        </span>
                      </div>

                      {/* Chi tiết tài khoản kèm nút Sao chép */}
                      <div className="md:col-span-7 space-y-3 text-xs sm:text-sm">
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
                            <span>Ngân hàng thụ hưởng</span>
                          </div>
                          <p className="font-bold text-slate-900">{BANK_CONFIG.bankName}</p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                          <div>
                            <span className="text-slate-500 text-xs block mb-1">Số tài khoản</span>
                            <span className="font-mono font-black text-base text-slate-900 tracking-wider">
                              {BANK_CONFIG.accountNo}
                            </span>
                          </div>
                          <button
                            onClick={() => handleCopy(BANK_CONFIG.accountNo, 'accNo')}
                            className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 flex items-center gap-1 transition-colors shadow-xs"
                          >
                            {copiedField === 'accNo' ? (
                              <>
                                <Check size={14} className="text-emerald-500" /> Đã chép
                              </>
                            ) : (
                              <>
                                <Copy size={14} /> Sao chép
                              </>
                            )}
                          </button>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-slate-500 text-xs block mb-1">Chủ tài khoản</span>
                          <span className="font-bold text-slate-900 uppercase">
                            {BANK_CONFIG.accountName}
                          </span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200 flex items-center justify-between">
                          <div>
                            <span className="text-slate-600 text-xs block mb-1">Số tiền thanh toán</span>
                            <span className="font-bold text-lg text-rose-600">
                              {createdOrder.total.toLocaleString('vi-VN')}₫
                            </span>
                          </div>
                          <button
                            onClick={() => handleCopy(String(createdOrder.total), 'amount')}
                            className="px-3 py-1.5 rounded-lg bg-white border border-rose-200 hover:bg-rose-50 text-xs font-semibold text-rose-700 flex items-center gap-1 transition-colors shadow-xs"
                          >
                            {copiedField === 'amount' ? (
                              <>
                                <Check size={14} className="text-emerald-500" /> Đã chép
                              </>
                            ) : (
                              <>
                                <Copy size={14} /> Sao chép
                              </>
                            )}
                          </button>
                        </div>

                        <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 flex items-center justify-between">
                          <div>
                            <span className="text-slate-600 text-xs block mb-1">
                              Nội dung chuyển khoản (Bắt buộc ghi đúng)
                            </span>
                            <span className="font-mono font-bold text-sm text-slate-900">
                              {createdOrder.id}
                            </span>
                          </div>
                          <button
                            onClick={() => handleCopy(createdOrder.id, 'content')}
                            className="px-3 py-1.5 rounded-lg bg-white border border-amber-200 hover:bg-amber-50 text-xs font-semibold text-amber-800 flex items-center gap-1 transition-colors shadow-xs"
                          >
                            {copiedField === 'content' ? (
                              <>
                                <Check size={14} className="text-emerald-500" /> Đã chép
                              </>
                            ) : (
                              <>
                                <Copy size={14} /> Sao chép
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Hướng dẫn thanh toán */}
                    <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs text-slate-600">
                      <div className="p-3 bg-slate-50 rounded-xl">
                        <span className="w-5 h-5 bg-rose-100 text-rose-600 font-bold rounded-full inline-flex items-center justify-center mb-1">1</span>
                        <p className="font-medium">Mở App Ngân Hàng bất kỳ trên điện thoại</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl">
                        <span className="w-5 h-5 bg-rose-100 text-rose-600 font-bold rounded-full inline-flex items-center justify-center mb-1">2</span>
                        <p className="font-medium">Chọn tính năng "Quét mã QR" và chiếu camera</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl">
                        <span className="w-5 h-5 bg-rose-100 text-rose-600 font-bold rounded-full inline-flex items-center justify-center mb-1">3</span>
                        <p className="font-medium">Kiểm tra thông tin tiền & xác nhận thanh toán</p>
                      </div>
                    </div>

                    {/* Nút xác nhận đã chuyển khoản */}
                    <div className="mt-6 text-center">
                      {!isPaymentConfirmed ? (
                        <button
                          type="button"
                          onClick={() => setIsPaymentConfirmed(true)}
                          className="w-full sm:w-auto px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-md cursor-pointer inline-flex items-center justify-center gap-2"
                        >
                          <Check size={18} /> Tôi Đã Chuyển Khoản Thành Công
                        </button>
                      ) : (
                        <div className="inline-flex items-center gap-2 p-3 bg-emerald-50 text-emerald-700 rounded-xl font-medium text-xs border border-emerald-200">
                          <CheckCircle2 size={16} /> Đã ghi nhận! Nhân viên sẽ đối soát và gửi hàng trong thời gian sớm nhất.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* NẾU LÀ COD */}
                {createdOrder.paymentCode === 'cod' && (
                  <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm text-center">
                    <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Truck size={24} />
                    </div>
                    <h2 className="text-base font-bold text-slate-900">Thanh Toán Khi Nhận Hàng (COD)</h2>
                    <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-4">
                      Bạn sẽ thanh toán số tiền <strong className="text-rose-600">{createdOrder.total.toLocaleString('vi-VN')}₫</strong> bằng tiền mặt cho shipper khi nhận hàng.
                    </p>
                    <div className="p-3.5 bg-slate-50 rounded-xl max-w-md mx-auto text-xs text-slate-600 text-left border border-slate-200">
                      <p className="font-semibold text-slate-800 mb-1">📦 Lưu ý giao nhận:</p>
                      <ul className="list-disc list-inside space-y-1 text-slate-500">
                        <li>Bạn được đồng kiểm ngoại quan sản phẩm trước khi nhận.</li>
                        <li>Nhân viên sẽ liên hệ số điện thoại {createdOrder.phone} trước khi giao.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* NẾU LÀ MOMO */}
                {createdOrder.paymentCode === 'momo' && (
                  <div className="bg-white rounded-2xl p-6 sm:p-8 border border-pink-200 shadow-sm text-center">
                    <div className="w-12 h-12 bg-pink-500 text-white font-black text-sm rounded-full flex items-center justify-center mx-auto mb-3">
                      MoMo
                    </div>
                    <h2 className="text-base font-bold text-slate-900">Thanh Toán Qua Ví Điện Tử MoMo</h2>
                    <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-4">
                      Vui lòng mở ứng dụng MoMo và chuyển số tiền <strong className="text-rose-600">{createdOrder.total.toLocaleString('vi-VN')}₫</strong> tới SĐT <strong className="text-slate-800">{BANK_CONFIG.accountNo}</strong> kèm nội dung <strong className="text-rose-600">{createdOrder.id}</strong>.
                    </p>
                  </div>
                )}

                {/* THÔNG TIN CHI TIẾT ĐƠN HÀNG */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                    Chi Tiết Đơn Hàng #{createdOrder.id}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-6">
                    <div>
                      <p className="text-slate-400">Người nhận:</p>
                      <p className="font-bold text-slate-800 mt-0.5">{createdOrder.customerName} - {createdOrder.phone}</p>
                      <p className="text-slate-500 mt-1">{createdOrder.shippingAddress}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Thời gian đặt:</p>
                      <p className="font-bold text-slate-800 mt-0.5">{createdOrder.date}</p>
                      <p className="text-slate-500 mt-1">Phương thức: {createdOrder.paymentMethod}</p>
                    </div>
                  </div>

                  {/* Danh sách sản phẩm trong đơn */}
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    {createdOrder.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between text-xs py-1">
                        <div className="flex items-center gap-3">
                          <img
                            src={getImageUrl(item.image)}
                            alt={item.name}
                            className="w-10 h-10 object-cover rounded-lg border border-slate-200 shrink-0 bg-slate-50"
                            onError={(e) => {
                              const target = e.currentTarget;
                              target.onerror = null;
                              target.src = DEFAULT_PLACEHOLDER;
                            }}
                          />
                          <div>
                            <p className="font-semibold text-slate-800 line-clamp-1">{item.name}</p>
                            <span className="text-slate-400">SL: x{item.quantity}</span>
                          </div>
                        </div>
                        <span className="font-bold text-slate-800">
                          {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tổng kết tiền */}
                  <div className="pt-4 mt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Tạm tính:</span>
                      <span>{createdOrder.subtotal.toLocaleString('vi-VN')}₫</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phí vận chuyển:</span>
                      <span>{createdOrder.shippingFee === 0 ? 'Miễn phí' : `${createdOrder.shippingFee.toLocaleString('vi-VN')}₫`}</span>
                    </div>
                    {createdOrder.discountAmount > 0 && (
                      <div className="flex justify-between text-rose-600">
                        <span>Giảm giá Voucher:</span>
                        <span>-{createdOrder.discountAmount.toLocaleString('vi-VN')}₫</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-100">
                      <span>Tổng thanh toán:</span>
                      <span className="text-rose-600 text-base">{createdOrder.total.toLocaleString('vi-VN')}₫</span>
                    </div>
                  </div>
                </div>

                {/* Nút điều hướng sau khi xong */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <Link
                    to="/order-tracking"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <ExternalLink size={15} /> Tra Cứu & Theo Dõi Đơn Hàng
                  </Link>

                  <Link
                    to="/products"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    Tiếp Tục Mua Sắm
                  </Link>
                </div>
              </div>
            )}

          </div>

          {/* CỘT PHẢI: TÓM TẮT GIỎ HÀNG & TIỀN THANH TOÁN (Ẩn ở Bước 3 để tập trung QR) */}
          {currentStep !== 3 && (
            <div className="lg:col-span-5 xl:col-span-4 space-y-4">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm sticky top-24">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                  <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
                    Đơn Hàng ({cart.reduce((s, i) => s + i.quantity, 0)} món)
                  </h3>
                  <Link to="/products" className="text-xs text-rose-600 hover:underline">
                    Thêm món khác
                  </Link>
                </div>

                {/* Danh sách món hàng */}
                <div className="max-h-64 overflow-y-auto space-y-3 pr-1 divide-y divide-slate-100 scrollbar-thin">
                  {cart.map(item => (
                    <div key={item.cartItemId} className="flex gap-3 pt-3 first:pt-0">
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.name}
                        className="w-14 h-16 object-cover rounded-lg border border-slate-100 shrink-0 bg-slate-50"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.onerror = null;
                          target.src = DEFAULT_PLACEHOLDER;
                        }}
                      />
                      <div className="flex-grow flex flex-col justify-between text-xs">
                        <div>
                          <p className="font-semibold text-slate-800 line-clamp-1">{item.name}</p>
                          {item.size && <p className="text-slate-400 mt-0.5 text-[11px]">Loại: {item.size}</p>}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-slate-500 font-medium">SL: x{item.quantity}</span>
                          <span className="font-bold text-rose-600">
                            {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Khối Nhập Voucher */}
                <div className="pt-4 mt-4 border-t border-slate-100">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Mã Giảm Giá / Voucher
                  </label>
                  
                  {appliedVoucher ? (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                        <Check size={15} />
                        <span>Đã dùng: {appliedVoucher.code}</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveVoucher}
                        className="text-slate-400 hover:text-rose-600 font-bold text-xs cursor-pointer"
                      >
                        Bỏ chọn
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Nhập mã (VD: MEGA30K)"
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                        className="flex-grow px-3 py-2 rounded-xl border border-slate-200 text-xs uppercase focus:outline-none focus:border-rose-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleApplyVoucher()}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors shrink-0 cursor-pointer"
                      >
                        Áp Dụng
                      </button>
                    </div>
                  )}

                  {voucherError && (
                    <p className="text-rose-500 text-[11px] mt-1.5">{voucherError}</p>
                  )}

                  {/* Gợi ý mã có sẵn */}
                  {!appliedVoucher && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {AVAILABLE_VOUCHERS.map(v => (
                        <button
                          key={v.code}
                          type="button"
                          onClick={() => handleApplyVoucher(v.code)}
                          className="text-[10px] px-2 py-1 rounded-md border border-dashed border-rose-300 text-rose-600 hover:bg-rose-50 font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Ticket size={11} /> {v.code}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tính tổng tiền */}
                <div className="pt-4 mt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Tạm tính</span>
                    <span className="font-medium text-slate-900">{subtotal.toLocaleString('vi-VN')}₫</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí vận chuyển</span>
                    <span className="font-medium text-slate-900">
                      {shippingFee === 0 ? (
                        <span className="text-emerald-600 font-bold">Miễn phí</span>
                      ) : (
                        `${shippingFee.toLocaleString('vi-VN')}₫`
                      )}
                    </span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-rose-600">
                      <span>Giảm giá</span>
                      <span className="font-bold">-{discountAmount.toLocaleString('vi-VN')}₫</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-slate-900">Tổng thanh toán:</span>
                    <span className="text-xl font-black text-rose-600">
                      {finalTotal.toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                </div>

                {/* Cam kết / Bảo đảm an toàn */}
                <div className="mt-6 pt-4 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                    <span>Cam kết 100% mỹ phẩm chính hãng có tem phụ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-blue-600 shrink-0" />
                    <span>Đổi trả miễn phí trong vòng 7 ngày nếu lỗi</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

