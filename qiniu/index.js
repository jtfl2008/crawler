const BaseQiniu = require('../prototype/BaseQiniu');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const {sleep} = require('../tool/tool');
const Photo = require('../models/photo');

class qiniu extends BaseQiniu{
    constructor () {
        super();
        this.getUrlList = this.getUrlList.bind(this);
    }
    async getUrlList (url) {
        const browser = await (puppeteer.launch({headless: true }));
        const page = await browser.newPage();
        let list = [];
        try {
            await page.goto(url);
            const imgHandle = await page.waitForSelector('#piclist');
            list = await page.evaluate(item => {
                let nodeList = item.getElementsByTagName('li');
                let info = [];
                for(let i = 0; i < nodeList.length; i++){
                    info.push({
                        type: item.getElementsByTagName('p').getElementsByTagName('a').innerText
                    });
                };
                return info;
            },imgHandle)
            // await page.content().then(function(data){
            //         const $ = cheerio.load(data);
            //         const lll = Array.from($('#piclist li'));
            //         list = lll.map(item => {
            //             return {
            //                 url: $(item).find('dl dt a').attr('href'),
            //                 title: $(item).find('dl dt a img').attr('alt'),
            //                 imgUrl: $(item).find('dl dt a img').attr('data-img'),
            //                 type: $(item).find('p a').text()
            //             }
            //         });
            // });
        return list;
        } catch (error) {
            throw error;
        }
        
    }
    async getUrlInfo (data) {
      const browser = await (puppeteer.launch({headless: true }));
        let key = ''; // 上传七牛云图片的名字
        const page = await browser.newPage();
        console.log(data.imgUrl);
        await page.goto(data.imgUrl);
        let first = await page.waitForSelector('body');
        let photo = await first.screenshot({
             omitBackground: false
        });
        key = data.imgUrl.split('/').pop().split('.')[0];
        console.log(key);
        await this.upload(key + '.png',photo);
        return;
        await page.goto('http://www.99mm.me' + data.url);
        await sleep(3000);
        try {
            const imgHandle = await page.waitForSelector('#picbox');
            let next = true;
            while(next){
                key += 1;
                photo = await imgHandle.screenshot({
                omitBackground: false
                });
                await this.upload(key + '.png',photo);
                console.log(photo);
            
                next = await page.evaluate(img => {
                let text =  img.nextElementSibling.lastElementChild.innerText
                if(text == '下一篇'){
                    return false;
                }else{
                    img.onclick();
                    return true;
                }
                
                }, imgHandle);
                await sleep(3000);
            };
            browser.close();
        } catch (error) {
            throw error;
        }

    }
    async savePhoto (data) {
      let photo = new Photo(data);
      photo.save(function(err, docs){
        if(err) throw err;
        console.log('保存成功：' + docs);
      })
    }
}

module.exports = new qiniu();