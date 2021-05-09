import { Server, IncomingMessage, ServerResponse } from "http"
import ModelManager from "../../model/ModelManager"

declare module 'fastify' {
  export interface FastifyInstance<
    HttpServer = Server,
    HttpRequest = IncomingMessage,
    HttpResponse = ServerResponse,
    > {
    model: ModelManager
  }
}
