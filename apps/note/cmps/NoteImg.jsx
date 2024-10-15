export function NoteImg({ note }) {
  return (
    <section className='note-img-container'>
      <div className='note-img-card'>
        <h3 className='note-img-title'>{note.info.title}</h3>
        <img className='note-img-url' style={{ maxWidth: '250px', maxHeight: '250px' }} src={`${note.info.url}`} alt='' />
      </div>
    </section>
  )
}
