import { expect } from '@jest/globals'
import { MongoHelper, MongoHelper as sut } from './mongo-helper'
import { CustomerMongoose } from '../db/schemas/customer-mongoose'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
    console.log(CustomerMongoose.name)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    let customerCollection = await sut.getModel('Customer')
    expect(customerCollection).toBeTruthy()
    await sut.disconnect()
    customerCollection = await sut.getModel('Customer')
    expect(customerCollection).toBeTruthy()
  })

  test('Should return a MongoClient instance', async () => {
    const client = await sut.getClient()
    expect(client).toBeTruthy()
  })

  test('Should connect and return a MongoClient instance', async () => {
    await MongoHelper.disconnect()
    const client = await sut.getClient()
    expect(client).toBeTruthy()
  })

  test('Should connect and return a MongoClient async instance', async () => {
    await MongoHelper.disconnect()
    const client = sut.getClientAsync()
    expect(client).toBeTruthy()
  })

  test('Should connect and return false when disconnected', async () => {
    await MongoHelper.disconnect()
    const isConnected = sut.isConnected()
    expect(isConnected).toBe(false)
  })

  test('Should connect and return true when connected', async () => {
    await sut.connect(process.env.MONGO_URL)
    const isConnected = sut.isConnected()
    expect(isConnected).toBe(true)
  })

  test('Should return a MongoClient instance with env variable', async () => {
    const client = await MongoHelper.connect()
    expect(client).toBeTruthy()
  })
})
