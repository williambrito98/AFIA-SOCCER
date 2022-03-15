import knex from 'knex'
import CONFIG from '../knexfile'

export default () => {
  return knex(CONFIG)
}
