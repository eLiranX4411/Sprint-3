const { useEffect, useState } = React

import { bookService } from '../services/book.service.js'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { eventBusService } from '../services/event-bus.service.js'

export function BookIndex() {
  const [booksList, setBooksList] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

  useEffect(() => {
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookService
      .query(filterBy)
      .then((books) => {
        setBooksList(books)
      })
      .catch((err) => {
        console.log('Problem getting books', err)
      })
  }

  function onSetFilter(newFilter) {
    setFilterBy(newFilter)
  }

  function deleteBook(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        loadBooks()
        eventBusService.emit('show-user-msg', { txt: 'Book deleted successfully!', type: 'success' })
      })
      .catch((err) => {
        eventBusService.emit('show-user-msg', { txt: 'Error deleting book', type: 'error' })
      })
  }

  if (!booksList) {
    return (
      <div className='loader-container'>
        <div className='loader'></div>
      </div>
    )
  }

  return (
    <section>
      <React.Fragment>
        <h2>BookIndex</h2>
        <BookFilter onSetFilter={onSetFilter} />
        <BookList books={booksList} onDelete={deleteBook} />
      </React.Fragment>
    </section>
  )
}
