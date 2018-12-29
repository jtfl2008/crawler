const Koa = require('koa')
const router = require('./routes')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors');
const token = require('./middleware/token')

const app = new Koa()

app.use(cors());
app.use(logger());
// app.use(token);

app.use(bodyParser());

router(app)

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
