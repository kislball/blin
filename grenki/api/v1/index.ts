import { FastifyInstance } from 'fastify'
import pkg from '../../package.json'

export default async function v1(fastify: FastifyInstance) {
  fastify.get('/', async () => ({ api: 1, grenki: pkg.version }))
}
