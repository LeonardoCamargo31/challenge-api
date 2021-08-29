import env from 'dotenv-safe'
import path from 'path'

env.config({
  path: path.resolve('.env'),
  sample: path.resolve('.env.example')
})

const NODE_ENV = process.env.NODE_ENV
const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL

export {
  NODE_ENV,
  PORT,
  MONGO_URL
}
