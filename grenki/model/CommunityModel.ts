import BaseModel from './BaseModel'
import ValidateError from '../lib/errors/ValidateError'
import CommunityDTO from '../dto/CommunityDTO'
import AlreadyExistsError from '../lib/errors/AlreadyExistsError'

export default class CommunityModel extends BaseModel {
  getCollection() {
    return this.col<CommunityDTO>('communities')
  }

  async create(name: string, description: string) {
    if (/[^A-Za-z0-9_]/.test(name)) {
      throw new ValidateError('name cannot contain characters other than A-Z, a-z, underscores and numbers')
    }

    const col = this.getCollection()
    const found = await col.findOne({ name })
    if (found) throw new AlreadyExistsError('community with that name already exists')

    await col.insertOne({ name, description })
  }

  async get(name: string): Promise<CommunityDTO | null> {
    return this.getCollection().findOne({ name })
  }

  async exists(name: string): Promise<boolean> {
    const r = await this.get(name)
    return !!r
  }
}
