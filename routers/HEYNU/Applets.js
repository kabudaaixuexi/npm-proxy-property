/*
 *@model:登录
 */
const REGISTERES = require("../../sql/@nu_model/registered")
const Router = require('koa-router')
const router = new Router();
const {
  Console,
  Return
} = require("../../utils/outlog")
const logsHandle = require("../../utils/logs").logHandle

//token 和 token验证
const {
  generateToken
} = require("../../utils/token")
const passport = require('koa-passport')
const verify = require("../../utils/passport")

// 日志
const LOG = (ctx) => {
  Console(ctx)
  logsHandle(Return(ctx))
}

router.post('/t', async ctx => {
  LOG(ctx)
  let {
    username,
    phone,
    email,
    password
  } = ctx.request.body
  switch (ctx.request.body.fid) {
    /*
     *@description: 测试接口 
     *@date: 2020-07-01 19:20:54
     */
    case 'test':
      response(ctx, {
        msg: JSON.stringify(ctx),
        tip: "测试接口"
      })
      break;
      /*
       *@interface: HEYNU/Applets/t
       *@description: 用户注册
       *@params1: username
       *@params2: phone
       *@params3: email
       *@params4: password
       *@date: 2020-07-02 10:53:50
       */
    case 'C00-01':
      return new Promise((resolve, reject) => {
        username && phone && email && password && REGISTERES.create({
            username,
            phone,
            email,
            password
          }, (err, result) => {
            result && resolve(result) || err && ctx.throw(500, err)
          }) || !username && ctx.throw(400, `缺少username参数`) ||
          !phone && ctx.throw(400, `缺少phone参数`) ||
          !email && ctx.throw(400, `缺少email参数`) ||
          !password && ctx.throw(400, `缺少password参数`)
      }).then(res => {
        ctx.status = 200,
          ctx.body = {
            retcode: 0,
            userinfo: res
          }
      })
      break;
      /*
       *@interface: HEYNU/Applets/t
       *@description: 查询用户
       *@params1: username
       *@params2: phone
       *@params3: email
       *@date: 2020-07-02 10:53:50
       */
    case 'C00-02':
      return new Promise((resolve, reject) => {
        (username || phone || email) && REGISTERES.get([username, phone, email], (err, result) => {
          result && resolve(result) || err && ctx.throw(500, err)
        }) || REGISTERES.getList((err, result) => {
          result && resolve(result) || err && ctx.throw(500, err)
        })
      }).then(res => {
        ctx.status = 200,
          ctx.body = {
            userlist: res
          }
      })
      break;
      /*
       *@interface: HEYNU/Applets/t
       *@description: 登录
       *@params1: phone
       *@params2: password
       *@date: 2020-07-03 9:53:50
       */
    case 'C00-03':
      return new Promise((resolve, reject) => {
        (phone && password) && REGISTERES.get([null, phone, null], (err, result) => {
          result && resolve(result) || err && ctx.throw(500, err)
        }) || !phone && ctx.throw(400, `缺少phone参数`) || !password && ctx.throw(400, `缺少password参数`)
      }).then(res => {
        res == '' && ctx.throw(499, `该账号尚未注册`)
        const token = {
          token:"Bearer " + generateToken({phone})
        }
        res = Object.assign(res[0], token)
        ctx.status = 200
        ctx.body = res
      })
      /*
       *@interface: HEYNU/Applets/t
       *@description: 验证token
       *@date: 2020-07-03 9:53:50
       */
    case 'C00-04':
      return new Promise((resolve, reject) => {
        resolve()
      }).then(res => {
        
      })
      break;
    default:
      ctx.status = 404
      // ctx.response.redirect('https://www.baidu.com?id=0000');
  }
})


router.get("/t",passport.authenticate('jwt',{session:false}) ,async ctx => {
  LOG(ctx)
  /*
   *@description: 获取全部用户 
   *@date: 2020-07-01 19:20:54
   */
  return new Promise((resolve, reject) => {
    console.log(ctx.state)
      resolve()
  }).then((res) => {
    ctx.status = 200,
    ctx.body =  ctx.state.user
  // ctx.response.redirect('https://www.baidu.com?id=0000');
  })
})

module.exports = router