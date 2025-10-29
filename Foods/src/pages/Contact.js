// src/pages/Contact.js
import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:6050/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("✅ Thank you for your message! We’ll get back to you soon.");
        setFormData({ name: '', email: '', message: '' }); // clear form
      } else {
        alert("⚠️ Failed to send message: " + data.message);
      }
    } catch (error) {
      console.error("Contact form error:", error);
      alert("❌ Server error. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="contact-container">
      {/* Header */}
      <header className="contact-header">
        <h1>📞 Contact Us — Achu’s ReadyMix Foods 🌸</h1>
        <p className="subtitle">We’d love to hear from you! 💛</p>
      </header>

      {/* About message */}
      <section className="contact-info">
        <p>
          Have a question about our ReadyMix Foods?<br />
          Want to know how to cook with our products? 🍳<br />
          Looking for suggestions or feedback?<br />
          👉 We are always happy to connect with you!
        </p>
        <p>
          As a small homegrown brand, your messages truly make our day. ☀️
        </p>
      </section>

      {/* Info grid */}
      <section className="info-list">
        <div>
          <h3>📍 Address</h3>
          <p>
            Peelamedu, Coimbatore, Tamil Nadu, India<br />
            (We currently ship across India — DM us for delivery options 📦)
          </p>
        </div>

        <div>
          <h3>📧 Email</h3>
          <p>
            <a href="mailto:achusfoods@gmail.com">achusfoods@gmail.com</a>
          </p>
        </div>

        <div>
          <h3>📱 Phone & WhatsApp</h3>
          <p>+91-9790164420<br />Call or message anytime 📲</p>
        </div>

        <div>
          <h3>📸 Instagram</h3>
          <p>
            <a href="https://instagram.com/achusfoods" target="_blank" rel="noreferrer">
              @achusfoods
            </a><br />
            We reply to every DM 💌
          </p>
        </div>

        <div>
          <h3>⏰ Working Hours</h3>
          <p>Mon–Sat: 9 AM – 6 PM<br />Sunday: Closed — family time! 💛</p>
        </div>
      </section>

      {/* Contact form */}
      <section className="contact-form-section">
        <h2>💌 Send Us a Message</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
          <textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message ✨"}
          </button>
        </form>
      </section>

      {/* Personal note */}
      <section className="note-section">
        <h3>💬 A Note from Achu</h3>
        <p>
          "As the founder of this small brand, I (Akshatha — Achu) personally read every message.
          Your love and support keep this journey alive. Looking forward to hearing from you soon!" 🌸💛
        </p>
      </section>

      {/* Footer */}
      <footer className="contact-footer">
        <p>🏡 Achu’s ReadyMix Foods — created with love, served with care. 💛</p>
      </footer>
    </div>
  );
}

export default Contact;
