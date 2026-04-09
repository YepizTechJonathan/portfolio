import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navClick = () => setOpen(false)

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">&lt;JY /&gt;</Link>
        <button className="nav-toggle" onClick={() => setOpen(!open)}>
          <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>
        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {isHome ? (
            <>
              <li><a href="#about" onClick={navClick}>About</a></li>
              <li><a href="#skills" onClick={navClick}>Skills</a></li>
              <li><a href="#projects" onClick={navClick}>Projects</a></li>
              <li><a href="#guestbook" onClick={navClick}>Guestbook</a></li>
              <li><a href="#blog" onClick={navClick}>Blog</a></li>
              <li><a href="#resume" onClick={navClick}>Resume</a></li>
              <li><a href="#contact" onClick={navClick}>Contact</a></li>
            </>
          ) : (
            <>
              <li><Link to="/" onClick={navClick}>Home</Link></li>
              <li><Link to="/#projects" onClick={navClick}>Projects</Link></li>
              <li><Link to="/#blog" onClick={navClick}>Blog</Link></li>
              <li><Link to="/#contact" onClick={navClick}>Contact</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}
