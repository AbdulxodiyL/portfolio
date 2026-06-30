import { useState } from 'react'
import {
  SiJavascript, SiReact, SiNodedotjs, SiExpress, SiHtml5,
} from 'react-icons/si'
import {
  FaTelegramPlane, FaEnvelope, FaGithub, FaPhone,
  FaShoppingCart, FaTasks, FaUtensils, FaPalette,
} from 'react-icons/fa'
import { BsSun, BsMoon } from 'react-icons/bs'

const SKILLS = [
  { name: 'JavaScript', Icon: SiJavascript, color: '#f7df1e', level: 85 },
  { name: 'React.js',   Icon: SiReact,      color: '#61dafb', level: 78 },
  { name: 'Node.js',    Icon: SiNodedotjs,  color: '#3c873a', level: 75 },
  { name: 'Express.js', Icon: SiExpress,    color: '#8888aa', level: 72 },
  { name: 'HTML / CSS', Icon: SiHtml5,      color: '#e34f26', level: 90 },
  { name: 'UI / UX',    Icon: FaPalette,    color: '#a855f7', level: 70 },
]

const PROJECTS = [
  {
    Icon: FaShoppingCart,
    bg: 'linear-gradient(135deg,#6c63ff,#3b3086)',
    name: 'E-Commerce Website',
    tags: [{ label: 'React', color: '#61dafb' }, { label: 'Node.js', color: '#3c873a' }, { label: 'MongoDB', color: '#4db33d' }],
    desc: 'Full-featured online store with product catalog, shopping cart, payment system and admin panel.',
    live: '#', github: '#',
  },
  {
    Icon: FaTasks,
    bg: 'linear-gradient(135deg,#00d4ff,#0070a8)',
    name: 'Task Manager App',
    tags: [{ label: 'React', color: '#61dafb' }, { label: 'JavaScript', color: '#f7df1e' }],
    desc: 'Task management app with drag & drop, categories, deadlines and progress tracking.',
    live: '#', github: '#',
  },
  {
    Icon: FaUtensils,
    bg: 'linear-gradient(135deg,#ff6584,#c0392b)',
    name: 'Restaurant Landing Page',
    tags: [{ label: 'HTML/CSS', color: '#e34f26' }, { label: 'JavaScript', color: '#f7df1e' }],
    desc: 'Modern animated landing page with menu, reservations and location sections.',
    live: '#', github: '#',
  },
]

function SkillCard({ skill }) {
  const { Icon } = skill
  return (
    <div className="skill-card" style={{ '--skill-color': skill.color }}>
      <div className="skill-icon-wrap">
        <Icon size={40} style={{ color: skill.color }} />
      </div>
      <div className="skill-name">{skill.name}</div>
      <div className="skill-level">{skill.level}%</div>
      <div className="skill-bar">
        <div className="skill-fill" style={{ background: skill.color, width: skill.level + '%' }} />
      </div>
    </div>
  )
}

function ProjectCard({ p }) {
  const { Icon } = p
  return (
    <div className="project-card">
      <div className="project-img" style={{ background: p.bg }}>
        <Icon size={56} className="project-icon" />
        <div className="project-overlay">
          <a href={p.live}   className="overlay-btn">↗ View</a>
          <a href={p.github} className="overlay-btn outline">
            <FaGithub size={14} /> GitHub
          </a>
        </div>
      </div>
      <div className="project-body">
        <div className="project-tags">
          {p.tags.map(t => (
            <span key={t.label} className="tag" style={{ background: t.color + '22', color: t.color }}>
              {t.label}
            </span>
          ))}
        </div>
        <div className="project-name">{p.name}</div>
        <div className="project-desc">{p.desc}</div>
      </div>
    </div>
  )
}

