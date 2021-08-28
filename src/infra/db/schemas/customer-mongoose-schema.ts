import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: String
})

const CustomerMongooseSchema = mongoose.model('Customer', schema)

export { CustomerMongooseSchema }
