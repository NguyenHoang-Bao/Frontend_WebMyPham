import { X, ChevronDown, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/Navbar/logo.png';

interface NavbarMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  openDropdown: string | null;
  setOpenDropdown: (dropdown: string | null) => void;
  currentUser: { name: string; [key: string]: any } | null;
  handleLogout: () => void;
  activeLang: { code: string; label: string; name: string; flag: string };
  languages: Array<{ code: string; label: string; name: string; flag: string }>;
  currentLang: string;
  changeLanguage: (lng: string) => void;
  isActive: (path: string) => boolean;
  navLinks: Array<{ to: string; label: string }>;
  t: (key: string) => string;
}

export default function NavbarMobileMenu({
  isOpen,
  onClose,
  openDropdown,
  setOpenDropdown,
  currentUser,
  handleLogout,
  activeLang,
  languages,
  currentLang,
  changeLanguage,
  isActive,
  navLinks,
  t
}: NavbarMobileMenuProps) {
  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 w-80 bg-white z-50 lg:hidden overflow-y-auto shadow-2xl shadow-rose-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header menu mobile */}
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-pink-500 to-rose-400">
          <img src={logo} alt="logo" className="w-28 h-auto object-contain brightness-0 invert" />
          <button onClick={onClose} className="text-white hover:text-pink-100 transition-colors">
            <X size={22} />
          </button>
        </div>

        <div className="p-4 space-y-1 pb-20">
          {navLinks.map((link, i) => {
            if (link.to === '/products') {
              const isProductsOpen = openDropdown === 'products';
              return (
                <div key={i} className="rounded-md overflow-hidden">
                  <div className="flex items-center justify-between">
                    <Link
                      to="/products"
                      onClick={onClose}
                      className={`flex-1 py-2.5 px-3.5 rounded-md text-sm font-semibold transition-colors ${
                        isActive('/products') ? 'bg-rose-50 text-rose-500' : 'text-gray-700 hover:bg-rose-50 hover:text-rose-500'
                      }`}
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setOpenDropdown(isProductsOpen ? null : 'products')}
                      className="p-2.5 text-gray-500 hover:text-rose-500 cursor-pointer"
                      aria-label="Mở danh mục sản phẩm"
                    >
                      <ChevronDown size={16} className={`transition-transform duration-300 ${isProductsOpen ? 'rotate-180 text-rose-500' : ''}`} />
                    </button>
                  </div>

                  {/* Danh mục con dạng Accordion */}
                  <div className={`overflow-hidden transition-all duration-300 ${isProductsOpen ? 'max-h-[600px] mb-2' : 'max-h-0'}`}>
                    <div className="pl-4 pr-2 py-2.5 space-y-3 bg-gray-50 rounded-lg text-xs mt-1 border border-gray-100">
                      {/* Nhóm 1: Chăm sóc da */}
                      <div>
                        <span className="font-bold text-gray-800 text-[11px] uppercase tracking-wider block mb-1">
                          Chăm sóc da
                        </span>
                        <div className="space-y-1 pl-2.5 border-l border-gray-200">
                          <Link to="/products?cat=Chăm sóc da" onClick={onClose} className="block py-1 text-gray-600 hover:text-rose-500">
                            Chăm sóc da mặt
                          </Link>
                          <Link to="/products?cat=Chăm sóc da & Cơ thể" onClick={onClose} className="block py-1 text-gray-600 hover:text-rose-500">
                            Chăm sóc da & Cơ thể
                          </Link>
                          <Link to="/products?cat=Chăm sóc mắt" onClick={onClose} className="block py-1 text-gray-600 hover:text-rose-500">
                            Chăm sóc mắt
                          </Link>
                          <Link to="/products?cat=Chăm sóc môi" onClick={onClose} className="block py-1 text-gray-600 hover:text-rose-500">
                            Chăm sóc môi
                          </Link>
                        </div>
                      </div>

                      {/* Nhóm 2: Tóc & Cơ thể */}
                      <div>
                        <span className="font-bold text-gray-800 text-[11px] uppercase tracking-wider block mb-1">
                          Tóc & Cơ thể
                        </span>
                        <div className="space-y-1 pl-2.5 border-l border-gray-200">
                          <Link to="/products?cat=Chăm sóc tóc" onClick={onClose} className="block py-1 text-gray-600 hover:text-rose-500">
                            Chăm sóc tóc
                          </Link>
                          <Link to="/products?cat=Chăm sóc cơ thể" onClick={onClose} className="block py-1 text-gray-600 hover:text-rose-500">
                            Chăm sóc cơ thể
                          </Link>
                          <Link to="/products?cat=Chăm sóc cá nhân & Trẻ em" onClick={onClose} className="block py-1 text-gray-600 hover:text-rose-500">
                            Cá nhân & Trẻ em
                          </Link>
                        </div>
                      </div>

                      {/* Nhóm 3: Trang điểm & Mùi hương */}
                      <div>
                        <span className="font-bold text-gray-800 text-[11px] uppercase tracking-wider block mb-1">
                          Trang điểm & Mùi hương
                        </span>
                        <div className="space-y-1 pl-2.5 border-l border-gray-200">
                          <Link to="/products?cat=Trang điểm" onClick={onClose} className="block py-1 text-gray-600 hover:text-rose-500">
                            Trang điểm
                          </Link>
                          <Link to="/products?cat=Nước hoa" onClick={onClose} className="block py-1 text-gray-600 hover:text-rose-500">
                            Nước hoa
                          </Link>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-gray-200">
                        <Link to="/products" onClick={onClose} className="block font-semibold text-rose-500 hover:underline">
                          Tất cả sản phẩm →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link key={i} to={link.to}
                onClick={onClose}
                className={`flex items-center py-2.5 px-3.5 rounded-md text-sm font-semibold transition-colors ${
                  isActive(link.to) ? 'bg-rose-50 text-rose-500' : 'text-gray-700 hover:bg-rose-50 hover:text-rose-500'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <Link to="/sale" onClick={onClose} className="flex items-center py-2.5 px-3.5 rounded-md text-sm font-bold text-rose-500 bg-rose-50">
            ✨ {t('navbar.sale')}
          </Link>

          {/* Chọn ngôn ngữ Mobile */}
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
                      onClick={() => { changeLanguage(lang.code); setOpenDropdown(null); onClose(); }}
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

          {/* Tài khoản Mobile */}
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
                <Link to="/profile" onClick={onClose} className="flex items-center py-2.5 px-3.5 rounded-md text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors text-sm">
                  {t('navbar.my_account')}
                </Link>
                <button onClick={() => { handleLogout(); onClose(); }} className="w-full text-left flex items-center gap-2.5 py-2.5 px-3.5 text-red-500 hover:bg-red-50 rounded-md transition-colors text-sm">
                  <LogOut size={16} /> {t('navbar.logout')}
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 px-1">
                <Link to="/login" onClick={onClose} className="text-center py-2.5 rounded-md border border-rose-300 text-rose-600 font-semibold hover:bg-rose-50 transition-colors text-sm">
                  {t('navbar.login')}
                </Link>
                <Link to="/register" onClick={onClose} className="text-center py-2.5 rounded-md bg-rose-500 text-white font-semibold hover:bg-rose-600 transition-colors text-sm shadow-sm">
                  {t('navbar.register')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
      )}
    </>
  );
}