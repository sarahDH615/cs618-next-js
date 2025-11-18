import 'server-only'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { unstable_cache as cache } from 'next/cache'
import { User } from '@/db/models'

export async function createUser({ username, password }) {
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = new User({ username, password: hashedPassword })
  return await user.save()
}

export async function loginUser({ username, password }) {
  const user = await User.findOne({ username })
  if (!user) {
    throw new Error('invalid username!')
  }
  // use bcrypt to compare the provided password against the hashed password from the database
  // throw an error if the password is invalid
  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) {
    throw new Error('invalid password!')
  }
  // generate, sign, and return a JWT
  const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  })
  return token
}

export const getUserInfoById = cache(
  async function getUserInfoById(userId) {
    const user = await User.findById(userId)
    if (!user) {
      throw new Error('user not found!')
    }
    // only return the user name to prevent other secret info leaking
    return { username: user.username }
  },
  ['users', 'getUserInfoById'], // file name, function name
)

export function getUserIdByToken(token) {
  if (!token) {
    return null
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
  return decodedToken.sub
}

export async function getUserInfoByToken(token) {
  const userId = getUserIdByToken(token)
  if (!userId) {
    return null
  }
  const user = await getUserInfoById(userId)
  return user
}
