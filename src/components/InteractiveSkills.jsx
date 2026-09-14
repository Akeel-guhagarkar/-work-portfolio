import React, { useState } from 'react';
import { Code2, Palette, Cpu, Wrench, CheckCircle2, Sparkles } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import './InteractiveSkills.css';

export default function InteractiveSkills() {
  useScrollReveal('.reveal-on-scroll', 0.15);
  const [activeCategory, setActiveCategory] = useState('ALL');

  const skillsData = [
    { name: 'React 19 & Next.js', category: 'FRONTEND', level: 95, icon: <Code2 size={16} />, tag: 'Core Stack' },
    { name: 'JavaScript & TypeScript', category: 'FRONTEND', level: 92, icon: <Code2 size={16} />, tag: 'ES6+ Engine' },
    { name: 'HTML5 & CSS3 Glassmorphism', category: 'FRONTEND', level: 98, icon: <Code2 size={16} />, tag: 'Responsive' },
    { name: 'UI/UX & Figma Product Design', category: 'DESIGN', level: 92, icon: <Palette size={16} />, tag: 'Prototyping' },
    { name: 'Design Systems & Motion', category: 'DESIGN', level: 90, icon: <Palette size={16} />, tag: 'Aesthetics' },
    { name: 'AI Tools & Machine Learning', category: 'BACKEND', level: 88, icon: <Cpu size={16} />, tag: 'IIT Delhi Certified' },
    { name: 'Node.js & REST APIs', category: 'BACKEND', level: 86, icon: <Cpu size={16} />, tag: 'Backend' },
    { name: 'Vite & Build Tooling', category: 'TOOLS', level: 94, icon: <Wrench size={16} />, tag: 'Bundling' },
    { name: 'Git & GitHub Pages', category: 'TOOLS', level: 96, icon: <Wrench size={16} />, tag: 'CI/CD' },
  ];

  const filteredSkills = activeCategory === 'ALL'
    ? skillsData
    : skillsData.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="interactive-skills-section reveal-on-scroll" aria-label="Interactive Tech Stack Skills">
      
      {/* Section Header */}
      <div className="section-header-line-row">
        <div className="header-left">
          <span className="section-num">[ 02 ]</span>
          <h2 className="header-title-text">TECH ENGINE & SKILLS</h2>
        </div>
        <div className="header-line"></div>
        <span className="header-right-label">INTERACTIVE STACK MATRIX</span>
      </div>

      {/* Category Filter Tabs */}
      <div className="skills-filter-bar">
        {['ALL', 'FRONTEND', 'DESIGN', 'BACKEND', 'TOOLS'].map((cat) => (
          <button
            key={cat}
            className={`skills-filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat === 'ALL' && <Sparkles size={13} />}
            {cat === 'FRONTEND' && <Code2 size={13} />}
            {cat === 'DESIGN' && <Palette size={13} />}
            {cat === 'BACKEND' && <Cpu size={13} />}
            {cat === 'TOOLS' && <Wrench size={13} />}
            <span>{cat}</span>
          </button>
        ))}
      </div>

      {/* Interactive Skills Grid */}
      <div className="skills-matrix-grid">
        {filteredSkills.map((skill, idx) => (
          <div key={idx} className="skill-card-item">
            <div className="skill-card-top">
              <div className="skill-title-group">
                <span className="skill-icon-badge">{skill.icon}</span>
                <span className="skill-name">{skill.name}</span>
              </div>
              <span className="skill-tag-pill">{skill.tag}</span>
            </div>

            <div className="skill-progress-bar-container">
              <div
                className="skill-progress-fill"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>

            <div className="skill-card-bottom">
              <span className="skill-pct-text">{skill.level}% Mastery</span>
              <span className="skill-check-badge">
                <CheckCircle2 size={12} /> Verified
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
