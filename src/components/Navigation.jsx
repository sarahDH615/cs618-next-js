import Link from 'next/link'
import PropTypes from 'prop-types'

// what will appear when a user is signed in
export function UserBar({ username }) {
  return (
    <form>
      <Link href='/create'>Create Post</Link> | Logged in as{' '}
      <strong>{username}</strong> <button>Logout</button>
    </form>
  )
}
// what will be appear when a user is not signed in
export function LoginSignupLinks() {
  return (
    <div>
      <Link href='/login'>Log In</Link> | <Link href='/signup'>Sign Up</Link>
    </div>
  )
}

export function Navigation({ username }) {
  return (
    <div>
      <Link href='/'>Home</Link>
      {username ? <UserBar username={username} /> : <LoginSignupLinks />}
    </div>
  )
}

UserBar.propTypes = {
  username: PropTypes.string.isRequired,
}
