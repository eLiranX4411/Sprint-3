import { NoteList } from '../../../apps/note/cmps/NoteList.jsx'
import { PinnedNoteList } from '../../../apps/note/cmps/PinnedNoteList.jsx'

export function NoteDisplay({
  notes,
  onDuplicateNote,
  onRemoveNote,
  handleTodoCheck,
  onPinnedNote,
  onSetNewColor
}) {
  if (!notes || notes.length === 0) return null

  const pinnedNotes = notes.filter((note) => note.isPinned)
  const unpinnedNotes = notes.filter((note) => !note.isPinned)

  return (
    <div>
      {/* Pinned notes section */}
      {pinnedNotes.length > 0 ? (
        <section>
          <h2>Pinned Notes</h2>
          <PinnedNoteList
            notes={pinnedNotes}
            onRemoveNote={onRemoveNote}
            onSetNewColor={onSetNewColor}
            onPinnedNote={onPinnedNote}
            handleTodoCheck={handleTodoCheck}
            onDuplicateNote={onDuplicateNote}
          />
        </section>
      ) : (
        <p>No pinned notes</p>
      )}

      {/* Unpinned notes section */}
      {unpinnedNotes.length > 0 ? (
        <section>
          <h2>Other Notes</h2>
          <NoteList
            notes={unpinnedNotes}
            onRemoveNote={onRemoveNote}
            onPinnedNote={onPinnedNote}
            onSetNewColor={onSetNewColor}
            handleTodoCheck={handleTodoCheck}
            onDuplicateNote={onDuplicateNote}
          />
        </section>
      ) : (
        <p>No other notes</p>
      )}
    </div>
  )
}
