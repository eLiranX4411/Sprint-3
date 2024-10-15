export function NoteVideo({ note }) {
  return (
    <section className='note-video-container'>
      <div className='note-video-card'>
        <h3 className='note-video-title'>{note.info.title}</h3>
        <video width='250' height='250' controls>
          <source src={note.info.url} type='video/mp4' />
        </video>
      </div>
    </section>
  )
}
