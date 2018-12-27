const router = require('koa-router')()
const crawle = require('./crawler')
const login = require('./login')

module.exports = (app) => {
  router.get('/', (ctx, next) => {
    ctx.body = '<a href="https://github.com/yangcecode/crawler">Github</a>'
  }),
  router.get('/getphoto', crawle.index),
  router.post('/test', crawle.test),

  // 登录
  router.post('/login', login.login),
  router.get('/userin', login.userin)
  

  app
    .use(router.routes())
    .use(router.allowedMethods())
}
