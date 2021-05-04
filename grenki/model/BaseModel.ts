import mongo from 'mongodb'
import { nanoid } from 'nanoid'
import cfg from '../lib/cfg'

export default class BaseModel {
  connection: mongo.MongoClient

  constructor(connection: mongo.MongoClient) {
    this.connection = connection
  }

  col<T>(name: string) {
    return this.connection.db(cfg().mongoDatabase).collection<T>(name)
  }

  getId() {
    return nanoid(17)
  }
}
