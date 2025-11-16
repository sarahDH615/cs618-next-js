import { Navigation } from '@/components/Navigation'

export const metadata = {
  title: 'Full stack Next.js blog',
  description: 'Test blog for cs 618',
}

export default function RootLayout({ children }) {
  const user = { username: 'dan' }
  return (
    <html lang='en'>
      <body>
        <nav>
          <Navigation username={user?.username} />
        </nav>
        <br />
        <main>{children}</main>
      </body>
    </html>
  )
}
