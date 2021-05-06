import fastify from 'fastify'
import os from 'os'
import fastifyHelmet from 'fastify-helmet'
import fastifyCors from 'fastify-cors'
import pkg from '../package.json'
import logger from './logger'
import createModelManager from './createModelManager'
import cfg from './cfg'
import bootstrap from '../api/bootstrap'

/**
 * Create the application
 * @param port - port to run application on
 */
export default async function fryGrenki(port = 9017) {
  const start = new Date()

  const l = logger('frying pan')
  l.log(`Frying Grenki v${pkg.version}`)
  const app = fastify()

  process.on('exit', () => {
    l.log('Exiting...')
  })

  app.register(bootstrap)
  app.register(fastifyHelmet, {})
  app.register(fastifyCors, { origin: '*' })

  app.ready(() => {
    l.success('Grenki webserver is up and running!')
  })

  await app.listen(port)

  if (!cfg().mongoConnectUrl || !cfg().mongoDatabase) {
    l.error('Incorrect configuration provided, cannot connect to Mongo.')
    process.exit(-1)
  }

  const modelManager = await createModelManager(cfg().mongoConnectUrl!)

  l.log('Useful information:')
  l.log(`\tVersion - ${pkg.version}`)
  l.log(`\tNodeJS version - ${process.version}`)
  l.log(`\tOS - ${os.platform()}`)
  l.log(`\tArchitecture - ${os.arch()}`)
  l.log(`\tPort - ${port}`)

  l.success(`Grenki is ready to go! Took ${new Date().getTime() - start.getTime()}ms to fry them`)

  return app
}
