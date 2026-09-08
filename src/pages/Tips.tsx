import videoBg from '../assets/video/Tips/video1.mp4';
import colorMixingImg from '../assets/img/Tips/color-image.jpg';

import { 
  BsRulers, 
  BsPersonBoundingBox, 
  BsInfoCircle, 
  BsDropletHalf, 
  BsSlashCircle, 
  BsBrightnessHigh, 
  BsThermometerHalf 
} from 'react-icons/bs';

export default function Tips() {
  return (
    <main className="bg-gray-50 text-gray-900">
      {/* 1. Hero Banner */}
      <section className="relative flex items-center justify-center text-center w-full min-h-[250px] h-[35vh] overflow-hidden">
        {/* Video nền */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 w-auto min-w-full min-h-full max-w-none -translate-x-1/2 -translate-y-1/2 z-0 object-cover"
        >
          <source src={videoBg} type="video/mp4" />
          Trình duyệt của bạn không hỗ trợ thẻ video.
        </video>
        {/* Lớp phủ đen */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-1"></div>
        {/* Nội dung chữ */}
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-uppercase mb-3 text-white tracking-[2px] uppercase">
            Cẩm Nang Phong Cách & Bảo Quản
          </h1>
          <p className="text-base md:text-lg text-gray-100 tracking-[1px] opacity-90">
            Bí quyết nâng tầm phong cách và giữ trang phục luôn như mới
          </p>
        </div>
      </section>

      {/* 2. Section Hướng Dẫn Chọn Đồ (Zigzag) */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Khối 1: Chọn Kích Cỡ */}
          <div className="flex flex-col lg:flex-row items-center mb-16 pb-16 border-b border-gray-900">
            <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-12">
              <h3 className="font-bold text-2xl mb-6 text-gray-900 uppercase">
                1. Chọn Kích Cỡ
              </h3>
              <p className="text-gray-500 leading-relaxed mb-6">
                Sự vừa vặn là yếu tố cốt lõi của một outfit đẹp. Để chọn size chuẩn xác, bạn cần nắm rõ các thông số cơ bản của cơ thể:
              </p>
              <ul className="text-gray-500 leading-relaxed space-y-4">
                <li className="flex items-start">
                  <BsRulers className="text-gray-900 mr-3 mt-1 text-xl shrink-0" />
                  <span><strong className="text-gray-900">Chiều cao:</strong> Đo từ đỉnh đầu đến gót chân.</span>
                </li>
                <li className="flex items-start">
                  <BsPersonBoundingBox className="text-gray-900 mr-3 mt-1 text-xl shrink-0" />
                  <span><strong className="text-gray-900">Cân nặng:</strong> Yếu tố quyết định độ rộng của trang phục.</span>
                </li>
                <li className="flex items-start">
                  <BsInfoCircle className="text-gray-900 mr-3 mt-1 text-xl shrink-0" />
                  <span><strong className="text-gray-900">Gợi ý:</strong> Form đồ của chúng tôi đa số là Regular hoặc Relaxed fit. Nếu thích mặc ôm, hãy cân nhắc lùi 1 size.</span>
                </li>
              </ul>
            </div>
            
            <div className="lg:w-1/2 w-full">
              <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200">
                <table className="w-full text-center border-collapse bg-white">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-4 px-6 uppercase text-gray-500 text-sm font-semibold border-b border-gray-200">Size</th>
                      <th className="py-4 px-6 uppercase text-gray-500 text-sm font-semibold border-b border-gray-200">Chiều cao (cm)</th>
                      <th className="py-4 px-6 uppercase text-gray-500 text-sm font-semibold border-b border-gray-200">Cân nặng (kg)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50 transition-colors">
                      <th className="py-4 px-6 text-gray-900 font-bold">S</th>
                      <td className="py-4 px-6 text-gray-600">155 - 165</td>
                      <td className="py-4 px-6 text-gray-600">45 - 55</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <th className="py-4 px-6 text-gray-900 font-bold">M</th>
                      <td className="py-4 px-6 text-gray-600">165 - 170</td>
                      <td className="py-4 px-6 text-gray-600">55 - 65</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <th className="py-4 px-6 text-gray-900 font-bold">L</th>
                      <td className="py-4 px-6 text-gray-600">170 - 175</td>
                      <td className="py-4 px-6 text-gray-600">65 - 75</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <th className="py-4 px-6 text-gray-900 font-bold">XL</th>
                      <td className="py-4 px-6 text-gray-600">175 - 180</td>
                      <td className="py-4 px-6 text-gray-600">75 - 85</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <th className="py-4 px-6 text-gray-900 font-bold">XXL</th>
                      <td className="py-4 px-6 text-gray-600">180 - 185</td>
                      <td className="py-4 px-6 text-gray-600">85 - 95</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Khối 2: Phối Màu Sắc */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
            <div className="lg:w-1/2 w-full">
              <img
                src={colorMixingImg}
                alt="Phối màu trang phục"
                className="w-full rounded-lg object-cover aspect-[4/5] shadow-md"
              />
            </div>
            <div className="lg:w-1/2">
              <h3 className="font-bold text-2xl mb-8 text-gray-900 uppercase">
                2. Phối Màu Sắc
              </h3>
              <p className="text-gray-500 leading-relaxed mb-8">
                Màu sắc quyết định 80% ấn tượng thị giác. Nắm vững 3 quy tắc cơ bản sau để luôn có những outfit bắt mắt:
              </p>

              <div className="mb-8 pl-5 border-l-4 border-gray-300 hover:border-gray-900 transition-colors">
                <h5 className="text-gray-900 font-semibold mb-2 text-lg">Monochrome (Đơn sắc)</h5>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Phối các item cùng một gam màu nhưng khác nhau về sắc độ (đậm/nhạt). Phong cách này mang lại vẻ ngoài tinh tế, sang trọng và giúp "hack" dáng hiệu quả.
                </p>
              </div>

              <div className="mb-8 pl-5 border-l-4 border-gray-300 hover:border-gray-900 transition-colors">
                <h5 className="text-gray-900 font-semibold mb-2 text-lg">Contrast (Tương phản)</h5>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Kết hợp các gam màu đối lập nhau (như Đen - Trắng, Xanh navy - Be). Sự tương phản tạo ra điểm nhấn mạnh mẽ, thể hiện cá tính rõ nét.
                </p>
              </div>

              <div className="pl-5 border-l-4 border-gray-300 hover:border-gray-900 transition-colors">
                <h5 className="text-gray-900 font-semibold mb-2 text-lg">Neutral Focus (Màu nền trung tính)</h5>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Sử dụng Đen, Trắng, Xám làm nền đạo. Chỉ điểm xuyết tối đa 1 item có màu sắc nổi bật (đỏ, cam, xanh neon) để bộ đồ không bị rườm rà, rối mắt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Section Hướng Dẫn Bảo Quản */}
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-extrabold text-2xl md:text-3xl text-gray-900 uppercase mb-4">
              Hướng Dẫn Bảo Quản Chuẩn Mực
            </h2>
            <div className="mx-auto bg-gray-900 w-16 h-1 mb-6"></div>
            <p className="text-gray-500 text-lg">
              Kéo dài tuổi thọ trang phục với 4 bước đơn giản
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-8 text-center rounded-lg border border-gray-200">
              <BsDropletHalf className="text-5xl mb-6 mx-auto text-gray-900" />
              <h5 className="font-bold text-gray-900 uppercase mb-3 text-lg">Giặt Lạnh</h5>
              <p className="text-gray-500 text-sm leading-relaxed">
                Nhiệt độ nước dưới 30°C để bảo vệ sợi vải và giữ màu lâu phai.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white p-8 text-center rounded-lg border border-gray-200">
              <BsSlashCircle className="text-5xl mb-6 mx-auto text-gray-900" />
              <h5 className="font-bold text-gray-900 uppercase mb-3 text-lg">Không Tẩy</h5>
              <p className="text-gray-500 text-sm leading-relaxed">
                Tuyệt đối không sử dụng thuốc tẩy mạnh làm hỏng cấu trúc vải.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 text-center rounded-lg border border-gray-200">
              <BsBrightnessHigh className="text-5xl mb-6 mx-auto text-gray-900" />
              <h5 className="font-bold text-gray-900 uppercase mb-3 text-lg">Phơi Râm Mát</h5>
              <p className="text-gray-500 text-sm leading-relaxed">
                Lộn trái sản phẩm và phơi ở nơi thoáng gió, tránh ánh nắng trực tiếp.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-8 text-center rounded-lg border border-gray-200">
              <BsThermometerHalf className="text-5xl mb-6 mx-auto text-gray-900" />
              <h5 className="font-bold text-gray-900 uppercase mb-3 text-lg">Ủi Nhiệt Thấp</h5>
              <p className="text-gray-500 text-sm leading-relaxed">
                Nên ủi mặt trái, sử dụng nhiệt độ thấp để không làm hỏng hình in.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}