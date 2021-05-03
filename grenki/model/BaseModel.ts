import mongo from "mongodb"
import { nanoid } from "nanoid"
import cfg from "../lib/cfg";
import CommentDTO from "../dto/CommentDTO";

export default class BaseModel {
  constructor(public connection: mongo.MongoClient) {}

  col<T>(name: string) {
    return this.connection.db(cfg().mongoDatabase).collection<T>(name)
  }

  getId() {
    return nanoid(17)
  }
}
