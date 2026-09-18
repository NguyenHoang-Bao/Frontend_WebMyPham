import { useState, useMemo, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb, { BreadcrumbItem } from '../components/Breadcrumb';
import {
  articlesData,
  blogCategories,
  ingredientsGuide,
  getMostReadArticles,
  defaultAuthors,
  Article
} from '../data/blogData';
import { 
  Search, 
  BookOpen, 
  Calendar, 
  Clock, 
  Eye, 
  ArrowRight,
  TrendingUp,
  FileText,
  UserCheck,
  Send,
  Newspaper
} from 'lucide-react';

export default function Tips() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterSuccess, setNewsletterSuccess] = useState<boolean>(false);

  const categories = blogCategories;
  const articles: Article[] = articlesData;
  const mostRead = useMemo(() => getMostReadArticles(5), []);

  // Lọc bài viết
  const filteredArticles = useMemo(() => {
    return articles.filter(art => {
      const matchCat = selectedCategory === 'all' || art.categorySlug === selectedCategory;
      const matchQuery = searchQuery.trim() === '' || 
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        art.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery, articles]);

  const leadArticle = articles[0];
  const secondaryLeadArticles = articles.slice(1, 3);
  const quickReadArticles = articles.slice(3, 6);

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSuccess(false), 5000);
    }
  };

  const breadcrumbItems = useMemo<BreadcrumbItem[]>(() => {
    const items: BreadcrumbItem[] = [
      { label: 'Trang chủ', link: '/' },
    ];

    const currentCat = categories.find(c => c.id === selectedCategory);

    if (selectedCategory === 'all' || !currentCat) {
      items.push({ label: 'Tạp chí & Cẩm nang Da liễu' });
    } else {
      items.push({ 
        label: 'Tạp chí & Cẩm nang Da liễu', 
        link: '/tips',
        onClick: () => setSelectedCategory('all')
      });
      items.push({ label: currentCat.label });
    }

    return items;
  }, [selectedCategory, categories]);

  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-800 font-sans">
      
      {/* ── 1. TOÀ SOẠN TOP BAR (BÁO ĐIỆN TỬ HEADER) ── */}
      <div className="border-b border-gray-200 bg-white">
        {/* Hàng ngày tháng & Tên cơ quan báo chí */}
        <div className="border-b border-gray-100 py-1.5 px-4 sm:px-6 lg:px-8 text-[11px] text-gray-500 font-sans">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-4">
              <span className="font-medium text-gray-700">Thứ Sáu, ngày 18 tháng 9, 2026</span>
              <span className="hidden md:inline text-gray-300">|</span>
              <span className="hidden md:inline text-gray-500 uppercase tracking-wider font-semibold">
                Tạp chí Da liễu & Phong cách sống Hoàng Bảo Journal
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-rose-700 font-bold uppercase tracking-wider">Số Chuyên Đề: Thu - Đông 2026</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-500">Cố vấn Y khoa: BS. CKII Nguyễn Lan Anh</span>
            </div>
          </div>
        </div>

        {/* Masthead Header Tạp Chí */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 text-center border-b border-gray-100">
          <Breadcrumb items={breadcrumbItems} className="justify-center mb-3 text-xs" />
          
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-[4px] text-rose-700 block font-sans">
              CHUYÊN TRANG KHOA HỌC LÀN DA & DƯỢC MỸ PHẨM CHÍNH HÃNG
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 tracking-tight">
              HOÀNG BẢO BEAUTY JOURNAL
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto pt-1 font-sans italic">
              "Kho tàng nghiên cứu lâm sàng, kiến thức thẩm mỹ y khoa và cẩm nang nuôi dưỡng vẻ đẹp nguyên bản chuẩn quốc tế"
            </p>
          </div>

          {/* Ô Tìm Kiếm Báo Chí */}
          <div className="mt-6 max-w-lg mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Tìm bài viết, hoạt chất BHA, Retinol, phác đồ phục hồi..."
                className="w-full pl-4 pr-11 py-2.5 rounded-none border border-gray-300 focus:outline-none focus:border-gray-900 text-sm bg-white transition-colors placeholder:text-gray-400 font-sans"
              />
              <Search size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Thanh Chủ Đề Xu Hướng Nóng (Trending Topics Bar) */}
        <div className="bg-gray-50/80 px-4 sm:px-6 lg:px-8 py-2.5 text-xs border-b border-gray-200">
          <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto scrollbar-none font-sans">
            <span className="flex items-center gap-1 font-bold text-gray-900 uppercase tracking-wider shrink-0 text-[11px]">
              <TrendingUp size={13} className="text-rose-600" /> Xu hướng tìm kiếm:
            </span>
            <div className="flex items-center gap-2 shrink-0">
              {['#PhụcHồiMàngLipid', '#ChốngNắngQuangPhổRộng', '#AcidTreatment', '#Niacinamide5%', '#UndertoneDa', '#MỹPhẩmThuầnChay'].map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearchQuery(tag.replace('#', ''))}
                  className="px-2.5 py-0.5 rounded bg-white hover:bg-gray-200 border border-gray-200 text-gray-700 text-[11px] font-medium transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. TIÊU ĐIỂM BÁO CHÍ (HERO EDITORIAL SHOWCASE) ── */}
      {!searchQuery && selectedCategory === 'all' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 border-b border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Lead Story Lớn Bên Trái (7 Cột) */}
            <article className="lg:col-span-7 group">
              <Link to={`/tips/${leadArticle.id}`} className="block overflow-hidden bg-gray-100 aspect-[16/10] relative mb-4">
                <img
                  src={leadArticle.image}
                  alt={leadArticle.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                />
                <div className="absolute top-4 left-4 bg-gray-900 text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1 font-sans">
                  CHUYÊN ĐỀ ĐẶC BIỆT
                </div>
              </Link>

              <div className="space-y-2.5">
                <div className="flex items-center gap-3 text-xs text-gray-500 font-sans">
                  <span className="font-bold text-rose-700 uppercase tracking-wider text-[11px]">
                    {leadArticle.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-medium">
                    <Calendar size={12} /> {leadArticle.date} ({leadArticle.timePublished})
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {leadArticle.readTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 leading-tight group-hover:text-rose-700 transition-colors">
                  <Link to={`/tips/${leadArticle.id}`}>
                    {leadArticle.title}
                  </Link>
                </h2>

                <p className="text-sm text-gray-600 leading-relaxed font-sans line-clamp-3">
                  {leadArticle.subtitle || leadArticle.summary}
                </p>

                {/* Byline tác giả */}
                <div className="pt-2 flex items-center justify-between border-t border-gray-200 text-xs font-sans">
                  <div className="flex items-center gap-2">
                    <img
                      src={leadArticle.author.avatar}
                      alt={leadArticle.author.name}
                      className="w-7 h-7 rounded-full object-cover border border-gray-300"
                    />
                    <span className="font-bold text-gray-800">{leadArticle.author.name}</span>
                  </div>
                  <Link
                    to={`/tips/${leadArticle.id}`}
                    className="font-bold text-rose-700 hover:text-gray-900 uppercase tracking-wider text-[11px] inline-flex items-center gap-1"
                  >
                    Đọc toàn văn <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </article>

            {/* Cột Phụ 2 Tin Lớn Bên Phải (5 Cột) */}
            <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-gray-200 lg:pl-8">
              <div className="border-b border-gray-900 pb-2 mb-4">
                <h3 className="font-serif font-bold text-base uppercase tracking-wider text-gray-900 flex items-center gap-2">
                  <Newspaper size={16} className="text-rose-700" /> Báo cáo điều tra & Cẩm nang
                </h3>
              </div>

              {secondaryLeadArticles.map((article) => (
                <article key={article.id} className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 group">
                  <Link to={`/tips/${article.id}`} className="sm:col-span-5 aspect-[16/10] sm:aspect-[4/3] bg-gray-100 overflow-hidden block">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  <div className="sm:col-span-7 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block mb-1 font-sans">
                        {article.category}
                      </span>
                      <h4 className="font-serif font-bold text-sm sm:text-base leading-snug text-gray-900 group-hover:text-rose-700 transition-colors line-clamp-2 mb-1.5">
                        <Link to={`/tips/${article.id}`}>
                          {article.title}
                        </Link>
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-2 font-sans leading-relaxed">
                        {article.subtitle || article.summary}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-gray-400 pt-2 border-t border-gray-100 font-sans">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

          </div>

          {/* 3 Tin Phụ Đọc Nhanh Bên Dưới */}
          <div className="mt-8 pt-8 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            {quickReadArticles.map((article) => (
              <article key={article.id} className="group flex gap-4 items-start">
                <Link to={`/tips/${article.id}`} className="w-24 h-20 shrink-0 bg-gray-100 overflow-hidden block">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                <div className="flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-0.5">
                    {article.category}
                  </span>
                  <h4 className="font-serif font-bold text-xs sm:text-sm leading-snug text-gray-900 group-hover:text-rose-700 transition-colors line-clamp-2 mb-1">
                    <Link to={`/tips/${article.id}`}>
                      {article.title}
                    </Link>
                  </h4>
                  <span className="text-[11px] text-gray-400">{article.date} • {article.readTime}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ── 3. KHU VỰC NỘI DUNG CHÍNH (8 CỘT / 4 CỘT) ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Bộ lọc chuyên mục báo chí */}
        <div className="flex items-center justify-between border-b-2 border-gray-900 pb-2 mb-8 font-sans">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none py-1">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <span className="hidden sm:inline text-xs text-gray-500 font-sans">
            Hiển thị {filteredArticles.length} bài báo cáo
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* CỘT CHÍNH: DANH SÁCH BÀI BÁO (8 CỘT) */}
          <div className="lg:col-span-8 space-y-8">
            
            {filteredArticles.length === 0 ? (
              <div className="bg-white border border-gray-200 p-12 text-center my-6 font-sans">
                <BookOpen size={40} className="mx-auto text-gray-400 mb-3" />
                <h3 className="font-serif text-lg font-bold text-gray-800 mb-1">Không tìm thấy bài viết phù hợp</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Vui lòng thử tìm kiếm lại với thuật ngữ khoa học khác hoặc chọn chuyên mục khác.
                </p>
                <button
                  onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                  className="px-5 py-2 bg-gray-900 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Xem toàn bộ ấn phẩm
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredArticles.map(article => (
                  <article
                    key={article.id}
                    className="bg-white border border-gray-200 p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow group"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                      
                      {/* Ảnh bài viết */}
                      <Link 
                        to={`/tips/${article.id}`}
                        className="sm:col-span-5 aspect-[16/10] overflow-hidden bg-gray-100 block"
                      >
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>

                      {/* Nội dung bài viết */}
                      <div className="sm:col-span-7 flex flex-col justify-between font-sans">
                        <div>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                            <span className="font-bold text-rose-700 uppercase tracking-wider text-[11px]">
                              {article.category}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
                          </div>

                          <h3 className="font-serif font-bold text-base sm:text-lg text-gray-900 leading-snug group-hover:text-rose-700 transition-colors line-clamp-2 mb-2">
                            <Link to={`/tips/${article.id}`}>
                              {article.title}
                            </Link>
                          </h3>

                          <p className="text-xs sm:text-sm text-gray-600 font-sans leading-relaxed line-clamp-3 mb-3">
                            {article.subtitle || article.summary}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <img
                              src={article.author.avatar}
                              alt={article.author.name}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <span className="text-gray-700 font-medium text-xs">{article.author.name}</span>
                          </div>

                          <Link
                            to={`/tips/${article.id}`}
                            className="font-bold text-rose-700 hover:text-gray-900 uppercase tracking-wider text-[11px] inline-flex items-center gap-1"
                          >
                            Chi tiết <ArrowRight size={13} />
                          </Link>
                        </div>
                      </div>

                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* ── BẢNG ĐỐI CHIẾU DƯỢC LÝ THÀNH PHẦN (SCIENTIFIC INGREDIENTS TABLE) ── */}
            <section className="bg-white border border-gray-200 p-6 sm:p-8 mt-12 shadow-xs">
              <div className="border-b border-gray-900 pb-4 mb-6">
                <span className="text-[11px] font-bold uppercase tracking-[2px] text-rose-700 block mb-1 font-sans">
                  TÀI LIỆU THAM KHẢO Y KHOA
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">
                  Bảng Đối Chiếu Cơ Chế Hoạt Chất Dược Mỹ Phẩm Cho Từng Loại Biểu Bì
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 font-sans pt-1">
                  Được biên soạn và thẩm định bởi Hội đồng Cố vấn Da liễu Lâm sàng Hoàng Bảo.
                </p>
              </div>

              <div className="overflow-x-auto scrollbar-thin">
                <table className="w-full min-w-[700px] text-left border-collapse text-xs sm:text-sm font-sans">
                  <thead>
                    <tr className="bg-gray-100 border-y border-gray-300 text-gray-900 uppercase font-bold text-[11px] tracking-wider">
                      <th className="py-3 px-3">Tên Hoạt Chất</th>
                      <th className="py-3 px-3">Tên Khoa Học (INCI)</th>
                      <th className="py-3 px-3">Cơ Chế Tác Động</th>
                      <th className="py-3 px-3">Chỉ Định Da Liễu</th>
                      <th className="py-3 px-3">Nồng Độ & Lưu Ý</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-gray-700">
                    {ingredientsGuide.map((ing, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-3.5 px-3 font-bold text-gray-900 whitespace-nowrap text-xs">
                          {ing.name}
                        </td>
                        <td className="py-3.5 px-3 italic text-gray-500 text-xs font-sans">
                          {ing.scientificName}
                        </td>
                        <td className="py-3.5 px-3 text-gray-800 text-xs">
                          {ing.role}
                        </td>
                        <td className="py-3.5 px-3 font-medium text-rose-800 text-xs">
                          {ing.suitableFor}
                        </td>
                        <td className="py-3.5 px-3 text-gray-600 text-[11px]">
                          <span className="font-bold text-gray-900 block">{ing.dosage}</span>
                          {ing.note}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

          </div>

          {/* CỘT PHẢI: BÁO CHÍ SIDEBAR (4 CỘT) */}
          <aside className="lg:col-span-4 space-y-8 font-sans">
            
            {/* 1. BẢNG XẾP HẠNG ĐỌC NHIỀU NHẤT (01 - 05) */}
            <div className="bg-white border border-gray-200 p-6 shadow-xs">
              <div className="border-b-2 border-gray-900 pb-2 mb-4 flex items-center justify-between">
                <h3 className="font-serif font-bold text-base uppercase tracking-wider text-gray-900 flex items-center gap-2">
                  <FileText size={16} className="text-rose-700" /> Đọc nhiều nhất tuần
                </h3>
                <span className="text-[11px] text-gray-400 font-sans">Cập nhật 24h</span>
              </div>

              <div className="space-y-4">
                {mostRead.map((art, idx) => (
                  <article key={art.id} className="flex items-start gap-3.5 group border-b border-gray-100 pb-3.5 last:border-b-0 last:pb-0">
                    <span className="font-sans font-bold text-2xl text-gray-300 group-hover:text-rose-700 transition-colors leading-none shrink-0 w-7">
                      0{idx + 1}
                    </span>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                        {art.category}
                      </span>
                      <h4 className="font-serif font-bold text-xs sm:text-sm text-gray-900 group-hover:text-rose-700 transition-colors leading-snug line-clamp-2">
                        <Link to={`/tips/${art.id}`}>
                          {art.title}
                        </Link>
                      </h4>
                      <div className="flex items-center gap-3 text-[11px] text-gray-400">
                        <span><Eye size={11} className="inline mr-0.5" /> {art.views.toLocaleString()}</span>
                        <span>•</span>
                        <span>{art.readTime}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* 2. HỘI ĐỒNG CỐ VẤN Y KHOA (DOCTOR'S CORNER) */}
            <div className="bg-white border border-gray-200 p-6 shadow-xs">
              <div className="border-b-2 border-gray-900 pb-2 mb-4">
                <h3 className="font-serif font-bold text-base uppercase tracking-wider text-gray-900 flex items-center gap-2">
                  <UserCheck size={16} className="text-rose-700" /> Hội đồng Cố vấn Y khoa
                </h3>
              </div>

              <div className="space-y-4">
                {Object.values(defaultAuthors).map((auth, aIdx) => (
                  <div key={aIdx} className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                    <img
                      src={auth.avatar}
                      alt={auth.name}
                      className="w-12 h-12 rounded-full object-cover border border-gray-200 shrink-0"
                    />
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-xs sm:text-sm text-gray-900">{auth.name}</h4>
                      <p className="text-[11px] text-rose-800 font-semibold">{auth.role}</p>
                      <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed pt-1">
                        {auth.bio}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. ĐĂNG KÝ BẢN TIN TÒA SOẠN */}
            <div className="bg-gray-900 text-white p-6 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-[2px] text-rose-400 block mb-2">
                BẢN TIN HOÀNG BẢO BEAUTY JOURNAL
              </span>
              <h3 className="font-serif text-lg font-bold mb-2">
                Nhận Báo Cáo Y Khoa & Cẩm Nang Chăm Da Mỗi Tuần
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                Phân tích hoạt chất mới nhất từ các viện da liễu quốc tế và nhận voucher 10% đặc quyền dành cho độc giả.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="space-y-2.5">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  placeholder="Nhập địa chỉ email của bạn..."
                  className="w-full px-3.5 py-2 text-xs bg-gray-800 border border-gray-700 text-white placeholder:text-gray-400 focus:outline-none focus:border-rose-500 rounded-none font-sans"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send size={13} /> Đăng Ký Đọc Báo
                </button>
                {newsletterSuccess && (
                  <p className="text-[11px] text-emerald-400 pt-1 text-center font-sans">
                    Cảm ơn bạn đã đăng ký nhận ấn phẩm Hoàng Bảo Journal!
                  </p>
                )}
              </form>
            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}