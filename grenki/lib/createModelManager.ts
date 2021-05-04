import { MongoClient } from 'mongodb'
import ModelManager from '../model/ModelManager'
import CommentModel from '../model/CommentModel'
import PostModel from '../model/PostModel'
import UserModel from '../model/UserModel'
import logger from './logger'

export default async function createModelManager(mongoUri: string) {
  const l = logger('database')
  l.log(`Trying to connect to Mongo at ${mongoUri}...`)
  let connection: MongoClient

  try {
    connection = await MongoClient.connect(mongoUri, { useUnifiedTopology: true })
  } catch (e) {
    l.error(`Can't connect to Mongo! Err - ${e.name}: ${e.message}`)
    process.exit(-1)
  }

  l.success('Connected to Mongo!')
  return new ModelManager(connection!, [CommentModel, CommentModel, PostModel, UserModel])
}
