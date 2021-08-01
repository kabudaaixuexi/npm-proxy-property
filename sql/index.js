const mysql = require('mysql')
const connection = mysql.createConnection({
  host: '192.168.1.99',
  user: 'test',
  password: '123456',
  database: 'test'
})

connection.connect((err) => {
  err && console.log(`connect to mysql error: ${err.code}`) ||
   !err && console.log('connect to mysql successful')
})

connection.on('error', (err) => {
  console.log(`connect to mysql error: ${err.code}`)
})

exports.sql = connection