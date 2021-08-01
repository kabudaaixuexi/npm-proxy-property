const fs = require('fs')
const jwt = require('jsonwebtoken')
const private_key = fs.readFileSync('./ssl/private_key.pem')
const public_key = fs.readFileSync('./ssl/rsa_public_key.pem')


const EXPIRED_TIME = '12h'

//  因为jwt是基于客户端存储的，因此颁发之后没办法使其失效，因此需要服务端设置逻辑来使其失效，该map用于保存店铺是否办法过token，键为店铺id，值为boolean
const activeMap = new Map()

const generateToken = P => {
  P.timestamp = Date.now()
  let token = jwt.sign(P, private_key, {
    // algorithm: 'RS256',
    // expiresIn: EXPIRED_TIME
    expiresIn: 360
  })
  activeMap.set(P)
  return token
}
// const verifyToken = token => {
//   return new Promise((resolve, reject) => {
//     jwt.verify(token, public_key, {
//       algorithms: ['RS256']
//     }, function (
//       err,
//       payload
//     ) {
//       if (err) {
//         reject(err)
//         return
//       }
//       let {
//         P,
//         ts
//       } = payload
//       if (activeMap.get(P) && activeMap.get(P).ts == ts) {
//         resolve(payload)
//       }
//       reject(new Error('登录超时'))
//     })
//   })
// }

const expiredToken = P => {
  activeMap.delete(P)
}

module.exports = {
  generateToken,
  // verifyToken,
  expiredToken
}