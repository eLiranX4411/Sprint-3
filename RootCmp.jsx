const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

// Main Cmps
import { AppHeader } from './cmps/AppHeader.jsx'
import { NotFound } from './cmps/NotFound.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'

// Pages
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'

// Apps Pages
import { MailIndex } from './apps/mail/pages/MailIndex.jsx'
import { MailCompose } from './apps/mail/cmps/MailCompose.jsx'
import { NoteIndex } from './apps/note/pages/NoteIndex.jsx'
import { EditNote } from './apps/note/cmps/EditNote.jsx'

import { BookIndex } from './apps/book/pages/BookIndex.jsx'
import { BookDetails } from './apps/book/cmps/BookDetails.jsx'
import { BookEdit } from './apps/book/cmps/BookEdit.jsx'
import { SearchError } from './apps/book/cmps/SearchError.jsx'
import { AddReview } from './apps/book/cmps/AddReview.jsx'
import { Dashboard } from './apps/book/pages/Dashboard.jsx' // ייבוא של דף הדשבורד

export function App() {
  return (
    <Router>
      <section className='app'>
        <AppHeader />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />

          {/* Mail  */}

          <Route path='/mail' element={<MailIndex />} />
          <Route path='/mail/edit/' element={<MailCompose />} />
          <Route path='/mail/details/:mailId' element={<MailCompose />} />
          <Route path='/mail/edit/:mailId' element={<MailCompose />} />
          {/* Notes  */}

          <Route path='/note' element={<NoteIndex />}>
            <Route path='edit/:noteId' element={<EditNote />} />
          </Route>

          {/* Books  */}

          <Route path='/books' element={<BookIndex />} />
          <Route path='/books/:bookId' element={<BookDetails />} />
          <Route path='/books/:bookId/review' element={<AddReview />} />
          <Route path='/books/search-error' element={<SearchError />} />
          <Route path='/books/edit' element={<BookEdit />} />
          <Route path='/books/edit/:bookId' element={<BookEdit />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </section>
      <UserMsg />
    </Router>
  )
}
