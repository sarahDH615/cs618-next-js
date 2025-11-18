import { initDatabase } from '@/db/init'
import { listAllPosts } from '@/data/posts'

export const dynamic = 'force-dynamic' // force it to render dynamically

// script to prove api routes can still work within a next app
export async function GET() {
  // load database
  await initDatabase()
  const posts = await listAllPosts()
  return Response.json({ posts, currentTime: Date.now() })
}
