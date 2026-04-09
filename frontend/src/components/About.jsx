export default function About() {
  return (
    <section id="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-grid">
          <div className="about-text">
            <p>
              I am a technology student at <strong>California Institute of Applied Technologies</strong> with
              hands-on experience in software development, data analysis, networking, automation, and systems
              troubleshooting.
            </p>
            <p>
              My goal is to grow into a software engineering or IT role where I can solve real business
              problems, build efficient systems, and continue expanding my skills in development, DevOps, and
              cybersecurity.
            </p>
            <p>
              I approach every project with discipline, attention to detail, and a drive to deliver results. I
              learn fast, communicate clearly, and take ownership of the work I produce.
            </p>
            <p className="about-meta">
              <i className="fa-solid fa-microchip"></i> This portfolio is itself a full-stack project — React
              frontend, ASP.NET Core API, SQLite database, containerized with Docker.
            </p>
          </div>
          <div className="about-highlights">
            <div className="highlight-card">
              <i className="fa-solid fa-graduation-cap"></i>
              <h3>Education</h3>
              <p>California Institute of Applied Technologies</p>
            </div>
            <div className="highlight-card">
              <i className="fa-solid fa-compass"></i>
              <h3>Direction</h3>
              <p>Software Engineering, DevOps & Data</p>
            </div>
            <div className="highlight-card">
              <i className="fa-solid fa-bullseye"></i>
              <h3>Goal</h3>
              <p>Build systems that solve real business problems</p>
            </div>
            <div className="highlight-card">
              <i className="fa-solid fa-bolt"></i>
              <h3>Strengths</h3>
              <p>Disciplined, detail-oriented, fast learner</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
