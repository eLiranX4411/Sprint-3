const { useNavigate } = ReactRouterDOM

export function AddBookCard() {
  const navigate = useNavigate()

  const handleAddBook = () => {
    navigate('/books/edit')
  }

  return (
    <li className='book-preview book-item'>
      <h3>Add New Book</h3>
      <button onClick={handleAddBook}>Add new book</button>
    </li>
  )
}
