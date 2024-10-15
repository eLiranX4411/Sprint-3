const { useState, useEffect, useRef } = React
const { Link, NavLink } = ReactRouterDOM

export function Home() {
  return (
    <React.Fragment>
      <section className='bkg'>
        <h1 className='appsy-title'>Welcome To Appsy Applications!</h1>
        <img src='../assets/img/AppSy.png' alt='' className='appsy-logo' />
        <section className='home-container'>
          <main className='apps-container'>
            <Link to='/note'>
              <div className='to-note-app'>
                <img className='keep-logo-home' src='../../../apps/note/img/missKeep.png' alt='Google Keep Logo' />
                <h2 className='note-title-box'>To Miss Keep APP</h2>
              </div>
            </Link>
            <Link to='/mail'>
              <div className='to-mail-app'>
                <img className='mail-logo-home' src='../../../apps/mail/img/misterMail.png' alt='Gmail Logo' />
                <h2 className='mail-title-box'>To Mister Mail APP</h2>
              </div>
            </Link>
            <Link to='/books'>
              <div className='to-book-app'>
                <img className='book-logo-home' src='../../../apps/book/img/missBook.png' alt='Google Keep Logo' />
                <h2 className='book-title-box'>To Miss Book APP</h2>
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
