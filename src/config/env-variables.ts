import env from 'dotenv-safe'
import path from 'path'

env.config({
  path: path.join(__dirname, '../.env'),
  sample: path.join(__dirname, '../.env.example')
})

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI
}
