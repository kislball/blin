import BaseModel from './BaseModel'
import CommentDTO from '../dto/CommentDTO'

export default class CommentModel extends BaseModel {
  getCollection() {
    return this.col<CommentDTO>('comments')
  }

  async create(
    content: string,
    author: string,
    post: string,
  ) {
    const id = this.getId()
    await this.getCollection().insertOne({
      content,
      author,
      post,
      id,
      date: new Date().toString(),
    })

    return { id }
  }

  async get(id: string) {
    return this.getCollection().findOne({ id })
  }

  async getAllOnPost(post: string) {
    return this.getCollection().find({ post }).toArray()
  }
}
