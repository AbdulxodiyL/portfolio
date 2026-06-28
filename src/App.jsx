import { useEffect, useRef, useState } from 'react'
import Background3D from './components/Background3D'

const SKILLS = [
  { name: 'JavaScript', icon: '🟨', color: '#f7df1e', level: 85 },
  { name: 'React.js',   icon: '⚛️',  color: '#61dafb', level: 78 },
  { name: 'Node.js',    icon: '🟢',  color: '#68a063', level: 75 },
  { name: 'Express.js', icon: '🚂',  color: '#8888aa', level: 72 },
  { name: 'HTML / CSS', icon: '🌐',  color: '#e34f26', level: 90 },
  { name: 'UI / UX',    icon: '🎨',  color: '#a855f7', level: 70 },
]

const PROJECTS = [
  {
    icon: '🛒',
    bg: 'linear-gradient(135deg,#6c63ff,#3b3086)',
    name: 'E-Commerce Sayt',
    tags: [
      { label: 'React',   color: '#61dafb' },
      { label: 'Node.js', color: '#68a063' },
      { label: 'MongoDB', color: '#ff6384' },
    ],
    desc: "To'liq funksional onlayn do'kon. Mahsulot katalogi, savatcha, to'lov tizimi va admin panel.",
    live: '#', github: '#',
  },
  {
    icon: '📋',
    bg: 'linear-gradient(135deg,#00d4ff,#0070a8)',
    name: 'Task Manager App',
    tags: [
      { label: 'React',      color: '#61dafb' },
      { label: 'JavaScript', color: '#f7df1e' },
    ],
    desc: 'Vazifalarni boshqarish ilova. Drag & drop, kategoriya, deadline va progress tracking.',
    live: '#', github: '#',
  },
  {
    icon: '🍕',
    bg: 'linear-gradient(135deg,#ff6584,#c0392b)',
    name: 'Restoran Landing Page',
    tags: [
      { label: 'HTML/CSS',   color: '#e34f26' },
      { label: 'JavaScript', color: '#f7df1e' },
    ],
    desc: "Zamonaviy restoran uchun animatsiyali landing page. Menyu, bron qilish va joylashuv bo'limlari.",
    live: '#', github: '#',
  },
]

function SkillCard({ skill }) {
  const fillRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && fillRef.current) {
        fillRef.current.style.width = skill.level + '%'
      }
    }, { threshold: 0.3 })
    if (cardRef.current) obs.observe(cardRef.current)
    return () => obs.disconnect()
  }, [skill.level])

  return (
    <div ref={cardRef} className="skill-card" style={{ '--skill-color': skill.color }}>
      <span className="skill-icon">{skill.icon}</span>
      <div className="skill-name">{skill.name}</div>
      <div className="skill-bar">
        <div ref={fillRef} className="skill-fill" style={{ background: skill.color }} />
      </div>
    </div>
  )
}

