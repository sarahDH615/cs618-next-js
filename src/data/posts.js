import 'server-only'
import { unstable_cache as cache } from 'next/cache'
import { Post } from '@/db/models'

export async function createPost(userId, { title, contents }) {
  const post = new Post({ author: userId, title, contents })
  return await post.save()
}
export const listAllPosts = cache(
  async function listAllPosts() {
    return await Post.find({})
      .sort({ createdAt: 'descending' })
      // populate is like a sql join - only returns username from the user object and places it in 'author'
      .populate('author', 'username')
      .lean() // turns post object in a serialisable js obj
  },
  ['posts', 'listAllPosts'], // file name, function name
  { tags: ['posts'] }, // revalidate when new posts are created
)

export const getPostById = cache(
  async function getPostById(postId) {
    return await Post.findById(postId).populate('author', 'username').lean()
  },
  ['posts', 'getPostById'], // file name, function name
)
