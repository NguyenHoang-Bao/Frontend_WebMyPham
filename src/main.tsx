import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './i18n';
// 1. Xóa đuôi .js
import App from './App';
import { CartProvider } from './context/CartContext';

// 2. Thêm dấu ! (Non-null assertion) để đảm bảo thẻ root luôn tồn tại
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>,
);