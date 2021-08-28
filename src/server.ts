import { makeApp } from './main/factory'
import { MongoHelper } from './infra/db/mongo-helper'

const app = makeApp()
const express = app.express
const PORT = app.port.toString()
const ENV = app.env
const MONGO_URL = app.mongoUrl

MongoHelper.connect(MONGO_URL)
  .then(() => console.log('connected'))
  .catch(console.error)

const server = express.listen(PORT, () => {
  console.log(
    `Application is running at port ${PORT} in ${ENV} mode`
  )
})

export default server
