import {FastifyInstance} from "fastify";
import CommunityModel from "../../model/CommunityModel";
import NotFoundError from "../../lib/errors/NotFoundError";
import AuthError from "../../lib/errors/AuthError";
import authorize from "../../lib/authorize";
import UserModel from "../../model/UserModel";
import ValidateError from "../../lib/errors/ValidateError";
import PostModel from "../../model/PostModel";
import canCreatePostCheck from "../../checks/canCreatePostCheck";
import decodeCreds from "../../lib/base64/decodeCreds";

export default async function v1Communities(fastify: FastifyInstance) {
  fastify.get('/:id', async (req, res) => {
    // @ts-ignore
    const id = req.params.id
    const community = fastify.model.get<CommunityModel>('CommunityModel')
    const exists = await community!.exists(id)
    if(!exists) throw new NotFoundError(`community with id ${id} not found`)
    return community!.get(id)
  })

  fastify.post('/', async (req, res) => {
    // @ts-ignore
    const id = req.params.id
    if(!req.headers.authorization) throw new AuthError(`authorization header was not provided`)
    await authorize(req.headers.authorization as string, fastify.model.get<UserModel>('UserModel')!)
    // @ts-ignore
    const { name, description } = req.body
    if(!name || !description) throw new ValidateError(`name or description weren't provided`)
    await fastify.model.get<CommunityModel>('CommunityModel')!.create(name, description)
    return { success: true, id }
  })

  fastify.get('/:id/posts', async (req, res) => {
    // @ts-ignore
    const id = req.params.id
    const exists = await fastify.model.get<CommunityModel>('CommunityModel')!.exists(id)
    if(!exists) throw new NotFoundError(`community with id ${id} not found`)
    return fastify.model.get<PostModel>('PostModel')!.getAllOnCommunity(id)
  })

  fastify.post('/:id/posts', async (req, res) => {
    // @ts-ignore
    const id = req.params.id
    if(!req.headers.authorization) throw new AuthError(`authorization header was not provided`)
    await authorize(req.headers.authorization as string, fastify.model.get<UserModel>('UserModel')!)
    const exists = await fastify.model.get<CommunityModel>('CommunityModel')!.exists(id)
    if(!exists) throw new NotFoundError(`community with id ${id} not found`)
    // @ts-ignore
    const { title, content } = req.body
    if(!title || !content) throw new ValidateError(`title or content fields weren't provided`)
    const user = decodeCreds(req.headers.authorization.split(' ')[1])
    await fastify.model.get<PostModel>('PostModel')!.create(title, content, user.username, id)
    return { success: true }
  })
}
