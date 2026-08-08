import React, { useState, useEffect, useRef } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const stats = [
  { label: 'Years Experience', value: 4, suffix: '+' },
  { label: 'Projects Completed', value: 15, suffix: '+' },
  { label: 'Technologies', value: 10, suffix: '+' },
];

const details = [
  { icon: '📍', label: 'Location', value: 'Pune, India' },
  { icon: '📧', label: 'Email', value: 'pranavbilwanikar20@gmail.com' },
  { icon: '🟢', label: 'Status', value: 'Open to opportunities' },
];

function AnimatedCounter({ target, suffix, isVisible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let current = 0;
    const increment = target / 40;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <span className="about__stat-number">
      {count}{suffix}
    </span>
  );
}

export default function About() {
  const [sectionRef, isVisible] = useScrollReveal(0.1);
  const [imageRef, imageVisible] = useScrollReveal(0.3);
  const [textRef, textVisible] = useScrollReveal(0.2);
  const [statsRef, statsVisible] = useScrollReveal(0.3);
  const [activeDetail, setActiveDetail] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section id="about" className="about" ref={sectionRef}>
      <h2 className={`section__title reveal ${isVisible ? 'reveal--visible' : ''}`}>About Me</h2>

      <div className="about__content">
        {/* Image with 3D tilt and glow */}
        <div
          ref={(el) => { imageContainerRef.current = el; imageRef.current = el; }}
          className={`about__image-wrapper reveal ${imageVisible ? 'reveal--visible' : ''}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: imageVisible
              ? `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`
              : 'perspective(1000px) translateY(40px)',
          }}
        >
          <div className="about__image-glow"></div>
          <div className="about__image-placeholder">
            <img src="/pranav.jpeg" alt="Pranav Bilwanikar" className="about__photo" />
          </div>
          <div className="about__image-border"></div>
        </div>

        {/* Text with staggered animations */}
        <div ref={textRef} className={`about__text ${textVisible ? 'about__text--visible' : ''}`}>
          <p className="about__text-line" style={{ transitionDelay: '0.1s' }}>
            I enjoy turning complex problems into simple, reliable products.
            My work revolves around building systems that can handle scale,
            adapt to change, and quietly do their job well when millions of interactions
            depend on them. I'm driven by curiosity, thoughtful engineering, and the
            satisfaction of taking an idea from a whiteboard sketch to something people rely
             on every day.

            When I'm not building software, you'll probably find me exploring new technologies,
            refining how things work under the hood, or finding better ways to ship ideas faster
            without compromising quality.

          </p>
          <p className="about__text-line" style={{ transitionDelay: '0.25s' }}>
            With a strong foundation in both frontend and backend development,
            I strive to create seamless user experiences backed by robust
            server-side architecture.
          </p>

          {/* Interactive detail cards */}
          <div className="about__details">
            {details.map((detail, index) => (
              <div
                key={detail.label}
                className={`about__detail-card ${activeDetail === index ? 'about__detail-card--active' : ''}`}
                style={{ transitionDelay: `${0.4 + index * 0.1}s` }}
                onMouseEnter={() => setActiveDetail(index)}
                onMouseLeave={() => setActiveDetail(null)}
              >
                <span className="about__detail-icon">{detail.icon}</span>
                <div>
                  <span className="about__detail-label">{detail.label}</span>
                  <span className="about__detail-value">{detail.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animated stats counters */}
      <div ref={statsRef} className={`about__stats reveal ${statsVisible ? 'reveal--visible' : ''}`}>
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="about__stat"
            style={{ transitionDelay: `${index * 0.15}s` }}
          >
            <AnimatedCounter
              target={stat.value}
              suffix={stat.suffix}
              isVisible={statsVisible}
            />
            <span className="about__stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
