'use strict'

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secret = 'yangce'; //撒盐：加密的时候混淆
module.exports = {
    async login (ctx, next) {
        let {name, password} = ctx.request.body;
        let data = {};
        await User.findOne({'name':name, 'password':password},(err, person) => {
            if(err){
                data = {
                    code: 0,
                    msg: err
                }
            }else{
                if(person.token == undefined){
                    const token = jwt.sign({
                        name: name,
                        password: password
                    }, secret, {
                        expiresIn:  120 //秒到期时间
                    });
                }if(person){
                    console.log(person.token);
                    data = {
                        code: 1,
                        name: person.name,
                        token: person.token
                    }
                }else if(person.password == password){
                    const token = jwt.sign({
                        name: name,
                        password: password
                    }, secret, {
                        expiresIn:  120 //秒到期时间
                    });
                    data = {
                        msg:'登录成功',
                        token: token
                    }
                }else{
                    data = {
                        msg:'账号密码错误'
                    }
                }
            }

        });
        ctx.body = data;
    },
    async userin (ctx,next) {
        console.log('aa');
        ctx.body = 'aaa';
        // let user = new User({
        //     name: 'aa',
        //     password: '11'
        // });
        // user.save((err, res) => {
        //     console.log('aaa');
        //     if (err) {
        //         console.log("Error:" + err);
        //         ctx.body = 'err';
        //     }
        //     else {
        //         console.log("Res:" + res);
        //         ctx.body = 'res';
        //     }
        // });
    }
}