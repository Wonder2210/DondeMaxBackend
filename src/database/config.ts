export const default_config = {
    client: "postgresql",
    connection: {
      database: "DondeMax",
      user: "postgres",
      password: "root"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      
    }
  }
interface KnexConfig{
    [key:string]:object;
}
export const config : KnexConfig = {
    development:{
        ...default_config
    },
  staging:{
      ...default_config
  },

  production: {
      ...default_config
  }
}

