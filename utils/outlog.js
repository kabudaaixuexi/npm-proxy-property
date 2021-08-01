const Console = (ctx) => {
  console.log(ctx.request.host + ctx.request.url)
  if (ctx.request.method == 'POST') {
    console.log(ctx.request.body)
  } else {
    console.log(ctx.query)
  }
}

const Return = (ctx) => {
  if (ctx.request.method == 'POST') {
    ctx.request.body.reqUrl = ctx.request.host + ctx.request.url
    return ctx.request.body
  } else {
    ctx.query.reqUrl = ctx.request.host + ctx.request.url
    return ctx.query
  }
}


module.exports = {
  Console,
  Return
}