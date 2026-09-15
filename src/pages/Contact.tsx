import { useState, ChangeEvent, FormEvent } from 'react';
import { 
  BsGeoAlt, 
  BsTelephone, 
  BsEnvelope, 
  BsClock, 
  BsGlobe, 
  BsFacebook, 
  BsInstagram,
  BsTiktok,
  BsCheckCircleFill
} from 'react-icons/bs';

// Ảnh nền banner mỹ phẩm sang trọng, phù hợp chủ đề làm đẹp
const heroBgImg = 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=2070&q=80&auto=format&fit=crop';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Khai báo kiểu cho event thay đổi input/textarea
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Khai báo kiểu cho event submit form
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form data:', formData);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <main className="bg-gray-50 text-gray-900">
      {/* 1. Hero Banner */}
      <section className="relative flex items-center justify-center text-center w-full min-h-[250px] h-[35vh]">
        {/* Ảnh nền mỹ phẩm */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${heroBgImg})` }}
        ></div>
        {/* Lớp phủ đen / hồng tối sang trọng */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>
        {/* Nội dung chữ */}
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold uppercase mb-3 text-white tracking-[2px]">
            Liên Hệ Với Chúng Tôi
          </h1>
          <p className="text-base md:text-xl text-rose-100 tracking-[1px] opacity-95">
            Hoàng Bảo Cosmetics luôn sẵn sàng lắng nghe và đồng hành cùng làn da của bạn
          </p>
        </div>
      </section>

      {/* 2. Section Liên hệ */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            
            {/* Cột trái: Thông tin */}
            <div className="lg:w-5/12">
              <h3 className="text-2xl font-bold mb-8 text-gray-900 uppercase">
                Thông tin liên hệ
              </h3>

              <div className="flex items-start mb-6">
                <BsGeoAlt className="text-3xl md:text-4xl mr-5 text-pink-500 shrink-0" />
                <div>
                  <h5 className="font-semibold text-lg text-gray-900 mb-1">Địa chỉ cửa hàng</h5>
                  <p className="text-gray-600 mb-0 leading-relaxed">
                    140 Lê Trọng Tấn, Tây Thạnh, Tân Phú, TP.HCM
                  </p>
                </div>
              </div>

              <div className="flex items-start mb-6">
                <BsTelephone className="text-3xl md:text-4xl mr-5 text-pink-500 shrink-0" />
                <div>
                  <h5 className="font-semibold text-lg text-gray-900 mb-1">Hotline & Zalo</h5>
                  <p className="text-gray-600 mb-0 font-medium">
                    <a href="tel:0359490221" className="hover:text-pink-600 transition-colors">
                      0359 490 221
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start mb-6">
                <BsEnvelope className="text-3xl md:text-4xl mr-5 text-pink-500 shrink-0" />
                <div>
                  <h5 className="font-semibold text-lg text-gray-900 mb-1">Email</h5>
                  <p className="text-gray-600 mb-0">
                    <a href="mailto:hbao4142@gmail.com" className="hover:text-pink-600 transition-colors">
                      hbao4142@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start mb-6">
                <BsClock className="text-3xl md:text-4xl mr-5 text-pink-500 shrink-0" />
                <div>
                  <h5 className="font-semibold text-lg text-gray-900 mb-1">Giờ mở cửa</h5>
                  <p className="text-gray-600 mb-0">Thứ 2 - Chủ Nhật: 9:00 - 22:00</p>
                </div>
              </div>

              <div className="flex items-start mb-6">
                <BsGlobe className="text-3xl md:text-4xl mr-5 text-pink-500 shrink-0" />
                <div>
                  <h5 className="font-semibold text-lg text-gray-900 mb-4">Mạng Xã Hội</h5>
                  <div className="flex gap-2.5">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-gray-300 text-gray-700 hover:border-pink-500 hover:bg-pink-500 hover:text-white rounded-md flex items-center justify-center w-9 h-9 transition-colors shadow-sm bg-white"
                      title="Facebook"
                    >
                      <BsFacebook className="text-base" />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-gray-300 text-gray-700 hover:border-pink-500 hover:bg-pink-500 hover:text-white rounded-md flex items-center justify-center w-9 h-9 transition-colors shadow-sm bg-white"
                      title="Instagram"
                    >
                      <BsInstagram className="text-base" />
                    </a>
                    <a
                      href="https://tiktok.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-gray-300 text-gray-700 hover:border-pink-500 hover:bg-pink-500 hover:text-white rounded-md flex items-center justify-center w-9 h-9 transition-colors shadow-sm bg-white"
                      title="TikTok"
                    >
                      <BsTiktok className="text-base" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Cột phải: Form */}
            <div className="lg:w-7/12">
              <div className="p-6 md:p-8 rounded-lg border border-gray-200 bg-white shadow-sm">
                <h3 className="text-2xl font-bold mb-8 text-gray-900 uppercase">
                  Gửi tin nhắn cho chúng tôi
                </h3>

                {isSubmitted ? (
                  <div className="py-10 px-6 text-center rounded-lg bg-pink-50/50 border border-pink-200">
                    <div className="w-12 h-12 bg-pink-500 text-white rounded-md flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <BsCheckCircleFill size={24} />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Đã gửi tin nhắn thành công!</h4>
                    <p className="text-gray-600 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                      Cảm ơn bạn <span className="font-semibold text-gray-900">{formData.name}</span> đã liên hệ. Đội ngũ tư vấn của Hoàng Bảo Cosmetics sẽ liên hệ lại với bạn trong thời gian sớm nhất!
                    </p>
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center justify-center px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-pink-600 bg-white border border-pink-300 rounded-md hover:bg-pink-50 transition-colors shadow-sm"
                    >
                      Gửi thêm tin nhắn khác
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-1">
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">
                          Họ và Tên <span className="text-pink-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white text-sm transition-colors"
                          placeholder="Họ và Tên của bạn"
                          required
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">
                          Email của bạn <span className="text-pink-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white text-sm transition-colors"
                          placeholder="Email của bạn"
                          required
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">
                          Số điện thoại <span className="text-pink-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white text-sm transition-colors"
                          placeholder="Số điện thoại"
                          required
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">
                          Tiêu đề <span className="text-pink-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white text-sm transition-colors"
                          placeholder="Tiêu đề (VD: Tư vấn da, đơn hàng...)"
                          required
                        />
                      </div>
                      <div className="col-span-1 md:col-span-2">
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">
                          Nội dung lời nhắn <span className="text-pink-500">*</span>
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white text-sm transition-colors resize-none"
                          placeholder="Nội dung lời nhắn hoặc tình trạng làn da bạn cần tư vấn..."
                          required
                        ></textarea>
                      </div>
                      <div className="col-span-1 md:col-span-2 mt-2">
                        <button
                          type="submit"
                          className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3.5 font-bold uppercase tracking-wider rounded-lg transition-colors shadow-md shadow-rose-200 cursor-pointer"
                        >
                          Gửi Tin Nhắn
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 3. Section Bản đồ */}
      <section className="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.060360274028!2d106.62606661474933!3d10.806689092300438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752be27d8b4f4d%3A0x92dcba2950430867!2zMTQwIEzDqiBUcuG7jW5nIFThuqVuLCBUw6J5IFRo4bqhbmgsIFTDom4gUGjDuiwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1684000000000!5m2!1sen!2s"
          className="w-full h-[400px] md:h-[450px] border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Bản đồ Hoàng Bảo Cosmetics"
        ></iframe>
      </section>
    </main>
  );
}