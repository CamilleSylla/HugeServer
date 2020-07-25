module.exports = {

    development: {
      client: 'pg',
      connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'laGalere72',
        database : 'huge',
        charset: 'utf8'
      },
      migrations: {
        directory: __dirname + '/knex/migrations',
      },
      seeds: {
        directory: __dirname + '/knex/seeds'
      }
    }
  };