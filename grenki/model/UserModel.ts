import argon2 from 'argon2'
import BaseModel from './BaseModel'
import UserDTO from '../dto/UserDTO'
import AlreadyExistsError from '../lib/errors/AlreadyExistsError'
import ValidateError from '../lib/errors/ValidateError'
import AuthError from '../lib/errors/AuthError'

export default class UserModel extends BaseModel {
  getCollection() {
    return this.col<UserDTO>('users')
  }

  async register(username: string, password: string) {
    if (/[^A-Za-z0-9_]/.test(username)) {
      throw new ValidateError('username cannot contain characters other than A-Z, a-z, underscores and numbers')
    }

    const exists = await this.exists(username)
    if (exists) throw new AlreadyExistsError('user with that username already exists')

    const hashed = await argon2.hash(password)

    await this.getCollection().insertOne({ username, password: hashed })

    return { id: username }
  }

  async get(username: string) {
    return this.getCollection().findOne({ username })
  }

  async checkCreds(username: string, password: string) {
    const exists = await this.exists(username)
    if (!exists) throw new AuthError('user doesn\'t exist')

    const dbUser = await this.get(username)
    const passCorrect = await argon2.verify(dbUser!.password, password)
    if (passCorrect) return true
    return false
  }

  async exists(username: string): Promise<boolean> {
    const r = await this.getCollection().findOne({ username })
    return !!r
  }
}
