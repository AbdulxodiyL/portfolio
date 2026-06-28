import { useEffect, useRef, useState } from 'react'
import Background3D from './components/Background3D'

const ROLES = ['Full-Stack Developer', 'React Specialist', 'UI/UX Dizayner']

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
    icon: '🛒', bg: 'linear-gradient(135deg,#6c63ff,#3b3086)',
    name: 'E-Commerce Sayt',
    tags: [{ label: 'React', color: '#61dafb' }, { label: 'Node.js', color: '#68a063' }, { label: 'MongoDB', color: '#ff6384' }],
    desc: "To'liq funksional onlayn do'kon. Mahsulot katalogi, savatcha, to'lov tizimi va admin panel.",
    live: '#', github: '#',
  },
  {
    icon: '📋', bg: 'linear-gradient(135deg,#00d4ff,#0070a8)',
    name: 'Task Manager App',
    tags: [{ label: 'React', color: '#61dafb' }, { label: 'JavaScript', color: '#f7df1e' }],
    desc: 'Vazifalarni boshqarish ilova. Drag & drop, kategoriya, deadline va progress tracking.',
    live: '#', github: '#',
  },
  {
    icon: '🍕', bg: 'linear-gradient(135deg,#ff6584,#c0392b)',
    name: 'Restoran Landing Page',
    tags: [{ label: 'HTML/CSS', color: '#e34f26' }, { label: 'JavaScript', color: '#f7df1e' }],
    desc: "Zamonaviy restoran uchun animatsiyali landing page. Menyu, bron qilish va joylashuv bo'limlari.",
    live: '#', github: '#',
  },
]

// ── Typing cycle hook ──
function useTyping(words, typeMs = 100, deleteMs = 55, pauseMs = 2000) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIdx]
    let t
    if (!deleting) {
      if (display.length < word.length) {
        t = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), typeMs)
      } else {
        t = setTimeout(() => setDeleting(true), pauseMs)
      }
    } else {
      if (display.length > 0) {
        t = setTimeout(() => setDisplay(display.slice(0, -1)), deleteMs)
      } else {
        setDeleting(false)
        setWordIdx((wordIdx + 1) % words.length)
      }
    }
    return () => clearTimeout(t)
  }, [display, deleting, wordIdx, words, typeMs, deleteMs, pauseMs])

  return { display, typing: !deleting }
}

// ── Animated counter ──
function Counter({ target, suffix = '' }) {
  const [n, setN] = useState(0)
  const ref = useRef(null)
  const done = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true
        const num = parseInt(target)
        let cur = 0
        const inc = Math.max(1, Math.ceil(num / 50))
        const id = setInterval(() => {
          cur = Math.min(cur + inc, num)
          setN(cur)
          if (cur >= num) clearInterval(id)
        }, 28)
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])

  return <span ref={ref}>{n}{suffix}</span>
}

// ── Scroll progress bar ──
function ScrollBar() {
  const [w, setW] = useState(0)
  useEffect(() => {
    const fn = () => {
      const d = document.documentElement
      setW((window.scrollY / (d.scrollHeight - d.clientHeight)) * 100)
    }
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, zIndex: 999,
      height: '3px', width: w + '%',
      background: 'linear-gradient(90deg,#6c63ff,#00d4ff,#ff6584)',
      boxShadow: '0 0 12px rgba(108,99,255,0.9)',
      transition: 'width 0.05s linear',
    }} />
  )
}

// ── Skill card ──
function SkillCard({ skill }) {
  const fillRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && fillRef.current)
        fillRef.current.style.width = skill.level + '%'
    }, { threshold: 0.3 })
    if (cardRef.current) obs.observe(cardRef.current)
    return () => obs.disconnect()
  }, [skill.level])

  return (
    <div ref={cardRef} className="skill-card" style={{ '--skill-color': skill.color }}>
      <span className="skill-icon">{skill.icon}</span>
      <div className="skill-name">{skill.name}</div>
      <div className="skill-level">{skill.level}%</div>
      <div className="skill-bar">
        <div ref={fillRef} className="skill-fill" style={{ background: skill.color }} />
      </div>
    </div>
  )
}

