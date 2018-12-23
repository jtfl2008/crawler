const router = require('koa-router')()
const crawle = require('./crawler')

module.exports = (app) => {
  router.get('/', crawle.index),
  router.post('/test', crawle.test)

  app
    .use(router.routes())
    .use(router.allowedMethods())
}
