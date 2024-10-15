const { useState } = React

export function LongTxt({ txt, length = 100 }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <span>
      {isExpanded ? txt : txt.substring(0, length) + (txt.length > length ? '...' : '')}
      {txt.length > length && <button onClick={toggleExpand}>{isExpanded ? 'Read Less' : 'Read More'}</button>}
    </span>
  )
}
