import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const skillCategories = [
  {
    category: 'Backend',
    skills: ['Java', 'SpringBoot', 'Python', 'Kafka', 'Flask', 'Django', 'REST APIs', 'SQL'],
  },
  {
    category: 'Frontend',
    skills: ['JavaScript', 'React', 'HTML5', 'CSS3', 'Responsive Design'],
  },
  {
    category: 'Architecture & Design',
    skills: ['HLD', 'LLD', 'System Design', 'Design Patterns'],
  },
  {
    category: 'AI & Tools',
    skills: ['AI', 'Agentic AI', 'Claude', 'GitHub Copilot', 'Git', 'Docker', 'Grafana', 'Linux', 'AWS', 'CI/CD'],
  },
];

function SkillCategory({ cat, index }) {
  const [ref, isVisible] = useScrollReveal(0.2);

  return (
    <div
      ref={ref}
      className={`skills__category reveal ${isVisible ? 'reveal--visible' : ''}`}
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      <h3 className="skills__category-title">{cat.category}</h3>
      <div className="skills__list">
        {cat.skills.map((skill) => (
          <span key={skill} className="skills__tag">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <h2 className="section__title">Skills</h2>
      <div className="skills__grid">
        {skillCategories.map((cat, index) => (
          <SkillCategory key={cat.category} cat={cat} index={index} />
        ))}
      </div>
    </section>
  );
}
