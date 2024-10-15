import { noteService } from '../../../apps/note/services/note.service.js'
import { makeId } from '../../../services/util.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { textIconSvg, todosIconSvg, imgIconSvg, videoIconSvg, colorsIconSvg } from '../../../apps/note/cmps/SvgIcons.jsx'

const { useState, useEffect, useRef } = React

export function AddNote({ handleAddNote }) {
  const [noteData, setNoteData] = useState(noteService.getEmptyNote())
  const [isExpanded, setIsExpanded] = useState(false)

  const [imgPreview, setImgPreview] = useState(null)
  const [videoPreview, setVideoPreview] = useState(null)

  useEffect(() => {
    loadNote()
  }, [])

  function loadNote() {
    noteService
      .get(noteData)
      .then(setNoteData)
      .catch((err) => {
        console.log('Problem getting note', err)
      })
  }

  function onAddNote(ev) {
    ev.preventDefault()
    noteService
      .save(noteData)
      .then((newNote) => {
        handleAddNote(newNote)
        resetInputs()
        setIsExpanded(false)
        setImgPreview(null)
        showSuccessMsg('Note Added Sucessfully !')
      })
      .catch((err) => {
        console.log('Error adding note:', err)
        showErrorMsg('Error adding note!')
      })
  }

  function createMailNote(title, body) {
    const newNote = {
      id: makeId(),
      createdAt: Date.now(),
      type: 'NoteTxt',
      isPinned: false,
      style: {
        backgroundColor: ''
      },
      info: {
        title: title,
        txt: body
      }
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

  function handleChange({ target }) {
    const evName = target.name
    const evValue = target.value

    setNoteData((prevNote) => ({
      ...prevNote,
      info: { ...prevNote.info, [evName]: evValue }
    }))
  }

  function handleTodoChange({ target }, idx) {
    const { value } = target

    setNoteData((prevNote) => {
      const updatedTodos = prevNote.info.todos.map((todo, todoIdx) => {
        if (todoIdx === idx) {
          return { ...todo, txt: value }
        }
        return todo
      })

      return {
        ...prevNote,
        info: { ...prevNote.info, todos: updatedTodos }
      }
    })
  }

  function handleFileChange(ev) {
    const file = ev.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImgPreview(reader.result)
        setNoteData((prevNote) => ({
          ...prevNote,
          info: { ...prevNote.info, url: reader.result }
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  function handleVideoChange(ev) {
    const file = ev.target.files[0]
    if (file) {
      const reader = new FileReader()

      reader.onload = () => {
        setVideoPreview(reader.result)
        setNoteData((prevNote) => ({
          ...prevNote,
          info: { ...prevNote.info, url: reader.result }
        }))
      }

      reader.readAsDataURL(file)
    }
  }

  function setNoteType(type) {
    setNoteData((prevNote) => {
      switch (type) {
        case 'NoteTodos':
          return { ...prevNote, ...noteService.getEmptyTodosNote() }
        case 'NoteImg':
          return { ...prevNote, ...noteService.getEmptyImgNote() }
        case 'NoteVideo':
          return { ...prevNote, ...noteService.getEmptyVideoNote() }
        default:
          return { ...prevNote, ...noteService.getEmptyNote() }
      }
    })
  }

  function handleExpand() {
    setIsExpanded(true)
  }

  function handleExpandFalse() {
    setIsExpanded(false)
  }

  function resetInputs() {
    setNoteData(noteService.getEmptyNote())
  }

  const { info, type } = noteData
  const { txt, title, todos, url } = info

  return (
    <React.Fragment>
      <form onSubmit={onAddNote} className='add-note'>
        <div className={`add-note-container ${isExpanded ? 'expanded' : ''}`}>
          {/* Always show the placeholder and type buttons */}
          <input type='text' placeholder='Take a note...' className='add-note-placeholder' onClick={handleExpand} />

          {/* Always render note-type-buttons */}
          <div className='add-note-bar'>
            <div className='note-type-buttons'>
              <button
                type='button'
                title='Write a note..'
                className='txt-btn-note'
                onClick={() => {
                  setNoteType('NoteTxt')
                  setIsExpanded(true)
                }}
              >
                {textIconSvg.textIcon}
              </button>
              <button
                type='button'
                title='Todo List'
                className='todos-btn-note'
                onClick={() => {
                  setNoteType('NoteTodos')
                  setIsExpanded(true)
                }}
              >
                {todosIconSvg.todosIcon}
              </button>
              <button
                type='button'
                title='Upload Img'
                className='img-btn-note'
                onClick={() => {
                  setNoteType('NoteImg')
                  setIsExpanded(true)
                }}
              >
                {imgIconSvg.imgIcon}
              </button>
              <button
                type='button'
                title='Upload Video'
                className='video-btn-note'
                onClick={() => {
                  setNoteType('NoteVideo')
                  setIsExpanded(true)
                }}
              >
                {videoIconSvg.videoIcon}
              </button>
            </div>
          </div>

          {/* Render expanded body based on the note type */}
          {isExpanded && (
            <React.Fragment>
              {type === 'NoteTxt' && (
                <React.Fragment>
                  <input type='text' name='title' placeholder='Title' value={title} onChange={handleChange} className='add-note-title' />
                  <textarea name='txt' placeholder='Take a note...' value={txt} onChange={handleChange} className='add-note-text' />
                </React.Fragment>
              )}

              {type === 'NoteTodos' && (
                <React.Fragment>
                  <input type='text' name='title' placeholder='Title' value={title} onChange={handleChange} className='add-note-title' />
                  <ul className='todos-item'>
                    {todos.map((todo, idx) => (
                      <li key={idx}>
                        <input type='text' value={todo.txt} onChange={(ev) => handleTodoChange(ev, idx)} placeholder='Todo item' />
                      </li>
                    ))}
                  </ul>
                </React.Fragment>
              )}

              {type === 'NoteImg' && (
                <React.Fragment>
                  <input type='text' name='title' placeholder='Title' value={title} onChange={handleChange} className='add-note-title' />
                  <input type='file' accept='image/*' onChange={handleFileChange} />
                  {imgPreview && (
                    <div className='img-preview'>
                      <img src={imgPreview} alt='Preview' />
                    </div>
                  )}
                </React.Fragment>
              )}

              {type === 'NoteVideo' && (
                <React.Fragment>
                  <input type='text' name='title' placeholder='Title' value={title} onChange={handleChange} className='add-note-title' />
                  <input type='file' name='video' accept='video/*' onChange={handleVideoChange} />
                  {videoPreview && (
                    <div className='video-preview'>
                      <video width='250' height='250'>
                        <source src={videoPreview} type='video/mp4' />
                      </video>
                    </div>
                  )}
                </React.Fragment>
              )}

              {/* Action buttons for adding notes */}
              <div className='add-close-btns'>
                <button type='submit' className='add-note-btn'>
                  {type === 'NoteTxt' ? 'Add Note' : type === 'NoteTodos' ? 'Add Todos Note' : type === 'NoteImg' ? 'Add Img Note' : 'Add Video Note'}
                </button>
                <button className='close-add-btn' onClick={handleExpandFalse} type='button'>
                  x
                </button>
              </div>
            </React.Fragment>
          )}
        </div>
      </form>
    </React.Fragment>
  )
}
