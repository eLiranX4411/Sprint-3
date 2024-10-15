const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { LongTxt } from './LongTxt.jsx'
import { BookReviews } from './BookReviews.jsx'

export function BookDetails() {
  const { bookId } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const defaultImageUrl = 'https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/image-not-found-icon.png'

  useEffect(() => {
    loadBook()
  }, [bookId])

  async function loadBook() {
    try {
      const loadedBook = await bookService.get(bookId)
      setBook(loadedBook)
    } catch (err) {
      console.error('Error loading book:', err)
      navigate(`/books/SearchError`)
    }
  }

  const getPageCountText = () => {
    if (book.pageCount > 500) return 'Serious Reading'
    if (book.pageCount > 200) return 'Descent Reading'
    if (book.pageCount < 100) return 'Light Reading'
    return ''
  }

  const getPublishedDateText = () => {
    const currentYear = new Date().getFullYear()
    if (currentYear - book.publishedDate > 10) return 'Vintage'
    if (currentYear - book.publishedDate < 1) return 'New'
    return ''
  }

  const getPriceClass = () => {
    if (book.listPrice.amount > 150) return 'price-high'
    if (book.listPrice.amount < 20) return 'price-low'
    return ''
  }

  const handleImageLoad = () => {
    setIsImageLoaded(true)
  }

  const handleClose = () => {
    navigate(`/books/`)
  }

  const handleAddReview = () => {
    navigate(`/books/${bookId}/review`)
  }

  async function goToNextBook() {
    try {
      const nextBookId = await bookService.getNextBookId(bookId)
      navigate(`/books/${nextBookId}`)
    } catch (err) {
      console.error('Error navigating to next book:', err)
    }
  }

  async function goToPreviousBook() {
    try {
      const prevBookId = await bookService.getPreviousBookId(bookId)
      navigate(`/books/${prevBookId}`)
    } catch (err) {
      console.error('Error navigating to previous book:', err)
    }
  }

  if (!book) {
    return (
      <div className='loader-container'>
        <div className='loader'></div>
      </div>
    )
  }

  const bookImageUrl = book.thumbnail || defaultImageUrl

  return (
    <div className='book-details'>
      <div className='navigation-buttons'>
        <button onClick={goToPreviousBook}>Previous Book</button>
        <button onClick={goToNextBook}>Next Book</button>
      </div>
      {!isImageLoaded && <div className='loader'></div>}
      <img src={bookImageUrl} alt={book.title} onLoad={handleImageLoad} onError={(e) => (e.target.src = defaultImageUrl)} />
      <table>
        <tbody>
          <tr>
            <td>Title:</td>
            <td>{book.title}</td>
          </tr>
          <tr>
            <td>Authors:</td>
            <td>{book.authors.join(', ')}</td>
          </tr>
          <tr>
            <td>Published Date:</td>
            <td>
              {book.publishedDate} ({getPublishedDateText()})
            </td>
          </tr>
          <tr>
            <td>Page Count:</td>
            <td>
              {book.pageCount} ({getPageCountText()})
            </td>
          </tr>
          <tr>
            <td>Description:</td>
            <td>
              <LongTxt txt={book.description}></LongTxt>
            </td>
          </tr>
          <tr>
            <td>Categories:</td>
            <td>{book.categories.join(', ')}</td>
          </tr>
          <tr>
            <td>Language:</td>
            <td>{book.language}</td>
          </tr>
          <tr>
            <td>Price:</td>
            <td className={getPriceClass()}>
              {book.listPrice.amount} {book.listPrice.currencyCode}
              {book.listPrice.isOnSale && <span className='on-sale'> On Sale!</span>}
            </td>
          </tr>
        </tbody>
      </table>
      <div className='buttons'>
        <button onClick={handleClose}>Close</button>
        <button onClick={handleAddReview}>Add Review</button>
      </div>
      <BookReviews />
    </div>
  )
}
