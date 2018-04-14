// Define DB connections for different environments
module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/finishit_dev'
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/finishit_test'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
}
