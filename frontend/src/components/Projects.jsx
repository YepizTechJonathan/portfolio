import { useEffect, useState } from 'react'
import { trackView, getProjectViews } from '../services/api'

const projects = [
  {
    slug: 'debt-tracker',
    icon: 'fa-money-bill-trend-up',
    title: 'DebtTracker App',
    problem: 'Tracking personal debts and payments manually is error-prone and disorganized.',
    solution: 'Built a web application to log, track, and manage debts with payment history and status updates.',
    tech: ['C#', 'ASP.NET Core', 'SQL Server', 'Bootstrap'],
    result: 'Demonstrates full CRUD operations, database design, and practical financial tooling.',
    github: 'https://github.com/YepizTechJonathan',
    demo: null,
  },
  {
    slug: 'contact-manager',
    icon: 'fa-address-book',
    title: 'Contact Manager',
    problem: 'Needed a structured way to store and manage contact information with search and filtering.',
    solution: 'Developed an ASP.NET MVC application with full CRUD functionality, validation, and a clean UI.',
    tech: ['C#', 'ASP.NET MVC', 'Entity Framework', 'SQL Server'],
    result: 'Shows MVC architecture understanding, data modeling, and user-focused design.',
    github: 'https://github.com/YepizTechJonathan',
    demo: null,
  },
  {
    slug: 'home-automation',
    icon: 'fa-house-signal',
    title: 'Home Automation Dashboard',
    problem: 'Managing smart home devices across multiple platforms lacked a unified control interface.',
    solution: 'Created a centralized dashboard to monitor and control home automation systems in one place.',
    tech: ['Python', 'JavaScript', 'REST APIs', 'Docker'],
    result: 'Demonstrates API integration, real-time data handling, and practical IoT problem-solving.',
    github: 'https://github.com/YepizTechJonathan',
    demo: null,
  },
  {
    slug: 'nas-backup',
    icon: 'fa-hard-drive',
    title: 'NAS Backup Automation',
    problem: 'Manual backups to a NAS were unreliable and time-consuming.',
    solution: 'Built automated backup scripts with scheduling, logging, and error notification.',
    tech: ['Python', 'Bash', 'Linux', 'Cron'],
    result: 'Shows systems automation, scripting ability, and infrastructure reliability thinking.',
    github: 'https://github.com/YepizTechJonathan',
    demo: null,
  },
  {
    slug: 'dockerized-app',
    icon: 'fa-brands fa-docker',
    title: 'Dockerized Full-Stack App',
    problem: 'Development environments were inconsistent and deployment was manual and fragile.',
    solution: 'Containerized a full-stack application with Docker Compose for one-command deployment.',
    tech: ['Docker', 'Docker Compose', 'ASP.NET Core', 'SQL Server'],
    result: 'Demonstrates containerization, environment management, and DevOps fundamentals.',
    github: 'https://github.com/YepizTechJonathan',
    demo: null,
  },
  {
    slug: 'portfolio-site',
    icon: 'fa-solid fa-globe',
    title: 'This Portfolio (Full-Stack)',
    problem: 'Needed a portfolio that itself demonstrates full-stack development ability.',
    solution: 'Built a React SPA with ASP.NET Core API, SQLite database, guestbook, blog, and contact system.',
    tech: ['React', 'ASP.NET Core', 'SQLite', 'Docker', 'Vite'],
    result: 'A live, working full-stack application that serves as both portfolio and proof of skill.',
    github: 'https://github.com/YepizTechJonathan',
    demo: 'https://yepiz.tech',
  },
]

export default function Projects() {
  const [views, setViews] = useState({})

  useEffect(() => {
    getProjectViews()
      .then((res) => {
        const map = {}
        res.data.forEach((v) => (map[v.slug] = v.count))
        setViews(map)
      })
      .catch(() => {})
  }, [])

  const handleView = async (slug) => {
    try {
      await trackView(slug)
      setViews((prev) => ({ ...prev, [slug]: (prev[slug] || 0) + 1 }))
    } catch {}
  }

  return (
    <section id="projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {projects.map((p) => (
            <div className="project-card" key={p.slug} onClick={() => handleView(p.slug)}>
              <div className="project-image">
                <div className="project-placeholder">
                  <i className={`fa-solid ${p.icon}`}></i>
                </div>
                {views[p.slug] > 0 && (
                  <span className="view-badge">
                    <i className="fa-solid fa-eye"></i> {views[p.slug]}
                  </span>
                )}
              </div>
              <div className="project-info">
                <h3>{p.title}</h3>
                <p className="project-label">Problem:</p>
                <p>{p.problem}</p>
                <p className="project-label">Solution:</p>
                <p>{p.solution}</p>
                <div className="project-tech">
                  {p.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <p className="project-result">
                  <strong>Result:</strong> {p.result}
                </p>
                <div className="project-links">
                  {p.github && (
                    <a href={p.github} className="btn btn-sm" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                      <i className="fa-brands fa-github"></i> Code
                    </a>
                  )}
                  {p.demo && (
                    <a href={p.demo} className="btn btn-sm btn-outline-sm" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                      <i className="fa-solid fa-arrow-up-right-from-square"></i> Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
