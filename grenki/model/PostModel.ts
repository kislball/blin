import BaseModel from './BaseModel'
import PostDTO from '../dto/PostDTO'

export default class PostModel extends BaseModel {
  getCollection() {
    return this.col<PostDTO>('posts')
  }

  async create(
    title: string,
    content: string,
    author: string,
    community: string,
  ) {
    const id = this.getId()

    await this.getCollection().insertOne({
      title,
      community,
      content,
      id,
      author,
      date: new Date().toString(),
    })

    return { id }
  }

  async get(id: string) {
    return this.getCollection().findOne({ id })
  }

  async exists(id: string) {
    const r = await this.get(id)
    return !!r
  }
}
