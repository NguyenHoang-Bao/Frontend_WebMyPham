import { useState, useEffect, useContext, FormEvent } from 'react';
import { Menu, Search, User, ShoppingBag, X, ChevronDown, LogOut } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../../context/CartContext'; 
import logo from '../../assets/img/Navbar/logo.png';
import { useTranslation } from 'react-i18next'; 

// Định nghĩa các interface
interface CartItem {
  quantity: number;
  [key: string]: any; 
}

interface UserData {
  name: string;
  [key: string]: any;
}

interface CartContextType {
  cart: CartItem[];
  openCart: () => void;
  [key: string]: any;
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  
  const [searchQuery, setSearchQuery] = useState(''); 
  
  const { cart, openCart } = useContext(CartContext) as CartContextType;
  const totalItemsInCart = cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Khởi tạo i18n
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'vi';

  // Thêm mảng này để quản lý Dropdown dễ hơn
  const languages = [
    { code: 'vi', label: 'VN', name: 'Tiếng Việt', flag: 'https://flagcdn.com/w40/vn.png' },
    { code: 'en', label: 'EN', name: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
    { code: 'zh', label: 'ZH', name: '中文', flag: 'https://flagcdn.com/w40/cn.png' },
  ];
  
  // Tìm ngôn ngữ hiện tại để hiển thị ra ngoài
  const activeLang = languages.find(l => currentLang.startsWith(l.code)) || languages[0];
  
  // Hàm đổi ngôn ngữ
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
      } catch (error) {
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
    // Đóng menu mobile khi chuyển trang
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    alert(t('navbar.logout_success', 'Đăng xuất thành công!'));
    navigate('/');
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm transition-all duration-300">
      {/* ================= TẦNG 1: MAIN HEADER ================= */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 md:gap-8">
          
          <button 
            className="lg:hidden text-gray-700 hover:text-pink-500 transition-colors" 
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              if (isMobileMenuOpen) setOpenDropdown(null);
            }}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="logo" className='w-32 md:w-40 h-auto object-contain' />
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl relative">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('navbar.search_placeholder')} 
              className="w-full border-2 border-pink-500 rounded-full py-2.5 pl-5 pr-14 text-sm focus:outline-none focus:ring-4 focus:ring-pink-100 transition-all text-gray-700"
            />
            <button type="submit" className="absolute right-0 top-0 h-full px-5 bg-pink-500 hover:bg-pink-600 text-white rounded-r-full transition-colors flex items-center justify-center">
              <Search size={18} />
            </button>
          </form>

          {/* Icons & Ngôn ngữ */}
          <div className="flex items-center gap-4 md:gap-6">
            
