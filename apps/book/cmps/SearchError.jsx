const { useNavigate } = ReactRouterDOM

export function SearchError() {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className='error-container'>
      <h2>No Books Found</h2>
      <p>Sorry, we couldn't find any books matching your search criteria.</p>
      <button onClick={handleGoBack}>Go Back</button>
    </div>
  )
}
