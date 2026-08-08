import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__links">
          <a href="https://github.com/pbilwanikar" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/pranavrvb/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="mailto:pranavbilwanikar20@gmail.com">Email</a>
          <a href="https://leetcode.com/u/pbilwanikar/" target="_blank" rel="noopener noreferrer">
            LeetCode
          </a>
        </div>
        <p className="footer__copy">
          &copy; {new Date().getFullYear()} Pranav Bilwanikar. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
