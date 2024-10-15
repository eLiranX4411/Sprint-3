import { noteService } from '../../../apps/note/services/note.service.js'

const { useState, useEffect, useRef } = React
const { useNavigate, useParams } = ReactRouterDOM

export function EditNote() {
  const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
  const { noteId } = useParams()
  const navigate = useNavigate()

  const [imgPreview, setImgPreview] = useState(null)
  const [videoPreview, setVideoPreview] = useState(null)

  useEffect(() => {
    if (noteId) loadNote()
  }, [noteId])

  function loadNote() {
    noteService
      .get(noteId)
      .then(setNoteToEdit)
      .catch((err) => {
        console.log('Problem getting note', err)
        navigate('/note/edit')
      })
  }

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    if (target.type === 'checkbox') value = target.checked

    setNoteToEdit((prevNote) => {
      if (['title', 'txt', 'img', 'video'].includes(field)) {
        return {
          ...prevNote,
          info: {
            ...prevNote.info,
            [field]: value
          }
        }
      }

      return {
        ...prevNote,
        [field]: value
      }
    })
  }

  function onSaveNote(ev) {
    ev.preventDefault()
    noteService
      .save(noteToEdit)
      .then((savedNote) => {
        setNoteToEdit({ ...savedNote })
      })
      .catch((err) => {
        console.log('err:', err)
      })
      .finally(() => {
        navigate('/note')
      })
  }

  function handleTodoChange(ev, idx) {
    const value = ev.target.value

    setNoteToEdit((prevNote) => {
      const updatedTodos = prevNote.info.todos.map((todo, todoIdx) => (todoIdx === idx ? { ...todo, txt: value } : todo))
      return { ...prevNote, info: { ...prevNote.info, todos: updatedTodos } }
    })
  }

  function onAddTodo() {
    setNoteToEdit((prevNote) => {
      const updatedTodos = [...prevNote.info.todos, { txt: '' }]
      return { ...prevNote, info: { ...prevNote.info, todos: updatedTodos } }
    })
  }

  function onRemoveTodo(idx) {
    setNoteToEdit((prevNote) => {
      const updatedTodos = prevNote.info.todos.filter((_, todoIdx) => todoIdx !== idx)
      return { ...prevNote, info: { ...prevNote.info, todos: updatedTodos } }
    })
  }

  function handleFileChange(ev) {
    const file = ev.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImgPreview(reader.result)
        setNoteToEdit((prevNote) => ({
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
        setNoteToEdit((prevNote) => ({
          ...prevNote,
          info: { ...prevNote.info, url: reader.result }
        }))
      }

      reader.readAsDataURL(file)
    }
  }

  function onBack() {
    navigate('/note')
  }

  const { info, type } = noteToEdit

  return (
    <section className='note-edit-backdrop'>
      <div className='note-edit'>
        <div className='note-edit-container'>
          <form onSubmit={onSaveNote}>
            {/* Title */}
            <label htmlFor='title'>Title</label>
            <input type='text' value={info.title} onChange={handleChange} name='title' id='title' />

            {/* Separate based on Note Type */}
            {type === 'NoteTxt' && (
              <React.Fragment>
                {/* Text */}
                <label htmlFor='txt'>Text</label>
                <input type='text' value={info.txt} onChange={handleChange} name='txt' id='txt' />
              </React.Fragment>
            )}

            {type === 'NoteTodos' && (
              <React.Fragment>
                {/* Todos */}
                <label htmlFor='todos'>Todos:</label>
                <ul>
                  {info.todos.map((todo, idx) => (
                    <li key={todo.id}>
                      <button onClick={() => onRemoveTodo(idx)} type='button' className='remove-todo-btn'>
                        x
                      </button>
                      <input type='text' value={todo.txt} onChange={(ev) => handleTodoChange(ev, idx)} name={`todo-${idx}`} id={`todo-${idx}`} />
                    </li>
                  ))}
                </ul>

                <button className='add-todo-btn' type='button' onClick={onAddTodo}>
                  Add Todo
                </button>
              </React.Fragment>
            )}

            {type === 'NoteImg' && (
              <React.Fragment>
                {/* Image */}
                <label htmlFor='img'>Attach new Img</label>
                <input type='file' accept='image/*' onChange={handleFileChange} name='img' id='img' />
                {imgPreview && <img src={imgPreview} alt='Note Image' />}
              </React.Fragment>
            )}

            {type === 'NoteVideo' && (
              <React.Fragment>
                {/* Video */}
                <label htmlFor='video'>Video URL</label>
                <input type='file' accept='video/*' onChange={handleVideoChange} name='video' id='video' />
                {videoPreview && (
                  <video controls>
                    <source src={videoPreview} type='video/mp4' />
                    Your browser does not support the video tag.
                  </video>
                )}
              </React.Fragment>
            )}

            <button className='save-btn'>Save</button>
            <button className='close-btn' onClick={onBack}>
              X
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
