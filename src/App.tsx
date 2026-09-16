import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTelephone } from 'react-icons/bs';

// Import các Component và Pages
import Navbar from './components/Navbar/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer/Footer';
import CartPanel from './components/CartPanel';
import Contact from './pages/Contact';
import Tips from './pages/Tips';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Sale from './pages/Sale';
import Admin from './pages/Admin';
import OrderTracking from './pages/OrderTracking';

function App() {
  return (
    <Router>
      {/* Component này sẽ tự động cuộn lên đầu trang khi chuyển route */}
      <ScrollToTop />

      <div className="flex flex-col min-h-screen bg-black">
        {/* Navbar luôn hiển thị ở trên cùng mọi trang */}
        <Navbar />
        
        {/* Cart Panel sẽ được render ở đây */}
        <CartPanel />

        {/* Nơi chứa ruột của trang (sẽ thay đổi tùy theo link) */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/order-tracking" element={<OrderTracking />} />
            <Route path="/tracking" element={<OrderTracking />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        {/* Footer luôn hiển thị ở dưới cùng mọi trang */}
        <Footer />

        {/* Floating Contact Icons */}
        <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
          <a
            href="tel:0359490221"
            className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-green-600 transition-colors"
            aria-label="Call us"
          >
            <BsTelephone size={18} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-blue-700 transition-colors"
            aria-label="Facebook"
          >
            <BsFacebook size={18} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:opacity-90 transition-opacity"
            aria-label="Instagram"
          >
            <BsInstagram size={18} />
          </a>
        </div>
      </div>
    </Router>
  );
}

export default App;