import { FastifyInstance } from "fastify"
import error from "../../lib/error"

export default async function notFound(fastify: FastifyInstance) {
  fastify.setNotFoundHandler(async () => {
    return error(404, 'Not found')
  })
}
