import ModelManager from "./model/ModelManager"

declare global {
  namespace NodeJS {
    interface Global {
      model: ModelManager
    }
  }
}
