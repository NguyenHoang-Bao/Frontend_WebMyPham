import { useState, ChangeEvent, FormEvent } from 'react';
// Import đúng bộ Bootstrap Icons
import heroBgImg from '../assets/img/About/pexels-badhon-35750806.jpg';
import { BsGeoAlt, BsTelephone, BsEnvelope, BsClock, BsGlobe, BsFacebook, BsInstagram } from 'react-icons/bs';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  // Khai báo kiểu cho event thay đổi input/textarea
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Khai báo kiểu cho event submit form
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form data:', formData);
    alert('Đã gửi tin nhắn thành công!');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <main className="bg-gray-50 text-gray-900">
      {/* 1. Hero Banner */}
      <section className="relative flex items-center justify-center text-center w-full min-h-[250px] h-[35vh]">
        {/* Ảnh nền */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${heroBgImg})` }}
        ></div>
        {/* Lớp phủ đen (Overlay) */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/65"></div>
        {/* Nội dung chữ */}
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold uppercase mb-3 text-white tracking-[2px]">
            Liên Hệ Với Chúng Tôi
          </h1>
          <p className="text-lg md:text-xl text-gray-100 tracking-[1px] opacity-90">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
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
                <BsGeoAlt className="text-4xl mr-5 text-gray-900 shrink-0" />
                <div>
                  <h5 className="font-semibold text-lg text-gray-900 mb-1">Địa chỉ cửa hàng</h5>
                  <p className="text-gray-500 mb-0">140 Lê Trọng Tấn, Tây Thạnh, Tân Phú, TP.HCM</p>
                </div>
              </div>

              <div className="flex items-start mb-6">
                <BsTelephone className="text-4xl mr-5 text-gray-900 shrink-0" />
                <div>
                  <h5 className="font-semibold text-lg text-gray-900 mb-1">Hotline</h5>
                  <p className="text-gray-500 mb-0">0359 490 221</p>
                </div>
              </div>

              <div className="flex items-start mb-6">
                <BsEnvelope className="text-4xl mr-5 text-gray-900 shrink-0" />
                <div>
                  <h5 className="font-semibold text-lg text-gray-900 mb-1">Email</h5>
                  <p className="text-gray-500 mb-0">hbao4142@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start mb-6">
                <BsClock className="text-4xl mr-5 text-gray-900 shrink-0" />
                <div>
                  <h5 className="font-semibold text-lg text-gray-900 mb-1">Giờ mở cửa</h5>
                  <p className="text-gray-500 mb-0">Thứ 2 - Chủ Nhật: 9:00 - 22:00</p>
                </div>
              </div>

              <div className="flex items-start mb-6">
                <BsGlobe className="text-4xl mr-5 text-gray-900 shrink-0" />
                <div>
                  <h5 className="font-semibold text-lg text-gray-900 mb-4">Mạng Xã Hội</h5>
                  <div className="flex gap-3">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white rounded-full flex items-center justify-center w-10 h-10 transition-colors"
                      title="Facebook"
                    >
                      <BsFacebook className="text-xl" />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white rounded-full flex items-center justify-center w-10 h-10 transition-colors"
                      title="Instagram"
                    >
                      <BsInstagram className="text-xl" />
                    </a>
                    
                  </div>
                </div>
              </div>
            </div>

            {/* Cột phải: Form */}
            <div className="lg:w-7/12">
              <div className="p-6 md:p-10 rounded-xl border border-gray-200 bg-gray-100">
                <h3 className="text-2xl font-bold mb-8 text-gray-900 uppercase">
                  Gửi tin nhắn cho chúng tôi
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-1">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 bg-white"
                        placeholder="Họ và Tên"
                        required
                      />
                    </div>
                    <div className="md:col-span-1">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 bg-white"
                        placeholder="Email của bạn"
                        required
                      />
                    </div>
                    <div className="md:col-span-1">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 bg-white"
                        placeholder="Số điện thoại"
                        required
                      />
                    </div>
                    <div className="md:col-span-1">
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 bg-white"
                        placeholder="Tiêu đề"
                        required
                      />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 bg-white resize-none"
                        placeholder="Nội dung lời nhắn..."
                        required
                      ></textarea>
                    </div>
                    <div className="col-span-1 md:col-span-2 mt-4">
                      <button
                        type="submit"
                        className="w-full bg-gray-900 hover:bg-black text-white py-4 font-bold uppercase tracking-wider rounded transition-colors"
                      >
                        Gửi Tin Nhắn
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 3. Section Bản đồ */}
      <section className="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.060360274028!2d106.62606661474933!3d10.806689092300438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752be27d8b4f4d%3A0x92dcba2950430867!2zMTQwIEzDqiBUcuG7jW5nIFThuqVuLCBUw6J5IFRo4bqhbmgsIFTDom4gUGjDuiwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1684000000000!5m2!1sen!2s"
          className="w-full h-[450px] border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </main>
  );
}