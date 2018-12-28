'use strict'
const qiniu = require('qiniu');
const axios = require('axios');
const fs = require('fs');

let accessKey = 'jq-QKsCZwOdZPqWjB9yPkBtLIN7TSgfnqMfn2i01';
let secretKey = 'm9R582LM1tvsRGe0721JogeVhpQyzGaPqeEV3d4E';
let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
let options = {
    scope: 'photo'
};    
let putPolicy = new qiniu.rs.PutPolicy(options);
let uploadToken=putPolicy.uploadToken(mac);

const config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z1;

let formUploader = new qiniu.form_up.FormUploader(config);
let putExtra = new qiniu.form_up.PutExtra();
let key='taq.png';
module.exports = {
    async upload (ctx, next) {
        axios({
            method:'get',
            url:'http://img.zcool.cn/community/014555598c215da801215603b27c3d.jpg@1280w_1l_2o_100sh.jpg',
            responseType:'stream'
        }).then(function(response) {  
            formUploader.putStream(uploadToken, key, response.data, putExtra, function(respErr,respBody, respInfo) {
                if (respErr) {
                    throw respErr;
                }
                if (respInfo.statusCode == 200) {
                    console.log(respBody);
                } else {
                    console.log(respInfo.statusCode);
                    console.log(respBody);
                }
            });
        });
    }
}
