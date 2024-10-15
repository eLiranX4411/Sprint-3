export function Chart({ data }) {
  const dataArray = Object.keys(data).map((key) => ({
    title: key,
    value: data[key],
  }))

  return (
    <div className='chart-container'>
      <ul className='chart'>
        {dataArray.map((item, index) => (
          <li key={item.title}>
            <span
              title={item.title}
              style={{
                height: item.value * 10 + '%',
                backgroundColor: `hsl(${index * 40}, 70%, 60%)`,
              }}
            >
              {item.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
