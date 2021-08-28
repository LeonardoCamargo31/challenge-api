import mongoose, { Connection, Model } from 'mongoose'

;[
  'connecting',
  'connected',
  'open',
  'disconnecting',
  'disconnected',
  'close',
  'reconnected',
  'error',
  'fullsetup',
  'all'
].forEach((event) => {
  mongoose.connection.on(event, () => {
    console.log(`Mongoose event ${event}`)
  })
})

export const MongoHelper = {
  uri: null as string,

  async connect (uri?: string): Promise<typeof mongoose> {
    this.uri = uri || process.env.MONGO_URL
    return await mongoose.connect(this.uri, {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async getClient (): Promise<Connection> {
    return mongoose.connection
  },

  getClientAsync (): Connection {
    return mongoose.connection
  },

  async disconnect (): Promise<void> {
    await mongoose.connection.close()
  },

  isConnected (): boolean {
    return mongoose.connection.readyState === 1
  },

  getModel (name: string): Model<any> {
    return mongoose.connection.model(name)
  }
}
