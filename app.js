const Koa = require('koa')
const app = new Koa()
// const router = require('koa-router')();

const views = require('koa-views')
//co 和 koa-convert 是用于处理 Koa 应用中旧版本中间件（基于 generator 函数）与新版本中间件（基于 async/await 函数）兼容性的工具。
const co = require('co')
//koa-convert 是一个库，用于将 Koa v1 的中间件转换为 Koa v2 的中间件形式，比如app.use(convert(json()));
const convert = require('koa-convert')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const debug = require('debug')('koa2:server')
const path = require('path')
const config = require('./config')

const router = require("./routes");

// error handler
onerror(app)

// middlewares
app.use(bodyparser())
  .use(json())
  .use(logger())
  .use(require('koa-static')(__dirname + '/public'))
  .use(views(path.join(__dirname, '/views'), {
    options: {settings: {views: path.join(__dirname, 'views')}},
    map: {'njk': 'nunjucks'},
    extension: 'njk'
  }))
  .use(router.routes())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - $ms`)
})

// routes(router)
app.on('error', function(err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})

module.exports = app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`)
})