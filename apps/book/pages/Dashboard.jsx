const { useEffect, useState } = React
import { bookService } from '../services/book.service.js'
import { Chart } from '../cmps/Chart.jsx'

export function Dashboard() {
  const [booksByCategory, setBooksByCategory] = useState({})
  const [booksByPageCount, setBooksByPageCount] = useState({})
  const [booksByPrice, setBooksByPrice] = useState({})

  useEffect(() => {
    bookService.query().then((books) => {
      bookService.groupBooksBy('categories').then((booksCountByCategory) => {
        setBooksByCategory(booksCountByCategory)
      })

      bookService.groupBooksByPageCount(books).then((booksCountByPage) => {
        setBooksByPageCount(booksCountByPage)
      })

      bookService.groupBooksByPrice(books).then((booksCountByPrice) => {
        setBooksByPrice(booksCountByPrice)
      })

      setBooksData(books)
    })
  }, [])

  if (Object.keys(booksByCategory).length === 0 || Object.keys(booksByPageCount).length === 0 || Object.keys(booksByPrice).length === 0) {
    return (
      <div className='loader-container'>
        <div className='loader'></div>
      </div>
    )
  }

  return (
    <div className='dashboard'>
      <h1>Dashboard</h1>

      <details className='book-filter'>
        <summary className='book-filter-summary'>Filter Books by Category</summary>
        <div className='dashboard-section'>
          <h2>Books by Category</h2>
          <Chart data={booksByCategory} />
        </div>
      </details>

      <details className='book-filter'>
        <summary className='book-filter-summary'>Filter Books by Page Count</summary>
        <div className='dashboard-section'>
          <h2>Books by Page Count</h2>
          <Chart data={booksByPageCount} />
        </div>
      </details>

      <details className='book-filter'>
        <summary className='book-filter-summary'>Filter Books by Price</summary>
        <div className='dashboard-section'>
          <h2>Books by Price</h2>
          <Chart data={booksByPrice} />
        </div>
      </details>
    </div>
  )
}
