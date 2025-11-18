import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { loginUser } from '@/data/users'
import { initDatabase } from '@/db/init'
import { Login } from '@/components/Login'

async function loginAction(prevState, formData) {
  'use server'
  let token // use 'let' to allow it to be updated in try
  // try to log in with the provided credentials
  try {
    await initDatabase()
    token = await loginUser({
      username: formData.get('username'),
      password: formData.get('password'),
    })
  } catch (err) {
    return { error: err.message }
  }
  // if no error, set token as a cookie
  // allows login to stay even with page refreshes
  cookies().set({
    name: 'AUTH_TOKEN',
    value: token,
    path: '/',
    maxAge: 60 * 60 * 24, // valid for 24 hours
    secure: true,
    httpOnly: true, // so that it cannot be read save by client js
  })
  redirect('/')
}

export default function LoginPage() {
  return <Login loginAction={loginAction} />
}
