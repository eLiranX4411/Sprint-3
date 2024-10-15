const { Link } = ReactRouterDOM

export function ErrorPage() {
  return (
    <section className='error-page'>
      <h1>Oops! Page not found</h1>
      <p>We're sorry, but the page you're looking for doesn't exist.</p>
      <Link to='/'>Go Back</Link>
    </section>
  )
}
