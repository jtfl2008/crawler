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
    async getUrlInfo (ctx, next) {
        let data = {
            url: "/qingchun/3052.html",
            title: "模特美绪写真套图秀美臀姿势十分销魂",
            imgUrl: "http://fj.kanmengmei.com/small/2018/3052.jpg",
            type: "清纯",
            urlInfo: { }
        };
        let urlInfo = await qiniu.getUrlInfo(data);
        ctx.body = {
            status:200,
            info: urlInfo
        }
    },
    async test (ctx, next) {
        qiniu.upload('aa.png','http://fj.kanmengmei.com/2018/3052/10-gs.jpg');
        ctx.body = {
            status: 200,
            data: 'data'
        }
    }
}
