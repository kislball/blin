import { FastifyInstance } from 'fastify'
import UserModel from "../../model/UserModel";
import NotFoundError from "../../lib/errors/NotFoundError";
import encodeCreds from "../../lib/base64/encodeCreds";
import ValidateError from "../../lib/errors/ValidateError";

export default async function v1Users(fastify: FastifyInstance) {
  fastify.get('/:id',async (req, res) => {
    const model = fastify.model
    // @ts-ignore
    const exists = await model.get<UserModel>('UserModel')!.exists(req.params.id)
    // @ts-ignore
    if(!exists) throw new NotFoundError(`user with id ${req.params.id} doesn't exist`)
    // @ts-ignore
    return { username: req.params.id.toLowerCase() }
  })

  fastify.get('/login', async (req, res) => {
    // @ts-ignore
    const { username, password } = req.query
    if(!username || !password) throw new ValidateError('username or password weren\'t provided')
    const valid = await fastify.model.get<UserModel>('UserModel')!.get(username)
    return { success: true, creds: encodeCreds(username, password) }
  })

  fastify.post('/', async (req, res) => {
    const model = fastify.model
    // @ts-ignore
    const { username, password } = req.body
    if(!username || !password) throw new ValidateError(`username or password weren't provided`)
    await model.get<UserModel>('UserModel')!.register(username, password)
    return { success: true, creds: encodeCreds(username, password) }
  })
}
