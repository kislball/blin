import { MongoClient } from "mongodb"
import BaseModel from "./BaseModel"

export default class ModelManager {
  models: Record<string, typeof BaseModel>

  constructor(public connection: MongoClient, models: Array<typeof BaseModel>) {
    const r: Record<string, typeof BaseModel> = {}
    for(const model of models) {
      r[model.name] = model
    }
    this.models = r
  }

  get<T extends BaseModel>(model: string): T | null {
    if(!this.models[model]) return null
    const Model = this.models[model] as unknown as T
    // @ts-ignore
    const instance = new Model(this.connection)
    return instance as T
  }
}
