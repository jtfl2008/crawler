const Koa = require('koa')
const router = require('./routes')

const app = new Koa()

router(app)

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})