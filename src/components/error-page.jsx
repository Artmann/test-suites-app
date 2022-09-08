import PropTypes from 'prop-types'

export function ErrorPage({ error }) {
  return (
    <div
      className='w-full h-screen flex justify-center items-center'
    >
      <div>
        { error }
      </div>
    </div>
  )
}

ErrorPage.propTypes = {
  error: PropTypes.string.isRequired
}
