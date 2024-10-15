import { searchIconSvg } from '../../../apps/note/cmps/SvgIcons.jsx'

const { useState, useEffect, useRef } = React

export function NotesFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    onSetFilterBy(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  function toggleDropdown() {
    setIsDropdownOpen((prevState) => !prevState)
  }

  function resetFilter() {
    setFilterByToEdit({ title: '', type: '' })
  }

  const { title } = filterByToEdit

  return (
    <section className='filter-by'>
      <div className='type-icon-filter'>
        <div className='type-filter'>
          <button className='type-btn' onClick={toggleDropdown}>
            <div>Filter By Type</div>
          </button>
        </div>

        {isDropdownOpen && (
          <ul className='custom-dropdown'>
            <li onClick={resetFilter}>Show All</li>
            <li onClick={() => handleChange({ target: { name: 'type', value: 'NoteTxt' } })}>Text</li>
            <li onClick={() => handleChange({ target: { name: 'type', value: 'NoteImg' } })}>Imgs</li>
            <li onClick={() => handleChange({ target: { name: 'type', value: 'NoteTodos' } })}>Todos</li>
            <li onClick={() => handleChange({ target: { name: 'type', value: 'NoteVideo' } })}>Videos</li>
          </ul>
        )}
      </div>

      <div className='search-filter'>
        <label>
          {searchIconSvg.searchIcon}
          <input onChange={handleChange} value={title} type='search' name='title' id='title' placeholder={`Search`} />
        </label>
      </div>
    </section>
  )
}
