import chalk from "chalk";

export default function logger(name = 'blin') {
  const instance = {
    name,
    create(color: string, type: string, text: string) {
      // @ts-ignore
      console.log(`${chalk[`${color}`](type)} - ${instance.name} - ${new Date().toLocaleString()} - ${text}`)
    },
    error(...text: string[]) {
      const t = text.join(', ')
      instance.create('red', 'ERROR  ', t)
    },
    log(...text: string[]) {
      const t = text.join(', ')
      instance.create('cyan', 'LOG    ', t)
    },
    warn(...text: string[]) {
      const t = text.join(', ')
      instance.create('yellow', 'WARN   ', t)
    },
    success(...text: string[]) {
      const t = text.join(', ')
      instance.create('green', 'SUCCESS', t)
    }
  }

  return instance
}
