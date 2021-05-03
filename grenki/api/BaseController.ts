import { Controller, ErrorHandler, GET } from "fastify-decorators"
import { FastifyReply, FastifyRequest } from "fastify"
import AuthError from "../lib/errors/AuthError"
import AlreadyExistsError from "../lib/errors/AlreadyExistsError"
import ValidateError from "../lib/errors/ValidateError";

@Controller()
export default class BaseController {
  @ErrorHandler(AuthError)
  unAuthorizedHandler(error: Error, request: FastifyRequest, reply: FastifyReply) {
    reply.status(401).send({
      code: 401,
      message: 'Unauthorized',
      details: error.message
    })
  }

  @ErrorHandler(AlreadyExistsError)
  conflictHandler(error: Error, request: FastifyRequest, reply: FastifyReply) {
    reply.status(409).send({
      code: 409,
      message: 'Conflict',
      details: error.message
    })
  }

  @ErrorHandler(ValidateError)
  validateErrorHandler(error: Error, request: FastifyRequest, reply: FastifyReply) {
    reply.status(400).send({
      code: 400,
      message: 'Bad request',
      details: error.message
    })
  }

  @ErrorHandler()
  errorHandler(error: Error, request: FastifyRequest, reply: FastifyReply) {
    reply.status(500).send({
      code: 500,
      message: 'Oopsie! We\'ve detected an internal error!',
      details: error.name
    })
  }
}
