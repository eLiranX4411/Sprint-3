const { Link, NavLink, useLocation } = ReactRouterDOM

export function AppHeader() {
  const { useState, useEffect, useRef } = React
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const NoteHeader = () => (
    <header className='note-app-header'>
      <div className='note-header-left'>
        <img className='keep-logo' src='../../../apps/note/img/missKeep.png' alt='Google Keep Logo' />
        <h1>Miss Notes</h1>
      </div>

      <nav className='nav-desktop'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/mail'>Mail</NavLink>
        <NavLink to='/note'>Note</NavLink>
        <NavLink to='/books'>Books</NavLink>
      </nav>

      {/* Hamburger Menu Icon */}
      <div className='hamburger-menu' onClick={toggleMenu}>
        <div className='line'></div>
        <div className='line'></div>
        <div className='line'></div>
      </div>

      {/* Mobile Navigation Menu */}
      <nav className={`nav-mobile ${isMenuOpen ? 'show' : ''}`}>
        <NavLink to='/' onClick={toggleMenu}>
          Home
        </NavLink>
        <NavLink to='/about' onClick={toggleMenu}>
          About
        </NavLink>
        <NavLink to='/mail' onClick={toggleMenu}>
          Mail
        </NavLink>
        <NavLink to='/note' onClick={toggleMenu}>
          Note
        </NavLink>
        <NavLink to='/books' onClick={toggleMenu}>
          Books
        </NavLink>
      </nav>
    </header>
  )

  const MailHeader = () => (
    <header className='mail-app-header'>
      <div className='mail-header-left'>
        <img className='mail-logo' src='../../../apps/mail/img/misterMail.png' alt='Gmail Logo' />
        <h2>Mister Mail</h2>
      </div>
      <nav className='nav-desktop'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/mail'>Mail</NavLink>
        <NavLink to='/note'>Note</NavLink>
        <NavLink to='/books'>Books</NavLink>
      </nav>

      {/* Hamburger Menu Icon */}
      <div className='hamburger-menu' onClick={toggleMenu}>
        <div className='line'></div>
        <div className='line'></div>
        <div className='line'></div>
      </div>

      {/* Mobile Navigation Menu */}
      <nav className={`nav-mobile ${isMenuOpen ? 'show' : ''}`}>
        <NavLink to='/' onClick={toggleMenu}>
          Home
        </NavLink>
        <NavLink to='/about' onClick={toggleMenu}>
          About
        </NavLink>
        <NavLink to='/mail' onClick={toggleMenu}>
          Mail
        </NavLink>
        <NavLink to='/note' onClick={toggleMenu}>
          Note
        </NavLink>
        <NavLink to='/books' onClick={toggleMenu}>
          Books
        </NavLink>
      </nav>
    </header>
  )

  const BooksHeader = () => (
    <header className='mail-app-header'>
      {' '}
      {/* מעדכן את הקלאס ל- mail-app-header כמו ב-Mail */}
      <div className='mail-header-left'>
        {' '}
        {/* גם כאן אותו קלאס כמו ב-Mail */}
        <img className='mail-logo' src='../../../apps/book/img/missBook.png' alt='Miss Books Logo' /> {/* קלאס mail-logo */}
        <h2>Miss Books</h2>
      </div>
      <nav className='nav-desktop'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/mail'>Mail</NavLink>
        <NavLink to='/note'>Note</NavLink>
        <NavLink to='/books'>Books</NavLink>
      </nav>
      {/* Hamburger Menu Icon */}
      <div className='hamburger-menu' onClick={toggleMenu}>
        <div className='line'></div>
        <div className='line'></div>
        <div className='line'></div>
      </div>
      {/* Mobile Navigation Menu */}
      <nav className={`nav-mobile ${isMenuOpen ? 'show' : ''}`}>
        <NavLink to='/' onClick={toggleMenu}>
          Home
        </NavLink>
        <NavLink to='/about' onClick={toggleMenu}>
          About
        </NavLink>
        <NavLink to='/mail' onClick={toggleMenu}>
          Mail
        </NavLink>
        <NavLink to='/note' onClick={toggleMenu}>
          Note
        </NavLink>
        <NavLink to='/books' onClick={toggleMenu}>
          Books
        </NavLink>
      </nav>
    </header>
  )

  const DefaultHeader = () => (
    <header className='app-header'>
      <Link to='/'>
        <h1 className='app-title'>Appsy App</h1>
      </Link>
      <nav className='nav-desktop'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/mail'>Mail</NavLink>
        <NavLink to='/note'>Note</NavLink>
        <NavLink to='/books'>Books</NavLink>
      </nav>

      {/* Hamburger Menu Icon */}
      <div className='hamburger-menu' onClick={toggleMenu}>
        <div className='line'></div>
        <div className='line'></div>
        <div className='line'></div>
      </div>

      {/* Mobile Navigation Menu */}
      <nav className={`nav-mobile ${isMenuOpen ? 'show' : ''}`}>
        <NavLink to='/' onClick={toggleMenu}>
          Home
        </NavLink>
        <NavLink to='/about' onClick={toggleMenu}>
          About
        </NavLink>
        <NavLink to='/mail' onClick={toggleMenu}>
          Mail
        </NavLink>
        <NavLink to='/note' onClick={toggleMenu}>
          Note
        </NavLink>
        <NavLink to='/books' onClick={toggleMenu}>
          Books
        </NavLink>
      </nav>
    </header>
  )

  // Conditionally render the appropriate header based on the current route
  if (location.pathname === '/note') {
    return <NoteHeader />
  } else if (location.pathname === '/mail') {
    return <MailHeader />
  } else if (location.pathname === '/books') {
    return <BooksHeader />
  } else {
    return <DefaultHeader />
  }
}
