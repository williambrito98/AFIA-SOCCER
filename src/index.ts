import { config } from 'dotenv'
import { parse, join } from 'path'
import { email } from './getEmails'
import { fillForm } from './fillForm'
import { Log } from './components/log'

(async () => {
  config({ path: join(parse(__dirname).dir, '.env') })
  const type = process.argv.slice(2).pop()
  const pathLog = join(__dirname, 'logs', type)
  const log = new Log(pathLog)
  try {
    log.write('INICIANDO PROCESSO')
    const obj = {
      email: email,
      fillForm: fillForm
    }

    log.write('INCIANDO FUNÇÃO ' + type)
    await obj[type](log)
  } catch (error) {
    log.write(error)
  }
})()
