import fastify from "fastify"
import { bootstrap } from "fastify-decorators"
import logger from "./logger"
import pkg from "../package.json"
import os from "os"
import fastifyHelmet from "fastify-helmet"
import fastifyCors from "fastify-cors"
import createModelManager from "./createModelManager"
import cfg from "./cfg"
import BaseController from "../api/BaseController";

/**
 * Create the application
 * @param port - port to run application on
 */
export default async function fryGrenki(port = 9017, ...controllers: any[]) {
  const l = logger("frying pan")
  l.log(`Frying Grenki v${pkg.version}`)
  const app = fastify()

  process.on('exit', () => {
    l.log('Exiting...')
  })

  app.register(bootstrap, {
    controllers
  })
  app.register(fastifyHelmet, {})
  app.register(fastifyCors, { origin: '*' })

  app.ready(() => {
    l.success('Grenki webserver is up and running!')
  })

  await app.listen(port)

  if(!cfg().mongoConnectUrl || !cfg().mongoDatabase) {
    l.error('Incorrect configuration provided, cannot connect to Mongo.')
    process.exit(-1)
  }

  const modelManager = await createModelManager(cfg().mongoConnectUrl!)
  BaseController.model = modelManager

  l.log('Useful information:')
  l.log(`\tVersion - ${pkg.version}`)
  l.log(`\tNodeJS version - ${process.version}`)
  l.log(`\tOS - ${os.platform()}`)
  l.log(`\tArchitecture - ${os.arch()}`)
  l.log(`\tPort - ${port}`)

  return app
}
