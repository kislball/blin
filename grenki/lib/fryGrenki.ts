import fastify from "fastify"
import { bootstrap } from "fastify-decorators"
import logger from "./logger"
import pkg from "../package.json"
import os from "os"

/**
 * Create the application
 * @param port - port to run application on
 */
export default async function fryGrenki(port = 9017, ...controllers: any[]) {
  const l = logger("frying pan")
  const app = fastify()

  app.register(bootstrap, {
    controllers
  })

  app.ready(() => {
    l.success('Grenki webserver is up and running!')
  })

  l.log(`Frying Grenki v${pkg.version}`)
  await app.listen(port)

  l.log('Useful information:')
  l.log(`\tVersion - ${pkg.version}`)
  l.log(`\tNodeJS version - ${process.version}`)
  l.log(`\tOS - ${os.platform()}`)
  l.log(`\tArchitecture - ${os.arch()}`)
  l.log(`\tPort - ${port}`)

  return app
}
