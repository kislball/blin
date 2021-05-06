import fryGrenki from './lib/fryGrenki'
import cfg from './lib/cfg'

fryGrenki(cfg().port ?? 9017)
