import decodeBase64 from "./decodeBase64"

export default function decodeCreds(string: string): { username: string, password: string } {
  const decoded = decodeBase64(string)
  return {
    username: decoded.split(':')[0],
    password: decoded.split(':')[1]
  }
}
