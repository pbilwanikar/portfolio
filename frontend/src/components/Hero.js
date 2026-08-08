import React, { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
const roles = ['Full Stack Developer', 'Java Developer', 'Agentic AI Developer'];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;

    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            isDeleting
              ? current.substring(0, text.length - 1)
              : current.substring(0, text.length + 1)
          );
        },
        isDeleting ? 50 : 100
      );
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <section id="hero" className="hero">
      <div className="hero__content">
        <p className="hero__greeting">Hello, I'm</p>
        <h1 className="hero__name">Pranav Bilwanikar</h1>
        <h2 className="hero__role">
          <span className="hero__typed">{text}</span>
          <span className="hero__cursor">|</span>
        </h2>
        <p className="hero__tagline">
          Building elegant solutions to complex problems
        </p>
        <div className="hero__actions">
          <a href="#contact" className="btn btn--primary">
            Get In Touch
          </a>
          <a href={`${API_URL}/api/resume`} target="_blank" rel="noopener noreferrer" className="btn btn--outline">
            Download Resume
          </a>
        </div>
      </div>
      <div className="hero__scroll-indicator">
        <span>Scroll Down</span>
        <div className="hero__scroll-arrow"></div>
      </div>
    </section>
  );
}
