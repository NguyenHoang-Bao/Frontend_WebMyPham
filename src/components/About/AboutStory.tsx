import storyImg from '../../assets/img/About/pexels-badhon-35750806.jpg';
import visionVideo from '../../assets/video/About/video5.mp4';
import storyVideo from '../../assets/video/About/video4.mp4';

export default function AboutStory(){
  return (
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
              poster={storyImg}
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
              poster={storyImg} 
            />
          </div>
        </div>

      </div>
    </section>
  );
}