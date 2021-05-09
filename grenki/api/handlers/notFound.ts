import { FastifyInstance } from 'fastify'
import error from '../../lib/error'

export default async function notFound(fastify: FastifyInstance) {
  fastify.setNotFoundHandler(async () => error(404, 'Route not found'))
}
