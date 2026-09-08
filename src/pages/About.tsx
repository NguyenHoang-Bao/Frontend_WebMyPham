import storyImg from '../assets/img/About/pexels-badhon-35750806.jpg';
import heroBgImg from '../assets/img/About/pexels-mart-production-7679722.jpg';
import visionVideo from '../assets/video/About/video5.mp4';
import storyVideo from '../assets/video/About/video4.mp4';

// Thêm : JSX.Element để khai báo rõ kiểu trả về của Function Component
export default function About(){
  return (
    <main className="bg-gray-50 text-gray-900">
      {/* 1. Hero Banner */}
      <section className="relative flex items-center justify-center text-center w-full min-h-[300px] h-[40vh] overflow-hidden">
        {/* Ảnh nền */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${heroBgImg})` }}
        ></div>
        {/* Lớp phủ đen */}
        <div className="absolute inset-0 bg-black/60 z-1"></div>
        {/* Nội dung chữ */}
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase mb-4 text-white tracking-[2px]">
            Về Chúng Tôi
          </h1>
          <p className="text-lg md:text-xl text-gray-200 tracking-[1px] opacity-90 font-light">
            Định hình phong cách đường phố Việt
          </p>
        </div>
      </section>

      {/* 2. Section Brand Story */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Block 1: Image Left, Text Right */}
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 mb-20">
            <div className="md:w-1/2 w-full overflow-hidden rounded-2xl shadow-xl group">
              <video
                autoPlay
                loop
                muted
                playsInline
                src={storyVideo}
                className="w-full aspect-[4/5] object-cover"
                poster={storyImg} // Sử dụng ảnh cũ làm poster
              />
            </div>
            <div className="md:w-1/2 md:pl-6">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-900 uppercase tracking-wide">
                Câu Chuyện Của <br className="hidden md:block" /> SHOP THỜI TRANG HOÀNG BẢO
              </h2>
              <div className="w-16 h-1 bg-gray-900 mb-6"></div>
              <p className="text-gray-600 leading-loose mb-5 text-lg italic">
                Khởi nguồn từ những con phố tĩnh lặng nhưng đầy ngầm sóng của nhịp sống đô thị, SHOP THỜI TRANG HOÀNG BẢO ra đời không chỉ là một thương hiệu thời trang, mà là tiếng nói của một thế hệ mới. Chúng tôi chọn sự tối giản làm ngôn ngữ, chọn bóng tối làm nền để làm nổi bật cái tôi riêng biệt.
              </p>
              <p className="text-gray-600 leading-loose text-lg italic">
                Streetwear với chúng tôi không phải là sự hầm hố dư thừa, mà là sự tinh tế trong từng đường cắt, sự chăm chút trong từng chất liệu, để mỗi cá nhân khi khoác lên mình đều cảm nhận được sự tự do và bản lĩnh.
              </p>
            </div>
          </div>

          {/* Block 2: Text Left, Image Right */}
          <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
            <div className="md:w-1/2 md:pr-6 mt-10 md:mt-0">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-900 uppercase tracking-wide">
                Tầm Nhìn & Phong Cách
              </h2>
              <div className="w-16 h-1 bg-gray-900 mb-6"></div>
              <p className="text-gray-600 leading-loose mb-5 text-lg italic">
                Mang âm hưởng của phong cách Dark Mode hiện đại, SHOP THỜI TRANG HOÀNG BẢO hướng đến sự sang trọng ngầm (quiet luxury) trong thời trang đường phố. Sự phối hợp giữa sắc đen quyền lực và các gam màu trung tính tạo nên một tủ đồ không bao giờ lỗi mốt, sắc bén và đầy khí chất.
              </p>
              <p className="text-gray-600 leading-loose text-lg italic">
                Hành trình của chúng tôi là định hình lại chuẩn mực của phong cách đường phố Việt – nơi sự tối giản gặp gỡ sự nổi loạn, nơi mỗi sản phẩm là một tác phẩm nguyên bản.
              </p>
            </div>
            <div className="md:w-1/2 w-full overflow-hidden rounded-2xl shadow-xl group">
              <video
                autoPlay
                loop
                muted
                playsInline
                src={visionVideo}
                className="w-full aspect-[4/5] object-cover"
                // Thêm poster để hiển thị ảnh tĩnh khi video chưa tải
                poster={storyImg} 
              />
            </div>
          </div>

        </div>
      </section>

      {/* 3. Section Core Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 uppercase tracking-wider">
              Giá Trị Cốt Lõi
            </h2>
            <div className="mx-auto bg-gray-900 mt-6 w-20 h-1"></div>
          </div>

          <div className="max-w-3xl mx-auto text-center relative px-8">
            <span className="absolute top-0 left-0 text-8xl text-gray-200 font-art opacity-75 transform -translate-x-4 -translate-y-6">
              “
            </span>
            <p className="relative text-xl md:text-2xl text-gray-600 leading-relaxed italic font-art">
              Tại SHOP THỜI TRANG HOÀNG BẢO, mỗi thiết kế không chỉ là quần áo, mà là một tuyên ngôn. 
              Chúng tôi dệt nên những câu chuyện từ 
              <span className="font-semibold text-gray-800 mx-1.5">Chất Lượng</span> 
              thượng hạng, thôi thúc bởi ngọn lửa 
              <span className="font-semibold text-gray-800 mx-1.5">Đột Phá</span> 
              không ngừng, và bước đi với cam kết về sự 
              <span className="font-semibold text-gray-800 mx-1.5">Bền Vững</span> 
              — để mỗi lựa chọn của bạn không chỉ đẹp, mà còn là một giá trị gửi gắm cho tương lai.
            </p>
            <span className="absolute bottom-0 right-0 text-8xl text-gray-200 font-art opacity-75 transform translate-x-4 translate-y-6">
              ”
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}