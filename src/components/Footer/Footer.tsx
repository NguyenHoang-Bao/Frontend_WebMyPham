import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { 
  BsFacebook, 
  BsInstagram, 
  BsYoutube, 
  BsTiktok,
  BsTruck,
  BsTelephone,
  BsEnvelope,
  BsGeoAlt
} from 'react-icons/bs';
import logo from '../../assets/img/Navbar/logo.png'; 
import { useTranslation } from 'react-i18next';

// Import Modal và các nội dung chính sách
import Modal from '../Modal';
import WarrantyPolicy from '../WarrantyPolicy';
import ReturnPolicy from '../ReturnPolicy';
import ShippingPolicy from '../ShippingPolicy';
import PrivacyPolicy from '../PrivacyPolicy';

// Định nghĩa kiểu cho các modal có thể có
type ModalType = 'warranty' | 'return' | 'shipping' | 'privacy' | null;

export default function Footer() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const { t } = useTranslation();

  const openModal = (modal: ModalType) => {
    setActiveModal(modal);
  };

  return (
    <>
      <footer className="bg-pink-50 text-gray-800 border-t border-pink-200">
        <div className="container mx-auto px-6 py-10 lg:py-14">

          {/* MAIN SECTION: 5 Cột thông tin */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            
            {/* Cột 1: Logo */}
            <div className="lg:col-span-2 flex justify-center lg:justify-start items-start">
              <Link to="/">
                <img src={logo} alt="Hoàng Bảo Cosmetics" className="w-32 h-auto object-contain" />
              </Link>
            </div>

            {/* Cột 2: Danh sách chi nhánh & Mạng xã hội */}
            <div className="lg:col-span-3">
              <h5 className="font-bold text-gray-900 uppercase tracking-wider mb-4">{t('footer.branches')}</h5>
              <div className="space-y-4 text-sm text-gray-600 mb-6">
                <p className="flex items-start gap-2">
                  <BsGeoAlt className="text-pink-500 mt-1 flex-shrink-0" />
                  <span>{t('footer.branch_tan_phu')}</span>
                </p>
              </div>
              <div className="flex items-center gap-3 text-pink-500">
                <a href="#" className="hover:text-pink-700 transition-colors bg-white p-2 rounded-md border border-gray-200 shadow-sm"><BsFacebook size={16} /></a>
                <a href="#" className="hover:text-pink-700 transition-colors bg-white p-2 rounded-md border border-gray-200 shadow-sm"><BsInstagram size={16} /></a>
                <a href="#" className="hover:text-pink-700 transition-colors bg-white p-2 rounded-md border border-gray-200 shadow-sm"><BsTiktok size={16} /></a>
                <a href="#" className="hover:text-pink-700 transition-colors bg-white p-2 rounded-md border border-gray-200 shadow-sm"><BsYoutube size={16} /></a>
              </div>
            </div>

            {/* Cột 3: Chăm sóc khách hàng */}
            <div className="lg:col-span-2">
              <h5 className="font-bold text-gray-900 uppercase tracking-wider mb-4">{t('footer.customer_service')}</h5>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><button onClick={() => openModal('return')} className="hover:text-pink-600 transition-colors text-left">{t('footer.policy_return')}</button></li>
                <li><button onClick={() => openModal('warranty')} className="hover:text-pink-600 transition-colors text-left">{t('footer.policy_warranty')}</button></li>
                <li><button onClick={() => openModal('privacy')} className="hover:text-pink-600 transition-colors text-left">{t('footer.policy_privacy')}</button></li>
                <li><button onClick={() => openModal('shipping')} className="hover:text-pink-600 transition-colors text-left">{t('footer.policy_shipping')}</button></li>
                <li><Link to="/products" className="hover:text-pink-600 transition-colors text-left">{t('footer.shopping_guide')}</Link></li>
              </ul>
            </div>

            {/* Cột 4: Giờ mở cửa & Góp ý */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h5 className="font-bold text-gray-900 uppercase tracking-wider mb-3">{t('footer.opening_hours')}</h5>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t('footer.hours_detail')}
                </p>
              </div>
              <div>
                <h5 className="font-bold text-gray-900 uppercase tracking-wider mb-3">{t('footer.feedback')}</h5>
                <p className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <BsTelephone className="text-pink-500" />
                  <strong>0359 490 221</strong>
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <BsEnvelope className="text-pink-500" />
                  hbao4142@gmail.com
                </p>
                <Link to="/contact" className="text-pink-600 hover:text-pink-700 text-sm font-semibold flex items-center gap-1">
                  <BsGeoAlt /> {t('footer.store_system')}
                </Link>
              </div>
            </div>

            {/* Cột 5: Về Hoàng Bảo Cosmetics */}
            <div className="lg:col-span-2">
              <h5 className="font-bold text-gray-900 uppercase tracking-wider mb-4">{t('footer.about_us')}</h5>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><Link to="/about" className="hover:text-pink-600 transition-colors">{t('footer.about_intro')}</Link></li>
                <li><Link to="/contact" className="hover:text-pink-600 transition-colors">{t('footer.about_contact')}</Link></li>
                <li><Link to="/tips" className="hover:text-pink-600 transition-colors">{t('footer.about_tips')}</Link></li>
                <li><Link to="#" className="hover:text-pink-600 transition-colors">{t('footer.about_career')}</Link></li>
              </ul>
            </div>

          </div>

          {/* BOTTOM SECTION: Company Info & Badges */}
          <div className="mt-12 pt-8 border-t border-pink-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="text-sm text-gray-600 max-w-2xl">
              <p className="font-bold text-gray-900 mb-1">{t('footer.brand_desc')}</p>
              <p className="mb-1">{t('footer.company_info')}</p>
              <p>© {new Date().getFullYear()} Hoàng Bảo Cosmetics. All rights reserved.</p>
            </div>
            
            <div className="flex flex-col items-start gap-4">
              <div>
                <span className="text-pink-600 hover:text-pink-700 text-sm font-semibold flex items-center gap-1">{t('footer.payment_method')}</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                
                {/* Badge Ví MoMo */}
                <div 
                  className="bg-white border border-gray-200 px-2.5 py-1 rounded-md shadow-sm flex items-center justify-center h-8 hover:border-[#a50064] transition-colors cursor-default"
                  title="Thanh toán qua Ví MoMo"
                >
                  <img 
                    src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square.png" 
                    alt="Ví MoMo" 
                    className="h-5 w-auto object-contain" 
                  />
                </div>

                {/* Badge Vietcombank */}
                <div 
                  className="bg-white border border-gray-200 px-2.5 py-1 rounded-md shadow-sm flex items-center justify-center h-8 hover:border-green-600 transition-colors cursor-default"
                  title="Chuyển khoản Vietcombank"
                >
                  <img 
                    src="https://cdn.haitrieu.com/wp-content/uploads/2022/02/Logo-Vietcombank.png" 
                    alt="Vietcombank" 
                    className="h-4 w-auto object-contain" 
                  />
                </div>

                {/* Badge MB Bank */}
                <div 
                  className="bg-white border border-gray-200 px-2.5 py-1 rounded-md shadow-sm flex items-center justify-center h-8 hover:border-blue-600 transition-colors cursor-default"
                  title="Chuyển khoản MB Bank"
                >
                  <img 
                    src="https://cdn.haitrieu.com/wp-content/uploads/2022/02/Logo-MB-Bank-MBB.png" 
                    alt="MB Bank" 
                    className="h-5 w-auto object-contain" 
                  />
                </div>

                {/* Badge COD */}
                <div 
                  className="bg-white border border-gray-200 px-3 py-1 rounded-md shadow-sm flex items-center justify-center h-8 gap-1.5 hover:border-gray-400 transition-colors cursor-default"
                  title="Thanh toán khi nhận hàng"
                >
                  <BsTruck className="text-gray-700 text-sm" />
                  <span className="text-[11px] font-extrabold text-gray-700 tracking-wide uppercase mt-0.5">COD</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </footer>

      {/* Khai báo các Modal */}
      <Modal isOpen={activeModal === 'warranty'} onClose={() => setActiveModal(null)} title="Chính sách bảo hành">
        <WarrantyPolicy />
      </Modal>

      <Modal isOpen={activeModal === 'return'} onClose={() => setActiveModal(null)} title="Chính sách đổi trả">
        <ReturnPolicy />
      </Modal>

      <Modal isOpen={activeModal === 'shipping'} onClose={() => setActiveModal(null)} title="Chính sách giao hàng">
        <ShippingPolicy />
      </Modal>

      <Modal isOpen={activeModal === 'privacy'} onClose={() => setActiveModal(null)} title="Chính sách bảo mật">
        <PrivacyPolicy />
      </Modal>
    </>
  );
}