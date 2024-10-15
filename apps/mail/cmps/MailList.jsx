import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails, onStarMail, onRemoveMail, onToggleRead, onOpenMail, onCreateNote }) {
  return (
    <div>
      {mails.map((mail) => (
        <MailPreview
          key={mail.id}
          mail={mail}
          onToggleStar={onStarMail}
          onDeleteMail={onRemoveMail}
          onToggleRead={onToggleRead}
          onOpenMail={onOpenMail}
          onCreateNote={onCreateNote}
        />
      ))}
    </div>
  )
}
