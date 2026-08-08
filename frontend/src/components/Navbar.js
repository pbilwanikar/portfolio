import React, { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        <div className="navbar__logo" onClick={() => scrollTo('hero')}>
          Portfolio
        </div>
        <button
          className={`navbar__hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          <li onClick={() => scrollTo('about')}>About</li>
          <li onClick={() => scrollTo('experience')}>Experience</li>
          <li onClick={() => scrollTo('skills')}>Skills</li>
          <li onClick={() => scrollTo('contact')}>Contact</li>
          <li>
            <a href={`${API_URL}/api/resume`} target="_blank" rel="noopener noreferrer" className="navbar__resume-btn">
              Resume
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
