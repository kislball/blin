import { MongoClient } from "mongodb"
import ModelManager from "../model/ModelManager"
import CommentModel from "../model/CommentModel"
import PostModel from "../model/PostModel"
import UserModel from "../model/UserModel"

export default async function createModelManager(mongoUri: string) {
  const connection = await MongoClient.connect(mongoUri)
  return new ModelManager(connection, [ CommentModel, CommentModel, PostModel, UserModel ])
}
