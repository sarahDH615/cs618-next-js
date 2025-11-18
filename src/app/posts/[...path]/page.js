import { notFound } from 'next/navigation'
import { getPostById } from '@/data/posts'
import { initDatabase } from '@/db/init'
import { FullPost } from '@/components/FullPost'

export async function generateMetadata({ params }) {
  const [id] = params.path
  const post = await getPostById(id)
  if (!post) {
    notFound()
  }
  return {
    title: `${post.title} | Full-Stack Next.js Blog`,
    description: `Written by ${post.author.username}`,
  }
}

export default async function ViewPostPage({ params }) {
  await initDatabase()
  const [id] = params.path
  const post = await getPostById(id) // should this be ._id ?
  if (!post) {
    notFound()
  }
  return <FullPost {...post} />
}
