const valueItems = [
  'Build internal tools and web applications',
  'Support and improve technical workflows',
  'Analyze data for better decisions',
  'Automate repetitive processes',
  'Troubleshoot systems and reduce downtime',
  'Document solutions clearly for teams and users',
]

const skillCategories = [
  {
    icon: 'fa-code',
    title: 'Software Development',
    items: [
      'Builds full-stack applications using <strong>C#</strong> and <strong>ASP.NET Core MVC</strong>',
      'Creates dynamic UIs with <strong>React.js</strong> and modern JavaScript',
      'Develops automation scripts in <strong>Python</strong> to reduce manual work',
      'Writes <strong>SQL</strong> queries to organize, retrieve, and analyze business data',
      'Manages source code and collaboration with <strong>Git/GitHub</strong>',
    ],
  },
  {
    icon: 'fa-globe',
    title: 'Web Development',
    items: [
      'Builds component-based SPAs with <strong>React + Vite</strong>',
      'Designs responsive, mobile-friendly layouts',
      'Creates forms with validation and error handling',
      'Develops database-driven web applications',
      'Integrates RESTful APIs for full-stack functionality',
    ],
  },
  {
    icon: 'fa-chart-line',
    title: 'Data & Analytics',
    items: [
      'Cleans and transforms raw data for analysis',
      'Builds dashboards and reports in <strong>Power BI</strong>',
      'Writes <strong>SQL</strong> queries for business intelligence',
      'Uses <strong>Excel</strong> for data modeling and reporting',
      'Turns data into actionable insights for decision-making',
    ],
  },
  {
    icon: 'fa-screwdriver-wrench',
    title: 'IT / Systems Support',
    items: [
      'Troubleshoots hardware and software issues efficiently',
      'Understands network fundamentals and connectivity',
      'Sets up and configures systems and environments',
      'Documents processes and solutions for team use',
      'Provides clear, patient end-user support',
    ],
  },
  {
    icon: 'fa-server',
    title: 'DevOps / Infrastructure',
    items: [
      'Containerizes applications using <strong>Docker</strong> for easier deployment',
      'Orchestrates multi-service environments with <strong>Docker Compose</strong>',
      'Understands <strong>CI/CD</strong> pipelines and automation concepts',
      'Works with <strong>Kubernetes</strong> fundamentals for scaling',
      'Automates system tasks on <strong>Linux</strong> environments',
    ],
  },
  {
    icon: 'fa-shield-halved',
    title: 'Cybersecurity Awareness',
    items: [
      'Performs packet analysis with <strong>Wireshark</strong>',
      'Follows secure coding and access control practices',
      'Understands risk assessment and threat awareness',
      'Applies defense-in-depth principles',
      'Stays current on security best practices',
    ],
  },
]

export default function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <h2 className="section-title">Skills & Services</h2>
        <div className="value-section">
          <h3 className="value-heading">How I Can Help an Employer</h3>
          <div className="value-grid">
            {valueItems.map((item, i) => (
              <div className="value-item" key={i}>
                <i className="fa-solid fa-check"></i>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="skills-grid">
          {skillCategories.map((cat, i) => (
            <div className="skill-card" key={i}>
              <div className="skill-icon">
                <i className={`fa-solid ${cat.icon}`}></i>
              </div>
              <h3>{cat.title}</h3>
              <ul>
                {cat.items.map((item, j) => (
                  <li key={j} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
