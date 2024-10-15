export function NoteTxt({ note }) {
  //   console.log('note:', note)

  return (
    <section className='note-txt-container'>
      <div className='note-txt-card'>
        <h3 className='note-txt-text'>{note.info.title}</h3>
        <h4 className='note-txt-text'>{note.info.txt}</h4>
      </div>
    </section>
  )
}
