export default function error(code: number, message: string, details?: string) {
  return { code, message, details }
}
