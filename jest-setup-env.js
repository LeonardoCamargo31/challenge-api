const env = require('dotenv-safe')
const path = require('path')

env.config({
  path: path.join(__dirname, './.env'),
  sample: path.join(__dirname, './.env.example')
})

process.env.PORT = 3000
