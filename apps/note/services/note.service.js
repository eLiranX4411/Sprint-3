import { loadFromStorage, makeId, saveToStorage } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const NOTE_KEY = 'noteDB'

export const noteService = {
  query,
  get,
  remove,
  save,
  post,
  getFilterFromSearchParams,
  debounce,
  getEmptyNote,
  getUniqueId,
  getEmptyTodosNote,
  getEmptyImgNote,
  getEmptyVideoNote,
  createMailNote,
}

var gNotes = [
  {
    id: 'n101',
    createdAt: Date.now(),
    type: 'NoteTxt',
    isPinned: true,
    style: {
      backgroundColor: '',
    },
    info: {
      title: 'Fullstack',
      txt: 'Me Baby!',
    },
  },
  {
    id: 'n102',
    createdAt: Date.now(),
    type: 'NoteImg',
    isPinned: false,
    style: {
      backgroundColor: '',
    },
    info: {
      url: '../../../apps/note/img/missKeep.png',
      title: 'Miss keep 👩',
    },
  },
  {
    id: 'n103',
    createdAt: Date.now(),
    type: 'NoteTodos',
    isPinned: true,
    style: {
      backgroundColor: '',
    },
    info: {
      title: 'Get my stuff together',
      todos: [
        { txt: 'Driving license', doneAt: null },
        { txt: 'Coding power', doneAt: null },
      ],
    },
  },
  {
    id: 'n104',
    createdAt: Date.now(),
    type: 'NoteVideo',
    isPinned: false,
    style: {
      backgroundColor: '',
    },
    info: {
      url: '../../../apps/note/video/javascript.mp4',
      title: 'Javascript Vs Python',
    },
  },
]

function query(filterBy = {}) {
  return storageService.query(NOTE_KEY).then((notes) => {
    if (!notes || !notes.length) {
      saveToStorage(NOTE_KEY, gNotes)
      notes = gNotes
    }

    if (filterBy.title) {
      const regex = new RegExp(filterBy.title, 'i')
      notes = notes.filter((note) => regex.test(note.info.title))
    }

    if (filterBy.type) {
      notes = notes.filter((note) => note.type === filterBy.type)
    }

    return notes
  })
}

function get(noteId) {
  return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
  // return Promise.reject('Oh No!')
  return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
  if (note.id) {
    return storageService.put(NOTE_KEY, note)
  } else {
    return storageService.post(NOTE_KEY, note)
  }
}

function post(note) {
  return storageService.post(NOTE_KEY, note)
}

function getEmptyNote() {
  return {
    createdAt: Date.now(),
    type: 'NoteTxt',
    isPinned: false,
    style: {
      backgroundColor: '',
    },
    info: {
      title: '',
      txt: '',
    },
  }
}

function getEmptyTodosNote() {
  return {
    createdAt: Date.now(),
    type: 'NoteTodos',
    isPinned: true,
    style: {
      backgroundColor: '',
    },
    info: {
      title: '',
      todos: [
        { txt: '', doneAt: null },
        { txt: '', doneAt: null },
      ],
    },
  }
}

function getEmptyImgNote() {
  return {
    createdAt: Date.now(),
    type: 'NoteImg',
    isPinned: false,
    style: {
      backgroundColor: '',
    },
    info: {
      url: '',
      title: '',
    },
  }
}

function getEmptyVideoNote() {
  return {
    createdAt: Date.now(),
    type: 'NoteVideo',
    isPinned: false,
    style: {
      backgroundColor: '',
    },
    info: {
      url: '',
      title: '',
    },
  }
}

function getFilterFromSearchParams(searchParams) {
  const title = searchParams.get('title') || ''
  const type = searchParams.get('type') || ''
  return {
    type,
    title,
  }
}

function debounce(func, delay) {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

function getUniqueId(length = 4) {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

export function createMailNote(title, body) {
  const newNote = {
    id: makeId(),
    createdAt: Date.now(),
    type: 'NoteTxt',
    isPinned: false,
    style: {
      backgroundColor: '',
    },
    info: {
      title: title,
      txt: body,
    },
  }

  return noteService
    .post(newNote)
    .then((savedNote) => {
      console.log('Note created successfully:', savedNote)
      return savedNote.id
    })
    .catch((err) => {
      console.error('Failed to create note:', err)
      throw err
    })
}

//////////////////////TrashCan///////////////////////////
/*

function _createNotes() {
  let notes = loadFromStorage(NOTE_KEY)
  if (!notes || !notes.length) {
    notes = [_createTxtNote('NoteTxt'), _createImgNote('NoteImg'), _createTodoNote('NoteTodos')]
    saveToStorage(NOTE_KEY, notes)
  }
}

function getEmptyTxtNote(type) {
  return {
    id: '',
    createdAt: Date.now(),
    type,
    isPinned: false,
    style: {
      backgroundColor: utilService.getRandomColor()
    },
    info: {
      title: 'note txt',
      txt: 'Empty Txt'
    }
  }
}

function getEmptyImgNote(type) {
  return {
    id: '',
    createdAt: Date.now(),
    type,
    isPinned: false,
    info: {
      url: 'http://some-img/me',
      title: 'Bobi and Me'
    },
    style: {
      backgroundColor: utilService.getRandomColor()
    }
  }
}

function getEmptyTodoNote(type) {
  return {
    id: '',
    createdAt: Date.now(),
    type,
    isPinned: false,
    info: {
      title: 'Get my stuff together',
      todos: [
        { txt: 'Todo #1 Txt', doneAt: null },
        { txt: 'Todo #2 Txt', doneAt: 187111111 }
      ]
    }
  }
}

function _createTxtNote(type) {
  const note = getEmptyTxtNote(type)
  note.id = makeId()
  return note
}

function _createImgNote(type) {
  const note = getEmptyImgNote(type)
  note.id = makeId()
  return note
}

function _createTodoNote(type) {
  const note = getEmptyTodoNote(type)
  note.id = makeId()
  return note
}

function getDefaultFilter() {
  return {
    title: '',
    type: ''
  }
}

function _setNextPrevNoteId(note) {
  return query().then((notes) => {
    const noteIdx = notes.findIndex((currNote) => currNote.id === note.id)
    const nextNote = notes[noteIdx + 1] ? notes[noteIdx + 1] : notes[0]
    const prevNote = notes[noteIdx - 1] ? notes[noteIdx - 1] : notes[notes.length - 1]
    note.nextNotelId = nextNote.id
    note.prevNoteId = prevNote.id
    return note
  })
}

*/
