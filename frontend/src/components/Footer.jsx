export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Jonathan Yepiz. Built with React + ASP.NET Core + SQLite.</p>
          <div className="footer-links">
            <a href="https://github.com/YepizTechJonathan" target="_blank" rel="noreferrer"><i className="fa-brands fa-github"></i></a>
            <a href="https://www.linkedin.com/in/jonathanyepiz/" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin"></i></a>
            <a href="mailto:jonathan@yepiz.work"><i className="fa-solid fa-envelope"></i></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
