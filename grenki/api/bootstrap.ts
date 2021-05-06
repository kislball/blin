import { FastifyInstance } from 'fastify'
import v1 from './v1'

export default async function bootstrap(fastify: FastifyInstance) {
  fastify.register(v1, { prefix: '/v1' })
}
