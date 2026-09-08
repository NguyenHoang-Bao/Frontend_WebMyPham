export default function TopBarMarquee() {
  // Nội dung text bạn muốn hiển thị
  const marqueeText = "MIỄN PHÍ SHIP* • BẢO HÀNH 365 NGÀY • SALE SINH NHẬT , 77.000 SẢN PHẨM , ĐỒNG GIÁ TỪ 77K • ";

  return (
    // Khung bọc ngoài: nền đen, ẩn phần thừa, không xuống dòng
    <div className="bg-black overflow-hidden flex whitespace-nowrap">
      {/* 
        Khối chứa nội dung chạy, áp dụng animation.
        Chúng ta nhân bản khối này để đảm bảo lấp đầy màn hình và chạy mượt mà.
      */}
      <div className="animate-marquee flex">
        <span className="py-3 text-white uppercase text-sm font-semibold tracking-wider">{marqueeText.repeat(4)}</span>
      </div>
      <div className="animate-marquee flex" aria-hidden="true">
        {/* Đây là bản sao để lấp đầy khoảng trống, đảm bảo không giật lag trên mọi màn hình */}
        <span className="py-3 text-white uppercase text-sm font-semibold tracking-wider">{marqueeText.repeat(4)}</span>
      </div>
    </div>
  );
}