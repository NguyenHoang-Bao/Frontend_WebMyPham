import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import viTranslation from './locales/vi.json';
import enTranslation from './locales/en.json';
import zhTranslation from './locales/zh.json'; // Khai báo thêm dòng này

const resources = {
  vi: { translation: viTranslation },
  en: { translation: enTranslation },
  zh: { translation: zhTranslation }, // Bổ sung tiếng Trung vào đây
};

i18n
  .use(LanguageDetector) // Tự động phát hiện ngôn ngữ browser
  .use(initReactI18next) // Truyền instance i18n cho react-i18next
  .init({
    resources,
    fallbackLng: 'vi', // Nếu không tìm thấy ngôn ngữ, mặc định dùng tiếng Việt
    interpolation: {
      escapeValue: false, // React đã tự động chống XSS injection
    },
  });

export default i18n;