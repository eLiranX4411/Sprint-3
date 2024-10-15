import { FilterButton } from './FilterButton.jsx'

export function MailFolderList({ activeFilter, setActiveFilter, mailCounts, onComposeClick }) {
  const folderOptions = [
    { label: 'Received Mails', filter: 'received', icon: '📥' },
    { label: 'Starred Mails', filter: 'starred', icon: '⭐' },
    { label: 'Sent Mails', filter: 'sent', icon: '📤' },
    { label: 'Draft Mails', filter: 'draft', icon: '📝' },
    { label: 'Trash Mails', filter: 'trash', icon: '🗑️' },
  ]

  return (
    <div className='mail-folder-list'>
      <button className='compose-btn' onClick={onComposeClick}>
        ✏️
        <span className='text'>Compose</span>
      </button>
      <div></div>
      <div className='filter-buttons'>
        {folderOptions.map((folder) => (
          <FilterButton
            key={folder.filter}
            isActive={activeFilter === folder.filter}
            onClick={() => setActiveFilter(folder.filter)}
            label={folder.label}
            count={mailCounts[folder.filter] || 0}
            icon={folder.icon}
          />
        ))}
      </div>
    </div>
  )
}
