import { NotePreview } from '../../../apps/note/cmps/NotePreview.jsx'

export function NoteList({
  notes,
  handleTodoCheck,
  onRemoveNote,
  onPinnedNote,
  onSetNewColor,
  onDuplicateNote
}) {
  return (
    <section className='notes-list'>
      {notes.map((note) => (
        <NotePreview
          note={note}
          key={note.id}
          onRemoveNote={onRemoveNote}
          onPinnedNote={onPinnedNote}
          onSetNewColor={onSetNewColor}
          handleTodoCheck={handleTodoCheck}
          onDuplicateNote={onDuplicateNote}
        />
      ))}
    </section>
  )
}
