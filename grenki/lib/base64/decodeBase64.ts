export default function decodeBase64(string: string) {
  return Buffer.from(string, 'base64').toString('utf-8')
}
