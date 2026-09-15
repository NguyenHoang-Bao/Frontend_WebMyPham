import { useState, useMemo, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  BookOpen, 
  Sparkles, 
  Calendar, 
  Clock, 
  Eye, 
  ChevronRight, 
  X, 
  CheckCircle2, 
  Droplet, 
  ShieldCheck, 
  HeartHandshake, 
  ShoppingBag,
  ArrowRight,
  Send
} from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: string;
  categorySlug: 'skincare' | 'makeup' | 'treatment' | 'ingredients' | 'trends';
  date: string;
  readTime: string;
  views: number;
  image: string;
  summary: string;
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string;
      tips?: string[];
    }[];
    conclusion: string;
    recommendedProducts?: {
      name: string;
      category: string;
      price: number;
    }[];
  };
}

export default function Tips() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterSuccess, setNewsletterSuccess] = useState<boolean>(false);

  // Danh mục bài viết
  const categories = [
    { id: 'all', label: 'Tất cả bài viết' },
    { id: 'skincare', label: 'Chăm sóc da' },
    { id: 'makeup', label: 'Bí quyết Makeup' },
    { id: 'treatment', label: 'Trị mụn & Phục hồi' },
    { id: 'ingredients', label: 'Cẩm nang Thành phần' },
    { id: 'trends', label: 'Xu hướng Làm đẹp' },
  ];

  // Danh sách bài viết phong phú về mỹ phẩm
  const articles: Article[] = [
    {
      id: 'skincare-routine-beginner',
      title: 'Quy Trình 7 Bước Skincare Chuẩn Da Liễu Cho Làn Da Căng Mọng',
      category: 'Chăm sóc da',
      categorySlug: 'skincare',
      date: '15/09/2026',
      readTime: '6 phút đọc',
      views: 3420,
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80&auto=format&fit=crop',
      summary: 'Khám phá thứ tự các bước dưỡng da chuẩn xác từ bước làm sạch kép (Double Cleansing), cân bằng ẩm đến khóa dưỡng chất để tối ưu hiệu quả hấp thu.',
      content: {
        intro: 'Chăm sóc da không đơn thuần là bôi nhiều loại mỹ phẩm lên mặt, mà là sự hiểu biết về thứ tự và nguyên lý thẩm thấu của từng hoạt chất. Một quy trình bài bản sẽ giúp da hồi sinh và rạng rỡ rõ rệt chỉ sau 28 ngày.',
        sections: [
          {
            heading: '1. Làm sạch kép (Double Cleansing)',
            body: 'Bắt đầu với dầu/nước tẩy trang để hòa tan cặn trang điểm, kem chống nắng và bã nhờn sâu trong lỗ chân lông. Tiếp theo là sữa rửa mặt dịu nhẹ có độ pH 5.5 giúp da sạch mịn mà không bị khô căng rát.',
            tips: ['Tẩy trang ngay cả khi chỉ bôi kem chống nắng', 'Massage dầu tẩy trang trên nền da khô ráo ít nhất 60 giây']
          },
          {
            heading: '2. Cân bằng da & Cấp ẩm đa tầng',
            body: 'Toner và Essence chứa Hyaluronic Acid (HA) hoặc nước hoa hồng hữu cơ giúp bù đắp lượng ẩm tức thì, chuẩn bị cho da đón nhận các dưỡng chất tiếp theo hiệu quả gấp 3 lần.',
            tips: ['Vỗ nhẹ bằng tay sạch thay vì chà xát bông tẩy trang quá mạnh']
          },
          {
            heading: '3. Khóa ẩm và bảo vệ hàng rào da',
            body: 'Kem dưỡng ẩm chứa Ceramide, B5 hoặc Niacinamide đóng vai trò như lớp màng khóa ẩm vững chắc, ngăn tình trạng hút ẩm ngược và duy trì độ đàn hồi.',
            tips: ['Lựa chọn kết cấu gel mỏng nhẹ cho da dầu, kết cấu cream mịn cho da khô']
          }
        ],
        conclusion: 'Kiên trì chính là chìa khóa của làn da khỏe đẹp. Hãy lắng nghe làn da của bạn và điều chỉnh liều lượng theo từng mùa trong năm.',
        recommendedProducts: [
          { name: 'Nước Hoa Hồng Cân Bằng Cấp Ẩm Chuyên Sâu', category: 'Toner', price: 350000 },
          { name: 'Tinh Chất Serum Phục Hồi Và Làm Sáng Da Căng Bóng', category: 'Serum', price: 450000 },
        ]
      }
    },
    {
      id: 'sunscreen-common-mistakes',
      title: 'Top 5 Sai Lầm Khi Dùng Kem Chống Nắng Khiến Da Vẫn Bị Sạm Nám',
      category: 'Chăm sóc da',
      categorySlug: 'skincare',
      date: '12/09/2026',
      readTime: '4 phút đọc',
      views: 2890,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80&auto=format&fit=crop',
      summary: 'Dù bôi kem chống nắng mỗi ngày nhưng da vẫn sạm đen và đổ dầu? Kiểm tra ngay bạn có đang mắc phải 5 sai lầm phổ biến dưới đây hay không.',
      content: {
        intro: 'Kem chống nắng là lá chắn quan trọng nhất chống lại lão hóa và ung thư da. Tuy nhiên, hơn 70% người dùng vẫn đang thoa kem chống nắng sai cách dẫn đến hiệu quả bảo vệ bị giảm sút nghiêm trọng.',
        sections: [
          {
            heading: 'Sai lầm 1: Bôi lượng kem không đủ tiêu chuẩn',
            body: 'Lượng kem tiêu chuẩn cho toàn mặt là khoảng 2mg/cm², tương đương 1 đồng xu hoặc 2 đốt ngón tay trỏ. Bôi quá mỏng sẽ khiến chỉ số SPF thực tế giảm tới 70%.',
            tips: ['Chấm đều nhiều điểm nhỏ trên mặt rồi vỗ nhẹ để kem thẩm thấu đều']
          },
          {
            heading: 'Sai lầm 2: Quên thoa lại trong ngày',
            body: 'Màng lọc chống nắng sẽ thoái hóa dần dưới tác động của tia UV và mồ hôi. Bạn nên thoa lại sau mỗi 2-3 tiếng nếu hoạt động ngoài trời, hoặc ít nhất 1 lần vào đầu giờ chiều.',
            tips: ['Sử dụng xịt chống nắng hoặc phấn phủ có SPF để dặm lại nhanh trên lớp makeup']
          }
        ],
        conclusion: 'Chống nắng là khoản đầu tư thông minh và tiết kiệm nhất cho làn da thanh xuân của bạn.',
        recommendedProducts: [
          { name: 'Kem Chống Nắng Dịu Nhẹ Nâng Tone Kiềm Dầu SPF50+', category: 'Chống nắng', price: 400000 }
        ]
      }
    },
    {
      id: 'bha-aha-niacinamide-guide',
      title: 'Phân Biệt BHA, AHA và Niacinamide: Đâu Là Chân Ái Cho Bạn?',
      category: 'Cẩm nang Thành phần',
      categorySlug: 'ingredients',
      date: '10/09/2026',
      readTime: '7 phút đọc',
      views: 4150,
      image: 'https://images.unsplash.com/photo-1608248597359-593645b23d53?w=800&q=80&auto=format&fit=crop',
      summary: 'Hiểu rõ cơ chế hoạt động của các hoạt chất vàng trong mỹ phẩm để kết hợp an toàn, trị mụn đầu đen, thu nhỏ lỗ chân lông và làm sáng da không kích ứng.',
      content: {
        intro: 'AHA, BHA và Niacinamide là bộ ba hoạt chất làm mưa làm gió trong cộng đồng skincare. Hiểu rõ bản chất từng loại sẽ giúp bạn tự thiết kế phác đồ chăm sóc chuẩn chỉnh cho riêng mình.',
        sections: [
          {
            heading: 'AHA (Alpha Hydroxy Acid) - Bậc thầy bề mặt',
            body: 'AHA tan trong nước, tác động lên lớp tế bào chết bề mặt, kích thích chu kỳ thay da mới. Rất thích hợp cho da khô, da sần sùi, da có đốm nâu và nếp nhăn li ti.',
            tips: ['Nồng độ lý tưởng bắt đầu: 5% - 7%', 'Bắt buộc chống nắng kỹ vì AHA tăng độ nhạy cảm với ánh sáng']
          },
          {
            heading: 'BHA (Salicylic Acid) - Dũng sĩ dọn sạch lỗ chân lông',
            body: 'BHA tan trong dầu, có khả năng len lỏi sâu vào lỗ chân lông để làm tan bã nhờn vón cục, tiêu diệt mụn đầu đen, mụn cám và kháng viêm cho mụn sưng đỏ.',
            tips: ['Sử dụng 2-3 lần/tuần vào buổi tối', 'Bắt đầu với nồng độ 1% - 2%']
          },
          {
            heading: 'Niacinamide (Vitamin B3) - Người hòa giải đa năng',
            body: 'Niacinamide giúp điều tiết tuyến bã nhờn, tăng cường hàng rào bảo vệ tự nhiên Ceramide và làm đều màu các vết thâm sau mụn.',
            tips: ['Có thể dùng cả sáng và tối', 'Kết hợp cực tốt cùng Hyaluronic Acid và B5']
          }
        ],
        conclusion: 'Đừng vội vàng tăng nồng độ cao ngay từ đầu. Làn da đẹp là làn da được thích nghi dần dần và bền bỉ.',
        recommendedProducts: [
          { name: 'Serum BHA 2% Thu Nhỏ Lỗ Chân Lông & Sạch Bã Nhờn', category: 'Serum', price: 480000 }
        ]
      }
    },
    {
      id: 'skin-barrier-recovery-14-days',
      title: 'Hồi Sinh Làn Da Nhiễm Corticoid & Tổn Thương Màng Ẩm Trong 14 Ngày',
      category: 'Trị mụn & Phục hồi',
      categorySlug: 'treatment',
      date: '08/09/2026',
      readTime: '5 phút đọc',
      views: 3120,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80&auto=format&fit=crop',
      summary: 'Phác đồ cấp cứu làn da bị đỏ rát, bong tróc do lạm dụng peel da hoặc mỹ phẩm kém chất lượng với công thức phục hồi bằng Rau má (Centella) và B5.',
      content: {
        intro: 'Hàng rào bảo vệ da (Skin Barrier) bị tổn thương sẽ khiến vi khuẩn và chất độc hại dễ dàng xâm nhập, dẫn đến hiện tượng đỏ rát, giãn mao mạch và mụn bùng phát.',
        sections: [
          {
            heading: 'Tối giản quy trình (Skincare Detox)',
            body: 'Ngưng ngay các sản phẩm tẩy da chết, cồn, hương liệu và treatment mạnh. Chỉ giữ lại 3 bước căn bản: Rửa mặt dịu nhẹ, Cấp ẩm phục hồi và Chống nắng vật lý.',
            tips: ['Rửa mặt bằng nước mát hoặc nước muối sinh lý ấm trong 3 ngày đầu']
          },
          {
            heading: 'Bổ sung các thành phần "vàng" chữa lành',
            body: 'Ưu tiên chiết xuất Rau má (Madecassoside), Panthenol (Vitamin B5) và Ceramide Complex. Các hoạt chất này thúc đẩy tăng sinh tế bào biểu bì mới nhanh gấp 2 lần.',
            tips: ['Thoa kem dưỡng ẩm dạng balm hoặc gel làm dịu nhiều lần trong ngày khi thấy căng tức']
          }
        ],
        conclusion: 'Kiên nhẫn và nuôi dưỡng màng ẩm sẽ giúp làn da của bạn lấy lại sức sống nguyên bản.',
        recommendedProducts: [
          { name: 'Kem Dưỡng B5 Phục Hồi Chuyên Sâu Hoàng Bảo', category: 'Moisturizer', price: 390000 }
        ]
      }
    },
    {
      id: 'choose-lipstick-by-undertone',
      title: 'Bí Quyết Chọn Màu Son Tôn Da Theo Sắc Tố Da (Undertone)',
      category: 'Bí quyết Makeup',
      categorySlug: 'makeup',
      date: '05/09/2026',
      readTime: '4 phút đọc',
      views: 2750,
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80&auto=format&fit=crop',
      summary: 'Xác định tone da Cool, Warm hay Neutral chỉ bằng cách nhìn mạch máu cổ tay và lựa chọn sắc son đỏ thuần, cam đất hay hồng đất giúp nụ cười tỏa sáng.',
      content: {
        intro: 'Bạn mua một màu son rất hot nhưng khi đánh lên lại thấy da xỉn màu và răng bị vàng? Đó là vì màu son đó không hòa hợp với sắc tố da ngầm (Undertone) của bạn.',
        sections: [
          {
            heading: 'Cách xác định Undertone chính xác nhất',
            body: 'Quan sát tĩnh mạch ở cổ tay dưới ánh sáng tự nhiên:\n- Màu xanh lá cây: Warm Undertone (Tone ấm)\n- Màu xanh dương hoặc tím: Cool Undertone (Tone lạnh)\n- Pha trộn cả hai màu: Neutral Undertone (Tone trung tính).',
            tips: ['Kiểm tra cùng việc đeo trang sức: nếu hợp bạc là Tone lạnh, hợp vàng là Tone ấm']
          },
          {
            heading: 'Gợi ý màu son cho từng sắc tố',
            body: 'Tone ấm cực kỳ tôn vinh các gam màu cam cháy, đỏ đất, gạch ngói. Trong khi đó Tone lạnh sẽ cực kỳ rực rỡ với đỏ rượu, đỏ thuần ánh xanh và hồng mận bí ẩn.',
            tips: ['Nếu thuộc tone trung tính, chúc mừng bạn có thể thử mọi màu son ưa thích']
          }
        ],
        conclusion: 'Một thỏi son đúng sắc thái không chỉ làm đẹp đôi môi mà còn thắp sáng toàn bộ thần thái của bạn.',
        recommendedProducts: [
          { name: 'Son Kem Lì Mịn Mượt Môi Dưỡng Ẩm Hoàng Bảo', category: 'Son môi', price: 290000 }
        ]
      }
    },
    {
      id: 'clean-beauty-trend-2026',
      title: 'Xu Hướng Clean Beauty: Mỹ Phẩm Thuần Chay Và Bền Vững Lên Ngôi',
      category: 'Xu hướng Làm đẹp',
      categorySlug: 'trends',
      date: '01/09/2026',
      readTime: '5 phút đọc',
      views: 3880,
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80&auto=format&fit=crop',
      summary: 'Tại sao thế hệ trẻ ngày càng ưa chuộng mỹ phẩm thuần chay (Vegan), không thử nghiệm trên động vật (Cruelty-Free) và bao bì tái chế bảo vệ hành tinh?',
      content: {
        intro: 'Làm đẹp ngày nay không chỉ dừng lại ở hiệu quả trên làn da, mà còn là trách nhiệm với môi trường sống và tình yêu thương muôn loài.',
        sections: [
          {
            heading: 'Tiêu chuẩn mỹ phẩm xanh chuẩn quốc tế',
            body: 'Mỹ phẩm sạch loại bỏ hoàn toàn paraben, sulfate, dầu khoáng và vi nhựa. Nguồn gốc nguyên liệu được canh tác hữu cơ có chứng chỉ bền vững.',
            tips: ['Tìm kiếm chứng chỉ Leaping Bunny hoặc Vegan Society trên nhãn chai']
          },
          {
            heading: 'Bao bì thân thiện và có thể tái chế',
            body: 'Hoàng Bảo Cosmetics tiên phong sử dụng chai thủy tinh cao cấp và hộp giấy từ rừng tái sinh, góp phần giảm thiểu rác thải nhựa đại dương.',
            tips: ['Đem vỏ chai cũ đến các chi nhánh Hoàng Bảo để nhận điểm thưởng tích lũy']
          }
        ],
        conclusion: 'Đẹp bền vững cho chính bạn và cho cả thiên nhiên xung quanh.',
        recommendedProducts: [
          { name: 'Sữa Rửa Mặt Tạo Bọt Hữu Cơ Tràm Trà', category: 'Làm sạch', price: 280000 }
        ]
      }
    }
  ];

  // Bảng tra cứu thành phần vàng
  const ingredientsGuide = [
    {
      name: 'AHA (Glycolic / Lactic Acid)',
      role: 'Tẩy da chết bề mặt, làm sáng da',
      suitableFor: 'Da sần sùi, da khô, da lão hóa',
      note: 'Dùng buổi tối, bắt buộc bôi kem chống nắng ban ngày.'
    },
    {
      name: 'BHA (Salicylic Acid)',
      role: 'Sạch sâu lỗ chân lông, kiềm dầu, ngừa mụn',
      suitableFor: 'Da dầu mụn, mụn đầu đen, bít tắc',
      note: 'Bắt đầu từ nồng độ 1-2%, dùng 2-3 lần/tuần.'
    },
    {
      name: 'Hyaluronic Acid (HA)',
      role: 'Ngậm nước gấp 1000 lần trọng lượng, căng bóng',
      suitableFor: 'Mọi loại da, đặc biệt da thiếu ẩm',
      note: 'Thoa trên nền da ẩm để tránh hút ẩm ngược.'
    },
    {
      name: 'Niacinamide (Vitamin B3)',
      role: 'Thu nhỏ lỗ chân lông, làm đều màu, mờ thâm',
      suitableFor: 'Da dầu, da thâm mụn, da xỉn màu',
      note: 'Phù hợp dùng hàng ngày, lành tính với da nhạy cảm.'
    },
    {
      name: 'Retinol & Bakuchiol',
      role: 'Kích thích tăng sinh Collagen, mờ nếp nhăn',
      suitableFor: 'Da bắt đầu lão hóa từ tuổi 25+',
      note: 'Cần cấp ẩm kỹ, dùng cách ngày để da thích ứng.'
    },
    {
      name: 'Centella Asiatica (Rau má) & B5',
      role: 'Làm dịu kích ứng, phục hồi màng ẩm tổn thương',
      suitableFor: 'Da nhạy cảm, da sau peel, da treatment',
      note: 'Có thể dùng nhiều lần trong ngày để làm dịu da rát.'
    }
  ];

  // Lọc bài viết
  const filteredArticles = useMemo(() => {
    return articles.filter(art => {
      const matchCat = selectedCategory === 'all' || art.categorySlug === selectedCategory;
      const matchQuery = searchQuery.trim() === '' || 
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        art.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  const featuredArticle = articles[0];

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSuccess(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      
      {/* 1. Header Banner */}
      <section className="bg-white border-b border-gray-200 py-10 md:py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-center">
          <nav className="text-xs text-gray-500 mb-3 flex items-center justify-center gap-1.5">
            <Link to="/" className="hover:text-rose-600 transition-colors">Trang chủ</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Tin tức & Cẩm nang</span>
          </nav>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-rose-50 text-rose-600 text-xs font-semibold uppercase tracking-wider mb-3 border border-rose-200">
            <Sparkles size={14} /> Chuyên Trang Làm Đẹp Hoàng Bảo
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
            Tin Tức & Cẩm Nang Chăm Sóc Da
          </h1>

          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Kho tàng kiến thức da liễu chuẩn khoa học, bí quyết dưỡng nhan và cập nhật những xu hướng mỹ phẩm chính hãng mới nhất.
          </p>

          {/* Ô Tìm Kiếm Bài Viết */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm mẹo chăm da, hoạt chất BHA, Retinol..."
                className="w-full pl-4 pr-11 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-sm bg-white transition-colors"
              />
              <Search size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 max-w-6xl">

        {/* ── BÀI VIẾT NỔI BẬT (FEATURED HERO ARTICLE) ── */}
        {!searchQuery && selectedCategory === 'all' && (
          <div className="mb-12 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-gray-100">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded shadow-sm">
                  Tâm điểm tuần này
                </div>
              </div>

              <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="font-semibold text-rose-600 uppercase">{featuredArticle.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Calendar size={13} /> {featuredArticle.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock size={13} /> {featuredArticle.readTime}</span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug hover:text-rose-600 transition-colors cursor-pointer"
                    onClick={() => setActiveArticle(featuredArticle)}
                  >
                    {featuredArticle.title}
                  </h2>

                  <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {featuredArticle.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Eye size={14} /> {featuredArticle.views.toLocaleString()} lượt xem
                  </span>

                  <button
                    onClick={() => setActiveArticle(featuredArticle)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 uppercase tracking-wider transition-colors"
                  >
                    Đọc Chi Tiết <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── BỘ LỌC DANH MỤC ── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none border-b border-gray-200">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-md text-xs md:text-sm font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── GRID BÀI VIẾT ── */}
        {filteredArticles.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center my-6">
            <BookOpen size={36} className="mx-auto text-gray-400 mb-3" />
            <h3 className="text-lg font-bold text-gray-800 mb-1">Không tìm thấy bài viết phù hợp</h3>
            <p className="text-sm text-gray-500 mb-4">
              Vui lòng thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác.
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="px-5 py-2 rounded-md bg-rose-500 text-white text-xs font-semibold uppercase tracking-wider"
            >
              Xem tất cả bài viết
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredArticles.map(article => (
              <article
                key={article.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
              >
                {/* Thumbnail */}
                <div 
                  className="relative aspect-[16/10] overflow-hidden bg-gray-100 cursor-pointer"
                  onClick={() => setActiveArticle(article)}
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 text-[11px] font-bold px-2.5 py-1 rounded uppercase tracking-wider border border-gray-200">
                    {article.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
                    </div>

                    <h3 
                      className="font-bold text-gray-900 text-base leading-snug group-hover:text-rose-600 transition-colors line-clamp-2 cursor-pointer mb-2"
                      onClick={() => setActiveArticle(article)}
                    >
                      {article.title}
                    </h3>

                    <p className="text-xs md:text-sm text-gray-500 line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Eye size={13} /> {article.views.toLocaleString()}
                    </span>

                    <button
                      onClick={() => setActiveArticle(article)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors"
                    >
                      Xem thêm <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ── BẢNG CẨM NANG THÀNH PHẦN VÀNG (INGREDIENTS CHEAT SHEET) ── */}
        <section className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 mb-16 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-gray-200 pb-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">
                <Droplet size={14} /> Bảng Tra Cứu Da Liễu
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Cẩm Nang Thành Phần "Vàng" Cho Từng Vấn Đề Da
              </h2>
            </div>
            <p className="text-xs md:text-sm text-gray-500 max-w-md">
              Tham khảo nhanh hoạt chất phù hợp trước khi lựa chọn sản phẩm skincare điều trị.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-700 uppercase font-semibold">
                  <th className="py-3 px-4">Tên Hoạt Chất</th>
                  <th className="py-3 px-4">Công Dụng Nổi Bật</th>
                  <th className="py-3 px-4">Loại Da Phù Hợp</th>
                  <th className="py-3 px-4">Lưu Ý Quan Trọng</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-600">
                {ingredientsGuide.map((ing, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-gray-900 whitespace-nowrap">
                      {ing.name}
                    </td>
                    <td className="py-3.5 px-4 text-gray-700">
                      {ing.role}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-rose-600">
                      {ing.suitableFor}
                    </td>
                    <td className="py-3.5 px-4 text-gray-500 text-xs">
                      {ing.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── ĐĂNG KÝ NHẬN BẢN TIN LÀM ĐẸP (NEWSLETTER) ── */}
        <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg p-8 md:p-12 shadow-sm relative overflow-hidden">
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <span className="text-xs font-bold uppercase tracking-[3px] text-rose-400 mb-2 block">
              BẢN TIN HOÀNG BẢO BEAUTY
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold mb-3 text-white">
              Nhận Cẩm Nang Làm Đẹp Miễn Phí Mỗi Tuần
            </h3>
            <p className="text-gray-300 text-xs md:text-sm mb-6 leading-relaxed">
              Cập nhật các bài viết phân tích thành phần mới nhất, bí quyết săn sale mỹ phẩm chính hãng và voucher giảm 10% cho đơn hàng tiếp theo.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                placeholder="Nhập địa chỉ email của bạn..."
                className="flex-1 px-4 py-2.5 rounded-md border border-gray-700 bg-gray-800/90 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-rose-500"
                required
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-md bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm transition-colors shrink-0"
              >
                <Send size={15} /> Đăng Ký
              </button>
            </form>

            {newsletterSuccess && (
              <div className="mt-3 text-xs text-emerald-400 font-medium">
                ✓ Cảm ơn bạn đã đăng ký! Hoàng Bảo Cosmetics sẽ gửi cẩm nang chăm da sớm nhất cho bạn.
              </div>
            )}
          </div>
        </section>

      </main>

      {/* ── MODAL CHI TIẾT BÀI VIẾT ── */}
      {activeArticle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
          onClick={() => setActiveArticle(null)}
        >
          <div 
            className="bg-white w-full max-w-3xl rounded-lg shadow-xl overflow-hidden my-8 max-h-[90vh] flex flex-col border border-gray-200"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 md:p-6 border-b border-gray-200 flex items-center justify-between bg-gray-50/70 shrink-0">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded border border-rose-200">
                {activeArticle.category}
              </span>
              <button 
                onClick={() => setActiveArticle(null)}
                className="p-1 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-gray-800">
              <div>
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                  <span className="flex items-center gap-1"><Calendar size={13} /> {activeArticle.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock size={13} /> {activeArticle.readTime}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Eye size={13} /> {activeArticle.views.toLocaleString()} lượt xem</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                  {activeArticle.title}
                </h2>
              </div>

              {/* Cover Image */}
              <div className="aspect-[16/9] w-full rounded-md overflow-hidden bg-gray-100">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Intro */}
              <p className="text-base text-gray-700 leading-relaxed italic border-l-4 border-rose-500 pl-4 py-1 bg-rose-50/30">
                {activeArticle.content.intro}
              </p>

              {/* Sections */}
              <div className="space-y-6">
                {activeArticle.content.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-2.5">
                    <h3 className="text-lg font-bold text-gray-900">
                      {sec.heading}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      {sec.body}
                    </p>
                    {sec.tips && sec.tips.length > 0 && (
                      <div className="bg-gray-50 border border-gray-200 rounded-md p-3.5 space-y-1.5">
                        <span className="text-xs font-bold text-gray-700 uppercase tracking-wide flex items-center gap-1">
                          <CheckCircle2 size={14} className="text-emerald-600" /> Mẹo từ chuyên gia:
                        </span>
                        <ul className="list-disc list-inside text-xs md:text-sm text-gray-600 space-y-1 pl-1">
                          {sec.tips.map((tip, tIdx) => (
                            <li key={tIdx}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Conclusion */}
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-bold uppercase text-gray-800 mb-1">Lời kết</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {activeArticle.content.conclusion}
                </p>
              </div>

              {/* Recommended Products */}
              {activeArticle.content.recommendedProducts && (
                <div className="bg-rose-50/50 border border-rose-200 rounded-md p-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 mb-3 flex items-center gap-1.5">
                    <ShoppingBag size={14} /> Gợi ý sản phẩm phù hợp cho bài viết
                  </h4>
                  <div className="space-y-2">
                    {activeArticle.content.recommendedProducts.map((prod, pIdx) => (
                      <div key={pIdx} className="flex items-center justify-between gap-3 bg-white p-3 rounded border border-gray-200">
                        <div>
                          <p className="text-xs md:text-sm font-bold text-gray-900">{prod.name}</p>
                          <span className="text-[11px] text-gray-500">{prod.category}</span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs md:text-sm font-bold text-rose-600">
                            {prod.price.toLocaleString('vi-VN')}₫
                          </span>
                          <Link
                            to="/products"
                            onClick={() => setActiveArticle(null)}
                            className="px-3 py-1 bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold rounded transition-colors"
                          >
                            Xem ngay
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between shrink-0">
              <span className="text-xs text-gray-500">Hoàng Bảo Cosmetics • Chăm sóc da khoa học</span>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2 rounded-md bg-gray-900 hover:bg-black text-white text-xs font-semibold transition-colors"
              >
                Đóng bài viết
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}