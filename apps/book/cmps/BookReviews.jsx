const { useEffect, useState } = React
const { useParams } = ReactRouterDOM

import { bookService } from '../services/book.service.js'

export function BookReviews() {
  const { bookId } = useParams()
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    loadReviews()
  }, [bookId])

  async function loadReviews() {
    try {
      const loadedBook = await bookService.get(bookId)
      setReviews(loadedBook.reviews || [])
    } catch (err) {
      console.error('Error loading reviews:', err)
    }
  }

  if (!reviews.length) {
    return <div>No reviews yet for this book.</div>
  }

  return (
    <div className='book-reviews'>
      <h3>Book Reviews</h3>
      <ul>
        {reviews.map((review, idx) => (
          <li key={idx}>
            <p>
              <strong>{review.fullname}</strong>
            </p>
            <p>
              Rating:{' '}
              <span className='star-rating'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={star <= review.rating ? 'filled-star' : 'empty-star'}>
                    ★
                  </span>
                ))}
              </span>
            </p>
            <p>Read at: {new Date(review.readAt).toLocaleDateString()}</p>
            <p>{review.text}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
