import UserModel from "../model/UserModel"
import AuthError from "./errors/AuthError"
import decodeCreds from "./base64/decodeCreds"

export default async function authorize(header: string, model: UserModel) {
  const split = header.split(' ')
  if(split[0] !== 'Basic') throw new AuthError('unknown authorization type')
  const { username, password } = decodeCreds(split[1])
  const correct = await model.checkCreds(username, password)
  if(!correct) throw new AuthError('wrong credentials')
}
