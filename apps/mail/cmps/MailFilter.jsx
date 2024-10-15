const { useState, useEffect, useRef } = React
const { useParams } = ReactRouterDOM
import { utilService } from '../../../services/util.service.js'
import { Modal } from './Modal.jsx'

export function MailFilter({ onSetFilter }) {
  const { txt, isRead, isStarred, isTrash, startDate, endDate, labels } = useParams()
  const [filterBy, setFilterBy] = useState({
    txt: txt || '',
    from: '',
    to: '',
    subject: '',
    hasWords: '',
    doesntHave: '',
    dateWithin: '1 day',
    category: 'all',
    isRead: isRead || '',
    isStarred: isStarred || '',
    isTrash: isTrash || '',
    startDate: startDate || '1900-01-01',
    endDate: endDate || '2099-12-31',
    labels: labels ? labels.split(' ') : [],
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef(null)

  useEffect(() => {
    function handleOutsideClick(event) {
      if (isModalOpen && modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false)
      }
    }

    if (isModalOpen) {
      document.addEventListener('click', handleOutsideClick)
    } else {
      document.removeEventListener('click', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [isModalOpen])

  function handleChange({ target }) {
    const { name, value, type, checked } = target
    setFilterBy((prevFilter) => ({
      ...prevFilter,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    const truthyFilter = utilService.getTruthyValues(filterBy)
    onSetFilter(truthyFilter)
    setIsModalOpen(false)
  }

  function handleReset() {
    setFilterBy({
      txt: '',
      from: '',
      to: '',
      subject: '',
      hasWords: '',
      doesntHave: '',
      dateWithin: '1 day',
      category: 'all',
      isRead: '',
      isStarred: '',
      isTrash: '',
      startDate: '1900-01-01',
      endDate: '2099-12-31',
      labels: [],
    })
  }

  return (
    <div className='mail-filter-container'>
      <div className='simple-filter'>
        <span className='search-icon' onClick={handleSubmit}>
          🔍
        </span>
        <input type='text' name='txt' value={filterBy.txt} onChange={handleChange} placeholder='Search mail' />
        <button
          className='toggle-advanced-btn'
          onClick={(ev) => {
            ev.stopPropagation()
            setIsModalOpen(true)
          }}
        >
          ☰
        </button>
      </div>

      {isModalOpen && (
        <Modal>
          <div className='advanced-filter' ref={modalRef}>
            <form onSubmit={handleSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor='from'>From:</label>
                    </td>
                    <td>
                      <input type='text' id='from' name='from' value={filterBy.from} onChange={handleChange} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor='to'>To:</label>
                    </td>
                    <td>
                      <input type='text' id='to' name='to' value={filterBy.to} onChange={handleChange} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor='subject'>Subject:</label>
                    </td>
                    <td>
                      <input type='text' id='subject' name='subject' value={filterBy.subject} onChange={handleChange} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor='hasWords'>Has the words:</label>
                    </td>
                    <td>
                      <input type='text' id='hasWords' name='hasWords' value={filterBy.hasWords} onChange={handleChange} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor='doesntHave'>Doesn't have:</label>
                    </td>
                    <td>
                      <input type='text' id='doesntHave' name='doesntHave' value={filterBy.doesntHave} onChange={handleChange} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor='dateWithin'>Date within:</label>
                    </td>
                    <td>
                      <select id='dateWithin' name='dateWithin' value={filterBy.dateWithin} onChange={handleChange}>
                        <option value='1 day'>1 day</option>
                        <option value='7 days'>7 days</option>
                        <option value='30 days'>30 days</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor='category'>Search in:</label>
                    </td>
                    <td>
                      <select id='category' name='category' value={filterBy.category} onChange={handleChange}>
                        <option value='all'>All Mail</option>
                        <option value='inbox'>Inbox</option>
                        <option value='starred'>Starred</option>
                        <option value='sent'>Sent Mail</option>
                        <option value='drafts'>Drafts</option>
                        <option value='trash'>Trash</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className='buttons'>
                <button type='button' className='reset-btn' onClick={handleReset}>
                  Clear
                </button>
                <button type='submit' className='search-btn'>
                  Search
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  )
}
