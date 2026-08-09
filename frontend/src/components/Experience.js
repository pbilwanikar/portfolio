import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const experiences = [
  {
    year: '2024 - 2026',
    title: 'Senior Software Developer',
    company: 'HSBC Software Development',
    description:
      'By day, I turn complex financial workflows into software that behaves itself under pressure. As a Senior Software Developer, I spend my time building systems that keep money moving, solving problems that only show up at scale, and occasionally convincing distributed systems to cooperate. Along the way, I mentor junior engineers, share battle scars from production incidents, and help turn good ideas into reliable products.',
  },
  {
    year: '2022 - 2024',
    title: 'Software Developer',
    company: 'HSBC Software Development',
    description:
      'As a Software Developer, I spent my time learning the craft—building features, fixing bugs, understanding large-scale systems, and asking plenty of questions. It was a phase of rapid growth where every project, code review, and production issue became an opportunity to become a better engineer.',
  },
  {
    year: '2021 - 2022',
    title: 'Computer Vision Intern',
    company: 'Center Stage - Formerly Zlandya',
    description:
      "As an Intern, I got my first taste of turning code into something real. I spent my days learning from experienced engineers, contributing to live projects, and discovering that software development is equal parts problem-solving, curiosity, and figuring out why the code worked five minutes ago but doesn't anymore.",
  },
];

function TimelineItem({ exp, index }) {
  const [ref, isVisible] = useScrollReveal(0.2);

  return (
    <div
      ref={ref}
      className={`timeline__item reveal ${isVisible ? 'reveal--visible' : ''}`}
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      <div className="timeline__dot"></div>
      <div className="timeline__content">
        <span className="timeline__year">{exp.year}</span>
        <h3 className="timeline__title">{exp.title}</h3>
        <h4 className="timeline__company">{exp.company}</h4>
        <p className="timeline__description">{exp.description}</p>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="experience">
      <h2 className="section__title">Experience</h2>
      <div className="timeline">
        {experiences.map((exp, index) => (
          <TimelineItem key={index} exp={exp} index={index} />
        ))}
      </div>
    </section>
  );
}
