export function NoteTodos({ note, handleTodoCheck }) {
  return (
    <section className='note-todos-container'>
      <div className='note-todos-card'>
        <h3 className='note-todos-title'>{note.info.title}</h3>

        {note.info.todos.map((todo, idx) => (
          <ul key={idx}>
            <li className='todo-txt'>
              <input
                type='checkbox'
                checked={!!todo.doneAt}
                onChange={(ev) => handleTodoCheck(note.id, idx, ev.target.checked)}
                name={`todo-${idx}`}
              />
              {todo.txt}
            </li>
          </ul>
        ))}
      </div>
    </section>
  )
}
