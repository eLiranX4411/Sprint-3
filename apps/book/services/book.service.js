import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
var gFilterBy = {
  title: '',
  author: '',
  minPrice: 0,
  maxPrice: Infinity,
  publishedDate: '',
  category: '',
  language: '',
}
_createBooks()

export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  getNextBookId,
  getPreviousBookId,
  getFilterBy,
  setFilterBy,
  addBooks,
  getDefaultFilter,
  addReview,
  removeReview,
  groupBooksBy,
  groupBooksByPageCount,
  groupBooksByPrice,
}

function query() {
  return storageService.query(BOOK_KEY).then((books) => {
    if (gFilterBy.title) {
      const regex = new RegExp(gFilterBy.title, 'i')
      books = books.filter((book) => regex.test(book.title))
    }

    if (gFilterBy.author) {
      const regex = new RegExp(gFilterBy.author, 'i')
      books = books.filter((book) => book.authors.some((author) => regex.test(author)))
    }

    if (gFilterBy.minPrice !== undefined) {
      books = books.filter((book) => book.listPrice.amount >= gFilterBy.minPrice)
    }
    if (gFilterBy.maxPrice !== undefined && gFilterBy.maxPrice !== Infinity) {
      books = books.filter((book) => book.listPrice.amount <= gFilterBy.maxPrice)
    }

    if (gFilterBy.publishedDate) {
      books = books.filter((book) => book.publishedDate >= gFilterBy.publishedDate)
    }

    if (gFilterBy.category) {
      books = books.filter((book) => book.categories.includes(gFilterBy.category))
    }

    if (gFilterBy.language) {
      books = books.filter((book) => book.language === gFilterBy.language)
    }
    return books
  })
}

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
  return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book)
  } else {
    return storageService.post(BOOK_KEY, book)
  }
}

function addBooks(books) {
  return Promise.all(books.map((book) => storageService.post(BOOK_KEY, book)))
    .then((results) => {
      console.log('All books have been added:', results)
      return results
    })
    .catch((err) => {
      console.error('Error adding books:', err)
      throw err
    })
}

function getEmptyBook(
  title = '',
  subtitle = '',
  authors = [],
  publishedDate = 2000,
  description = '',
  pageCount = 100,
  categories = [],
  thumbnail = '',
  language = 'en',
  listPrice = { amount: 0, currencyCode: 'USD', isOnSale: false }
) {
  return { id: '', title, subtitle, authors, publishedDate, description, pageCount, categories, thumbnail, language, listPrice }
}

function getFilterBy() {
  return { ...gFilterBy }
}

function getDefaultFilter() {
  return {
    title: '',
    author: '',
    minPrice: 0,
    maxPrice: Infinity,
    publishedDate: '',
    category: '',
    language: '',
  }
}

function addReview(bookId, review) {
  return storageService.get(BOOK_KEY, bookId).then((book) => {
    if (!book.reviews) book.reviews = []
    book.reviews.push(review)
    return storageService.put(BOOK_KEY, book)
  })
}

function removeReview(bookId, reviewIdx) {
  return storageService.get(BOOK_KEY, bookId).then((book) => {
    book.reviews.splice(reviewIdx, 1)
    return storageService.put(BOOK_KEY, book)
  })
}

function setFilterBy(filterBy = {}) {
  if (filterBy.title !== undefined) gFilterBy.title = filterBy.title
  if (filterBy.author !== undefined) gFilterBy.author = filterBy.author
  if (filterBy.minPrice !== undefined) gFilterBy.minPrice = filterBy.minPrice
  if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
  if (filterBy.publishedDate !== undefined) gFilterBy.publishedDate = filterBy.publishedDate
  if (filterBy.category !== undefined) gFilterBy.category = filterBy.category
  if (filterBy.language !== undefined) gFilterBy.language = filterBy.language

  return gFilterBy
}

function getNextBookId(bookId) {
  return storageService.query(BOOK_KEY).then((books) => {
    let nextBookIdx = books.findIndex((book) => book.id === bookId) + 1
    if (nextBookIdx === books.length) nextBookIdx = 0
    return books[nextBookIdx].id
  })
}

function getPreviousBookId(bookId) {
  return storageService.query(BOOK_KEY).then((books) => {
    let prevBookIdx = books.findIndex((book) => book.id === bookId) - 1
    if (prevBookIdx < 0) prevBookIdx = books.length - 1
    return books[prevBookIdx].id
  })
}

function _createRandomReviews() {
  const reviewsCount = utilService.getRandomIntInclusive(0, 10)
  const reviews = []
  for (let i = 0; i < reviewsCount; i++) {
    reviews.push({
      fullname: utilService.makeLorem(2),
      rating: utilService.getRandomIntInclusive(1, 5),
      readAt: new Date(
        utilService.getRandomIntInclusive(2010, 2023),
        utilService.getRandomIntInclusive(0, 11),
        utilService.getRandomIntInclusive(1, 28)
      ).toISOString(),
      text: utilService.makeLorem(50),
    })
  }
  return reviews
}

function _createBooks() {
  let books = utilService.loadFromStorage(BOOK_KEY)
  if (!books || !books.length) {
    books = []
    for (let i = 0; i < 20; i++) {
      books.push(_createBook())
    }
    utilService.saveToStorage(BOOK_KEY, books)
  }
}

