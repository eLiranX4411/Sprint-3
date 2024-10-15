const { useEffect, useState } = React

import { BookPreview } from './BookPreview.jsx'
import { AddBookCard } from './AddBookCard.jsx'

export function BookList({ onDelete, books }) {
  if (!books) {
    return (
      <div className='loader-container'>
        <div className='loader'></div>
      </div>
    )
  }

  return (
    <ul className='book-list'>
      <AddBookCard />
      {books.map((book) => (
        <BookPreview key={book.id} bookId={book.id} onDelete={onDelete} />
      ))}
    </ul>
  )
}
