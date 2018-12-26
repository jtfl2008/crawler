'use strict'

const User = require('../models/user');
module.exports = {
    async login (ctx, next) {
        let c = ctx;
        User.findOne({'name':'yangce'},(err, person) => {
            if (err) return handleError(err);
            console.log(person);
            c.body = 'aa';
        });
    },
    async userin (ctx,next) {
        console.log('aa');
        let user = new User({
            name: 'aa',
            password: '11'
        });
        user.save((err, res) => {
            console.log('aaa');
            if (err) {
                console.log("Error:" + err);
                ctx.body = 'err';
            }
            else {
                console.log("Res:" + res);
                ctx.body = 'res';
            }
        });
    }
}