// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import bannerImage from '../assets/images/banner.png'; // Your banner image

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section with background image */}
      <section
        className="hero-section"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,230,235,0.4), rgba(255,240,245,0.4)), url(${bannerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(1.1)',
        }}
      >
        <div className="hero-text">
          <h1>Welcome to Achu’s ReadyMix Foods 🌸</h1>
          <p>Homemade Taste. Quick Prep. Made with Love.</p>
          <Link to="/products" className="hero-button">Explore Products 🍲</Link>
        </div>
      </section>

      {/* About Preview */}
      <section className="about-preview fade-up">
        <h2>👩‍🍳 A Daughter's Dream, A Mom’s Love</h2>
        <p>
          Inspired by my mom’s cooking and the love of home, I created ReadyMix Foods
          that are easy to make, natural, and full of traditional taste.
        </p>
        <Link to="/about" className="link-button">Read Our Story 💛</Link>
      </section>

      {/* Features Section */}
      <section className="features-section fade-up">
        <h2>✨ Why Choose Achu’s?</h2>
        <div className="features-grid">
          <div className="feature-card zoom">✅ 100% Natural Ingredients</div>
          <div className="feature-card zoom">✅ No Preservatives or Additives</div>
          <div className="feature-card zoom">✅ Ready in Minutes</div>
          <div className="feature-card zoom">✅ Traditional South Indian Taste</div>
          <div className="feature-card zoom">✅ Loved by Families</div>
          <div className="feature-card zoom">✅ Eco-Friendly Packaging</div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="cta-section fade-up">
        <h2>🛍️ Order Now & Taste the Tradition!</h2>
        <p>Your kitchen deserves the magic of homemade food — made easy. 🌾</p>
        <Link to="/contact" className="cta-button">Contact Us 📞</Link>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>🏡 Achu’s ReadyMix Foods — Made with Love, Served with Care.</p>
      </footer>
    </div>
  );
}

export default Home;
