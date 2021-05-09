import { FastifyInstance } from 'fastify'
import pkg from '../../package.json'
import v1Users from "./users"

export default async function v1(fastify: FastifyInstance) {
  fastify.get('/', async () => ({ api: 1, grenki: pkg.version }))
  fastify.register(v1Users, { prefix: '/users' })
}
