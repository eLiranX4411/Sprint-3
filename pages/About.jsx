const { Link } = ReactRouterDOM

export function About() {
  return (
    <React.Fragment>
      <section className='bkg'>
        <h1 className='appsy-title'>About Appsy Applications</h1>
        <section className='about-container'>
          <p className='bio'>
            Welcome to Appsy, where creativity meets productivity! Our suite of applications is designed to help you organize your thoughts, manage your
            correspondence, and keep your reading list in check. Explore our apps below to find the perfect tools for your daily tasks!
          </p>
          <main className='apps-container'>
            <Link to='/note'>
              <div className='to-note-app'>
                <img className='keep-logo-home' src='../../../apps/note/img/missKeep.png' alt='Google Keep Logo' />
                <h2 className='note-title-box'>Miss Keep</h2>
                <p className='app-description'>
                  Miss Keep helps you organize your notes and ideas with ease. Capture your thoughts and never forget an important detail again!
                </p>
              </div>
            </Link>
            <Link to='/mail'>
              <div className='to-mail-app'>
                <img className='mail-logo-home' src='../../../apps/mail/img/misterMail.png' alt='Gmail Logo' />
                <h2 className='mail-title-box'>Mister Mail</h2>
                <p className='app-description'>
                  Mister Mail streamlines your email experience, making it simple to manage your inbox and communicate effectively.
                </p>
              </div>
            </Link>
            <Link to='/books'>
              <div className='to-book-app'>
                <img className='book-logo-home' src='../../../apps/book/img/missBook.png' alt='Google Keep Logo' />
                <h2 className='book-title-box'>Miss Books</h2>
                <p className='app-description'>
                  Miss Books is your personal library manager, allowing you to keep track of your reading list and discover new titles!
                </p>
              </div>
            </Link>
          </main>
        </section>

        <footer className='home-footer'>
          <div className='footer-container'>
            <h2>Created By Eliran & Michael</h2>
          </div>
        </footer>
      </section>
    </React.Fragment>
  )
}
