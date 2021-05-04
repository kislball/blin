import { Controller, GET } from 'fastify-decorators'
import BaseController from './BaseController'
import pkg from '../package.json'

@Controller('/instance')
export default class InstanceVersionController extends BaseController {
  @GET('/version')
  version() {
    // @ts-ignore
    return { version: pkg.version }
  }
}
