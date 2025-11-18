import { redirect } from 'next/navigation'
import { createUser } from '@/data/users'
import { initDatabase } from '@/db/init'
import { Signup } from '@/components/Signup'

async function signupAction(prevState, formData) {
  'use server'
  try {
    await initDatabase()
    // extract the username and password from the submitted formData with .get()
    // lookup is by name of the input field
    await createUser({
      username: formData.get('username'),
      password: formData.get('password'),
    })
  } catch (err) {
    return { error: err.message }
  }
  redirect('/login')
}

export default function SigninPage() {
  return <Signup signupAction={signupAction} />
}
