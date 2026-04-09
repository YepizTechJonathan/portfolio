export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-content">
        <p className="hero-greeting">Hi, I'm</p>
        <h1 className="hero-name">Jonathan Yepiz</h1>
        <p className="hero-title">
          Aspiring Software Developer <span className="separator">|</span> DevOps{' '}
          <span className="separator">|</span> Data Analytics{' '}
          <span className="separator">|</span> Cybersecurity
        </p>
        <p className="hero-tagline">
          I build practical solutions using software development, automation, cloud tools, and data-driven problem solving.
        </p>
        <div className="hero-buttons">
          <a href="#projects" className="btn btn-primary">View My Work</a>
          <a href="/resume.pdf" className="btn btn-outline" download>Download Resume</a>
        </div>
        <div className="hero-tech-banner">
          <span>Built with React</span>
          <span>ASP.NET Core API</span>
          <span>SQLite Database</span>
          <span>Docker</span>
        </div>
      </div>
      <div className="hero-bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
    </section>
  )
}
