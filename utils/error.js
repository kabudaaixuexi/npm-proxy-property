const catchEoore = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    ctx.status = error.status || error.statusCode
    if (parseInt(ctx.status) === 404) {
      ctx.response.redirect(`http://www.baidu.com?tip=${error.tip}`)
    } else {
      ctx.body = {
        errmsg: error.message,
        tip: error.tip,
        status: error.status || error.statusCode
      }
    }
    return
  }
}

module.exports = catchEoore