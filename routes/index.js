const router = require('koa-router')()

module.exports = (app) => {
  router.get('/', (ctx, next) => {
      ctx.body='ddddddd'
  })
//   router.get('/about', require('./about').index)

  app
    .use(router.routes())
    .use(router.allowedMethods())
}