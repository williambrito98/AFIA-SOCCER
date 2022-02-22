import { appendFileSync, mkdirSync, rmdirSync } from 'fs'
import { join } from 'path'

export class Log {
  private path : string
  private fileName : string
  private date = new Date()
  private template = `${this.date.getHours()}:${this.date.getMinutes()}:${this.date.getSeconds()} - {message} \n`
  constructor (path: string) {
    this.clearLogs(path)
    this.path = this.createPaths(path)
    this.fileName = `log_${this.date.getDate()}.txt`
  }

  public write (message: string) {
    appendFileSync(join(this.path, this.fileName), this.template.replace('{message}', message), { encoding: 'utf-8' })
  }

  private createPaths (path: string) {
    const newPath = join(path, this.date.getFullYear().toString(), (this.date.getMonth() + 1).toString())
    mkdirSync(newPath, { recursive: true })
    return newPath
  }

  public clearLogs (path: string) {
    rmdirSync(path, { recursive: true })
  }
}
