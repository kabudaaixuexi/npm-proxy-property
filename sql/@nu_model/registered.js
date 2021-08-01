// user by mysql
const {
  sql
} = require("../index")


const REGISTERES = {
  create: async (Dictionaries, cb) => {
    const query = await sql.query('INSERT INTO user SET ?', Dictionaries, (err, result) => {
      if (err) return cb(err)
      if (result.affectedRows === 0) return cb(new Error('create user dail'))
      sql.query('SELECT * FROM user WHERE username = ?', Dictionaries.username, (err, result) => {
        cb(err, result)
      })
    })
    console.log(query.sql)
  },

  updata: async (name, Dictionaries, cb) => {
    const query = await sql.query('UPDATE user SET ? WHERE name = ?', [Dictionaries, name], (err, result) => {
      if (err) return cb(err)
      if (result.affectedRows === 0) return cb(new Error(`update user fail !name = ${name}.length < 1`));
    })
    console.log(query.sql)
  },

  get: async ([username, phone, email], cb) => {
    await sql.query('SELECT * FROM user u WHERE (u.username = ? or u.phone = ? or u.email = ?)', [username, phone, email], (err, result) => {
      cb(err, result)
    })
  },

  getList: async (cb) => {
    await sql.query('SELECT * FROM user', (err, result) => {
      cb(err, result)
    })
  },

  remove: async (email, cb) => {
    const query = await sql.query('SELECT * FROM user WHERE email = ?', [email], (err, result) => {
      if (err) return cb(err)
      if (result.length === 0) return cb(new Error(`user not exist,because not find ${email}`))
      const tar = result
      sql.query('DELETE FROM user WHERE email = ?', [email], (err, result) => {
        console.log(`删除成功！ 删除${tar.length}条数据`)
        cb(err, result)
      })
    })
  }
}


module.exports = REGISTERES

// User.create({
//   name: 'rn',
//   address: 'XM',
//   phone: 110,
//   email: 'kabuda@163.com',
//   createTimestamp: createTimestamp()
// }, (err, result) => {
//   console.log(err || result)
// })

// User.updata('nr', {
//   name: 'rn',
//   address: 'XM',
//   phone: 110,
//   email: 'kaburda@163.com'
// }, (err, result) => {
//   console.log(err || result)
// })

// User.get('rn', (err, result) => {
//   console.log(err || result)
// })

// User.getList((err, result) => {
//   console.log(err || result)
// })

// REGISTERES.remove('kabuda@163.com', (err, result) => {
//   console.log(err || result)
// })