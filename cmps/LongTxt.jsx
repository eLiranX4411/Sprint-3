const { useState } = React

export function LongTxt({ txt, length = 100, onlyShort = false }) {
  const [isExpanded, setIsExpanded] = useState(false)

  function getDisplayText() {
    if (!txt) return ''

    if (isExpanded || txt.length <= length) {
      return txt
    } else {
      return txt.substring(0, length) + '...'
    }
  }

  function onToggleExpansion() {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded)
  }

  return (
    <section className='long-text'>
      <p>
        {getDisplayText()}
        {!onlyShort && txt && txt.length > length && (
          <button onClick={onToggleExpansion} className='toggle-btn'>
            {isExpanded ? 'Less...' : 'More...'}
          </button>
        )}
      </p>
    </section>
  )
}
