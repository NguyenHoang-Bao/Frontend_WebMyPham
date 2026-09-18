export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio?: string;
  department?: string;
}

export interface RecommendedProduct {
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image?: string;
}

export interface InlineImage {
  url: string;
  caption: string;
  credit?: string;
}

export interface ArticleSection {
  heading: string;
  body: string;
  tips?: string[];
  inlineImage?: InlineImage;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  categorySlug: 'skincare' | 'makeup' | 'treatment' | 'ingredients' | 'trends';
  date: string;
  timePublished: string;
  readTime: string;
  views: number;
  image: string;
  photoCredit: string;
  summary: string;
  pullQuote?: {
    quote: string;
    speaker: string;
  };
  author: Author;
  tags: string[];
  content: {
    intro: string;
    sections: ArticleSection[];
    conclusion: string;
    recommendedProducts?: RecommendedProduct[];
  };
}

export interface CategoryItem {
  id: string;
  label: string;
}

export interface IngredientGuideItem {
  name: string;
  scientificName: string;
  role: string;
  suitableFor: string;
  note: string;
  dosage: string;
}

export const defaultAuthors: Record<string, Author> = {
  dr_lan_anh: {
    name: 'BS. CKII Nguyễn Lan Anh',
    role: 'Bác sĩ Chuyên khoa II Da liễu - Cố vấn Y khoa Hoàng Bảo',
    department: 'Hội đồng Da liễu Lâm sàng & Thẩm mỹ TP.HCM',
    avatar: 'https://images.unsplash.com/photo-1594824813629-87cfa77d0186?w=400&q=80&auto=format&fit=crop',
    bio: 'Bác sĩ Lan Anh có hơn 14 năm kinh nghiệm công tác tại các bệnh viện da liễu tuyến đầu, chuyên nghiên cứu về sinh lý học màng lipid biểu bì và phục hồi da tổn thương sau can thiệp thẩm mỹ.'
  },
  mai_phuong: {
    name: 'Nhà báo Mai Phương',
    role: 'Trưởng ban Biên tập Khoa học Làn da & Mỹ phẩm',
    department: 'Tạp chí Hoàng Bảo Beauty Journal',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80&auto=format&fit=crop',
    bio: 'Tốt nghiệp cử nhân Hóa dược Đại học Quốc gia, Mai Phương đã có 9 năm theo đuổi mảng báo chí phân tích hoạt chất mỹ phẩm và phỏng vấn các chuyên gia đầu ngành trong và ngoài nước.'
  },
  hoang_nam: {
    name: 'Chuyên gia Hoàng Nam',
    role: 'Giám đốc Nghệ thuật & Chuyên gia Trang điểm Cao cấp',
    department: 'Ban Đào tạo Nghệ thuật Trang điểm Chuyên nghiệp',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop',
    bio: 'Từng tu nghiệp tại Paris và Seoul, Hoàng Nam sở hữu hơn 10 năm kinh nghiệm định hình phong cách trang điểm cho các tuần lễ thời trang và cố vấn sắc tố da cho người phụ nữ Á Đông.'
  }
};

export const blogCategories: CategoryItem[] = [
  { id: 'all', label: 'Tất cả chuyên mục' },
  { id: 'skincare', label: 'Khoa học Chăm sóc da' },
  { id: 'treatment', label: 'Phục hồi & Trị liệu Da liễu' },
  { id: 'ingredients', label: 'Cẩm nang Hoạt chất Y khoa' },
  { id: 'makeup', label: 'Nghệ thuật Trang điểm' },
  { id: 'trends', label: 'Xu hướng & Phong cách sống' },
];