            {/* Dropdown Ngôn ngữ (Desktop) - ĐÃ FIX LỖI HOVER */}
            <div className="relative group hidden md:block z-50">
              <button className="flex items-center gap-2 bg-pink-50 border border-pink-100 px-3 py-1.5 rounded-full hover:bg-pink-100 transition-colors">
                <img src={activeLang.flag} alt={activeLang.label} className="w-5 h-4 object-cover rounded-sm" />
                <span className="text-sm font-bold text-pink-600">{activeLang.label}</span>
                <ChevronDown size={14} className="text-pink-500 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              
              {/* Thêm cầu nối tàng hình pt-2 ở đây */}
              <div className="absolute hidden group-hover:block top-full right-0 pt-2 w-36 z-50">
                <div className="bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden p-1">
                  <ul className="space-y-1">
                    {languages.map((lang) => (
                      <li key={lang.code}>
                        <button
                          onClick={() => changeLanguage(lang.code)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${currentLang.startsWith(lang.code) ? 'bg-pink-50 text-pink-600 font-bold' : 'text-gray-600 hover:bg-pink-50 hover:text-pink-500'}`}
                        >
                          <img src={lang.flag} alt={lang.name} className="w-5 h-4 object-cover rounded-sm shadow-sm" />
                          <span className="text-sm">{lang.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Dropdown Tài khoản (Desktop) - ĐÃ FIX LỖI HOVER */}
            {currentUser ? (
              <div className="relative group hidden lg:block z-50">
                <Link to="/profile" className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-pink-500 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-pink-50 flex items-center justify-center text-pink-500">
                    <User size={18} />
                  </div>
                  <span className="truncate max-w-[120px]">{currentUser.name}</span>
                </Link>
                
                {/* Thêm cầu nối tàng hình pt-2 ở đây */}
                <div className="absolute hidden group-hover:block top-full right-0 pt-2 w-48 z-50">
                  <div className="bg-white p-3 text-left border border-gray-100 rounded-xl shadow-xl">
                    <ul className="text-sm space-y-1">
                      <li><Link to="/profile" className="block px-3 py-2 text-gray-600 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors">{t('navbar.my_account')}</Link></li>
                      <li><Link to="/profile" className="block px-3 py-2 text-gray-600 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors">{t('navbar.my_orders')}</Link></li>
                      <li><button onClick={handleLogout} className="w-full text-left px-3 py-2 text-red-500 hover:bg-red-50 rounded-md transition-colors flex items-center gap-2"><LogOut size={16} /> {t('navbar.logout')}</button></li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-2 text-sm font-medium text-gray-600 uppercase">
                <Link to="/login" className="hover:text-pink-500 transition-colors">{t('navbar.login')}</Link>
                <span className="text-gray-300">|</span>
                <Link to="/register" className="hover:text-pink-500 transition-colors">{t('navbar.register')}</Link>
              </div>
            )}

            <button onClick={openCart} className="relative text-gray-700 hover:text-pink-500 transition-colors p-1" aria-label="Shopping Bag">
              <ShoppingBag size={24} />
              {totalItemsInCart > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[11px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                  {totalItemsInCart}
                </span>
              )}
            </button>
          </div>
        </div>
        
        <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="relative w-full">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('navbar.search_mobile_placeholder', 'Tìm kiếm...')} 
                className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-12 text-sm focus:outline-none focus:border-pink-500 text-gray-700"
              />
              <button type="submit" className="absolute right-0 top-0 h-full px-4 text-gray-400 hover:text-pink-500">
                <Search size={18} />
              </button>
            </form>
        </div>
      </div>

      {/* ================= TẦNG 2: NAVIGATION MENU (DESKTOP) ================= */}
      <nav className="hidden lg:block border-t border-gray-100 bg-white">
        <div className="container mx-auto px-8">
          <ul className="flex items-center justify-center gap-10 py-4 text-[14px] font-bold text-gray-700 uppercase tracking-wider">
            <li><Link to="/" className="hover:text-pink-500 transition-colors">{t('navbar.home')}</Link></li>
            
            <li>
              <Link to="/sale" className="text-pink-600 hover:text-pink-700 flex items-center gap-1">
                {t('navbar.sale')}
              </Link>
            </li>

            <li><Link to="/products" className="hover:text-pink-500 transition-colors">{t('navbar.products')}</Link></li>
            <li><Link to="/tips" className="hover:text-pink-500 transition-colors">{t('navbar.tips')}</Link></li>
            <li><Link to="/contact" className="hover:text-pink-500 transition-colors">{t('navbar.order_tracking')}</Link></li>
            <li><Link to="/contact" className="hover:text-pink-500 transition-colors">{t('navbar.contact')}</Link></li>
          </ul>
        </div>
      </nav>

      {/* ================= TẦNG MENU MOBILE ================= */}
      <div className={`
        fixed inset-0 top-[125px] bg-white z-40 lg:hidden overflow-y-auto transition-transform duration-300 ease-in-out origin-top
        ${isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}
      `}>
        <div className="p-4 space-y-2 text-gray-800 font-bold uppercase tracking-wider text-sm pb-20">
          
          {/* Dropdown Ngôn ngữ (Mobile) */}
          <div className="mb-4 border-b border-gray-100 pb-2">
            <button 
              onClick={() => setOpenDropdown(openDropdown === 'lang' ? null : 'lang')}
              className="w-full flex items-center justify-between py-3 px-4 rounded-lg bg-pink-50 text-pink-600 font-bold uppercase"
            >
              <div className="flex items-center gap-2">
                <img src={activeLang.flag} alt={activeLang.label} className="w-5 h-4 object-cover rounded-sm shadow-sm" />
                Ngôn ngữ: {activeLang.name}
              </div>
              <ChevronDown size={18} className={`transition-transform duration-300 ${openDropdown === 'lang' ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openDropdown === 'lang' ? 'max-h-48 mt-2' : 'max-h-0'}`}>
              <ul className="px-4 py-2 space-y-1 bg-white rounded-lg border border-gray-50 shadow-inner">
                {languages.map((lang) => (
                  <li key={lang.code}>
                    <button
                      onClick={() => { changeLanguage(lang.code); setOpenDropdown(null); setIsMobileMenuOpen(false); }}
                      className={`w-full flex items-center gap-3 py-3 px-2 rounded-md transition-colors ${currentLang.startsWith(lang.code) ? 'text-pink-600 font-bold bg-pink-50/50' : 'text-gray-600 hover:text-pink-500 hover:bg-pink-50'}`}
                    >
                      <img src={lang.flag} alt={lang.name} className="w-6 h-4 object-cover rounded-sm shadow-sm" />
                      <span className="text-sm">{lang.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link to="/" className="block py-3 px-4 rounded-lg hover:bg-pink-50 hover:text-pink-600">{t('navbar.home')}</Link>
          <Link to="/sale" className="block py-3 px-4 rounded-lg text-pink-600 bg-pink-50">{t('navbar.sale')}</Link>
          <Link to="/products" className="block py-3 px-4 rounded-lg hover:bg-pink-50 hover:text-pink-600">{t('navbar.products')}</Link>
          <Link to="/tips" className="block py-3 px-4 rounded-lg hover:bg-pink-50 hover:text-pink-600">{t('navbar.tips')}</Link>
          
          <div>
            <button 
              onClick={() => setOpenDropdown(openDropdown === 'ao' ? null : 'ao')}
              className="w-full flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-50 uppercase"
            >
              {t('navbar.shirt')} <ChevronDown size={18} className={`transition-transform duration-300 ${openDropdown === 'ao' ? 'rotate-180 text-pink-500' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openDropdown === 'ao' ? 'max-h-48' : 'max-h-0'}`}>
              <ul className="pl-8 pr-4 py-2 space-y-2 text-gray-600 bg-gray-50 rounded-b-lg font-medium text-xs">
                <li><Link to="/products?cat=ao-khoac" className="block py-2 hover:text-pink-500">{t('navbar.jacket')}</Link></li>
                <li><Link to="/products?cat=ao-thun" className="block py-2 hover:text-pink-500">{t('navbar.tshirt')}</Link></li>
                <li><Link to="/products?cat=ao-polo" className="block py-2 hover:text-pink-500">{t('navbar.polo')}</Link></li>
                <li><Link to="/products?cat=ao-so-mi" className="block py-2 hover:text-pink-500">{t('navbar.shirt_long')}</Link></li>
              </ul>
            </div>
          </div>

          <div>
            <button 
              onClick={() => setOpenDropdown(openDropdown === 'quan' ? null : 'quan')}
              className="w-full flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-50 uppercase"
            >
              {t('navbar.pants')} <ChevronDown size={18} className={`transition-transform duration-300 ${openDropdown === 'quan' ? 'rotate-180 text-pink-500' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openDropdown === 'quan' ? 'max-h-48' : 'max-h-0'}`}>
              <ul className="pl-8 pr-4 py-2 space-y-2 text-gray-600 bg-gray-50 rounded-b-lg font-medium text-xs">
                <li><Link to="/products?cat=quan-jean" className="block py-2 hover:text-pink-500">{t('navbar.jeans')}</Link></li>
                <li><Link to="/products?cat=quan-jogger" className="block py-2 hover:text-pink-500">{t('navbar.jogger')}</Link></li>
                <li><Link to="/products?cat=quan-short" className="block py-2 hover:text-pink-500">{t('navbar.short')}</Link></li>
                <li><Link to="/products?cat=quan-tay" className="block py-2 hover:text-pink-500">{t('navbar.trousers')}</Link></li>
              </ul>
            </div>
          </div>

          <Link to="/about" className="block py-3 px-4 rounded-lg hover:bg-pink-50 hover:text-pink-600">{t('navbar.about')}</Link>
          <Link to="/contact" className="block py-3 px-4 rounded-lg hover:bg-pink-50 hover:text-pink-600">{t('navbar.contact')}</Link>

          <div className="border-t border-gray-100 mt-4 pt-4">
            {currentUser ? (
              <>
                <Link to="/profile" className="flex items-center gap-3 py-3 px-4 text-pink-600 font-bold">
                  <User size={20} /> {t('navbar.hello')}, {currentUser.name}
                </Link>
                <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 py-3 px-4 text-red-500 hover:bg-red-50 rounded-lg">
                  <LogOut size={20} /> {t('navbar.logout')}
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 px-4 mt-2">
                <Link to="/login" className="text-center bg-pink-50 text-pink-600 font-bold py-3 rounded-lg">{t('navbar.login')}</Link>
                <Link to="/register" className="text-center bg-gray-100 text-gray-700 font-bold py-3 rounded-lg">{t('navbar.register')}</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}