import { Log } from '../components/log'
import CreateBrowser from '../CreateBrowser/CreateBrowser'
import { getAll, setStatus } from '../email'

export async function fillForm (log : Log) {
  const emails = await getAll()
  if (emails.length === 0) {
    log.write('SEM DADOS PARA PROCESSAR')
    return true
  }
  for (let index = 0; index < emails.length; index++) {
    log.write('SALVANDO DADOS DO CLIENTE ' + emails[index].id)
    const newBrowser = new CreateBrowser()
    const { browser, page } = await newBrowser.init()
    await page.goto('https://team.afiasoccer.com/hubbots', { waitUntil: 'networkidle0' })
    await page.waitForSelector("input[name='name']")
    await page.type("input[name='name']", emails[index].nome)
    await page.type("input[name='cf_apelido']", emails[index].apelido ?? '')
    await page.type("input[name='email']", emails[index].email ?? '')
    await page.type("input[name='mobile_phone']", emails[index].celular.length >= 8 ? emails[index].celular : '')
    await page.type("input[name='website']", emails[index].url_card_pipefy ?? '')
    await page.type("input[name='twitter']", emails[index].referencia ?? '')
    await page.click('#rd-button-kzct7ssz')
    await page.waitForNetworkIdle()
    await setStatus(emails[index].id, true)
    await newBrowser.closeAll(browser)
    log.write('CLIENTE ' + emails[index].id + ' SALVO COM SUCESSO')
  }
}
