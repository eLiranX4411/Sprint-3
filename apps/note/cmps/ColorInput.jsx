export function ColorInput({ onColorSelect }) {
  const colors = ['#ffffff', '#f8bbd0', '#feefc3', '#ff6e30', '#ffccbc', '#b2dfdb']

  return (
    <section className='color-input'>
      <div className='color-container'>
        {colors.map((color) => (
          <div
            key={color}
            className='color-item'
            style={{ backgroundColor: color }}
            onClick={() => onColorSelect(color)}
          ></div>
        ))}
      </div>
    </section>
  )
}
