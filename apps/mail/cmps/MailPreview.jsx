const { useState } = React
import { LongTxt } from '../../../cmps/LongTxt.jsx'
import { utilService } from '../../../services/util.service.js'

export function MailPreview({ mail, onOpenMail, onToggleStar, onToggleRead, onDeleteMail, onCreateNote }) {
  const [isHovered, setIsHovered] = useState(false)

  if (!mail) return null

  function handleMailClick() {
    onOpenMail(mail.id)
  }

  function handleStarClick(ev) {
    ev.stopPropagation()
    onToggleStar(mail.id)
  }

  function handleReadClick(ev) {
    ev.stopPropagation()
    onToggleRead(mail.id)
  }

  function handleDeleteClick(ev) {
    ev.stopPropagation()
    onDeleteMail(mail.id)
  }

  function handleCreateNoteClick(ev) {
    ev.stopPropagation()
    onCreateNote(mail.id)
  }

  return (
    <div
      className={`mail-preview ${mail.isRead ? 'read' : 'unread'}`}
      onClick={handleMailClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <section className='mail-star' onClick={handleStarClick}>
        {mail.isStarred ? '★' : '☆'}
      </section>

      <section className='mail-from-to'>
        {mail.isDraft ? <span className='draft-text'>Draft</span> : mail.from === 'user@appsus.com' ? `To: ${mail.to}` : `From: ${mail.from}`}
      </section>

      <section className='mail-subject'>
        <LongTxt txt={mail.subject} length={30} onlyShort={true} />
      </section>

      <section className='mail-body'>
        <LongTxt txt={mail.body} length={50} onlyShort={true} />
      </section>

      <section className='mail-date-controls'>
        {!isHovered ? (
          <span>{utilService.displayDateOrTime(mail.createdAt)}</span>
        ) : (
          <div className='mail-controls'>
            <button className='mail-toggle-read' onClick={handleReadClick}>
              {mail.isRead ? '✉️' : '📭'}
            </button>
            <button className='mail-delete' onClick={handleDeleteClick}>
              🗑️
            </button>
            <button className='mail-delete' onClick={handleCreateNoteClick}>
              📝
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
