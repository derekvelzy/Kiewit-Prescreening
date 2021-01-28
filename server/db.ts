const { Pool } = require('pg')

let psql = new Pool({
  host: 'localhost',
  port: 5432,
  username: 'derek',
  password: 'open',
  database: 'kiewit'
})

module.exports = psql;