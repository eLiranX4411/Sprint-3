const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM
import { mailService } from '../../../apps/mail/services/mail.service.js'
import { mailLoaderService } from '../../../apps/mail/services/mailLoaderService.js'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { icons } from '../cmps/SvgIcons.jsx'
import { createMailNote } from '../../../apps/note/services/note.service.js'

export function MailIndex() {
  const [mails, setMails] = useState([])
  const [activeFilter, setActiveFilter] = useState('received')
  const [filterBy, setFilterBy] = useState({})
  const [loading, setLoading] = useState(true)
  const [mailCounts, setMailCounts] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    loadInitialData()
  }, [])

  useEffect(() => {
    setLoading(true)
    loadMails()
  }, [activeFilter])

  useEffect(() => {
    updateMailCounts()
  }, [mails])

  function loadInitialData() {
    console.log('Loading initial data...')
    mailLoaderService
      .loadInitialMails()
      .then(() => {
        console.log('Initial data loaded.')
        loadMails()
        updateMailCounts()
      })
      .catch((err) => {
        console.log('Error loading initial mails:', err)
        setLoading(false)
      })
  }

  function loadMails(filter = activeFilter) {
    console.log(`Loading mails with filter: ${filter}`)
    const filterMethodMap = {
      all: 'query',
      sent: 'getSentMails',
      received: 'getReceivedMails',
      unread: 'getUnreadMails',
      readed: 'getReadedMails',
      starred: 'getStarredMails',
      draft: 'getDraftMails',
      trash: 'getTrashMails',
    }

    if (filter === 'custom') {
      console.log('Applying custom filter:', filterBy)
      mailService.queryByFilter(filterBy).then((filteredMails) => {
        console.log('Filtered mails:', filteredMails)
        setMails(filteredMails)
        setLoading(false)
      })
    } else {
      mailService[filterMethodMap[filter]]()
        .then((mails) => {
          console.log(`Loaded ${mails.length} mails with filter: ${filter}`)
          console.log('Mails:', mails)
          setMails(mails)
          setLoading(false)
        })
        .catch((err) => {
          console.log('Error loading mails:', err)
          setLoading(false)
        })
    }
  }

  function updateMailCounts() {
    console.log('Updating mail counts...')
    const filterMethodMap = {
      sent: 'getSentMails',
      received: 'getReceivedMails',
      starred: 'getStarredMails',
      draft: 'getDraftMails',
      trash: 'getTrashMails',
    }

    const mailTypes = ['sent', 'received', 'starred', 'draft', 'trash']
    const countsPromises = mailTypes.map((type) =>
      mailService[filterMethodMap[type]]().then(
        (mails) => mails.filter((mail) => !mail.isRead).length // סופר רק מיילים שלא נקראו
      )
    )

    Promise.all(countsPromises)
      .then((results) => {
        const newCounts = results.reduce((acc, unreadCount, idx) => {
          acc[mailTypes[idx]] = unreadCount
          return acc
        }, {})
        console.log('Unread mail counts updated:', newCounts)
        setMailCounts(newCounts)
      })
      .catch((err) => console.log('Error updating mail counts:', err))
  }

  function handleStarMail(mailId) {
    console.log(`Toggling star for mail ID: ${mailId}`)
    mailService.updateStarStatus(mailId).then(() => {
      console.log(`Mail ID: ${mailId} star status updated.`)
      loadMails()
      updateMailCounts()
    })
  }

  function handleRemoveMail(mailId) {
    console.log(`Moving mail ID: ${mailId} to trash`)
    mailService.moveToTrash(mailId).then(() => {
      console.log(`Mail ID: ${mailId} moved to trash.`)
      loadMails()
      updateMailCounts()
    })
  }

  function handleToggleReadStatus(mailId) {
    console.log(`Toggling read status for mail ID: ${mailId}`)
    mailService.toggleReadStatus(mailId).then(() => {
      console.log(`Mail ID: ${mailId} read status updated.`)
      loadMails()
      updateMailCounts()
    })
  }

  function handleOpenMail(mailId) {
    mailService.get(mailId).then((mail) => {
      console.log(mail)

      if (!mail.isRead) {
        mailService.updateReadStatus(mailId, true).then(() => {
          console.log(`Mail ID: ${mailId} marked as read.`)
        })
      }

      if (mail.isDraft) {
        navigate(`/mail/edit/${mailId}`)
      } else {
        navigate(`/mail/details/${mailId}`)
      }
    })
  }

  function handleComposeClick() {
    navigate('/mail/edit')
  }

  function handleSetFilter(newFilter) {
    console.log('Setting new filter:', newFilter)
    setFilterBy(newFilter)
    setActiveFilter('custom')
    loadMails('custom')
  }

  function createNote(mailId) {
    mailService
      .get(mailId)
      .then((mail) => {
        if (mail) {
          console.log(`Creating note for mail ID: ${mailId}`)
          console.log(`Title: ${mail.subject}`)
          console.log(`Content: ${mail.body}`)

          createMailNote(mail.subject, mail.body)
            .then((noteId) => {
              console.log(`Note created successfully with ID: ${noteId}`)
              navigate(`/note/edit/${noteId}`)
            })
            .catch((err) => {
              console.error('Failed to create note:', err)
            })
        } else {
          console.log(`Mail with ID: ${mailId} not found.`)
        }
      })
      .catch((err) => {
        console.error(`Error fetching mail with ID: ${mailId}`, err)
      })
  }

  return (
    <div className='mail-index-container'>
      <section className='section-a'>
        <MailFilter onSetFilter={handleSetFilter} />
      </section>

      <section className='section-b'>
        <MailFolderList activeFilter={activeFilter} setActiveFilter={setActiveFilter} mailCounts={mailCounts} onComposeClick={handleComposeClick} />
        <MailList
          mails={mails}
          loading={loading}
          onStarMail={handleStarMail}
          onRemoveMail={handleRemoveMail}
          onToggleRead={handleToggleReadStatus}
          onOpenMail={handleOpenMail}
          onCreateNote={createNote}
        />
      </section>
    </div>
  )
}
