export function Login() {
  return (
    <form>
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
      <input type='submit' value='Log In' />
    </form>
  )
}
