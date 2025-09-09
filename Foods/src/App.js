import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Component Imports
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Page Imports
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import RequestReset from './pages/RequestReset';
import ProductDetail from './pages/ProductDetail';
import Billing from './pages/Billing';
import Profile from './pages/Profile'; // ✅ Profile Page

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Navbar />

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/request-reset" element={<RequestReset />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            <Route path="/product/:productName" element={<ProductDetail />} />
            <Route path="/billing" element={<Billing />} />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>

        
      </div>

      {/* ✅ ToastContainer at bottom of layout */}
      <ToastContainer />
      <Footer />
    </Router>
  );
}

export default App;
