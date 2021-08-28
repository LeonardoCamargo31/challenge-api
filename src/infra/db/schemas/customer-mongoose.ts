import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 100,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  CPF: {
    type: String,
    maxlength: 11,
    required: true
  },
  RG: {
    type: String,
    maxlength: 8,
    required: true
  },
  facebook: {
    type: String,
    maxlength: 100
  },
  instagram: {
    type: String,
    maxlength: 100
  },
  twitter: {
    type: String,
    maxlength: 100
  },
  linkedin: {
    type: String,
    maxlength: 100
  },
  address: [{
    name: {
      type: String,
      maxlength: 100,
      required: true
    },
    street: {
      type: String,
      maxlength: 100,
      required: true
    },
    number: {
      type: String,
      maxlength: Number,
      required: true
    },
    neighborhood: {
      type: String,
      maxlength: 100,
      required: true
    },
    city: {
      type: String,
      maxlength: 100,
      required: true
    },
    state: {
      type: String,
      maxlength: 2,
      required: true
    }
  }],
  phone: [{
    name: {
      type: String,
      maxlength: 100,
      required: true
    },
    phone: {
      type: String,
      maxlength: 20,
      required: true
    }
  }]
})

const CustomerMongoose = mongoose.model('Customer', schema)

export { CustomerMongoose }
