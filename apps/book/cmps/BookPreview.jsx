const { useEffect, useState } = React
const { useNavigate } = ReactRouterDOM
import { bookService } from '../services/book.service.js'

const defaultImageUrl = 'https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/image-not-found-icon.png'

export function BookPreview({ bookId, onDelete }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [book, setBook] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    loadBook()
  }, [bookId])

  function loadBook() {
    bookService
      .get(bookId)
      .then((book) => setBook(book))
      .catch((err) => {
        console.log('Problem getting book:', err)
      })
  }

  const handleImageLoad = () => {
    setIsImageLoaded(true)
  }

  const handleShowDetails = () => {
    navigate(`/books/${bookId}`)
  }

  const handleEditBook = () => {
    navigate(`/books/edit/${bookId}`)
  }

  if (!book)
    return (
      <div className='loader-container'>
        <div className='loader'></div>
      </div>
    )
  return (
    <li className='book-preview book-item'>
      {!isImageLoaded && <div className='loader'></div>}
      <img src={book.thumbnail || defaultImageUrl} alt={book.title} onLoad={handleImageLoad} onError={(e) => (e.target.src = defaultImageUrl)} />
      <h3>{book.title}</h3>
      <p>by {book.authors.join(', ')}</p>
      <p>
        Price: {book.listPrice.amount} {book.listPrice.currencyCode}
      </p>
      <button onClick={handleShowDetails}>Show Details</button>
      <button onClick={handleEditBook}>Edit</button>
      <button onClick={() => onDelete(bookId)}>Delete</button>
    </li>
  )
}
