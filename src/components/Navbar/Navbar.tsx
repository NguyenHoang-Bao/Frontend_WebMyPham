import { useState, useEffect, useContext, FormEvent } from 'react';
import { Menu, Search, User, ShoppingBag, Heart, X, ChevronDown, LogOut } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import logo from '../../assets/img/Navbar/logo.png';
import { useTranslation } from 'react-i18next';

interface CartItem { quantity: number; [key: string]: any; }
interface UserData { name: string; [key: string]: any; }
interface CartContextType { cart: CartItem[]; openCart: () => void; [key: string]: any; }

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { cart, openCart } = useContext(CartContext) as CartContextType;
  const totalItemsInCart = cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);

  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'vi';

  const languages = [
    { code: 'vi', label: 'VN', name: 'Tiếng Việt', flag: 'https://flagcdn.com/w40/vn.png' },
    { code: 'en', label: 'EN', name: 'English',    flag: 'https://flagcdn.com/w40/gb.png' },
    { code: 'zh', label: 'ZH', name: '中文',        flag: 'https://flagcdn.com/w40/cn.png' },
  ];
  const activeLang = languages.find(l => currentLang.startsWith(l.code)) || languages[0];
  const changeLanguage = (lng: string) => i18n.changeLanguage(lng);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    try {
      const u = localStorage.getItem('currentUser');
      setCurrentUser(u ? JSON.parse(u) : null);
    } catch { setCurrentUser(null); }
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
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

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: '/',               label: t('navbar.home') },
    { to: '/products',       label: t('navbar.products') },
    { to: '/tips',           label: t('navbar.tips') },
    { to: '/order-tracking', label: t('navbar.order_tracking') },
    { to: '/contact',        label: t('navbar.contact') },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md shadow-rose-50'
          : 'bg-white shadow-sm shadow-gray-100'
      }`}
    >
      {/* ── MAIN HEADER ── */}
      <div className="border-b border-pink-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 gap-4 md:gap-6">

            {/* Hamburger (mobile) */}
            <button
              className="lg:hidden text-rose-400 hover:text-rose-600 transition-colors p-1"
              onClick={() => { setIsMobileMenuOpen(!isMobileMenuOpen); if (isMobileMenuOpen) setOpenDropdown(null); }}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img src={logo} alt="logo" className="w-28 md:w-36 h-auto object-contain" />
            </Link>

            {/* Search (desktop) */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t('navbar.search_placeholder')}
                className="w-full border border-gray-300 bg-white rounded-md py-2 pl-4 pr-12 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-rose-500 transition-all"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-rose-500 hover:bg-rose-600 text-white rounded-md w-8 h-8 flex items-center justify-center transition-colors shadow-sm"
              >
                <Search size={16} />
              </button>
            </form>

            {/* Icons & Actions */}
            <div className="flex items-center gap-3 md:gap-4">

              {/* Tài khoản (Desktop) */}
              {currentUser ? (
                <div className="relative group hidden lg:block z-50">
                  <Link to="/profile" className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-rose-600 transition-colors">
                    <div className="w-8 h-8 rounded-md bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500">
                      <User size={16} />
                    </div>
                    <span className="truncate max-w-[100px] hidden xl:block">{currentUser.name}</span>
                  </Link>
                  <div className="absolute hidden group-hover:block top-full right-0 pt-2 w-48 z-50">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                      <div className="px-4 py-3 bg-rose-50/50 border-b border-gray-100">
                        <p className="text-xs text-gray-500">Xin chào,</p>
                        <p className="text-sm font-bold text-gray-900 truncate">{currentUser.name}</p>
                      </div>
                      <ul className="p-1.5 space-y-0.5 text-sm">
                        <li><Link to="/profile" className="block px-3 py-2 text-gray-700 hover:bg-rose-50 hover:text-rose-600 rounded-md transition-colors">{t('navbar.my_account')}</Link></li>
                        <li><Link to="/order-tracking" className="block px-3 py-2 text-gray-700 hover:bg-rose-50 hover:text-rose-600 rounded-md transition-colors">{t('navbar.my_orders')}</Link></li>
                        <li className="border-t border-gray-100 pt-1">
                          <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-red-500 hover:bg-red-50 rounded-md transition-colors flex items-center gap-2">
                            <LogOut size={14} /> {t('navbar.logout')}
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="hidden lg:flex items-center gap-3 text-sm font-semibold">
                  <Link to="/login" className="text-gray-700 hover:text-rose-600 transition-colors px-1">
                    {t('navbar.login')}
                  </Link>
                  <span className="text-gray-300">|</span>
                  <Link to="/register" className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md text-xs font-semibold tracking-wide transition-colors shadow-sm">
                    {t('navbar.register')}
                  </Link>
                </div>
              )}

              {/* Wishlist */}
              <button className="text-rose-300 hover:text-rose-500 transition-colors p-1" aria-label="Wishlist">
                <Heart size={22} />
              </button>

              {/* Giỏ hàng */}
              <button onClick={openCart} className="relative text-rose-400 hover:text-rose-600 transition-colors p-1" aria-label="Shopping Bag">
                <ShoppingBag size={22} />
                {totalItemsInCart > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-400 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-sm">
                    {totalItemsInCart}
                  </span>
                )}
              </button>

              {/* Ngôn ngữ (Desktop) */}
              <div className="relative group hidden md:block z-50">
                <button className="flex items-center gap-1.5 bg-white border border-gray-200 hover:bg-rose-50 px-2.5 py-1.5 rounded-md transition-colors">
                  <img src={activeLang.flag} alt={activeLang.label} className="w-4 h-3 object-cover rounded-sm" />
                  <span className="text-xs font-bold text-rose-500">{activeLang.label}</span>
                  <ChevronDown size={11} className="text-rose-400 transition-transform duration-200 group-hover:rotate-180" />
                </button>
                <div className="absolute hidden group-hover:block top-full right-0 pt-2 w-36 z-50">
                  <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden p-1">
                    <ul className="space-y-0.5">
                      {languages.map(lang => (
                        <li key={lang.code}>
                          <button
                            onClick={() => changeLanguage(lang.code)}
                            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors text-sm ${
                              currentLang.startsWith(lang.code) ? 'bg-rose-50 text-rose-500 font-bold' : 'text-gray-500 hover:bg-rose-50 hover:text-rose-400'
                            }`}
                          >
                            <img src={lang.flag} alt={lang.name} className="w-5 h-3.5 object-cover rounded-sm" />
                            <span>{lang.name}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Search (mobile) */}
          <div className="md:hidden pb-3">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full border border-gray-200 bg-white rounded-md py-2 pl-4 pr-10 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-pink-400"
              />
              <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 bg-pink-500 text-white rounded-md w-7 h-7 flex items-center justify-center">
                <Search size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── NAV LINKS DESKTOP ── */}
      <nav className="hidden lg:block bg-white border-b border-gray-100">
        <div className="container mx-auto px-8">
          <ul className="flex items-center justify-center gap-8 text-sm font-semibold text-gray-700">

            <li>
              <Link to="/" className={`block py-3.5 border-b-2 transition-colors ${isActive('/') ? 'border-rose-500 text-rose-500' : 'border-transparent text-gray-700 hover:text-rose-500'}`}>
                {t('navbar.home')}
              </Link>
            </li>

            <li>
              <Link to="/sale" className={`block py-3.5 border-b-2 transition-colors text-rose-500 font-bold ${isActive('/sale') ? 'border-rose-500' : 'border-transparent hover:text-rose-600'}`}>
                ✨ {t('navbar.sale')}
              </Link>
            </li>

            <li>
              <Link to="/products" className={`block py-3.5 border-b-2 transition-colors ${isActive('/products') ? 'border-rose-500 text-rose-500' : 'border-transparent text-gray-700 hover:text-rose-500'}`}>
                {t('navbar.products')}
              </Link>
            </li>

            <li>
              <Link to="/tips" className={`block py-3.5 border-b-2 transition-colors ${isActive('/tips') ? 'border-rose-500 text-rose-500' : 'border-transparent text-gray-700 hover:text-rose-500'}`}>
                {t('navbar.tips')}
              </Link>
            </li>

            <li>
              <Link
                to="/order-tracking"
                className={`block py-3.5 border-b-2 transition-colors ${
                  isActive('/order-tracking')
                    ? 'border-rose-500 text-rose-500 font-semibold'
                    : 'border-transparent text-gray-700 hover:text-rose-500'
                }`}
              >
                {t('navbar.order_tracking')}
              </Link>
            </li>

            <li>
              <Link to="/contact" className="block py-3.5 border-b-2 border-transparent text-gray-700 hover:text-rose-500 transition-colors">
                {t('navbar.contact')}
              </Link>
            </li>

          </ul>
        </div>
      </nav>

      {/* ── MOBILE MENU (SLIDE FROM LEFT) ── */}
      <div
        className={`fixed inset-y-0 left-0 w-80 bg-white z-50 lg:hidden overflow-y-auto shadow-2xl shadow-rose-50 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile menu header */}
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-pink-500 to-rose-400">
          <img src={logo} alt="logo" className="w-28 h-auto object-contain brightness-0 invert" />
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-pink-100 transition-colors">
            <X size={22} />
          </button>
        </div>

        <div className="p-4 space-y-1 pb-20">

          {navLinks.map((link, i) => (
            <Link key={i} to={link.to}
              className={`flex items-center py-2.5 px-3.5 rounded-md text-sm font-semibold transition-colors ${
                isActive(link.to) ? 'bg-rose-50 text-rose-500' : 'text-gray-700 hover:bg-rose-50 hover:text-rose-500'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Link to="/sale" className="flex items-center py-2.5 px-3.5 rounded-md text-sm font-bold text-rose-500 bg-rose-50">
            ✨ {t('navbar.sale')}
          </Link>

          {/* Ngôn ngữ Mobile */}
          <div className="pt-3 border-t border-pink-100 mt-3">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'lang' ? null : 'lang')}
              className="w-full flex items-center justify-between py-2.5 px-3.5 rounded-md bg-gray-50 text-gray-700 text-sm font-medium"
            >
              <div className="flex items-center gap-2">
                <img src={activeLang.flag} alt={activeLang.label} className="w-5 h-3.5 object-cover rounded-sm" />
                {activeLang.name}
              </div>
              <ChevronDown size={15} className={`transition-transform duration-300 ${openDropdown === 'lang' ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openDropdown === 'lang' ? 'max-h-48 mt-1' : 'max-h-0'}`}>
              <ul className="px-2 py-1 space-y-0.5 bg-white rounded-md border border-gray-200 mt-1">
                {languages.map(lang => (
                  <li key={lang.code}>
                    <button
                      onClick={() => { changeLanguage(lang.code); setOpenDropdown(null); setIsMobileMenuOpen(false); }}
                      className={`w-full flex items-center gap-3 py-2 px-3 rounded-md transition-colors text-sm ${
                        currentLang.startsWith(lang.code) ? 'text-rose-500 font-bold bg-rose-50' : 'text-gray-600 hover:text-rose-500 hover:bg-rose-50'
                      }`}
                    >
                      <img src={lang.flag} alt={lang.name} className="w-6 h-4 object-cover rounded-sm" />
                      <span>{lang.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Account Mobile */}
          <div className="border-t border-pink-100 pt-4 mt-3">
            {currentUser ? (
              <>
                <div className="flex items-center gap-3 py-2.5 px-3.5 bg-rose-50/70 border border-rose-100 rounded-md mb-2">
                  <div className="w-8 h-8 rounded-md bg-rose-100 flex items-center justify-center text-rose-500">
                    <User size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Xin chào,</p>
                    <p className="font-bold text-gray-800 text-sm">{currentUser.name}</p>
                  </div>
                </div>
                <Link to="/profile" className="flex items-center py-2.5 px-3.5 rounded-md text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors text-sm">
                  {t('navbar.my_account')}
                </Link>
                <button onClick={handleLogout} className="w-full text-left flex items-center gap-2.5 py-2.5 px-3.5 text-red-500 hover:bg-red-50 rounded-md transition-colors text-sm">
                  <LogOut size={16} /> {t('navbar.logout')}
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 px-1">
                <Link to="/login" className="text-center py-2.5 rounded-md border border-rose-300 text-rose-600 font-semibold hover:bg-rose-50 transition-colors text-sm">
                  {t('navbar.login')}
                </Link>
                <Link to="/register" className="text-center py-2.5 rounded-md bg-rose-500 text-white font-semibold hover:bg-rose-600 transition-colors text-sm shadow-sm">
                  {t('navbar.register')}
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Overlay backdrop (mobile) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

    </header>
  );
}