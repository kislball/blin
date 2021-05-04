import fryGrenki from './lib/fryGrenki'
import InstanceVersionController from './api/InstanceVersionController'
import cfg from './lib/cfg'
import UserController from './api/UserController'

fryGrenki(cfg().port ?? 9017, InstanceVersionController, UserController)
