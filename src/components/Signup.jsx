'use client'
import { useFormState } from 'react-dom'
import PropTypes from 'prop-types'

export function Signup({ signupAction }) {
  const [state, formAction] = useFormState(signupAction, {})

  return (
    <form action={formAction}>
      <div>
        <label htmlFor='username'>Username: </label>
        <input text='text' name='username' id='username' />
      </div>
      <br />
      <div>
        <label htmlFor='password'>Password: </label>
        <input text='text' name='password' id='password' />
      </div>
      <br />
      <input type='submit' value='Sign Up' />
      {/* show an error if server response is an error */}
      {state.error ? <strong> Error signing up: {state.error}</strong> : null}
    </form>
  )
}

Signup.propTypes = {
  signupAction: PropTypes.func.isRequired,
}
