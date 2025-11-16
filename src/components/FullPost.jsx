import PropTypes from 'prop-types'

export function FullPost({ title, contents, author }) {
  return (
    <article>
      <h3>{title}</h3>
      <div>{contents}</div>
      <br />
      <em>
        Written by <strong>{author.username}</strong>
      </em>
    </article>
  )
}

FullPost.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
}
