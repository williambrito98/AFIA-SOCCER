import type { Knex } from 'knex'
import { config as configENV } from 'dotenv'
import { join } from 'path'
// Update with your config settings.

configENV({ path: join(__dirname, '.env') })

const config: { [key: string]: Knex.Config } = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_BASE
    },
    migrations: {
      database: process.env.DB_BASE,
      schemaName: process.env.DB_SCHEMA,
      tableName: 'migrations'
    }
  },

  staging: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_BASE
    },
    migrations: {
      database: process.env.DB_BASE,
      schemaName: process.env.DB_SCHEMA,
      tableName: 'migrations'
    }
  },

  production: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_BASE
    },
    migrations: {
      database: process.env.DB_BASE,
      schemaName: process.env.DB_SCHEMA,
      tableName: 'migrations'
    }
  }

}

export default config