function ProjectCard({ p }) {
  return (
    <div className="project-card">
      <div className="project-img" style={{ background: p.bg }}>{p.icon}</div>
      <div className="project-body">
        <div className="project-tags">
          {p.tags.map(t => (
            <span key={t.label} className="tag" style={{ background: t.color + '20', color: t.color }}>
              {t.label}
            </span>
          ))}
        </div>
        <div className="project-name">{p.name}</div>
        <div className="project-desc">{p.desc}</div>
        <div className="project-links">
          <a href={p.live}   className="project-link">↗ Ko'rish</a>
          <a href={p.github} className="project-link">⌥ GitHub</a>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [active, setActive] = useState('hero')
  const cardRef = useRef(null)
  const wrapRef = useRef(null)

  // Active nav on scroll
  useEffect(() => {
    const ids = ['hero', 'about', 'skills', 'projects', 'contact']
    const handler = () => {
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 200) { setActive(id); break }
      }
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 80)
      })
    }, { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Cursor glow
  useEffect(() => {
    const glow = document.getElementById('cursor-glow')
    const move = (e) => {
      if (!glow) return
      glow.style.left = e.clientX + 'px'
      glow.style.top  = e.clientY + 'px'
    }
    document.addEventListener('mousemove', move)
    return () => document.removeEventListener('mousemove', move)
  }, [])

  // 3D card tilt
  const handleTilt = (e) => {
    if (!wrapRef.current || !cardRef.current) return
    const rect = wrapRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width  - 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    cardRef.current.style.transform  = `rotateY(${x * 20}deg) rotateX(${-y * 20}deg)`
    cardRef.current.style.transition = 'transform 0.1s ease'
  }
  const resetTilt = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform  = 'rotateY(0deg) rotateX(0deg)'
    cardRef.current.style.transition = 'transform 0.5s ease'
  }

  const navLinks = [
    { href: '#hero',     label: 'Bosh sahifa' },
    { href: '#about',    label: 'Men haqimda' },
    { href: '#skills',   label: "Ko'nikmalar" },
    { href: '#projects', label: 'Loyihalar' },
    { href: '#contact',  label: 'Aloqa' },
  ]

  return (
    <>
      <Background3D />
      <div id="cursor-glow" className="cursor-glow" />

      {/* NAV */}
      <nav>
        <div className="logo">&lt;Abdulxodiy /&gt;</div>
        <ul>
          {navLinks.map(l => (
            <li key={l.href}>
              <a href={l.href} style={{ color: active === l.href.slice(1) ? 'var(--secondary)' : '' }}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="hero-badge">✦ Ochiq ish uchun &nbsp;·&nbsp; 18 yosh · Junior Developer</div>
        <h1 className="hero-title">
          Salom, men<br />
          <span className="gradient">Abdulxodiy</span><br />
          Dasturchiman
        </h1>
        <p className="hero-sub">
          React, Node.js va Express yordamida zamonaviy web ilovalar yarataman.
          Sizning g'oyangizni real mahsulotga aylantirishga tayyorman.
        </p>
        <div className="hero-btns">
          <a href="#projects" className="btn btn-primary">Loyihalarni ko'rish →</a>
          <a href="#contact"  className="btn btn-outline">Bog'lanish</a>
        </div>
        <div className="scroll-indicator">Pastga aylantirib ko'ring</div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="about-grid">
          <div>
            <div className="section-tag">Men haqimda</div>
            <h2 className="section-title">
              Kod yozish — mening <span style={{ color: 'var(--primary)' }}>ishtiyoqim</span>
            </h2>
            <p className="section-text">
              Men 18 yoshli junior Full-Stack dasturchiman. HTML, CSS, JavaScript va React bilan
              chiroyli frontend interfeyslar yarataman. Node.js va Express orqali backend API'lar
              quraman. Har bir loyihani sifatli va o'z vaqtida topshirishga harakat qilaman.
            </p>
            <p className="section-text" style={{ marginTop: 16 }}>
              Hozir freelance loyihalarga ochiqman — sayt, veb-ilova yoki UI/UX dizayn bo'lsa, bog'laning!
            </p>
          </div>
          <div className="card-3d-wrapper" ref={wrapRef} onMouseMove={handleTilt} onMouseLeave={resetTilt}>
            <div className="card-3d" ref={cardRef}>
              <div className="avatar-ring">👨‍💻</div>
              <h3 style={{ textAlign: 'center', fontSize: '1.3rem' }}>Abdulxodiy</h3>
              <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '0.85rem', marginTop: 6 }}>
                18 yosh · Andijon, O'zbekiston 🇺🇿
              </p>
              <div className="stat-row">
                <div className="stat">
                  <div className="stat-num">5+</div>
                  <div className="stat-label">Loyiha</div>
                </div>
                <div className="stat">
                  <div className="stat-num">1+</div>
                  <div className="stat-label">Yil tajriba</div>
                </div>
                <div className="stat">
                  <div className="stat-num">100%</div>
                  <div className="stat-label">Sifat</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="skills-header reveal">
          <div className="section-tag">Ko'nikmalar</div>
          <h2 className="section-title">Texnologiyalar</h2>
        </div>
        <div className="skills-grid">
          {SKILLS.map(s => <SkillCard key={s.name} skill={s} />)}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="projects-header reveal">
          <div className="section-tag">Loyihalar</div>
          <h2 className="section-title">Ishlarim</h2>
        </div>
        <div className="projects-grid">
          {PROJECTS.map(p => <ProjectCard key={p.name} p={p} />)}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="contact-card reveal">
          <div className="section-tag">Aloqa</div>
          <h2 className="section-title" style={{ marginBottom: 14 }}>
            Loyiha bormi? <span style={{ color: 'var(--primary)' }}>Gaplashamiz!</span>
          </h2>
          <p className="section-text">
            Sayt, veb-ilova yoki UI/UX dizayn kerakmi?<br />
            Tez javob beraman va sifatli ishlayman.
          </p>
          <div className="contact-links">
            <a href="https://t.me/username"             className="contact-btn"><span>✈️</span> Telegram</a>
            <a href="mailto:chatclaude700@gmail.com"    className="contact-btn"><span>📧</span> Email</a>
            <a href="https://github.com/AbdulxodiyL"    className="contact-btn"><span>🐙</span> GitHub</a>
            <a href="https://linkedin.com"              className="contact-btn"><span>💼</span> LinkedIn</a>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2025 · Abdulxodiy · Andijon, O'zbekiston 🇺🇿</p>
      </footer>
    </>
  )
}