export const articlesData: Article[] = [
  {
    id: 'skincare-routine-beginner',
    title: 'Giải mã quy trình 7 bước dưỡng da chuẩn da liễu: Cơ chế thẩm thấu và nguyên lý phục hồi màng lipid',
    subtitle: 'Nhiều người chi hàng chục triệu đồng cho serum cao cấp nhưng làn da vẫn sần sùi bít tắc. Bản báo cáo chuyên sâu này sẽ phân tích tường tận nguyên lý hấp thu tế bào và thứ tự chăm sóc khoa học.',
    category: 'Khoa học Chăm sóc da',
    categorySlug: 'skincare',
    date: '15/09/2026',
    timePublished: '08:30',
    readTime: '8 phút đọc',
    views: 4820,
    image: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=1400&q=85&auto=format&fit=crop',
    photoCredit: 'Getty Images / Tư liệu nghiên cứu Viện Da liễu Quốc tế',
    summary: 'Phân tích cơ chế sinh học đằng sau kỹ thuật Double Cleansing, nguyên lý ngậm nước đa tầng của Hyaluronic Acid và vai trò tối thượng của việc củng cố lớp màng Ceramide bảo vệ da.',
    pullQuote: {
      quote: 'Làn da không phải là một chiếc xô để chúng ta đổ dồn dập mọi hoạt chất đắt tiền vào. Nó là một cơ quan sống với hệ sinh thái vi sinh vật và cấu trúc biểu mô đa tầng đòi hỏi sự tôn trọng nhịp sinh học tự nhiên.',
      speaker: 'BS. CKII Nguyễn Lan Anh (Cố vấn Y khoa Hoàng Bảo)'
    },
    author: defaultAuthors.dr_lan_anh,
    tags: ['Sinh lý da', 'Skincare Routine', 'Làm sạch kép', 'Hàng rào lipid', 'Da liễu học'],
    content: {
      intro: 'Theo thống kê lâm sàng tại các phòng khám da liễu lớn năm 2025, có tới hơn 68% trường hợp bệnh nhân gặp tình trạng viêm da tiếp xúc hoặc bùng phát mụn ẩn không phải do thiếu mỹ phẩm, mà do sử dụng quá nhiều sản phẩm sai thứ tự và triệt tiêu màng ẩm sinh học của cơ thể. Để các phân tử dưỡng chất có thể xuyên qua lớp sừng (Stratum Corneum) dày từ 15-20 lớp tế bào dẹt, quy trình chăm sóc cần được thiết kế dựa trên định luật khuếch tán Fick và độ phân cực của từng nhóm dung môi.',
      sections: [
        {
          heading: '1. Làm sạch kép (Double Cleansing): Nguyên lý "Dầu hòa tan dầu" và bảo toàn màng Acid Mantle',
          body: 'Mỗi ngày, bề mặt da phải hứng chịu hỗn hợp phức tạp gồm bã nhờn tự nhiên bị oxy hóa bởi tia UV, màng lọc kem chống nắng gốc silicone chống trôi nước và các hạt bụi mịn PM2.5 mang theo ion kim loại nặng. Nước lã hoặc các chất hoạt động bề mặt thông thường trong sữa rửa mặt tạo bọt không thể bẻ gãy các liên kết kỵ nước này.\n\nBước 1 đòi hỏi dầu tẩy trang hoặc sáp tẩy trang chứa các triglyceride thực vật (như dầu jojoba, dầu hạt nho) để hòa tan bã nhờn sâu trong lỗ chân lông. Quá trình nhũ hóa với nước ấm là then chốt: các phân tử chất hoạt động bề mặt sẽ bắt lấy dầu thừa và rửa trôi hoàn toàn, không để lại cảm giác nhờn dính.\n\nBước 2 tiếp nối bằng sữa rửa mặt dạng gel hoặc bọt mịn có độ pH chuẩn sinh lý dao động từ 5.0 đến 5.5. Việc duy trì tính acid nhẹ này là điều kiện sinh tồn của hệ lợi khuẩn da (Microbiome) và ngăn chặn sự sinh sôi của khuẩn kỵ khí Cutibacterium acnes.',
          inlineImage: {
            url: 'https://images.unsplash.com/photo-1556760544-74068565f05c?w=1200&q=80&auto=format&fit=crop',
            caption: 'Thao tác làm sạch hai bước được khuyến cáo thực hiện trên nền da khô ráo với thời gian massage nhũ hóa tối thiểu 60 giây.',
            credit: 'Ảnh: Studio Y khoa Hoàng Bảo'
          },
          tips: [
            'Rửa sạch tay bằng xà phòng diệt khuẩn trước khi chạm vào da mặt.',
            'Tránh dùng nước quá nóng vượt quá 38°C vì nhiệt độ cao làm chảy lớp lipid gian bào, gây khô ráp và giãn mao mạch.',
            'Dùng khăn bông sợi tre chuyên dụng hoặc bông cotton vỗ nhẹ, tuyệt đối không miết hay chà xát mạnh.'
          ]
        },
        {
          heading: '2. Tái lập cân bằng và mở đường dẫn ẩm (Balancing & Hydration Pathways)',
          body: 'Sau khi làm sạch, dù sản phẩm có dịu nhẹ đến đâu thì độ ẩm tức thì của lớp biểu bì vẫn sụt giảm từ 15-20%. Đây là thời điểm vàng (trong vòng 60 giây đầu tiên) để sử dụng Toner hoặc Nước thần (Essence) giàu các nhân tố dưỡng ẩm tự nhiên (NMF - Natural Moisturizing Factors) như Amino Acids, PCA và Hyaluronic Acid phân tử nhỏ.\n\nKhi tế bào sừng được ngậm đủ nước, chúng sẽ trương nở mềm mại, tạo thành các khe rãnh thuận lợi giúp các đại phân tử hoạt chất ở bước tinh chất tiếp theo thẩm thấu sâu hơn tới 300% so với bề mặt da khô ráp.',
          inlineImage: {
            url: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&q=80&auto=format&fit=crop',
            caption: 'Kết cấu dạng lỏng giàu Hyaluronic Acid giúp cân bằng độ pH và làm dịu ngay các thụ thể cảm giác dưới da.',
            credit: 'Ảnh: Tư liệu Viện Nghiên cứu Da liễu'
          },
          tips: [
            'Áp dụng phương pháp vỗ nhẹ bằng lòng bàn tay sạch từ dưới lên trên để kích thích tuần hoàn máu ngoại vi.',
            'Tránh các loại toner chứa cồn biến tính (Alcohol Denat) nồng độ cao trên 10% nếu da bạn dễ mẩn đỏ.'
          ]
        },
        {
          heading: '3. Tinh chất điều trị đích (Targeted Treatment Serum): Quy tắc phân tử lượng và độ pH',
          body: 'Serum chính là "trái tim" của toàn bộ chu trình dưỡng da chuyên sâu. Tại bước này, nguyên tắc bất di bất dịch trong da liễu học là sắp xếp theo thứ tự: từ sản phẩm có độ pH thấp đến cao, từ thể chất lỏng nhẹ như nước đến dạng sệt hoặc nhũ tương.\n\n- Nếu dùng Vitamin C nguyên chất dạng L-Ascorbic Acid (yêu cầu pH 2.5 - 3.5) hoặc AHA/BHA, hãy thoa trước tiên và để da nghỉ ngơi từ 10 - 15 phút.\n- Kế tiếp là các serum gốc nước chứa Niacinamide, Hyaluronic Acid, Peptide hoặc Vitamin B5 (hoạt động ổn định ở pH trung tính 5.5 - 6.5).\n- Cuối cùng là các loại tinh chất chứa Retinoids hoặc dầu dưỡng (Face Oil) có phân tử lượng lớn hơn.',
          inlineImage: {
            url: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=1200&q=80&auto=format&fit=crop',
            caption: 'Sử dụng ống nhỏ giọt (dropper) đặt cách mặt 1cm, không để đầu hút chạm trực tiếp vào da nhằm tránh nhiễm khuẩn ngược vào lọ serum.',
            credit: 'Ảnh: Trung tâm Xét nghiệm Dược mỹ phẩm'
          },
          tips: [
            'Không tham lam layer quá 3 loại serum cùng một thời điểm để tránh hiện tượng vón cục (pilling) và kích ứng chéo.',
            'Lắng nghe độ ẩm của da theo thời tiết: Giảm bớt số lượng bước vào những ngày oi bức nhiều độ ẩm.'
          ]
        },
        {
          heading: '4. Khóa ẩm và phục hồi hàng rào màng sinh học (Barrier Reinforcement)',
          body: 'Theo định luật vật lý về độ bốc hơi nước qua thượng bì (Transepidermal Water Loss - TEWL), toàn bộ độ ẩm vừa cung cấp sẽ thất thoát ra không khí chỉ sau 30 phút nếu thiếu một lớp màng khóa ẩm vững chắc. Kem dưỡng ẩm chất lượng không đơn giản chỉ tạo độ bóng giả tạo, mà cần chứa tỷ lệ vàng của bộ ba lipid sinh lý: Ceramide, Cholesterol và Axit béo tự do theo tỷ lệ xấp xỉ 3:1:1.\n\nChính lớp "vữa sinh học" này sẽ gắn kết các tế bào sừng dẹt lại với nhau thành một bức tường kiên cố, ngăn chặn các tác nhân ô nhiễm môi trường, vi khuẩn và nấm men xâm nhập sâu vào trung bì.',
          inlineImage: {
            url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80&auto=format&fit=crop',
            caption: 'Chất kem phục hồi chứa Ceramide và Panthenol tạo lớp màng bảo vệ thoáng khí nhưng khóa chặt độ ẩm suốt 24 giờ.',
            credit: 'Ảnh: Getty Images'
          },
          tips: [
            'Với làn da dầu mụn mùa hè, kết cấu dạng Gel-Cream hoặc Water-Gel chứa Dimethicone mỏng nhẹ là lựa chọn tối ưu.',
            'Với da điều trị laser, peel da hoặc da khô bong tróc, dạng Cream đặc giàu bơ hạt mỡ hữu cơ và Squalane sẽ mang lại hiệu quả chữa lành tức thì.'
          ]
        }
      ],
      conclusion: 'Chăm sóc da khoa học là sự hòa hợp giữa kiến thức sinh lý và tính kỷ luật đều đặn mỗi ngày. Khi bạn từ bỏ thói quen bôi thoa theo trào lưu thiếu căn cứ và bắt đầu lắng nghe phản ứng sinh học của làn da, bạn sẽ nhận thấy sự biến chuyển ngoạn mục: lỗ chân lông se khít tự nhiên, độ đàn hồi gia tăng và làn da toát lên vẻ căng bóng khỏe mạnh từ sâu bên trong.',
      recommendedProducts: [
        { name: 'Nước Hoa Hồng Cân Bằng Cấp Ẩm Chuyên Sâu Hoàng Bảo', category: 'Toner Dược Liệu', price: 350000 },
        { name: 'Tinh Chất Phục Hồi Dịu Da B5 & Rau Má Tinh Khiết', category: 'Serum Chuyên Sâu', price: 450000 },
        { name: 'Kem Dưỡng Sinh Học Phục Hồi Màng Lipid Ceramide Complex', category: 'Kem Dưỡng Khóa Ẩm', price: 390000 }
      ]
    }
  },
  {
    id: 'sunscreen-common-mistakes',
    title: 'Nghiên cứu lâm sàng về 5 sai lầm khi thoa kem chống nắng: Vì sao chỉ số SPF trên nhãn chai không phát huy tác dụng?',
    subtitle: 'Tại sao bạn bôi kem chống nắng đều đặn mỗi sáng nhưng vết nám và đốm nâu vẫn xuất hiện sau tuổi 25? Chuyên gia quang sinh học bóc tách các sai số phổ biến trong thói quen bảo vệ da.',
    category: 'Khoa học Chăm sóc da',
    categorySlug: 'skincare',
    date: '12/09/2026',
    timePublished: '14:15',
    readTime: '7 phút đọc',
    views: 4190,
    image: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=1400&q=85&auto=format&fit=crop',
    photoCredit: 'Phòng Thí nghiệm Quang sinh học & Thử nghiệm SPF Lâm sàng',
    summary: 'Phân tích định lượng liều dùng 2mg/cm², hiện tượng phân rã màng lọc quang phổ rộng dưới nhiệt lượng và giải pháp dặm lại kem chống nắng cho người trang điểm.',
    pullQuote: {
      quote: 'Kem chống nắng không phải là áo giáp bất khả xâm phạm. Nếu bôi sai liều lượng hoặc quên dặm lại, bạn đang tạo ra một ảo tưởng an toàn nguy hiểm cho các tế bào biểu bì bên dưới.',
      speaker: 'Nhà báo Mai Phương (Trưởng ban Khoa học Làn da)'
    },
    author: defaultAuthors.mai_phuong,
    tags: ['Kem chống nắng', 'Tia UVA/UVB', 'Quang hóa học', 'Sạm nám da', 'Bảo vệ da'],
    content: {
      intro: 'Bức xạ tử ngoại mặt trời gồm tia UVB (bước sóng 290-320nm gây bỏng rát, đỏ da) và tia UVA (bước sóng 320-400nm len lỏi sâu vào hạ bì, phá vỡ cấu trúc collagen và làm đứt gãy sợi elastin). Hơn 95% lượng tia UV chạm tới mặt đất là tia UVA, loại bức xạ có khả năng xuyên qua mây mù, sương sớm và cả kính cửa sổ văn phòng. Dù bạn ở trong phòng máy lạnh cả ngày, làn da vẫn đang âm thầm bị tổn thương DNA nếu không được bảo vệ đúng cách.',
      sections: [
        {
          heading: 'Sai lầm 1: Sự thiếu hụt định lượng nghiêm trọng so với tiêu chuẩn ISO 24444',
          body: 'Chỉ số chống nắng SPF (Sun Protection Factor) in trên vỏ hộp được đo đạc trong điều kiện phòng thí nghiệm nghiêm ngặt với mật độ kem chính xác 2 miligram trên mỗi centimet vuông bề mặt biểu bì. Đối với diện tích khuôn mặt trung bình của người trưởng thành (khoảng 350 - 450 cm²), lượng kem cần thiết là từ 0.8 đến 1.0 gram.\n\nKhảo sát thực tế bằng máy soi da huỳnh quang UV cho thấy, đại đa số người dùng chỉ lấy khoảng 0.2 - 0.4 gram (tương đương hạt đậu nành). Khi giảm lượng kem xuống còn 1/3, hiệu quả bảo vệ không giảm theo đường thẳng mà suy giảm theo hàm mũ lũy thừa: một tuýp kem SPF 50 thực tế chỉ còn mang lại khả năng cản tia tương đương SPF 5 đến SPF 7!',
          inlineImage: {
            url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1200&q=80&auto=format&fit=crop',
            caption: 'Quy tắc ngón tay trỏ: Trải đều 2 dải kem dọc theo chiều dài hai đốt ngón tay trỏ và ngón giữa để đạt định lượng chuẩn y khoa.',
            credit: 'Ảnh: Ban Biên tập Tạp chí Hoàng Bảo'
          },
          tips: [
            'Sử dụng quy tắc hai đốt ngón tay đầy (Two-Finger Rule) cho mặt và thêm một đốt riêng biệt cho vùng cổ.',
            'Chấm thành nhiều điểm nhỏ và vỗ đều bằng lòng bàn tay, tránh xoa tròn miết mạnh khiến màng lọc bị dồn cục vào các nếp nhăn.'
          ]
        },
        {
          heading: 'Sai lầm 2: Ảo tưởng về khả năng bảo vệ suốt 24 giờ của một lần bôi duy nhất',
          body: 'Dù là màng lọc vô cơ (Zinc Oxide, Titanium Dioxide) phản xạ tia hay màng lọc hữu cơ thế hệ mới (Tinosorb S, Tinosorb M, Uvinul A Plus) hấp thụ photon quang học, cấu trúc màng film sau khi thoa lên mặt sẽ bị nứt gãy cơ học do biểu cảm gương mặt, ma sát từ khẩu trang và bị pha loãng bởi mồ hôi, bã nhờn tiết ra qua lỗ chân lông.\n\nSau 2 đến 3 tiếng hoạt động ngoài trời, hoặc sau 4 tiếng làm việc trong văn phòng trước màn hình máy tính phát xạ ánh sáng xanh HEV, độ đồng đều của màng chống nắng chỉ còn dưới 45%. Việc không thoa dặm lại đồng nghĩa với việc làn da hoàn toàn trần trụi trước bức xạ vào thời điểm nắng gay gắt nhất lúc 12h - 14h trưa.',
          inlineImage: {
            url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&q=80&auto=format&fit=crop',
            caption: 'Bức xạ mặt trời có thể xuyên qua kính cửa sổ và gây tổn thương tế bào đáy nếu màng lọc không được dặm lại đúng chu kỳ.',
            credit: 'Tư liệu Da liễu Thực nghiệm'
          },
          tips: [
            'Dùng giấy thấm dầu nhẹ nhàng lấy đi bã nhờn thừa ở vùng chữ T trước khi thoa lớp kem mới.',
            'Nếu có lớp trang điểm nền, bạn có thể lựa chọn xịt chống nắng hạt sương nano hoặc dặm phấn phủ chống nắng có chỉ số PA++++.'
          ]
        },
        {
          heading: 'Sai lầm 3: Bỏ quên "vùng tam giác tử thần" - Cổ, gáy và viền mí mắt',
          body: 'Vùng da quanh mắt có độ dày chỉ bằng 1/4 so với da vùng má và hoàn toàn không có tuyến bã nhờn tự nhiên để tự bôi trơn. Trong khi đó, da cổ thường xuyên chịu ma sát từ cổ áo và phơi bày trước ánh nắng xiên khi lái xe. Các bác sĩ phẫu thuật tạo hình cho biết, dấu hiệu lão hóa sớm nhất của một người phụ nữ không nằm ở trán hay má, mà tố cáo rõ ràng nhất qua các nếp gấp nhăn nheo ở cổ và vết chân chim nơi khóe mắt.',
          inlineImage: {
            url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1200&q=80&auto=format&fit=crop',
            caption: 'Kết hợp che chắn vật lý với mũ rộng vành và kính râm có chỉ số UV400 là biện pháp bổ trợ tối quan trọng.',
            credit: 'Ảnh: Tạp chí Hoàng Bảo Journal'
          },
          tips: [
            'Chọn kem chống nắng có màng lọc dịu nhẹ không gây cay mắt (Non-stinging formula) chứa khoáng chất tự nhiên.',
            'Đeo kính mát bản to có tráng phủ lớp chống tia UV400 chuẩn quang học khi di chuyển ngoài trời.'
          ]
        }
      ],
      conclusion: 'Kem chống nắng không chỉ là một sản phẩm làm đẹp đơn thuần, mà là phương pháp y tế dự phòng hiệu quả và kinh tế nhất chống lại sự suy thoái ADN tế bào và ung thư biểu mô da. Hãy xây dựng thói quen thoa đủ liều lượng và dặm lại như một nguyên tắc bất biến để bảo vệ làn da thanh xuân qua năm tháng.',
      recommendedProducts: [
        { name: 'Kem Chống Nắng Vật Lý Lai Hóa Học SPF50+ PA++++ Kiềm Dầu', category: 'Chống Nắng Y Khoa', price: 420000 },
        { name: 'Xịt Khoáng Chống Nắng Bảo Vệ Phổ Rộng Dặm Nhanh', category: 'Chống Nắng Tiện Lợi', price: 295000 }
      ]
    }
  },
  {
    id: 'bha-aha-niacinamide-guide',
    title: 'Bách khoa toàn thư hoạt chất: So sánh cơ chế sinh hóa giữa AHA, BHA và Niacinamide trong điều trị mụn và thu nhỏ lỗ chân lông',
    subtitle: 'Nồng độ bao nhiêu là an toàn cho da người Việt? Cách kết hợp bộ ba hoạt chất vàng để triệt tiêu sợi bã nhờn mà không phá hủy hàng rào bảo vệ da.',
    category: 'Cẩm nang Hoạt chất Y khoa',
    categorySlug: 'ingredients',
    date: '10/09/2026',
    timePublished: '09:45',
    readTime: '9 phút đọc',
    views: 5320,
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1400&q=85&auto=format&fit=crop',
    photoCredit: 'Viện Kiểm nghiệm Dược phẩm & Hóa mỹ phẩm Trung ương',
    summary: 'Bản phân tích chuyên sâu phân tử lượng, tính tan trong nước và lipid của Glycolic Acid, Salicylic Acid và dẫn xuất Nicotinamide trong phác đồ da liễu.',
    pullQuote: {
      quote: 'Làn da của người Á Đông có lớp trung bì nhiều sắc tố và phản ứng viêm rất nhạy cảm. Đừng sao chép nồng độ acid treatment của phương Tây nếu bạn không muốn đối mặt với cơn ác mộng tăng sắc tố sau viêm (PIH).',
      speaker: 'BS. CKII Nguyễn Lan Anh'
    },
    author: defaultAuthors.dr_lan_anh,
    tags: ['AHA', 'BHA', 'Niacinamide', 'Trị mụn', 'Lỗ chân lông', 'Dược mỹ phẩm'],
    content: {
      intro: 'Trong hơn một thập kỷ qua, sự bùng nổ của trào lưu Acid Treatment và các hoạt chất nồng độ cao đã tạo nên một cuộc cách mạng trong nhận thức làm đẹp. Tuy nhiên, sự thiếu hiểu biết về dược lý học và xu hướng lạm dụng nồng độ "càng cao càng tốt" đã đẩy hàng nghìn người vào tình trạng teo da, bỏng hóa chất và bùng phát mụn viêm mất kiểm soát. Việc nắm vững cấu trúc hóa học và đích tác động sinh học là chìa khóa then chốt để khai phóng toàn bộ sức mạnh của bộ ba hoạt chất kinh điển này.',
      sections: [
        {
          heading: '1. AHA (Alpha Hydroxy Acid): Tác động bề mặt và thúc đẩy chu kỳ sừng hóa tự nhiên',
          body: 'AHA là nhóm acid carboxylic có nhóm hydroxyl gắn ở vị trí carbon alpha. Hai đại diện ưu tú nhất là Glycolic Acid (chiết xuất từ cây mía, phân tử lượng siêu nhỏ 76 Da dễ xâm nhập nhất) và Lactic Acid (lên men từ sữa, phân tử lượng 90 Da kèm khả năng cấp ẩm tự nhiên).\n\nAHA tan trong nước, tác động trực tiếp lên các ion canxi liên kết giữa các cầu nối desmosome của tế bào sừng chết ở lớp ngoài cùng của biểu bì. Bằng cách làm tan rã chất keo gắn kết này, AHA kích hoạt sự bong tróc nhẹ nhàng của các mảng da xỉn màu, kích thích các tế bào đáy (Basal Cells) tăng sinh để thay thế lớp biểu mô mới mịn màng và bắt sáng.',
          inlineImage: {
            url: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=1200&q=80&auto=format&fit=crop',
            caption: 'Dung dịch Glycolic Acid nguyên chất được kiểm nghiệm nồng độ pH từ 3.2 đến 3.8 để tối ưu hóa khả năng tiêu sừng sinh học.',
            credit: 'Ảnh: Kính hiển vi điện tử quét SEM'
          },
          tips: [
            'Nồng độ thích hợp cho làn da mới bắt đầu là 5% đến 7% với tần suất 2 lần/tuần vào buổi tối.',
            'AHA làm tăng độ nhạy cảm của da với ánh nắng mặt trời lên 50%, do đó kem chống nắng quang phổ rộng là điều kiện bắt buộc.'
          ]
        },
        {
          heading: '2. BHA (Salicylic Acid): Khả năng ưa dầu (Lipophilic) và quyền năng quét sạch cổ nang lông',
          body: 'Khác biệt căn bản với AHA, BHA có nhóm hydroxyl gắn ở vị trí beta. Cấu trúc vòng benzen thơm mang lại đặc tính kỵ nước nhưng hòa tan cực mạnh trong dầu mỡ. Nhờ tính chất lipidic này, Salicylic Acid có thể dễ dàng đi xuyên qua lớp dầu nhờn đặc quánh trên bề mặt để tiến thẳng vào lòng ống tuyến bã nhờn.\n\nTại đây, BHA phá vỡ nút bít tắc chứa đầy tế bào chết và bã nhờn vón cục (nguyên nhân cốt lõi gây mụn đầu đen và mụn ẩn). Đồng thời, cấu trúc hóa học của BHA tương đồng với Aspirin (Acetylsalicylic Acid), mang lại khả năng kháng viêm, giảm sưng đỏ và ức chế các chất trung gian gây viêm như Prostaglandin.',
          inlineImage: {
            url: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=1200&q=80&auto=format&fit=crop',
            caption: 'Salicylic Acid len lỏi sâu vào lỗ chân lông để hóa lỏng bã nhờn và triệt tiêu môi trường yếm khí của vi khuẩn mụn.',
            credit: 'Đồ họa y khoa Hoàng Bảo'
          },
          tips: [
            'Nồng độ chuẩn y khoa lý tưởng là 1% đến 2%. Nồng độ cao hơn (như 5-10%) chỉ được dùng trong phòng khám cho kỹ thuật peel nông có bác sĩ giám sát.',
            'Thời gian đẩy mụn (Purging) sinh lý thường kéo dài từ 2 đến 6 tuần. Nếu mụn bùng phát ở những vùng da chưa từng bị mụn kèm ngứa rát, đó là dấu hiệu kích ứng (Breakout) cần ngừng sử dụng ngay.'
          ]
        },
        {
          heading: '3. Niacinamide (Vitamin B3): Hoạt chất đa nhiệm phục hồi và ức chế melanin',
          body: 'Nếu AHA và BHA là những "mũi nhọn tấn công" dọn dẹp bề mặt thì Niacinamide (Nicotinamide) là "người bảo hộ" toàn năng. Niacinamide là tiền chất của hai coenzyme thiết yếu NAD+ và NADP+, tham gia trực tiếp vào quá trình chuyển hóa năng lượng ATP của tế bào biểu bì.\n\nCác nghiên cứu lâm sàng mù đôi (Double-blind clinical trials) đã chứng minh Niacinamide 2-5% mang lại 3 công năng vượt bậc:\n1. Thúc đẩy tổng hợp Ceramide nội sinh lên tới 34%, củng cố hàng rào chống thoát nước.\n2. Ức chế sự chuyển giao melanosome từ tế bào hắc tố (Melanocyte) sang tế bào sừng (Keratinocyte), giúp làm mờ đốm nâu mà không gây độc tế bào như Hydroquinone.\n3. Điều hòa lượng bài tiết bã nhờn thông qua cơ chế ức chế thụ thể bã nhờn.',
          inlineImage: {
            url: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=1200&q=80&auto=format&fit=crop',
            caption: 'Tinh chất Niacinamide phân tử siêu nhỏ mang lại khả năng làm đều màu da và thu nhỏ lỗ chân lông chỉ sau 4 tuần sử dụng.',
            credit: 'Ảnh: Viện Nghiên cứu Dược học Ứng dụng'
          },
          tips: [
            'Niacinamide 2% - 5% đã đủ chứng minh hiệu quả lâm sàng cao nhất. Nồng độ 10% hay 20% dễ gây châm chích đỏ mặt do hiện tượng giãn mạch Flushed Skin.',
            'Có thể dùng cả sáng và tối, kết hợp hoàn hảo với Hyaluronic Acid và Peptides để làm dịu da.'
          ]
        }
      ],
      conclusion: 'Một chu trình dưỡng da thành công không phụ thuộc vào giá tiền của sản phẩm, mà nằm ở sự thấu hiểu dược học và khả năng kết hợp nhịp nhàng giữa các hoạt chất. Bằng cách luân phiên sử dụng BHA/AHA để làm sạch sâu và Niacinamide để củng cố tái tạo, bạn sẽ kiến tạo nên một cấu trúc da vững bền và rạng ngời.',
      recommendedProducts: [
        { name: 'Dung Dịch Tẩy Tế Bào Chết BHA 2% Salicylic Acid Sạch Sâu', category: 'Dược Liệu Tẩy Da Chết', price: 480000 },
        { name: 'Tinh Chất Niacinamide 5% Phục Hồi Thu Nhỏ Lỗ Chân Lông', category: 'Serum Cân Bằng', price: 460000 }
      ]
    }
  },
  {
    id: 'skin-barrier-recovery-14-days',
    title: 'Phác đồ cấp cứu da tổn thương và nhiễm corticoid trong 14 ngày: Liệu pháp phục hồi sinh học bằng Centella Asiatica và Panthenol',
    subtitle: 'Đối mặt với tình trạng da đỏ rát, lộ mao mạch và ngứa châm chích sau khi dùng kem trộn hoặc peel da hỏng? Bác sĩ da liễu hướng dẫn lộ trình 3 giai đoạn tái thiết cấu trúc biểu mô.',
    category: 'Phục hồi & Trị liệu Da liễu',
    categorySlug: 'treatment',
    date: '08/09/2026',
    timePublished: '16:00',
    readTime: '8 phút đọc',
    views: 4540,
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1400&q=85&auto=format&fit=crop',
    photoCredit: 'Khoa Lâm sàng Điều trị Biến chứng Thẩm mỹ Hoàng Bảo',
    summary: 'Quy trình giải độc da, phác đồ cai nghiện corticoid khoa học, kết hợp hoạt chất Madecassoside phân lập tinh khiết và Vitamin B5 phân tử lượng siêu nhỏ.',
    pullQuote: {
      quote: 'Khi lớp biểu bì bị bào mòn mất khả năng tự vệ, việc nhồi nhét kem dưỡng đậm đặc chỉ làm gia tăng gánh nặng trao đổi chất. Điều làn da cần nhất lúc này là sự tĩnh lặng sinh học và môi trường vô trùng để tái tạo.',
      speaker: 'BS. CKII Nguyễn Lan Anh'
    },
    author: defaultAuthors.dr_lan_anh,
    tags: ['Corticoid', 'Phục hồi màng ẩm', 'B5 Panthenol', 'Rau má', 'Viêm da tiếp xúc'],
    content: {
      intro: 'Tình trạng lạm dụng mỹ phẩm không rõ nguồn gốc chứa dẫn xuất Corticosteroid (như Dexamethasone, Clobetasol) hoặc lạm dụng phương pháp lột tẩy bằng rượu thuốc, acid nồng độ cao đang là nguyên nhân hàng đầu khiến hàng nghìn phụ nữ rơi vào hội chứng suy giảm hàng rào bảo vệ da trầm trọng. Khi corticoid ức chế hệ miễn dịch cục bộ, mạch máu dưới da bị giãn nở cực độ tạo nên hiện tượng đỏ bừng, teo mô liên kết và mụn mủ bùng phát liên miên.',
      sections: [
        {
          heading: 'Giai đoạn 1 (Ngày 1 - Ngày 3): Skincare Detox - Cắt đứt chuỗi kích ứng cấp tính',
          body: 'Ngay khi nhận thấy các dấu hiệu: Da nóng bừng như lửa đốt, chạm nhẹ cũng châm chích, nổi mẩn li ti và xuất hiện các mạch máu đỏ li ti hình mạng nhện dưới cánh mũi, bệnh nhân phải thực hiện nguyên tắc cai nghiện từ từ (nếu nhiễm corticoid nặng) hoặc dừng ngay toàn bộ treatment hóa học.\n\nTuyệt đối ngưng dùng nước tẩy trang có cồn, sữa rửa mặt tạo bọt kiềm và các loại mặt nạ giấy chứa hương liệu nhân tạo. Toàn bộ chu trình chỉ gói gọn trong việc vệ sinh bằng nước muối sinh lý NaCl 0.9% ấm hoặc nước cất tiệt trùng.',
          inlineImage: {
            url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&q=80&auto=format&fit=crop',
            caption: 'Nén gạc làm dịu với nước khoáng giàu vi lượng Zn và Se giúp hạ nhiệt làn da đang kích ứng trong vòng 10 phút.',
            credit: 'Ảnh: Khoa Chăm sóc Da Lâm sàng'
          },
          tips: [
            'Đắp gạc vô khuẩn tẩm nước khoáng làm dịu trong 10-15 phút khi cơn bốc hỏa xảy ra.',
            'Tránh tuyệt đối ánh nắng mặt trời và các nguồn nhiệt mạnh như phòng xông hơi, bếp lửa nấu ăn.'
          ]
        },
        {
          heading: 'Giai đoạn 2 (Ngày 4 - Ngày 7): Cung cấp vật liệu sinh học tái tạo mô liên kết',
          body: 'Khi phản ứng viêm cấp tính đã lắng dịu, cơ thể bắt đầu bước vào chu kỳ phân bào sửa chữa vết thương. Đây là lúc hai hoạt chất vàng phát huy công năng tối thượng:\n\n1. Panthenol (Pro-Vitamin B5): Thâm nhập sâu vào tế bào trung bì, chuyển hóa thành Coenzyme A - mắt xích thiết yếu tổng hợp acid béo và kích thích nguyên bào sợi tăng sinh collagen.\n2. Phân đoạn tinh khiết từ Rau má (Centella Asiatica bao gồm Madecassoside, Asiaticoside): Đã được y văn chứng minh có khả năng ức chế các enzym Metalloproteinase (MMP) gây phân hủy chất nền ngoại bào, làm lành các vết nứt nẻ và chống phù nề mạch máu.',
          inlineImage: {
            url: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1200&q=80&auto=format&fit=crop',
            caption: 'Chiết xuất Rau má Centella Asiatica đảo Jeju được phân lập ở độ tinh khiết 95% nhằm triệt tiêu hoàn toàn nguy cơ dị ứng phấn hoa.',
            credit: 'Tư liệu Phòng Nghiên cứu Thực vật'
          },
          tips: [
            'Thoa serum dạng ampoule lỏng nhẹ nhiều lần trong ngày với liều lượng mỏng để da hấp thụ từ từ.',
            'Khoá ẩm bằng chất kem có kết cấu mô phỏng lớp màng sinh học Biomimetic Membrane.'
          ]
        },
        {
          heading: 'Giai đoạn 3 (Ngày 8 - Ngày 14): Tái thiết lập màng lipid và che chắn quang học',
          body: 'Ở tuần thứ hai, lớp sừng mới đã bắt đầu hình thành. Lúc này, việc bổ sung phức hợp Ceramide tỷ lệ sinh lý (Ceramide EOP, NP, AP) kết hợp cùng Phytosphingosine sẽ khép kín các vết thương vi mô. Làn da sẽ giảm dần cảm giác châm chích khi rửa mặt và lấy lại độ đàn hồi vốn có.\n\nBước chống nắng ở giai đoạn này bắt buộc phải là kem chống nắng vật lý 100% khoáng chất chứa Zinc Oxide tinh khiết. Kẽm oxide không chỉ phản xạ tia UV mà còn có đặc tính kháng khuẩn, làm dịu và hỗ trợ se vết thương vượt trội.',
          inlineImage: {
            url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80&auto=format&fit=crop',
            caption: 'Kiểm tra độ ẩm biểu bì bằng thiết bị đo chuyên dụng sau 14 ngày áp dụng phác đồ phục hồi.',
            credit: 'Ảnh: Viện Kiểm nghiệm Da liễu'
          },
          tips: [
            'Uống bổ sung nước điện giải, vitamin C liều thấp và thực phẩm giàu kẽm, acid béo Omega-3 từ cá biển sâu.',
            'Ngủ đủ 8 tiếng mỗi đêm trước 23h để tạo điều kiện cho hormone tăng trưởng GH sửa chữa tế bào ban đêm.'
          ]
        }
      ],
      conclusion: 'Hàng rào biểu bì của cơ thể sở hữu năng lực tự chữa lành phi thường nếu bạn thấu hiểu cơ chế và trao cho nó thời gian cùng các dưỡng chất tương thích sinh học. Đừng bao giờ đánh đổi sự trắng nhanh tức thời lấy sức khỏe lâu dài của làn da.',
      recommendedProducts: [
        { name: 'Kem Dưỡng B5 Phục Hồi Chuyên Sâu Hoàng Bảo Cica-Care', category: 'Trị Liệu Phục Hồi', price: 390000 },
        { name: 'Xịt Khoáng Tinh Khiết Cấp Cứu Da Tổn Thương Dị Ứng', category: 'Khoáng Y Tế', price: 260000 }
      ]
    }
  },
  {
    id: 'choose-lipstick-by-undertone',
    title: 'Nghệ thuật giải mã Undertone da: Phương pháp xác định sắc độ ngầm và cẩm nang lựa chọn sắc son nâng tầm thần thái',
    subtitle: 'Tại sao cùng một thỏi son đỏ lại biến người này thành nữ hoàng bữa tiệc nhưng khiến người khác trông mệt mỏi và vàng răng? Chuyên gia trang điểm hướng dẫn trắc nghiệm sắc độ chuẩn xác.',
    category: 'Nghệ thuật Trang điểm',
    categorySlug: 'makeup',
    date: '05/09/2026',
    timePublished: '11:20',
    readTime: '6 phút đọc',
    views: 3860,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=1400&q=85&auto=format&fit=crop',
    photoCredit: 'Hoàng Nam Makeup Academy / Studio Nghệ thuật',
    summary: 'Phân biệt Skintone và Undertone theo hệ thống bảng màu Munsell, kỹ thuật test tĩnh mạch và cách ứng dụng màu tương phản để tôn vinh nụ cười rạng rỡ.',
    pullQuote: {
      quote: 'Son môi không đơn thuần là một món mỹ phẩm điểm tô màu mè. Đó là chữ ký thị giác đầu tiên thể hiện bản lĩnh, cảm xúc và khí chất riêng biệt của người phụ nữ.',
      speaker: 'Chuyên gia Hoàng Nam (Giám đốc Nghệ thuật Trang điểm)'
    },
    author: defaultAuthors.hoang_nam,
    tags: ['Son môi', 'Undertone', 'Sắc tố da', 'Bí quyết Makeup', 'Trang điểm cá nhân'],
    content: {
      intro: 'Trong giới trang điểm chuyên nghiệp quốc tế, có một câu nói kinh điển: "Không có thỏi son xấu, chỉ có thỏi son đặt sai sắc tố da". Rất nhiều phụ nữ chi tiêu hàng triệu đồng để sưu tầm các bộ sưu tập son phiên bản giới hạn theo lời giới thiệu của người nổi tiếng, nhưng khi thoa lên mặt mộc lại cảm thấy khuôn mặt bị già đi hoặc tái nhợt. Căn nguyên của vấn đề nằm ở sự xung đột giữa quang phổ màu son và sắc tố ngầm dưới da (Undertone).',
      sections: [
        {
          heading: '1. Bản chất khoa học: Sự khác biệt cốt lõi giữa Skintone và Undertone',
          body: 'Skintone là tông màu của lớp biểu bì bên ngoài (như trắng sứ, trung bình sáng, ngăm bánh mật). Skintone có tính biến động rất cao: bạn có thể nâng tông nhờ dưỡng trắng hoặc sạm đi sau một chuyến du lịch biển.\n\nNgược lại, Undertone là sắc độ ngầm ẩn dưới lớp bì, được quy định bởi tỷ lệ nồng độ hai loại sắc tố sinh học: Melanin (sắc tố nâu sẫm), Hemoglobin (sắc tố đỏ trong máu) và Carotenoid (sắc tố vàng cam). Undertone là bất biến suốt cả cuộc đời của một con người, được chia thành 3 nhóm cơ bản: Warm (Ấm), Cool (Lạnh) và Neutral (Trung tính).',
          inlineImage: {
            url: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1200&q=80&auto=format&fit=crop',
            caption: 'Bảng đối chiếu bánh xe màu sắc (Color Wheel) ứng dụng trong việc triệt sắc và cân bằng tông da tự nhiên.',
            credit: 'Tài liệu Đào tạo Nghệ thuật Hoàng Nam'
          },
          tips: [
            'Không kiểm tra tông da dưới ánh đèn vàng phòng ngủ hoặc ánh đèn huỳnh quang trắng gắt.',
            'Quan sát làn da dưới ánh sáng tự nhiên ban ngày vào khung giờ từ 9h đến 10h sáng để có màu sắc chuẩn xác nhất.'
          ]
        },
        {
          heading: '2. Bộ 3 bài trắc nghiệm nhanh xác định Undertone chính xác trong 60 giây',
          body: 'Phương pháp 1 - Soi mạch máu cổ tay: Ngửa cổ tay dưới ánh nắng ban ngày tự nhiên:\n- Mạch máu hiển thị rõ màu xanh lá cây hoặc xanh rêu: Bạn thuộc Warm Undertone (Tông ấm).\n- Mạch máu có màu xanh dương tím hoặc tím hoa cà: Bạn thuộc Cool Undertone (Tông lạnh).\n- Mạch máu hòa quyện cả hai sắc tố xanh lá và tím biếc: Chúc mừng bạn, bạn sở hữu Neutral Undertone (Tông trung tính quý hiếm).\n\nPhương pháp 2 - Phép thử trang sức kim loại: Nếu bạn đeo dây chuyền bạc thấy mặt sáng bừng và thanh thoát hơn, bạn thuộc tông lạnh; nếu hợp trang sức vàng tây hoặc vàng 18K hơn, bạn chắc chắn thuộc tông ấm.',
          inlineImage: {
            url: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1200&q=80&auto=format&fit=crop',
            caption: 'Kỹ thuật soi mạch máu cổ tay dưới ánh sáng tự nhiên là tiêu chuẩn kiểm tra sắc tố ngầm nhanh nhất.',
            credit: 'Ảnh: Studio Hoàng Bảo'
          },
          tips: [
            'Nếu kết quả test trang sức và mạch máu cho cảm giác nửa nọ nửa kia, khả năng cao bạn thuộc nhóm trung tính thiên ấm (Warm Neutral).'
          ]
        },
        {
          heading: '3. Bản đồ chọn sắc son tôn da và làm trắng men răng',
          body: '- Dành cho nàng Tông Ấm (Warm): Chân ái của bạn là các màu son có gốc màu cam, đất hoặc vàng ấm: Đỏ gạch nung, Cam cháy (Burnt Orange), Đỏ cam san hô, Nude đất pha nâu tây. Những gam màu này sẽ hòa quyện với sắc vàng dưới biểu bì, tạo nên vẻ khỏe khoắn rạng ngời. Tuyệt đối tránh các màu son hồng cánh sen hoặc đỏ tím mận vì chúng sẽ khiến da bạn ngả màu vàng vọt.\n\n- Dành cho nàng Tông Lạnh (Cool): Tôn vinh tuyệt đối các màu son có gốc xanh lam (Blue-based): Đỏ thuần ánh lạnh kinh điển, Đỏ rượu vang Burgundy, Hồng mận chín, Hồng khô tro hoa hồng. Ánh xanh lạnh trong son sẽ tạo hiệu ứng thị giác tương phản, làm men răng trắng sáng hơn ít nhất 2 tông màu.',
          inlineImage: {
            url: 'https://images.unsplash.com/photo-1503236823255-94609f598e71?w=1200&q=80&auto=format&fit=crop',
            caption: 'Thỏi son màu đỏ lạnh giúp tôn men răng trắng sáng và thắp sáng toàn bộ thần thái khuôn mặt.',
            credit: 'Ảnh: Fashion Week Editorial'
          },
          tips: [
            'Thử son trực tiếp lên lòng môi hoặc đầu ngón tay cái thay vì mu bàn tay vì mô thịt ở ngón tay có sắc tố tương đồng nhất với môi.',
            'Dùng chì kẻ viền môi tệp màu tự nhiên để tạo hiệu ứng môi dày căng mọng kiểu Pháp.'
          ]
        }
      ],
      conclusion: 'Hiểu rõ sắc tố của bản thân là bước khai mở đầu tiên trên con đường làm chủ nghệ thuật trang điểm. Khi màu son hòa nhịp cùng năng lượng tự nhiên của làn da, nụ cười của bạn sẽ tỏa sáng với trọn vẹn vẻ kiêu sa và cuốn hút.',
      recommendedProducts: [
        { name: 'Son Kem Lì Nhung Mịn Dưỡng Ẩm Hoàng Bảo Velvet Lip Tint', category: 'Son Môi Cao Cấp', price: 290000 },
        { name: 'Chì Định Hình Viền Môi Chống Trôi Sắc Nét', category: 'Trang Điểm Môi', price: 180000 }
      ]
    }
  },
  {
    id: 'clean-beauty-trend-2026',
    title: 'Làn sóng Clean Beauty 2026: Tương lai của mỹ phẩm thuần chay sinh học và trách nhiệm sinh thái toàn cầu',
    subtitle: 'Tại sao các tập đoàn mỹ phẩm xa xỉ đang ráo riết tái cấu trúc chuỗi cung ứng theo tiêu chuẩn thuần chay và bao bì phân hủy sinh học? Phóng sự độc quyền về xu hướng tiêu dùng tỉnh thức.',
    category: 'Xu hướng & Phong cách sống',
    categorySlug: 'trends',
    date: '01/09/2026',
    timePublished: '15:30',
    readTime: '7 phút đọc',
    views: 5120,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1400&q=85&auto=format&fit=crop',
    photoCredit: 'Reuters / Diễn đàn Mỹ phẩm Sinh học Bền vững Quốc tế',
    summary: 'Khảo sát sự dịch chuyển thói quen tiêu dùng của thế hệ Gen Z và Millennials đối với tiêu chuẩn Cruelty-Free, canh tác nông nghiệp tái sinh và chứng nhận Eco-friendly.',
    pullQuote: {
      quote: 'Làm đẹp đích thực trong kỷ nguyên mới không thể xây dựng trên sự tổn hại của muôn loài hay rác thải nhựa đại dương. Một sản phẩm chân chính phải đẹp từ công thức đến đạo đức sản xuất.',
      speaker: 'Nhà báo Mai Phương (Ban Xu hướng & Môi trường sống)'
    },
    author: defaultAuthors.mai_phuong,
    tags: ['Clean Beauty', 'Mỹ phẩm thuần chay', 'Bền vững', 'Vegan', 'Môi trường sống'],
    content: {
      intro: 'Tại Tuần lễ Mỹ phẩm Bền vững Quốc tế diễn ra vào đầu năm 2026, hơn 82% các nhà phân phối và bán lẻ mỹ phẩm cao cấp xác nhận rằng tiêu chí "Thuần chay" (Vegan) và "Bảo vệ động vật" (Cruelty-Free) đã vươn lên thành yếu tố quyết định hàng đầu trong hành vi mua sắm của thế hệ trẻ. Khái niệm Clean Beauty đã vượt thoát khỏi ranh giới của một xu hướng tiếp thị nhất thời để trở thành một bộ quy chuẩn đạo đức sống còn đối với toàn bộ ngành công nghiệp tỷ đô.',
      sections: [
        {
          heading: '1. Vượt qua chiêu trò Greenwashing: Tiêu chuẩn khắt khe của mỹ phẩm sạch chuẩn quốc tế',
          body: 'Trong nhiều năm, thuật ngữ "Thiên nhiên" hay "Organic" thường bị lạm dụng như một chiêu bài tiếp thị mập mờ. Clean Beauty thế hệ mới đòi hỏi tính minh bạch dữ liệu 100% trong toàn bộ chuỗi cung ứng từ nông trại tới tay người tiêu dùng.\n\nMột sản phẩm được chứng nhận Clean Beauty thực thụ phải đáp ứng đồng thời 3 nguyên tắc:\n- Không chứa danh sách đen các chất độc hại tích tụ sinh học: Loại bỏ hoàn toàn Parabens, Sulfates gây khô rát màng tế bào, Dầu khoáng (Mineral Oil), Phthalates gây rối loạn nội tiết và vi nhựa ô nhiễm nguồn nước.\n- Chứng nhận Leaping Bunny & The Vegan Society: Cam kết không thử nghiệm trên động vật trong bất kỳ công đoạn nào, không chứa các thành phần động vật như sáp ong, mỡ cừu, chất nhờn ốc sên hay collagen từ cá ngừ đại dương.\n- Canh tác tái sinh (Regenerative Farming): Nguồn nguyên liệu thảo mộc được trồng tại các vùng đất hữu cơ không thuốc trừ sâu, bảo tồn độ phì nhiêu của thổ nhưỡng.',
          inlineImage: {
            url: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=1200&q=80&auto=format&fit=crop',
            caption: 'Nguồn nguyên liệu thảo mộc tự nhiên được ép lạnh và chưng cất theo quy trình khép kín không sử dung môi độc hại.',
            credit: 'Ảnh: Tư liệu Hoàng Bảo Green Farm'
          },
          tips: [
            'Tìm kiếm các chứng nhận độc lập của bên thứ ba như ECOCERT, COSMOS Organic trên nhãn chai thay vì tin vào những lời quảng cáo vô căn cứ.',
            'Kiểm tra bảng thành phần INCI theo thứ tự nồng độ giảm dần để biết tỷ lệ hoạt chất thực tế.'
          ]
        },
        {
          heading: '2. Cách mạng bao bì xanh: Cuộc chiến giảm thiểu rác thải vi nhựa đại dương',
          body: 'Ngành mỹ phẩm toàn cầu từng tạo ra hơn 120 tỷ đơn vị bao bì nhựa mỗi năm, phần lớn trong số đó không thể tái chế do cấu trúc nắp bơm đa lớp kim loại và nhựa phức tạp. Năm 2026 chứng kiến bước chuyển mình ngoạn mục của các vật liệu sinh học mới:\n\n- Chai thủy tinh tái chế vô cơ (PCR Glass) giảm 40% lượng khí thải carbon trong quá trình nấu nung.\n- Ống tuýp làm từ bã mía lên men sinh học (Bio-PE) có khả năng tự phân hủy trong môi trường ủ công nghiệp.\n- Hộp giấy đóng gói được chứng nhận bởi Hội đồng Quản lý Rừng (FSC), in bằng mực dầu đậu nành hữu cơ không độc hại.',
          inlineImage: {
            url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1200&q=80&auto=format&fit=crop',
            caption: 'Bao bì thủy tinh và nắp tre tự nhiên của các dòng sản phẩm thuần chay giúp giảm thiểu tối đa rác thải nhựa vi sinh.',
            credit: 'Ảnh: Reuters / Studio Hoàng Bảo'
          },
          tips: [
            'Tham gia chương trình "Đổi vỏ chai cũ lấy điểm thưởng tái sinh" tại toàn bộ hệ thống showroom Hoàng Bảo trên toàn quốc.',
            'Tận dụng các hũ kem thủy tinh sau khi dùng hết để làm đồ đựng phụ kiện nhỏ hoặc trồng cây cảnh mini.'
          ]
        }
      ],
      conclusion: 'Khi chúng ta đưa ra quyết định lựa chọn một chai mỹ phẩm xanh, đó không chỉ là sự chăm chút cho diện mạo cá nhân, mà là một lá phiếu ủng hộ một tương lai nhân đạo, bền vững và tràn đầy lòng trắc ẩn đối với hành tinh này.',
      recommendedProducts: [
        { name: 'Sữa Rửa Mặt Hữu Cơ Bọt Mịn Chiết Xuất Tràm Trà Sinh Học', category: 'Mỹ Phẩm Xanh', price: 280000 },
        { name: 'Nước Hoa Hồng Cân Bằng Cấp Ẩm Chuyên Sâu Hoàng Bảo', category: 'Thuần Chay', price: 350000 }
      ]
    }
  }
];

