const { useState, useEffect } = React
const { useParams, useSearchParams, useNavigate } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'

export function MailCompose() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { mailId } = useParams()

  const [mail, setMail] = useState({
    to: '',
    subject: searchParams.get('subject') || '',
    body: searchParams.get('body') || '',
    from: 'user@appsus.com',
    isDraft: true,
    isRead: false,
    isStarred: false,
    isTrash: false,
    labels: [],
    readAt: null,
    removedAt: null,
    sentAt: null,
    createdAt: Date.now(),
  })

  const [isDraft, setIsDraft] = useState(false)
  const [isEditable, setIsEditable] = useState(true)
  const loggedinUser = mailService.getLoggedInUser()

  useEffect(() => {
    if (mailId) {
      mailService.get(mailId).then((loadedMail) => {
        if (loadedMail.isDraft) {
          setMail(loadedMail)
          setIsDraft(true)
        } else {
          setMail(loadedMail)
          setIsEditable(false)
        }
      })
    }
  }, [mailId])

  function handleChange(ev) {
    const { name, value } = ev.target
    setMail((prevMail) => ({ ...prevMail, [name]: value }))
  }

  function onSendMail() {
    if (!mail.to || !mail.subject || !mail.body) {
      alert('Please fill all fields before sending the mail.')
      return
    }

    const newMail = {
      ...mail,
      isDraft: false,
      sentAt: Date.now(),
    }

    mailService.send(newMail).then(() => {
      navigate('/mail')
    })
  }

  function onSaveDraft() {
    const draftMail = {
      ...mail,
      isDraft: true,
      createdAt: mail.createdAt || Date.now(),
    }

    mailService.saveDraft(draftMail).then(() => {
      navigate('/mail')
    })
  }

  return (
    <div className='compose-container'>
      <div className='compose-box'>
        <div className='compose-header'>
          {!isEditable ? (
            <button className='compose-close-btn' onClick={() => navigate('/mail')}>
              ✖
            </button>
          ) : (
            <button className='compose-close-btn' onClick={onSaveDraft}>
              ✖
            </button>
          )}
          {isEditable ? (
            <React.Fragment>New Message {isDraft && <span style={{ color: 'red' }}>(Draft)</span>}</React.Fragment>
          ) : (
            <React.Fragment>{mail.subject}</React.Fragment>
          )}
        </div>
        <div className='compose-content'>
          <div className='input-group'>
            <label>From:</label>
            <span>{isDraft ? loggedinUser.email : mail.from}</span>
          </div>
          <div className='input-group'>
            <label>To:</label>
            {!isEditable ? <span>{mail.to}</span> : <input type='text' name='to' value={mail.to} onChange={handleChange} />}
          </div>
          <div className='input-group'>
            <label>Subject:</label>
            {!isEditable ? <span>{mail.subject}</span> : <input type='text' name='subject' value={mail.subject} onChange={handleChange} />}
          </div>
          <div className='input-group'>
            {!isEditable ? <p>{mail.body}</p> : <textarea name='body' rows='5' value={mail.body} onChange={handleChange}></textarea>}
          </div>
          {!isEditable && (
            <div className='input-group'>
              <label>Sent At:</label>
              <span>{new Date(mail.sentAt).toLocaleString()}</span>
            </div>
          )}
        </div>
        {isEditable && (
          <div className='compose-footer'>
            <button className='compose-btn-send' onClick={onSendMail}>
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
