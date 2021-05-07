import { FastifyInstance } from "fastify"

export default async function v1Users(fastify: FastifyInstance) {
  fastify.get('/:id', async (req, res) => {

  })
}
