const fs = require('fs')
const private_key = fs.readFileSync('./ssl/private_key.pem')
const public_key = fs.readFileSync('./ssl/rsa_public_key.pem')
const JwtStrategy = require('passport-jwt').Strategy,
   ExtractJwt = require('passport-jwt').ExtractJwt
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = private_key
module.exports = passport => {
  passport.use(new JwtStrategy(opts,async function(jwt_payload,done){
    console.log(jwt_payload)
    return done(null,jwt_payload)
  }))
}