export default function App() {
  const [dark, setDark]         = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { href: '#hero',     label: 'Home' },
    { href: '#about',    label: 'About' },
    { href: '#skills',   label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact',  label: 'Contact' },
  ]

  return (
    <div data-theme={dark ? 'dark' : 'light'} className="app">

      {/* NAV */}
      <nav>
        <div className="logo">&lt;Abdulxodiy /&gt;</div>

        <ul className={menuOpen ? 'open' : ''}>
          {navLinks.map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <button className="theme-toggle" onClick={() => setDark(d => !d)}>
            {dark ? <BsSun size={18} /> : <BsMoon size={18} />}
          </button>
          <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(o => !o)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="hero-badge">
          <span className="pulse-dot" />
          Available for work · 18 y.o · Junior Developer
        </div>
        <h1 className="hero-title">
          Hi, I'm<br />
          <span className="gradient">Abdulxodiy</span><br />
          Full-Stack Developer
        </h1>
        <p className="hero-sub">
          I build modern web applications with React, Node.js and Express.
          Ready to turn your idea into a real product.
        </p>
        <div className="hero-btns">
          <a href="#projects" className="btn btn-primary">
            <span>View Projects</span><span>→</span>
          </a>
          <a href="#contact" className="btn btn-outline">Contact Me</a>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="about-grid">
          <div>
            <div className="section-tag">About Me</div>
            <h2 className="section-title">
              Coding is my <span style={{ color: 'var(--primary)' }}>passion</span>
            </h2>
            <p className="section-text">
              I'm an 18-year-old junior Full-Stack developer from Andijon, Uzbekistan.
              I create beautiful frontend interfaces with HTML, CSS, JavaScript and React.
              I build backend APIs with Node.js and Express. I strive to deliver every
              project with quality and on time.
            </p>
            <p className="section-text" style={{ marginTop: 16 }}>
              Currently open to freelance projects — website, web app or UI/UX design.
              Feel free to reach out!
            </p>
          </div>

          <div className="about-card">
            <div className="avatar-photo-wrap">
              <div className="avatar-ring-border" />
              <img src="/avatar.jpg" alt="Abdulxodiy" className="avatar-photo" />
              <div className="avatar-online" />
            </div>
            <h3 style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: 4 }}>Abdulxodiy</h3>
            <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '0.83rem' }}>
              18 y.o · Andijon, Uzbekistan 🇺🇿
            </p>
            <div className="stat-row">
              <div className="stat">
                <div className="stat-num">5+</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat">
                <div className="stat-num">1+</div>
                <div className="stat-label">Yr. exp.</div>
              </div>
              <div className="stat">
                <div className="stat-num">100%</div>
                <div className="stat-label">Quality</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div style={{ textAlign: 'center' }}>
          <div className="section-tag">Skills</div>
          <h2 className="section-title">Technologies</h2>
        </div>
        <div className="skills-grid">
          {SKILLS.map(s => <SkillCard key={s.name} skill={s} />)}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div style={{ textAlign: 'center' }}>
          <div className="section-tag">Projects</div>
          <h2 className="section-title">My Work</h2>
        </div>
        <div className="projects-grid">
          {PROJECTS.map(p => <ProjectCard key={p.name} p={p} />)}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="contact-card">
          <div className="section-tag">Contact</div>
          <h2 className="section-title" style={{ marginBottom: 14 }}>
            Have a project? <span style={{ color: 'var(--primary)' }}>Let's talk!</span>
          </h2>
          <p className="section-text">
            Need a website, web app or UI/UX design?<br />
            I reply fast and deliver quality work.
          </p>
          <div className="contact-links">
            <a href="https://t.me/omonboyev_c"              className="contact-btn tg">
              <FaTelegramPlane size={18} /> Telegram
            </a>
            <a href="mailto:oyatilloomonboyev6@gmail.com"    className="contact-btn em">
              <FaEnvelope size={17} /> Email
            </a>
            <a href="https://github.com/AbdulxodiyL"         className="contact-btn gh">
              <FaGithub size={18} /> GitHub
            </a>
            <a href="tel:+998906253539"                      className="contact-btn ph">
              <FaPhone size={16} /> +998 90 625 35 39
            </a>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2025 · Abdulxodiy Omonboyev · Andijon, Uzbekistan 🇺🇿</p>
      </footer>

    </div>
  )
}
