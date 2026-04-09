const items = [
  { icon: 'fa-medal', title: 'Military Service', text: 'Veteran with proven discipline, leadership under pressure, and commitment to mission success.' },
  { icon: 'fa-graduation-cap', title: 'Academic Achievement', text: 'Consistently applying classroom learning to real-world projects and lab environments.' },
  { icon: 'fa-flask', title: 'Lab Work', text: 'Hands-on experience in networking, security, and systems through dedicated lab environments.' },
  { icon: 'fa-book-open', title: 'Independent Learning', text: 'Continuously expanding skills through self-directed projects, courses, and documentation.' },
  { icon: 'fa-users', title: 'Leadership', text: 'Experience leading teams, managing priorities, and delivering results under tight deadlines.' },
  { icon: 'fa-lightbulb', title: 'Business Projects', text: 'Applied technology solutions to real-world business challenges and personal ventures.' },
]

export default function Credibility() {
  return (
    <section id="credibility">
      <div className="container">
        <h2 className="section-title">Credibility & Achievements</h2>
        <div className="credibility-grid">
          {items.map((item, i) => (
            <div className="cred-card" key={i}>
              <i className={`fa-solid ${item.icon}`}></i>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