export const ingredientsGuide: IngredientGuideItem[] = [
  {
    name: 'AHA (Glycolic / Lactic Acid)',
    scientificName: 'Alpha Hydroxy Acid',
    role: 'Tẩy tế bào chết bề mặt, kích thích tăng sinh chu kỳ biểu bì, làm sáng các vết thâm nắng và đốm nâu li ti.',
    suitableFor: 'Da sần sùi, da thô ráp, da khô mất nước, da có nếp nhăn li ti',
    note: 'Nên dùng buổi tối, bắt buộc bôi kem chống nắng SPF 50+ phổ rộng ban ngày.',
    dosage: 'Nồng độ 5% - 7% cho người mới bắt đầu'
  },
  {
    name: 'BHA (Salicylic Acid)',
    scientificName: 'Beta Hydroxy Acid (2-Hydroxybenzoic acid)',
    role: 'Tan trong dầu, thâm nhập sâu vào nang lông, hóa lỏng bã nhờn, tiêu sừng và diệt khuẩn mụn kỵ khí.',
    suitableFor: 'Da dầu nhờn, da mụn ẩn, mụn đầu đen, bít tắc nang lông, lỗ chân lông to',
    note: 'Bắt đầu từ nồng độ 1-2%, dùng 2-3 lần/tuần để tránh hiện tượng khô căng cục bộ.',
    dosage: 'Nồng độ 1% - 2% chuẩn da liễu'
  },
  {
    name: 'Hyaluronic Acid (HA)',
    scientificName: 'Sodium Hyaluronate đa phân tử',
    role: 'Ngậm nước gấp 1000 lần trọng lượng phân tử, giữ ẩm đa tầng từ màng đáy đến bề mặt, tạo độ căng bóng sinh học.',
    suitableFor: 'Mọi loại da, đặc biệt là da dầu thiếu nước, da khô rát, da sau điều trị laser',
    note: 'Thoa trên nền da còn ẩm để tránh hiện tượng thẩm thấu ngược (hút ẩm ngược từ da ra không khí).',
    dosage: 'Dùng hàng ngày 2 lần sáng & tối'
  },
  {
    name: 'Niacinamide (Vitamin B3)',
    scientificName: 'Nicotinamide / 3-Pyridinecarboxamide',
    role: 'Thu nhỏ lỗ chân lông, điều tiết bã nhờn, kích thích tổng hợp Ceramide tự thân, ức chế vận chuyển sắc tố Melanin.',
    suitableFor: 'Da dầu mụn, da thâm sau mụn, da xỉn màu, da tổn thương hàng rào lipid',
    note: 'Rất lành tính, hoạt động ở pH trung tính 6.0, kết hợp tốt với B5 và Peptides.',
    dosage: 'Nồng độ tối ưu 2% - 5%'
  },
  {
    name: 'Retinol & Bakuchiol',
    scientificName: 'Vitamin A derivative & Phyto-Retinol',
    role: 'Tăng sinh Collagen type I và III, làm mờ nếp nhăn sâu, tăng tốc chu kỳ thay mới tế bào, ngăn ngừa lão hóa sớm.',
    suitableFor: 'Da bắt đầu lão hóa từ tuổi 22+, da có đốm đồi mồi, da dày sừng',
    note: 'Cần cấp ẩm kỹ bằng B5/Ceramide, bắt đầu từ nồng độ thấp đến cao, dùng cách ngày.',
    dosage: 'Nồng độ khởi đầu 0.1% - 0.3%'
  },
  {
    name: 'Centella Asiatica & B5',
    scientificName: 'Madecassoside & D-Panthenol',
    role: 'Làm dịu phản ứng viêm cấp tính, hạ nhiệt làn da bỏng rát, sửa chữa cấu trúc mô liên kết và phục hồi mao mạch.',
    suitableFor: 'Da nhạy cảm, da sau peel, da tổn thương do kem trộn hoặc corticoid',
    note: 'Có thể thoa dặm nhiều lần trong ngày khi thấy da bị căng rát, không gây bí bách nang lông.',
    dosage: 'Dùng tự do theo nhu cầu phục hồi'
  }
];

// Helper functions
export function getAllArticles(): Article[] {
  return articlesData;
}

export function getArticleById(id: string): Article | undefined {
  return articlesData.find(art => art.id === id);
}

export function getMostReadArticles(limit: number = 5): Article[] {
  return [...articlesData].sort((a, b) => b.views - a.views).slice(0, limit);
}

export function getRelatedArticles(currentId: string, categorySlug: string, limit: number = 3): Article[] {
  const sameCat = articlesData.filter(a => a.id !== currentId && a.categorySlug === categorySlug);
  if (sameCat.length >= limit) {
    return sameCat.slice(0, limit);
  }
  const remaining = articlesData.filter(a => a.id !== currentId && a.categorySlug !== categorySlug);
  return [...sameCat, ...remaining].slice(0, limit);
}

export function getAdjacentArticles(currentId: string): { prevArticle?: Article; nextArticle?: Article } {
  const currentIndex = articlesData.findIndex(a => a.id === currentId);
  if (currentIndex === -1) return {};
  return {
    prevArticle: currentIndex > 0 ? articlesData[currentIndex - 1] : undefined,
    nextArticle: currentIndex < articlesData.length - 1 ? articlesData[currentIndex + 1] : undefined
  };
}
