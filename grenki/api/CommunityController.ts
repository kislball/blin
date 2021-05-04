import BaseController from "./BaseController"
import { Controller, GET, POST } from "fastify-decorators"
import { FastifyReply, FastifyRequest } from "fastify"
import CommunityModel from "../model/CommunityModel"
import NotFoundError from "../lib/errors/NotFoundError"
import authorize from "../lib/authorize";
import UserModel from "../model/UserModel";
import AuthError from "../lib/errors/AuthError";
import ValidateError from "../lib/errors/ValidateError";

@Controller('/communities')
export default class CommunityController extends BaseController {
  @GET('/:id')
  async getCommunity(request: FastifyRequest, reply: FastifyReply) {
    // @ts-ignore
    const id = request.params.id
    const community = await BaseController.model.get<CommunityModel>('CommunityModel')!.get(id)
    if(community) {
      return community
    } else {
      throw new NotFoundError(`community with id ${id} doesn't exist`)
    }
  }

  @POST('/:id')
  async createCommunity(request: FastifyRequest, reply: FastifyReply) {
    if(!request.headers.authorization) throw new AuthError()
    await authorize(request.headers.authorization, BaseController.model.get<UserModel>('UserModel')!)
    // @ts-ignore
    const { name, description } = request.body
    if(!name || !description) throw new ValidateError('name and/or description weren\'t provided')
    await BaseController.model.get<CommunityModel>('CommunityModel')!.create(name, description)
  }
}
