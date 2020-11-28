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
      ...default_config,
      connection:{
        database:"d564h2g74en9rr",
        host:"ec2-34-202-65-210.compute-1.amazonaws.com",
        password:"6c6d635b01d869daf49740b0278b0f5c8c0eabdf111fd1348ba5cda049936a17",
        user:"jyonyfcatezpmc",
        port:5432,
        ssl:{ rejectUnauthorized: false}
      }
       }
}

