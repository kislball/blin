import fryGrenki from "./lib/fryGrenki"
import InstanceVersionController from "./api/InstanceVersionController"
import cfg from "./lib/cfg"

fryGrenki(cfg().port, InstanceVersionController)
