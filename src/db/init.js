import 'server-only'
import mongoose from 'mongoose'

// initialise the db
export async function initDatabase() {
  const connection = await mongoose.connect(process.env.DATABASE_URL)
  return connection
}