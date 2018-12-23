module.exports = {
  async index (ctx, next) {
    ctx.body = {
      status: 200
    }
  },
  async test (ctx, next) {
    let data = ctx.request.body
    ctx.body = {
      status: 200,
      data: data
    }
  }
}
