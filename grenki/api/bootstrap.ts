import { FastifyInstance } from 'fastify'
import v1 from './v1'
import errorHandler from './handlers/error'
import notFound from './handlers/notFound'

export default async function bootstrap(fastify: FastifyInstance) {
  fastify.register(errorHandler)
  fastify.register(notFound)
  fastify.register(v1, { prefix: '/v1' })
}
