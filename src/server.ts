import { makeApp } from './main/factory'
import { MongoHelper } from './infra/db/mongo-helper'

const PORT = 3000
const app = makeApp().app

MongoHelper.connect(process.env.MONGO_URL)
  .then(() => console.log('connected'))
  .catch(console.error)

const serverLocal = app.listen(PORT, () => {
  console.log(
    '  Application is running at http://localhost:%d in %s mode',
    PORT,
    app.get('env')
  )
})

export default serverLocal
