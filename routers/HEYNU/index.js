const Router = require('koa-router')
const router = new Router();

const Applets = require('./Applets')

router.use('/Applets', Applets.routes())

module.exports = {
  HEYNU: router.routes(),
}