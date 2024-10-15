import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const GOOGLE_BOOKS_KEY = 'googleBooksCache'

export const googleBookService = {
  queryGoogleBooks,
  addGoogleBook,
}

async function queryGoogleBooks(searchTerm) {
  const cachedBooks = await storageService.query(GOOGLE_BOOKS_KEY)
  const cachedResult = cachedBooks.find((entry) => entry.searchTerm === searchTerm)

  if (cachedResult) {
    console.log('Loading books from cache')
    return cachedResult.books
  }

  console.log('Fetching books from Google Books API')
  const res = await fetch(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${searchTerm}`)
  const data = await res.json()

  if (!data.items) return []

  const books = data.items.map(_mapGoogleBook)

  const cacheEntry = { searchTerm, books }
  await storageService.post(GOOGLE_BOOKS_KEY, cacheEntry)

  return books
}

function addGoogleBook(googleBook) {
  const book = {
    googleId: googleBook.googleId,
    title: googleBook.title,
    subtitle: googleBook.subtitle || '',
    authors: googleBook.authors || [],
    publishedDate: googleBook.publishedDate || 'Unknown',
    description: googleBook.description || 'No description available',
    pageCount: googleBook.pageCount || 0,
    categories: googleBook.categories || ['Unknown'],
    thumbnail: googleBook.imageLinks ? googleBook.imageLinks.thumbnail : '',
    language: googleBook.language || 'en',
    listPrice: {
      amount: 0,
      currencyCode: 'USD',
      isOnSale: false,
    },
  }
  return book
}

function _mapGoogleBook(googleBook) {
  const volumeInfo = googleBook.volumeInfo

  return {
    googleId: googleBook.id,
    title: volumeInfo.title,
    subtitle: volumeInfo.subtitle || '',
    authors: volumeInfo.authors || [],
    publishedDate: volumeInfo.publishedDate ? utilService.parseDate(volumeInfo.publishedDate) : 'Unknown',
    description: volumeInfo.description || '',
    pageCount: volumeInfo.pageCount || 0,
    categories: volumeInfo.categories || ['Unknown'],
    thumbnail: volumeInfo.imageLinks ? volumeInfo.imageLinks.smallThumbnail : '',
    language: volumeInfo.language || 'en',
  }
}
