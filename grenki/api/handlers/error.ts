import { FastifyInstance } from "fastify"
import AlreadyExistsError from "../../lib/errors/AlreadyExistsError"
import error from "../../lib/error"
import AuthError from "../../lib/errors/AuthError"
import NotFoundError from "../../lib/errors/NotFoundError"
import ValidateError from "../../lib/errors/ValidateError"

export default async function errorHandler(fastify: FastifyInstance) {
  fastify.setErrorHandler((err, req, res) => {
    if(err instanceof AlreadyExistsError) {
      res.status(409).send(error(409, 'Already exists', err.message))
    } else if(err instanceof AuthError) {
      res.status(401).send(error(409, 'Auth error', err.message))
    } else if(err instanceof NotFoundError) {
      res.status(404).send(error(404, 'Not found', err.message))
    } else if(err instanceof ValidateError || err.validation) {
      res.status(400).send(error(400, 'Bad request', err.message))
    } else {
      res.status(500).send(error(500, 'Internal server error', 'Oopsie! Looks like' +
        'we are having some issues. Report it on /b/meta pls'))
    }
  })
}
