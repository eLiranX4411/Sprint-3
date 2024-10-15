export function GoogleBookCard({ book, onBookSelect }) {
  return (
    <div className='google-book-card'>
      <img src={book.thumbnail} alt={book.title} className='book-thumbnail' />
      <div className='book-details'>
        <h3>{book.title}</h3>
        <p>{book.subtitle}</p>
        <p>
          <strong>Authors:</strong> {book.authors.join(', ')}
        </p>
        <p>
          <strong>Published:</strong> {book.publishedDate.toString()}
        </p>
        <button onClick={() => onBookSelect(book)} className='select-book-btn'>
          Select Book
        </button>
      </div>
    </div>
  )
}
