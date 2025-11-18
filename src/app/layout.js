import { cookies } from 'next/headers'
import { Playfair } from 'next/font/google'
import Image from 'next/image'
import logo from './logo.png'
import { getUserInfoByToken } from '@/data/users'
import { Navigation } from '@/components/Navigation'

const playfair = Playfair({
  subsets: ['latin'],
  weight: '300',
  display: 'swap',
})

export const metadata = {
  title: 'Full stack Next.js blog',
  description: 'Test blog for cs 618',
}

async function logoutAction() {
  'use server'
  // delete the auth token to log user out
  cookies().delete('AUTH_TOKEN')
}

export default async function RootLayout({ children }) {
  const token = cookies().get('AUTH_TOKEN')
  const user = await getUserInfoByToken(token?.value)
  return (
    <html lang='en' className={playfair.className}>
      <body>
        <Image
          src={logo}
          alt='Full-Stack Next.js Blog Logo'
          width={40}
          height={47}
        />
        <nav>
          <Navigation username={user?.username} logoutAction={logoutAction} />
        </nav>
        <br />
        <main>{children}</main>
      </body>
    </html>
  )
}
