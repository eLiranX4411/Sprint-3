export function FilterButton({ isActive, onClick, label, count, icon }) {
  return (
    <button className={`filter-button ${isActive ? 'active' : ''}`} onClick={onClick}>
      <section className='filter-icon'>{icon}</section>
      <section className='filter-label'>{label}</section>
      <section className='filter-count'>{count}</section>
    </button>
  )
}
