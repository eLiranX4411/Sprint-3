// Hooks
const { useState, useEffect, useRef } = React
const { Link, useSearchParams, Outlet } = ReactRouterDOM

// Services
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { noteService } from '../../../apps/note/services/note.service.js'
import { getTruthyValues } from '../../../services/util.service.js'

// Cmps
import { NoteDisplay } from '../../../apps/note/cmps/NoteDisplay.jsx'
import { AppLoader } from '../../../cmps/AppLoader.jsx'
import { AddNote } from '../../../apps/note/cmps/AddNote.jsx'

//Pages
import { NotesFilter } from '../../../apps/note/pages/NotesFilter.jsx'

export function NoteIndex() {
  const [notes, setNotes] = useState(null)
  const [searchPrms, setSearchPrms] = useSearchParams()
  const [filterBy, setFilterBy] = useState(noteService.getFilterFromSearchParams(searchPrms))

  useEffect(() => {
    loadNotes()
    setSearchPrms(getTruthyValues(filterBy))
  }, [filterBy])

  function loadNotes() {
    noteService
      .query(filterBy)
      .then(setNotes)
      .catch((err) => {
        console.log('Problems getting note:', err)
      })
  }

  function handleAddNote(newNote) {
    setNotes((prevNotes) => [...prevNotes, newNote])
  }

  // TODO
  function handleEditNote(updatedNote) {
    setNotes((prevNotes) => prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note)))
    showSuccessMsg(`Note updated successfully!`)
  }

  function handleTodoCheck(noteId, idx, isChecked) {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.map((note) => {
        if (note.id !== noteId) return note

        const updatedTodos = [...note.info.todos]
        updatedTodos[idx].doneAt = isChecked ? Date.now() : null

        const updatedNote = { ...note, info: { ...note.info, todos: updatedTodos } }

        noteService
          .save(updatedNote)
          .then(() => {
            showSuccessMsg('Todo state updated successfully!')
          })
          .catch((err) => {
            console.error('Failed to updated todo:', err)
            showErrorMsg('Failed to update todo.')
          })

        return updatedNote
      })

      return updatedNotes
    })
  }

  function onRemoveNote(noteId) {
    noteService
      .remove(noteId)
      .then(() => {
        console.log(noteId)

        setNotes((notes) => notes.filter((note) => note.id !== noteId))
        showSuccessMsg(`Note removed successfully!`)
      })
      .catch((err) => {
        console.log('Problems removing note:', err)
        showErrorMsg(`Problems removing note (${noteId})`)
      })
  }

  function onDuplicateNote(noteId) {
    const note = notes.find((note) => note.id === noteId)
    const updatedNote = { ...note, id: '' }

    noteService
      .save(updatedNote)
      .then(() => {
        setNotes((prevNotes) => [...prevNotes, updatedNote])
        showSuccessMsg(`Note duplicated successfully!`)
      })
      .catch((err) => {
        console.log('Problems duplicating the note:', err)
        showErrorMsg(`Problems duplicating the note (${noteId})`)
      })
  }

  function onPinnedNote(noteId) {
    const noteIdx = notes.find((note) => note.id === noteId)

    if (!noteIdx) {
      showErrorMsg(`Note not found (${noteId})`)
      return
    }
    const updatedNote = { ...noteIdx, isPinned: !noteIdx.isPinned }

    noteService
      .save(updatedNote)
      .then(() => {
        setNotes((Notes) => Notes.map((note) => (note.id === noteId ? updatedNote : note)))
        showSuccessMsg(`Note ${updatedNote.isPinned ? 'pinned' : 'unpinned'} successfully!`)
      })
      .catch((err) => {
        console.log('Problems pinning the note:', err)
        showErrorMsg(`Problems pinning the note (${noteId})`)
      })
  }

  function onSetNewColor(noteId, newColor) {
    const noteIdx = notes.find((note) => note.id === noteId)

    if (!noteIdx) {
      showErrorMsg(`Note not found (${noteId})`)
      return
    }

    const updatedNoteColor = {
      ...noteIdx,
      style: { ...noteIdx.style, backgroundColor: newColor }
    }

    noteService
      .save(updatedNoteColor)
      .then(() => {
        setNotes((Notes) => Notes.map((note) => (note.id === noteId ? updatedNoteColor : note)))
        showSuccessMsg(`Note ${updatedNoteColor.style.backgroundColor ? 'colored' : 'uncolored'} successfully!`)
      })
      .catch((err) => {
        console.log('Problems style the note:', err)
        showErrorMsg(`Problems style the note (${noteId})`)
      })
  }

  function onSetFilterBy(filterBy) {
    setFilterBy((preFilter) => ({ ...preFilter, ...filterBy }))
  }

  if (!notes) return <AppLoader />

  return (
    <main className='notes-index'>
      {/* Header with Filters */}
      <header className='notes-nav-bar'>
        <section className='notes-filter'>
          <NotesFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
        </section>
      </header>

      {/* Notes Body */}
      <section className='notes-body'>
        <AddNote handleAddNote={handleAddNote} />
        <NoteDisplay
          notes={notes}
          onRemoveNote={onRemoveNote}
          onPinnedNote={onPinnedNote}
          onSetNewColor={onSetNewColor}
          handleTodoCheck={handleTodoCheck}
          onDuplicateNote={onDuplicateNote}
        />
      </section>
      <Outlet />
    </main>
  )
}
