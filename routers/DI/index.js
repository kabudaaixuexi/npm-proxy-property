const Router = require('koa-router')
const router = new Router();
const {
  sha256_digest
} = require("../../utils/sha256")
const {
  Console,
  Return
} = require("../../utils/outlog")

const logsHandle = require("../../utils/logs").logHandle




/**
 * @route GET /DI/test
 * @desc 测试接口
 */
router.post("/test", async ctx => {
  ctx.throw(599, '参数报错', {
    tip: '请检查参数'
  })
  // Console(ctx)
  // logsHandle(Return(ctx))
  // ctx.status = 200,
  //   ctx.body = {
  //     msg: JSON.stringify(ctx)
  //   }
  // ctx.response.redirect('https://www.baidu.com?id=0000');
})


/**
 * @route POST /DI
 * @desc 网页接入接口
 */
router.post("/", async ctx => {
  Console(ctx)
  logsHandle(Return(ctx))
  // let phone = JSON.parse(ctx.request.body.data).phone ? JSON.parse(ctx.request.body.data).phone : '00000000000'
  ctx.status = 200,
    ctx.body = {
      msg: 'POST /DI'
    }
  // ctx.response.redirect(`https://www.baidu.com?phone=${phone}`);
})


module.exports = router.routes()