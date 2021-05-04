import encodeBase64 from './encodeBase64'

export default function encodeCreds(username: string, password: string) {
  return encodeBase64(`${username}:${password}`)
}
