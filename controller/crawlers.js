'use strict'
const qiniu = require('../qiniu/index');

module.exports = {
    async index (ctx, next) {
        let girlList = await qiniu.getUrlList('http://www.99mm.me/hot/mm_4_1.html');
        ctx.body = {
            status: 200,
            title: girlList
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
