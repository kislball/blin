import { Controller, ErrorHandler, GET } from "fastify-decorators"
import { FastifyReply, FastifyRequest } from "fastify"

class NoAccess extends Error {}

@Controller()
export default class BaseController {
  @GET('/easteregg')
  getEasterEgg() {
    throw new NoAccess('no access to easter egg sry')
    return 'abcde'
  }

  @ErrorHandler(NoAccess)
  noAccessHandler(error: Error, request: FastifyRequest, reply: FastifyReply) {
    reply.status(403).send({
      code: 403,
      message: 'No access',
      details: error.message
    })
  }

  @ErrorHandler()
  errorHandler(error: Error, request: FastifyRequest, reply: FastifyReply) {
    reply.status(500).send({
      code: 500,
      message: 'Oopsie! We\'ve detected an internal error! '
    })
  }
}
