import { Controller, GET, POST } from 'fastify-decorators'
import { FastifyReply, FastifyRequest } from 'fastify'
import BaseController from './BaseController'
import CommunityModel from '../model/CommunityModel'
import NotFoundError from '../lib/errors/NotFoundError'
import authorize from '../lib/authorize'
import UserModel from '../model/UserModel'
import AuthError from '../lib/errors/AuthError'
import ValidateError from '../lib/errors/ValidateError'

@Controller('/communities')
export default class CommunityController extends BaseController {
  @GET('/:id')
  async getCommunity(request: FastifyRequest) {
    // @ts-ignore
    const { id } = request.params
    const community = await BaseController.model.get<CommunityModel>('CommunityModel')!.get(id)
    if (community) {
      return community
    }
    throw new NotFoundError(`community with id ${id} doesn't exist`)
  }

  @POST('/')
  async createCommunity(request: FastifyRequest, reply: FastifyReply) {
    if (!request.headers.authorization) throw new AuthError()
    await authorize(request.headers.authorization, BaseController.model.get<UserModel>('UserModel')!)
    // @ts-ignore
    const { name, description } = request.body
    if (!name || !description) throw new ValidateError('name and/or description weren\'t provided')
    await BaseController.model.get<CommunityModel>('CommunityModel')!.create(name, description)
    reply.status(201).send({ success: true })
  }
}