// ── Project card ──
function ProjectCard({ p }) {
  return (
    <div className="project-card">
      <div className="project-img" style={{ background: p.bg }}>
        <span className="project-emoji">{p.icon}</span>
        <div className="project-overlay">
          <a href={p.live}   className="overlay-btn">↗ Ko'rish</a>
          <a href={p.github} className="overlay-btn outline">⌥ GitHub</a>
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

// ── Main App ──
export default function App() {
  const [active, setActive]     = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)
  const cardRef = useRef(null)
  const wrapRef = useRef(null)
  const { display: role, typing } = useTyping(ROLES)

  useEffect(() => {
    const ids = ['hero', 'about', 'skills', 'projects', 'contact']
    const fn = () => {
      setMenuOpen(false)
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 200) { setActive(id); break }
      }
    }
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 90)
      })
    }, { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const glow = document.getElementById('cursor-glow')
    const fn = (e) => { if (glow) { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px' } }
    document.addEventListener('mousemove', fn)
    return () => document.removeEventListener('mousemove', fn)
  }, [])

  const handleTilt = (e) => {
    if (!wrapRef.current || !cardRef.current) return
    const r = wrapRef.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width  - 0.5
    const y = (e.clientY - r.top)  / r.height - 0.5
    cardRef.current.style.transform  = `rotateY(${x * 22}deg) rotateX(${-y * 22}deg)`
    cardRef.current.style.transition = 'transform 0.08s ease'
  }
  const resetTilt = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform  = 'rotateY(0) rotateX(0)'
    cardRef.current.style.transition = 'transform 0.6s ease'
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
      <ScrollBar />
      <div id="cursor-glow" className="cursor-glow" />

      {/* NAV */}
      <nav>
        <div className="logo">&lt;Abdulxodiy /&gt;</div>
        <ul className={menuOpen ? 'open' : ''}>
          {navLinks.map(l => (
            <li key={l.href}>
              <a href={l.href}
                style={{ color: active === l.href.slice(1) ? 'var(--secondary)' : '' }}
                onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(o => !o)}>
          <span /><span /><span />
        </button>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />

        <div className="hero-badge">
          <span className="pulse-dot" />
          Ochiq ish uchun · 18 yosh · Junior Dev
        </div>

        <h1 className="hero-title">
          Salom, men<br />
          <span className="gradient">Abdulxodiy</span><br />
          <span className="typing-wrap">
            <span className="typing-text">{role}</span>
            <span className={`cursor-blink${typing ? '' : ' pause'}`}>|</span>
          </span>
        </h1>

        <p className="hero-sub">
          React, Node.js va Express yordamida zamonaviy web ilovalar yarataman.
          Sizning g'oyangizni real mahsulotga aylantirishga tayyorman.
        </p>

        <div className="hero-btns">
          <a href="#projects" className="btn btn-primary">
            <span>Loyihalarni ko'rish</span><span>→</span>
          </a>
          <a href="#contact" className="btn btn-outline">Bog'lanish</a>
        </div>

        <div className="scroll-indicator">Pastga aylantirib ko'ring</div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="about-grid">
          <div className="reveal">
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
              Hozir freelance loyihalarga ochiqman — sayt, veb-ilova yoki
              UI/UX dizayn bo'lsa, bog'laning!
            </p>
          </div>
          <div className="card-3d-wrapper reveal" ref={wrapRef} onMouseMove={handleTilt} onMouseLeave={resetTilt}>
            <div className="card-3d" ref={cardRef}>
              <div className="avatar-ring">👨‍💻</div>
              <h3 style={{ textAlign: 'center', fontSize: '1.3rem' }}>Abdulxodiy</h3>
              <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '0.85rem', marginTop: 6 }}>
                18 yosh · Andijon, O'zbekiston 🇺🇿
              </p>
              <div className="stat-row">
                <div className="stat">
                  <div className="stat-num"><Counter target={5} suffix="+" /></div>
                  <div className="stat-label">Loyiha</div>
                </div>
                <div className="stat">
                  <div className="stat-num"><Counter target={1} suffix="+" /></div>
                  <div className="stat-label">Yil tajriba</div>
                </div>
                <div className="stat">
                  <div className="stat-num"><Counter target={100} suffix="%" /></div>
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
          <p className="section-text" style={{ maxWidth: 480, margin: '0 auto' }}>
            Zamonaviy web texnologiyalari bilan ishlash tajribam
          </p>
        </div>
        <div className="skills-grid">
          {SKILLS.map((s, i) => (
            <div key={s.name} className="reveal" style={{ transitionDelay: i * 80 + 'ms' }}>
              <SkillCard skill={s} />
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="projects-header reveal">
          <div className="section-tag">Loyihalar</div>
          <h2 className="section-title">Ishlarim</h2>
          <p className="section-text" style={{ maxWidth: 480, margin: '0 auto' }}>
            Men tomonimdan yaratilgan real loyihalar
          </p>
        </div>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div key={p.name} className="reveal" style={{ transitionDelay: i * 120 + 'ms' }}>
              <ProjectCard p={p} />
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="contact-card reveal">
          <div className="contact-glow" />
          <div className="section-tag">Aloqa</div>
          <h2 className="section-title" style={{ marginBottom: 14 }}>
            Loyiha bormi? <span style={{ color: 'var(--primary)' }}>Gaplashamiz!</span>
          </h2>
          <p className="section-text">
            Sayt, veb-ilova yoki UI/UX dizayn kerakmi?<br />
            Tez javob beraman va sifatli ishlayman.
          </p>
          <div className="contact-links">
            <a href="https://t.me/username"          className="contact-btn tg"><span>✈️</span> Telegram</a>
            <a href="mailto:chatclaude700@gmail.com" className="contact-btn em"><span>📧</span> Email</a>
            <a href="https://github.com/AbdulxodiyL" className="contact-btn gh"><span>🐙</span> GitHub</a>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2025 · Abdulxodiy · Andijon, O'zbekiston 🇺🇿</p>
      </footer>
    </>
  )
}
