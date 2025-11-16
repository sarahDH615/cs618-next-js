import { Fragment } from 'react/jsx-runtime'
import PropTypes from 'prop-types'
import { Post } from './Post.jsx'

export function PostList({ posts = [] }) {
  return (
    <div>
      {posts.map((post) => (
        <Fragment key={`post-${post._id}`}>
          <Post {...post} />
          <hr />
        </Fragment>
      ))}
    </div>
  )
}
PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape(Post.propTypes).isRequired),
}
