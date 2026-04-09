export default function Resume() {
  return (
    <section id="resume">
      <div className="container">
        <h2 className="section-title">Resume</h2>
        <div className="resume-grid">
          <div className="resume-download">
            <div className="resume-card-main">
              <i className="fa-solid fa-file-pdf"></i>
              <h3>Download My Resume</h3>
              <p>Get the full PDF with complete details on my education, experience, and skills.</p>
              <a href="/resume.pdf" className="btn btn-primary" download>
                <i className="fa-solid fa-download"></i> Download PDF
              </a>
            </div>
          </div>
          <div className="resume-highlights">
            <div className="resume-section">
              <h3><i className="fa-solid fa-graduation-cap"></i> Education</h3>
              <p><strong>California Institute of Applied Technologies</strong></p>
              <p>Technology / Applied Sciences Program</p>
            </div>
            <div className="resume-section">
              <h3><i className="fa-solid fa-certificate"></i> Certifications</h3>
              <ul>
                <li>Add your certifications here</li>
              </ul>
            </div>
            <div className="resume-section">
              <h3><i className="fa-solid fa-laptop-code"></i> Technical Skills</h3>
              <p>C#, ASP.NET Core, React, Python, JavaScript, SQL, Docker, Git, Power BI, Linux, Wireshark</p>
            </div>
            <div className="resume-section">
              <h3><i className="fa-solid fa-briefcase"></i> Experience</h3>
              <p>Full-stack development, data analysis, systems automation, IT support</p>
            </div>
            <div className="resume-section">
              <h3><i className="fa-solid fa-medal"></i> Veteran</h3>
              <p>Military service background — discipline, leadership, and mission-focused mindset</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
