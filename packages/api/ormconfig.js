// TODO process .env DB connection
module.exports = {
   type: 'postgres',
   host: process.env.DB_HOST,
   port: process.env.DB_PORT,
   username: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB,
   logging: false,
   entities: [
      __dirname + '/build/entity/**/*.js'
   ],
   migrations: [
      __dirname + '/build/database/migrations/**/*.js'
   ],
   subscribers: [
      __dirname + '/build/subscriber/**/*.js'
   ],
   cli: {
      entitiesDir: __dirname + '/build/entity',
      subscribersDir: __dirname + '/build/subscriber',
      migrationsDir: __dirname + '/build/database/migrations'
   }
 }