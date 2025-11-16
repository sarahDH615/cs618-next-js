import { FullPost } from '@/components/FullPost'

export default function ViewPostPage({ params }) {
  const post = {
    title: `Sample post (${params.id})`,
    contents: 'Sample post',
    author: { username: 'Sorcha Ní hÚid' },
  }
  return <FullPost {...post} />
  // return <FullPost {...params} />
}
