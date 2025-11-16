import { PostList } from '@/components/PostList'

export default function HomePage() {
  const posts = [
    {
      _id: '123',
      title: 'first post',
      author: { username: 'Aoife Ní hÚid' },
      contents: 'This is the first post.',
    },
    {
      _id: '456',
      title: 'second post',
      author: { username: 'M. Fein' },
      contents: 'This is the second post.',
    },
    {
      _id: '789',
      title: 'third post',
      author: { username: 'Ana S.' },
      contents: 'This is the third post.',
    },
  ]
  return <PostList posts={posts} />
}
