// app.js
const Koa = require('koa');
const Router = require('koa-router')
const koaBody = require('koa-body')
const cors = require('koa2-cors');
const app = new Koa();

const router = new Router();
require('./sql')

const catchEoore = require("./utils/error")
app.use(catchEoore)

// passport验证
const passport = require('koa-passport')
app.use(passport.initialize())
app.use(passport.session())
require("./utils/passport")(passport)

// 路由
router.get("/", async ctx => {
  ctx.throw(401, 'DI')
})

// 引入路由
const DI = require("./routers/DI")
const {
  HEYNU
} = require("./routers/HEYNU")

// 配置路由地址
router.use('/DI', DI)
router.use('/HEYNU', HEYNU)

// post输出
app.use(koaBody({
  multipart: true, // 支持文件上传
  // encoding:'gzip',
  // formidable:{
  //   uploadDir:path.join(__dirname,'public/upload/'), // 设置文件上传目录
  //   keepExtensions: true,    // 保持文件的后缀
  //   maxFieldsSize:2 * 1024 * 1024, // 文件上传大小
  //   onFileBegin:(name,file) => { // 文件上传前的设置
  // console.log(`name: ${name}`);
  // console.log(file);
  //   },
  // }
}))

// 允许跨域
app.use(cors());

// 配置路由
app.use(router.routes()).use(router.allowedMethods());

// logger
const logsUtil = require('./utils/logs.js');
app.use(async (ctx, next) => {
  const start = new Date(); // 响应开始时间
  let intervals; // 响应间隔时间
  try {
    await next();
    intervals = new Date() - start;
    logsUtil.logResponse(ctx, intervals); //记录响应日志
  } catch (error) {
    intervals = new Date() - start;
    logsUtil.logError(ctx, error, intervals); //记录异常日志
  }
})

require("./utils/token")
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server started on ${port}`)
});