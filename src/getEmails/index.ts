import { Log } from '../components/log'
import CreateBrowser from '../CreateBrowser/CreateBrowser'
import { exists, save } from '../email'

export async function email (log: Log) {
  try {
    const newBrowser = new CreateBrowser()
    const { browser, page } = await newBrowser.init()
    await page.goto('https://mail.hostinger.com/', { waitUntil: 'networkidle0' })
    await page.waitForSelector('#rcmloginuser')
    await page.type('#rcmloginuser', process.env.USER_EMAIL)
    await page.type('#rcmloginpwd', process.env.PASS_EMAIL)
    await page.click('#rcmloginsubmit')
    await page.waitForSelector('#messagelist')
    await page.waitForTimeout(10000)

    let numberTotalPaginationEmails : string
    let numberPaginationCurrent : string

    do {
      numberTotalPaginationEmails = await page.$eval('#rcmcountdisplay', element => element.textContent.trim().match(/\d+/gmi)[2])
      numberPaginationCurrent = await page.$eval('#rcmcountdisplay', element => element.textContent.trim().match(/\d+/gmi)[1])
      console.log(numberPaginationCurrent, numberTotalPaginationEmails)
      const numEmail = await page.$$eval('#messagelist tbody tr', elements => elements.length)
      for (let index = 1; index <= numEmail; index++) {
        // @ts-ignore
        const urlBodyEmail = await page.$eval(`#messagelist tbody tr:nth-child(${index}) td:nth-child(2) span:last-child a`, element => element.href)
        const id = new URL(urlBodyEmail).searchParams.get('_uid')
        const exist = await exists(id)
        if (!exist) {
          return {
            status: 'error',
            message: 'Erro ao consulta no banco de dados'
          }
        }
        if (exist.length !== 0) {
          log.write(`EMAIL JA EXISTE NA BASE DE DADOS: ID ${id}`)
          continue
        }
        const pageBody = await browser.newPage()
        await pageBody.goto(urlBodyEmail, { waitUntil: 'networkidle0' })
        await pageBody.waitForSelector('#message-header > h2')
        await pageBody.waitForTimeout(2500)
        const title = await pageBody.$eval('#message-header > h2', element => element.textContent.trim())

        if (!(title.match(/Registro - #\w+/gmi))) {
          await pageBody.close()
          continue
        }

        log.write(`SALVANDO EMAIL ${id}`)

        await pageBody.waitForSelector('#message-htmlpart1 > div > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td > div > div > table')
        await save({
          id_email: id,
          nome: await pageBody.$eval('#message-htmlpart1 > div > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td > div > div > table > tbody > tr:nth-child(1) > td:nth-child(2)', element => element.textContent.trim()).catch(e => ''),
          apelido: await pageBody.$eval('#message-htmlpart1 > div > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td > div > div > table > tbody > tr:nth-child(2) > td:nth-child(2)', element => element.textContent.trim()).catch(e => ''),
          celular: await pageBody.$eval('#message-htmlpart1 > div > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td > div > div > table > tbody > tr:nth-child(3) > td:nth-child(2)', element => element.textContent.trim()).catch(e => ''),
          email: await pageBody.$eval('#message-htmlpart1 > div > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td > div > div > table > tbody > tr:nth-child(4) > td:nth-child(2)', element => element.textContent.trim()).catch(e => ''),
          url_card_pipefy: await pageBody.$eval('#message-htmlpart1 > div > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td > div > div > table > tbody > tr:nth-child(5) > td:nth-child(2)', element => element.textContent.trim()).catch(e => ''),
          referencia: await pageBody.$eval('#message-htmlpart1 > div > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td > div > div > table > tbody > tr:nth-child(6) > td:nth-child(2)', element => element.textContent.trim()).catch(e => '')
        })
        log.write(`EMAIL ${id} SALVO`)
      }

      await page.click('#rcmbtn116')
    } while (numberPaginationCurrent !== numberTotalPaginationEmails)

    await newBrowser.closeAll(browser)
    log.write('FIM')
  } catch (error) {
    log.write(error)
    return false
  }
}