function _createBook() {
  const titles = [
    'The Great Gatsby',
    'To Kill a Mockingbird',
    '1984',
    'The Catcher in the Rye',
    'The Hobbit',
    'Pride and Prejudice',
    'Moby Dick',
    'War and Peace',
    'Crime and Punishment',
    'Ulysses',
    'The Odyssey',
    'Jane Eyre',
    'Brave New World',
    'The Iliad',
    'Wuthering Heights',
    'Hamlet',
    'Frankenstein',
    'Dracula',
    'Don Quixote',
    'A Tale of Two Cities',
  ]

  const authors = [
    'F. Scott Fitzgerald',
    'Harper Lee',
    'George Orwell',
    'J.D. Salinger',
    'J.R.R. Tolkien',
    'Jane Austen',
    'Herman Melville',
    'Leo Tolstoy',
    'Fyodor Dostoevsky',
    'James Joyce',
    'Homer',
    'Charlotte Bronte',
    'Aldous Huxley',
    'Homer',
    'Emily Bronte',
    'William Shakespeare',
    'Mary Shelley',
    'Bram Stoker',
    'Miguel de Cervantes',
    'Charles Dickens',
  ]

  const categories = ['Fiction', 'Literature', 'Classic', 'Adventure', 'Fantasy']
  const language = ['en', 'es', 'fr', 'de', 'it']
  const randomAmount = utilService.getRandomIntInclusive(10, 300)
  const randomCurrency = ['USD', 'EUR', 'ILS']
  const randomSale = [true, false]

  function generateRandomDescription() {
    const words = [
      'adventure',
      'mystery',
      'romance',
      'thrilling',
      'journey',
      'historical',
      'fantasy',
      'epic',
      'legend',
      'battle',
      'hero',
      'villain',
      'quest',
      'discovery',
      'future',
      'past',
      'magic',
      'dragon',
      'kingdom',
      'city',
      'dreams',
      'ambition',
      'secrets',
      'love',
      'betrayal',
      'fate',
      'destiny',
      'friendship',
      'challenge',
      'power',
      'hope',
      'darkness',
      'light',
      'truth',
      'lies',
      'family',
      'war',
      'peace',
      'victory',
      'defeat',
      'adventure',
      'sacrifice',
      'survival',
      'justice',
      'revenge',
      'wisdom',
      'courage',
      'faith',
      'strength',
      'freedom',
      'inspiration',
      'loss',
      'tragedy',
      'redemption',
      'conflict',
      'honor',
      'glory',
      'path',
      'leader',
      'follower',
      'revolution',
      'mystery',
      'struggle',
      'vision',
      'choice',
      'journey',
      'awakening',
      'transformation',
      'danger',
      'challenge',
      'discovery',
    ]
    let description = ''
    for (let i = 0; i < 70; i++) {
      description += words[utilService.getRandomIntInclusive(0, words.length - 1)] + ' '
    }
    return description.trim() + '.'
  }

  return {
    id: utilService.makeId(),
    title: titles[utilService.getRandomIntInclusive(0, titles.length - 1)],
    subtitle: 'A thrilling read',
    authors: [authors[utilService.getRandomIntInclusive(0, authors.length - 1)]],
    publishedDate: utilService.getRandomIntInclusive(1950, 2023),
    description: generateRandomDescription(),
    pageCount: utilService.getRandomIntInclusive(100, 1000),
    categories: [categories[utilService.getRandomIntInclusive(0, categories.length - 1)]],
    thumbnail: `https://www.coding-academy.org/books-photos/${utilService.getRandomIntInclusive(1, 20)}.jpg`,
    language: language[utilService.getRandomIntInclusive(0, language.length - 1)],
    listPrice: {
      amount: randomAmount,
      currencyCode: randomCurrency[utilService.getRandomIntInclusive(0, randomCurrency.length - 1)],
      isOnSale: randomSale[utilService.getRandomIntInclusive(0, randomSale.length - 1)],
    },
    reviews: _createRandomReviews(),
  }
}

function groupBooksBy(field) {
  return storageService.query(BOOK_KEY).then((books) => {
    return books.reduce((map, book) => {
      if (Array.isArray(book[field])) {
        // אם השדה הוא מערך (כמו 'categories' או 'authors')
        book[field].forEach((item) => {
          if (!map[item]) map[item] = 0
          map[item]++
        })
      } else {
        // עבור שדות שאינם מערכים
        const key = book[field]
        if (!map[key]) map[key] = 0
        map[key]++
      }
      return map
    }, {})
  })
}

function groupBooksByPageCount(books) {
  return new Promise((resolve) => {
    const result = books.reduce((map, book) => {
      if (book.pageCount > 500) {
        if (!map['Serious Reading']) map['Serious Reading'] = 0
        map['Serious Reading']++
      } else if (book.pageCount > 200) {
        if (!map['Descent Reading']) map['Descent Reading'] = 0
        map['Descent Reading']++
      } else if (book.pageCount < 100) {
        if (!map['Light Reading']) map['Light Reading'] = 0
        map['Light Reading']++
      }
      return map
    }, {})
    resolve(result)
  })
}

function groupBooksByPrice(books) {
  return new Promise((resolve) => {
    const result = books.reduce((map, book) => {
      if (book.listPrice.amount > 150) {
        if (!map['Expensive']) map['Expensive'] = 0
        map['Expensive']++
      } else if (book.listPrice.amount < 20) {
        if (!map['Cheap']) map['Cheap'] = 0
        map['Cheap']++
      }
      return map
    }, {})

    // Always include 'Expensive' and 'Cheap', even if no books fit
    if (!result['Expensive']) result['Expensive'] = 0
    if (!result['Cheap']) result['Cheap'] = 0

    resolve(result)
  })
}
