import { Controller, GET, POST } from "fastify-decorators"
import { FastifyReply, FastifyRequest } from "fastify"
import UserModel from "../model/UserModel"
import BaseController from "./BaseController"
import ValidateError from "../lib/errors/ValidateError"
import AuthError from "../lib/errors/AuthError"

@Controller('/users')
export default class UserController extends BaseController {
  @GET('/login')
  async login(request: FastifyRequest, reply: FastifyReply) {
    // @ts-ignore
    const { username, password } = request.query
    if(!username || !password) throw new ValidateError('no creds were provided')
    const validated = await BaseController.model.get<UserModel>('UserModel')!.checkCreds(username, password)
    if(validated) {
      reply.status(200)
      return { success: true }
    } else {
      throw new AuthError()
    }
  }

  @GET('/:id')
  async userExists(request: FastifyRequest, reply: FastifyReply) {
    // @ts-ignore
    const usr = request.params.id
    const exists = await BaseController.model.get<UserModel>('UserModel')!.exists(usr)
    return exists ? { username: usr } : null
  }

  @POST('/')
  async registerUser(request: FastifyRequest, reply: FastifyReply) {
    // @ts-ignore
    const { username, password } = request.body
    if(!username || !password) throw new ValidateError('no creds were provided')
    await BaseController.model.get<UserModel>('UserModel')!.register(username, password)
    reply.status(204)
  }
}
