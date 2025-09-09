// src/pages/About.js
import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Us 🌸</h1>
        <h2>Achu’s ReadyMix Foods</h2>
        <p className="tagline">✨ Made by a daughter. Loved by moms. Shared with families everywhere. ✨</p>
      </header>

      <section className="intro-section">
        <h3>Hi, I'm Akshatha — or as my family calls me, Achu! 🥰</h3>
        <p>
          I was inspired by my mom — a loving, working woman who always made time to cook for us.
          Today’s moms are busier than ever. That’s why I created ReadyMix Foods — to save time without losing tradition. ❤️
        </p>
      </section>

      <section className="what-we-do">
        <h3>🌿 What We Make</h3>
        <ul>
          <li>Dosa & Chapati Mixes</li>
          <li>Instant Rice Powders</li>
          <li>100% natural, no preservatives</li>
          <li>Traditional South Indian taste</li>
        </ul>
      </section>

      <section className="values-section">
        <h3>💚 Why Families Love Us</h3>
        <div className="values-grid">
          <span>🌿 Honest ingredients</span>
          <span>🏺 Traditional recipes</span>
          <span>🛡️ Trusted by moms</span>
          <span>⚡ Quick to cook</span>
        </div>
      </section>

      <section className="note-section">
        <h3>💌 A Note from Achu</h3>
        <p>
          I started this with love — for my mom, and for all moms out there.
          My dream is to bring comfort, taste, and time-saving help to every kitchen. 🏡
        </p>
      </section>

      <footer className="about-footer">
        <p>🌸 Thank you for supporting home-grown brands like ours! 🌸</p>
      </footer>
    </div>
  );
}

export default About;
