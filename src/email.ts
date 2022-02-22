import connection from './connection'

export async function save (obj: object) {
  try {
    const conn = connection()
    await conn.withSchema(process.env.DB_SCHEMA).table('emails').insert({
      ...obj
    })
    await conn.destroy()
    return true
  } catch (error) {
    console.log('Erro ao salvar os dados do email')
    return false
  }
}

export async function exists (id: string) {
  try {
    const conn = connection()
    const email = await conn.withSchema(process.env.DB_SCHEMA).table('emails').where({ id_email: id }).limit(1)
    await conn.destroy()
    return email
  } catch (error) {
    console.log('Erro ao buscar email no banco')
    return false
  }
}

export async function getAll () {
  try {
    const conn = connection()
    const emails = await conn.withSchema(process.env.DB_SCHEMA).table('emails').where({ enviado: false })
    await conn.destroy()
    return emails
  } catch (error) {
    return []
  }
}

export async function setStatus (id: string, status: boolean) {
  try {
    const conn = connection()
    await conn.withSchema(process.env.DB_SCHEMA).table('emails').update({ enviado: status }).where({ id })
    await conn.destroy()
  } catch (error) {
    return false
  }
}
