import { useState, useMemo, FormEvent } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import {
  getArticleById,
  getRelatedArticles,
  getAdjacentArticles,
  getMostReadArticles,
  Article
} from '../data/blogData';
import {
  Calendar,
  Clock,
  Eye,
  ArrowLeft,
  ArrowRight,
  Share2,
  Check,
  Bookmark,
  ShoppingBag,
  List,
  Send,
  MessageSquare,
  Search,
  BookOpen,
  Printer,
  FileText,
  ChevronDown
} from 'lucide-react';
import { BsFacebook, BsTwitterX } from 'react-icons/bs';

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [isMobileTocOpen, setIsMobileTocOpen] = useState<boolean>(false);

  const article: Article | undefined = useMemo(() => {
    return id ? getArticleById(id) : undefined;
  }, [id]);

  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return getRelatedArticles(article.id, article.categorySlug, 3);
  }, [article]);

  const mostRead = useMemo(() => getMostReadArticles(5), []);

  const { prevArticle, nextArticle } = useMemo(() => {
    if (!article) return {};
    return getAdjacentArticles(article.id);
  }, [article]);

  // States
  const [copied, setCopied] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  
  // Comments
  const [comments, setComments] = useState<Array<{ name: string; time: string; text: string; location?: string }>>([
    {
      name: 'Dược sĩ Thu Trang',
      location: 'Hà Nội',
      time: '09:15, 16/09/2026',
      text: 'Bài phân tích rất chuẩn về mặt dược lý học. Đa số khách hàng tại nhà thuốc của mình thường chỉ rửa mặt qua loa bằng nước lã mà không hiểu tầm quan trọng của việc hòa tan lớp bã nhờn kỵ nước. Sẽ chia sẻ bài viết này cho các đồng nghiệp và bệnh nhân cùng đọc.'
    },
    {
      name: 'ThS. Trần Hoàng Yến',
      location: 'TP. Hồ Chí Minh',
      time: '14:20, 15/09/2026',
      text: 'Lời khuyên của bác sĩ Lan Anh về việc dùng quy tắc hai đốt ngón tay cho kem chống nắng rất thiết thực. Trước đây mình thoa quá mỏng nên dù ở phòng máy lạnh vẫn bị tăng sắc tố hai bên gò má. Cảm ơn tòa soạn Hoàng Bảo Journal vì những bài báo cáo khoa học chất lượng cao như thế này!'
    }
  ]);
  const [commentName, setCommentName] = useState<string>('');
  const [commentLocation, setCommentLocation] = useState<string>('');
  const [commentText, setCommentText] = useState<string>('');
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterSuccess, setNewsletterSuccess] = useState<boolean>(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAddComment = (e: FormEvent) => {
    e.preventDefault();
    if (commentName.trim() && commentText.trim()) {
      setComments([
        {
          name: commentName.trim(),
          location: commentLocation.trim() || 'Bạn đọc',
          time: 'Vừa xong',
          text: commentText.trim()
        },
        ...comments
      ]);
      setCommentText('');
      setCommentName('');
      setCommentLocation('');
    }
  };

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSuccess(false), 5000);
    }
  };

  // If article not found
  if (!article) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center px-4 py-16">
        <div className="bg-white p-8 md:p-12 border border-gray-300 text-center max-w-md w-full shadow-sm">
          <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">Không tìm thấy bài báo</h1>
          <p className="text-sm text-gray-600 mb-6 font-sans leading-relaxed">
            Nội dung bài viết bạn đang truy cập có thể đã được lưu trữ vào kho tư liệu hoặc đường dẫn bị thay đổi.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/tips"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <ArrowLeft size={15} /> Về chuyên trang tạp chí
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Về Trang chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Trang chủ', link: '/' },
    { label: 'Tạp chí & Cẩm nang', link: '/tips' },
    { label: article.category, link: `/tips` },
    { label: article.title }
  ];

  const contentFontSizeClass = {
    normal: 'text-base leading-relaxed',
    large: 'text-lg leading-loose',
    xlarge: 'text-xl leading-loose'
  }[fontSize];

  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-800 font-sans pb-16">
      
      {/* ── THANH ĐIỀU HƯỚNG TÒA SOẠN TRÊN CÙNG ── */}
      <div className="bg-white border-b border-gray-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
          <div className="overflow-x-auto scrollbar-none py-0.5 max-w-2xl">
            <Breadcrumb items={breadcrumbItems} className="text-xs" />
          </div>
          <div className="flex items-center gap-2 sm:gap-4 shrink-0 pl-2 sm:pl-4 border-l border-gray-200">
            <Link
              to="/tips"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-700 hover:text-rose-700 transition-colors"
            >
              <ArrowLeft size={14} /> <span className="hidden sm:inline">Toàn bộ ấn phẩm</span><span className="sm:hidden">Tất cả</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        
        {/* ── HEADER BÀI BÁO (JOURNALISTIC ARTICLE HEADER) ── */}
        <header className="max-w-4xl mx-auto text-left mb-8 md:mb-10">
          {/* Chuyên đề Kicker */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-[2px] text-rose-700 font-sans">
              CHUYÊN ĐỀ: {article.category}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-xs text-gray-500 font-sans">Báo cáo khoa học độc quyền</span>
          </div>

          {/* Tiêu đề bài viết */}
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 tracking-tight leading-[1.25] mb-5">
            {article.title}
          </h1>

          {/* Đoạn Sapo Báo Chí */}
          <p className="font-sans text-base sm:text-lg text-gray-700 leading-relaxed italic border-b border-gray-200 pb-5 mb-5 font-normal">
            {article.subtitle || article.summary}
          </p>

          {/* Thanh Byline Tác Giả & Xuất Bản */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-b border-gray-200 text-xs text-gray-500 font-sans">
            {/* Tác giả */}
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-10 h-10 rounded-full object-cover border border-gray-300 shadow-xs"
              />
              <div>
                <p className="font-bold text-gray-900 text-sm font-sans">{article.author.name}</p>
                <p className="text-[11px] text-rose-800 font-semibold">{article.author.role}</p>
                {article.author.department && (
                  <p className="text-[10px] text-gray-500">{article.author.department}</p>
                )}
              </div>
            </div>

            {/* Thời gian xuất bản & Lượt đọc */}
            <div className="flex flex-wrap items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1 text-gray-600 font-medium">
                <Calendar size={13} className="text-rose-700" /> Xuất bản: {article.timePublished}, {article.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock size={13} className="text-rose-700" /> {article.readTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye size={13} className="text-rose-700" /> {article.views.toLocaleString()} lượt đọc
              </span>
            </div>
          </div>

          {/* Thanh Công Cụ Đọc Báo (Toolbar) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 text-xs font-sans">
            {/* Điều chỉnh cỡ chữ đọc báo */}
            <div className="flex items-center gap-2 text-gray-600">
              <span className="font-sans font-bold text-[11px] uppercase tracking-wider">Cỡ chữ:</span>
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2.5 py-0.5 rounded border text-xs font-sans transition-colors cursor-pointer ${
                  fontSize === 'normal' ? 'bg-gray-900 text-white border-gray-900 font-bold' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Chuẩn
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2.5 py-0.5 rounded border text-xs font-sans transition-colors cursor-pointer ${
                  fontSize === 'large' ? 'bg-gray-900 text-white border-gray-900 font-bold' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Lớn
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2.5 py-0.5 rounded border text-xs font-sans transition-colors cursor-pointer ${
                  fontSize === 'xlarge' ? 'bg-gray-900 text-white border-gray-900 font-bold' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Rất lớn
              </button>
            </div>

            {/* Các nút chia sẻ báo chí */}
            <div className="flex items-center gap-2">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors"
                title="Chia sẻ lên Facebook"
                aria-label="Facebook"
              >
                <BsFacebook size={13} />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 bg-black hover:bg-gray-800 text-white flex items-center justify-center transition-colors"
                title="Chia sẻ lên Twitter/X"
                aria-label="Twitter"
              >
                <BsTwitterX size={13} />
              </a>
              <button
                onClick={handleCopyLink}
                className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] font-semibold flex items-center gap-1 border border-gray-300 transition-colors"
                title="Sao chép liên kết"
              >
                {copied ? <Check size={13} className="text-emerald-600" /> : <Share2 size={13} />}
                <span>{copied ? 'Đã sao chép!' : 'Sao chép link'}</span>
              </button>
              <button
                onClick={handlePrint}
                className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 border border-gray-300 transition-colors"
                title="In bài báo"
                aria-label="Print"
              >
                <Printer size={13} />
              </button>
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-1.5 border transition-colors ${
                  isBookmarked ? 'bg-amber-50 text-amber-700 border-amber-300' : 'bg-gray-100 text-gray-600 border-gray-300'
                }`}
                title="Lưu bài báo"
                aria-label="Bookmark"
              >
                <Bookmark size={13} fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </header>

        {/* ── ẢNH CHÍNH BÀI BÁO (HERO PHOTO WITH CAPTION) ── */}
        <figure className="max-w-4xl mx-auto mb-10">
          <div className="aspect-[16/9] sm:aspect-[21/10] bg-gray-100 overflow-hidden border border-gray-200">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
          {article.photoCredit && (
            <figcaption className="text-right text-[11px] text-gray-500 font-sans italic pt-2">
              Nguồn ảnh: {article.photoCredit}
            </figcaption>
          )}
        </figure>

        {/* ── LƯỚI BỐ CỤC: BÀI BÁO CHÍNH (8 CỘT) + SIDEBAR (4 CỘT) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-7xl mx-auto">
          
          {/* CỘT NỘI DUNG CHÍNH (8 CỘT) */}
          <main className="lg:col-span-8 bg-white p-6 sm:p-8 md:p-12 border border-gray-200 shadow-xs">
            
            {/* Mục lục báo chí nhanh trên thiết bị di động (Mobile TOC Menu) */}
            <div className="lg:hidden mb-6 p-4 bg-gray-50 border border-gray-200">
              <button
                type="button"
                onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
                className="w-full flex items-center justify-between font-sans font-bold text-xs uppercase tracking-wider text-gray-900 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <List size={15} className="text-rose-700" /> Mục Lục Nội Dung Bài Báo ({article.content.sections.length} phần)
                </span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isMobileTocOpen ? 'rotate-180 text-rose-700' : ''}`} />
              </button>
              {isMobileTocOpen && (
                <nav className="mt-3 pt-3 border-t border-gray-200 space-y-2 text-xs font-sans">
                  {article.content.sections.map((section, idx) => (
                    <a
                      key={idx}
                      href={`#section-${idx + 1}`}
                      onClick={() => setIsMobileTocOpen(false)}
                      className="block text-gray-700 hover:text-rose-800 py-1 line-clamp-1 border-l-2 border-rose-700 pl-2 font-medium"
                    >
                      {section.heading}
                    </a>
                  ))}
                </nav>
              )}
            </div>

            {/* Đoạn mở đầu với Drop-cap (chữ cái đầu dòng to nghệ thuật báo chí) */}
            <div className={`font-sans text-gray-800 ${contentFontSizeClass} first-letter:float-left first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:mr-3 first-letter:text-gray-900 first-letter:leading-none pb-6 border-b border-gray-200`}>
              {article.content.intro}
            </div>

            {/* Khối Trích Dẫn Lớn (Pull Quote) */}
            {article.pullQuote && (
              <div className="my-10 py-6 px-8 border-y-2 border-gray-900 bg-[#fbfaf8] text-center">
                <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-gray-900 leading-relaxed">
                  "{article.pullQuote.quote}"
                </p>
                <span className="block mt-3 text-xs font-bold uppercase tracking-widest text-rose-800 font-sans">
                  — {article.pullQuote.speaker}
                </span>
              </div>
            )}

            {/* Các Phần Nội Dung Bài Viết (Sections) */}
            <div className="space-y-12 pt-6">
              {article.content.sections.map((section, idx) => (
                <section key={idx} id={`section-${idx + 1}`} className="scroll-mt-20 space-y-4">
                  
                  {/* Tiêu đề mục báo chí */}
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
                    {section.heading}
                  </h2>

                  {/* Thân bài viết */}
                  <p className={`font-sans text-gray-800 ${contentFontSizeClass} whitespace-pre-line leading-relaxed`}>
                    {section.body}
                  </p>

                  {/* Hình ảnh minh họa xen kẽ trong bài viết (Inline Image) */}
                  {section.inlineImage && (
                    <figure className="my-6">
                      <div className="aspect-[16/10] overflow-hidden bg-gray-100 border border-gray-200">
                        <img
                          src={section.inlineImage.url}
                          alt={section.inlineImage.caption}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <figcaption className="p-3 bg-gray-50 border-x border-b border-gray-200 text-xs text-gray-600 font-sans leading-relaxed">
                        <span className="font-bold text-gray-900 mr-1">Hình {idx + 1}:</span>
                        {section.inlineImage.caption}
                        {section.inlineImage.credit && (
                          <span className="block text-[11px] text-gray-400 italic pt-0.5">
                            {section.inlineImage.credit}
                          </span>
                        )}
                      </figcaption>
                    </figure>
                  )}

                  {/* Chỉ dẫn lâm sàng thực tế */}
                  {section.tips && section.tips.length > 0 && (
                    <div className="my-6 p-5 bg-[#f6f8f6] border-l-4 border-emerald-700 border-y border-r border-gray-200 font-sans">
                      <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-900 mb-2">
                        Chỉ Dẫn Lâm Sàng Từ Bác Sĩ Chuyên Khoa:
                      </h4>
                      <ul className="space-y-1.5 font-sans text-xs sm:text-sm text-gray-700 list-disc list-inside">
                        {section.tips.map((tip, tIdx) => (
                          <li key={tIdx} className="leading-relaxed">
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </section>
              ))}
            </div>

            {/* Lời Kết Tòa Soạn */}
            <div className="mt-10 p-6 bg-gray-50 border border-gray-200 space-y-2 font-sans">
              <h3 className="font-serif font-bold text-base text-gray-900 uppercase tracking-wide">
                Tổng Kết & Khuyến Nghị Tòa Soạn Hoàng Bảo
              </h3>
              <p className={`font-sans text-gray-700 ${contentFontSizeClass} leading-relaxed`}>
                {article.content.conclusion}
              </p>
            </div>

            {/* Chủ Đề Tags */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap items-center gap-2 font-sans">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mr-1">Từ khóa chuyên môn:</span>
              {article.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-sans font-medium transition-colors cursor-pointer border border-gray-200"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Hồ Sơ Tác Giả & Cố Vấn Y Khoa */}
            <div className="mt-10 p-6 bg-[#faf9f6] border border-gray-300 flex flex-col sm:flex-row items-center sm:items-start gap-5 font-sans">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-300 shrink-0"
              />
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] uppercase tracking-widest font-bold text-rose-700 block font-sans">
                  TÁC GIẢ BÀI VIẾT
                </span>
                <h4 className="font-serif text-lg font-bold text-gray-900">{article.author.name}</h4>
                <p className="text-xs text-rose-800 font-bold">{article.author.role}</p>
                {article.author.department && (
                  <p className="text-xs text-gray-500 italic font-sans">{article.author.department}</p>
                )}
                {article.author.bio && (
                  <p className="text-xs text-gray-600 font-sans leading-relaxed pt-2 border-t border-gray-200 mt-2">
                    {article.author.bio}
                  </p>
                )}
              </div>
            </div>

            {/* Điều hướng Bài Trước / Bài Tiếp Theo */}
            <div className="mt-8 pt-6 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
              {prevArticle ? (
                <Link
                  to={`/tips/${prevArticle.id}`}
                  className="p-4 border border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-all flex flex-col justify-between group text-left"
                >
                  <span className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1 group-hover:text-rose-700 mb-1">
                    <ArrowLeft size={12} /> Bài báo cáo trước
                  </span>
                  <p className="font-sans text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-rose-700 transition-colors">
                    {prevArticle.title}
                  </p>
                </Link>
              ) : (
                <div className="p-4 border border-dashed border-gray-200 text-gray-400 text-xs font-sans flex items-center">
                  Đây là bài xuất bản mới nhất trong chuyên đề
                </div>
              )}

              {nextArticle ? (
                <Link
                  to={`/tips/${nextArticle.id}`}
                  className="p-4 border border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-all flex flex-col justify-between group text-right"
                >
                  <span className="text-[10px] uppercase font-bold text-gray-400 flex items-center justify-end gap-1 group-hover:text-rose-700 mb-1">
                    Bài báo cáo kế tiếp <ArrowRight size={12} />
                  </span>
                  <p className="font-sans text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-rose-700 transition-colors">
                    {nextArticle.title}
                  </p>
                </Link>
              ) : (
                <div className="p-4 border border-dashed border-gray-200 text-gray-400 text-xs font-sans flex items-center justify-end">
                  Không còn bài báo cáo cũ hơn
                </div>
              )}
            </div>

            {/* ── Ý KIẾN BẠN ĐỌC TÒA SOẠN (READER COMMENTS) ── */}
            <section className="mt-12 pt-8 border-t-2 border-gray-900 space-y-6 font-sans">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <h3 className="font-serif text-xl font-bold text-gray-900 flex items-center gap-2">
                  <MessageSquare size={18} className="text-rose-700" />
                  Ý Kiến Bạn Đọc & Phản Hồi Chuyên Môn ({comments.length})
                </h3>
                <span className="text-xs text-gray-500 font-sans">Chuyên mục thảo luận</span>
              </div>

              {/* Form gửi ý kiến */}
              <form onSubmit={handleAddComment} className="bg-gray-50 p-5 border border-gray-200 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={commentName}
                    onChange={e => setCommentName(e.target.value)}
                    placeholder="Họ tên bạn đọc *"
                    required
                    className="w-full px-3.5 py-2 text-xs bg-white border border-gray-300 rounded-none focus:outline-none focus:border-gray-900 font-sans"
                  />
                  <input
                    type="text"
                    value={commentLocation}
                    onChange={e => setCommentLocation(e.target.value)}
                    placeholder="Nơi công tác / Tỉnh, thành phố"
                    className="w-full px-3.5 py-2 text-xs bg-white border border-gray-300 rounded-none focus:outline-none focus:border-gray-900 font-sans"
                  />
                </div>
                <textarea
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  placeholder="Viết ý kiến phản hồi hoặc đặt câu hỏi chuyên môn cho ban biên tập..."
                  rows={3}
                  required
                  className="w-full px-3.5 py-2 text-xs bg-white border border-gray-300 rounded-none focus:outline-none focus:border-gray-900 font-sans resize-none"
                />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-gray-500 font-sans">
                  <span>Ý kiến sẽ được kiểm duyệt trước khi hiển thị theo quy định tòa soạn.</span>
                  <button
                    type="submit"
                    className="self-end sm:self-auto inline-flex items-center gap-1.5 px-5 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
                  >
                    <Send size={13} /> Gửi ý kiến
                  </button>
                </div>
              </form>

              {/* Danh sách bình luận bạn đọc */}
              <div className="space-y-4 pt-2 font-sans">
                {comments.map((cmt, idx) => (
                  <div key={idx} className="p-4 bg-white border border-gray-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-gray-900">{cmt.name}</span>
                        {cmt.location && (
                          <span className="text-[11px] text-gray-500 italic">({cmt.location})</span>
                        )}
                      </div>
                      <span className="text-[11px] text-gray-400 font-sans">{cmt.time}</span>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-gray-700 leading-relaxed">
                      {cmt.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>

          </main>

          {/* CỘT SIDEBAR CỐ ĐỊNH (4 CỘT) */}
          <aside className="lg:col-span-4 space-y-8 font-sans">
            
            {/* 1. MỤC LỤC BÀI BÁO (TABLE OF CONTENTS) */}
            <div className="bg-white p-6 border border-gray-200 shadow-xs lg:sticky lg:top-14">
              <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-gray-900 mb-3 flex items-center gap-2 border-b-2 border-gray-900 pb-2">
                <List size={16} className="text-rose-700" /> Mục Lục Nội Dung Bài Báo
              </h3>
              <nav className="space-y-2 text-xs font-sans">
                {article.content.sections.map((section, idx) => (
                  <a
                    key={idx}
                    href={`#section-${idx + 1}`}
                    className="block text-gray-700 hover:text-rose-800 hover:bg-gray-50 px-2 py-1.5 transition-colors line-clamp-1 border-l-2 border-transparent hover:border-rose-700 font-medium"
                  >
                    {section.heading}
                  </a>
                ))}
              </nav>

              {/* Sản phẩm được nhắc đến trong bài viết */}
              {article.content.recommendedProducts && article.content.recommendedProducts.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-gray-900 mb-3 flex items-center gap-1.5 border-b border-gray-200 pb-2">
                    <ShoppingBag size={15} className="text-rose-700" /> Sản phẩm nhắc đến trong bài
                  </h4>
                  <div className="space-y-3">
                    {article.content.recommendedProducts.map((prod, pIdx) => (
                      <div
                        key={pIdx}
                        className="p-3 bg-gray-50 border border-gray-200 hover:border-gray-400 transition-colors"
                      >
                        <p className="font-sans font-bold text-xs text-gray-900 leading-snug line-clamp-2 mb-1">
                          {prod.name}
                        </p>
                        <span className="text-[10px] text-gray-500 block mb-2 font-sans">{prod.category}</span>
                        <div className="flex items-center justify-between pt-1 border-t border-gray-200">
                          <span className="text-xs font-bold text-rose-800">
                            {prod.price.toLocaleString('vi-VN')}₫
                          </span>
                          <Link
                            to="/products"
                            className="px-2.5 py-1 bg-gray-900 hover:bg-black text-white text-[11px] font-bold uppercase tracking-wider transition-colors"
                          >
                            Xem sản phẩm
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bài Viết Đọc Nhiều Nhất */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-gray-900 mb-3 flex items-center gap-1.5 border-b border-gray-200 pb-2">
                  <FileText size={15} className="text-rose-700" /> Đọc nhiều nhất tuần
                </h4>
                <div className="space-y-3">
                  {mostRead.slice(0, 3).map((art, idx) => (
                    <Link
                      key={art.id}
                      to={`/tips/${art.id}`}
                      className="flex items-start gap-2.5 group"
                    >
                      <span className="font-sans font-bold text-lg text-gray-300 group-hover:text-rose-700 transition-colors leading-none shrink-0">
                        0{idx + 1}
                      </span>
                      <p className="font-sans font-bold text-xs text-gray-800 group-hover:text-rose-700 transition-colors leading-snug line-clamp-2">
                        {art.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Nút quay lại danh sách bài viết */}
              <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                <button
                  onClick={() => navigate('/tips')}
                  className="text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-gray-900 inline-flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft size={13} /> Quay lại danh mục báo chí
                </button>
              </div>

            </div>

          </aside>

        </div>

        {/* ── BÀI BÁO CÙNG CHUYÊN MỤC (RELATED ARTICLES) ── */}
        {relatedArticles.length > 0 && (
          <section className="mt-16 pt-12 border-t-2 border-gray-900 max-w-7xl mx-auto font-sans">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[2px] text-rose-700 block mb-1 font-sans">
                  TƯ LIỆU BỔ SUNG
                </span>
                <h3 className="font-serif text-2xl font-bold text-gray-900">
                  Các Báo Cáo Cùng Chuyên Đề Nghiên Cứu
                </h3>
              </div>
              <Link
                to="/tips"
                className="font-bold text-xs uppercase tracking-wider text-rose-700 hover:text-gray-900 inline-flex items-center gap-1 font-sans"
              >
                Xem toàn bộ ấn phẩm <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map(rel => (
                <article
                  key={rel.id}
                  className="bg-white border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
                >
                  <Link to={`/tips/${rel.id}`} className="relative aspect-[16/10] overflow-hidden bg-gray-100 block">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 bg-gray-900 text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider font-sans">
                      {rel.category}
                    </span>
                  </Link>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-2 font-sans">
                        <span>{rel.date}</span>
                        <span>•</span>
                        <span>{rel.readTime}</span>
                      </div>

                      <h4 className="font-serif font-bold text-sm sm:text-base leading-snug group-hover:text-rose-700 transition-colors line-clamp-2 mb-2">
                        <Link to={`/tips/${rel.id}`}>
                          {rel.title}
                        </Link>
                      </h4>

                      <p className="font-sans text-xs text-gray-600 line-clamp-2 leading-relaxed">
                        {rel.subtitle || rel.summary}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                      <span className="text-gray-400 flex items-center gap-1 text-[11px]">
                        <Eye size={12} /> {rel.views.toLocaleString()}
                      </span>
                      <Link
                        to={`/tips/${rel.id}`}
                        className="font-bold text-rose-700 hover:text-gray-900 uppercase tracking-wider text-[11px] inline-flex items-center gap-1"
                      >
                        Đọc báo cáo <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
