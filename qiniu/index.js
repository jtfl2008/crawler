const BaseQiniu = require('../prototype/BaseQiniu');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio')

class qiniu extends BaseQiniu{
    constructor () {
        super();
        this.getUrlList = this.getUrlList.bind(this);
    }
    async getUrlList (url) {
        const browser = await (puppeteer.launch({headless: true }));
        const page = await browser.newPage();
        let list = [];
        await page.goto(url);
        await page.content().then(function(data){
            const $ = cheerio.load(data);
            const lll = Array.from($('#piclist li'));
            list = lll.map(item => {
                return {
                    url: $(item).find('dl dt a').attr('href'),
                    title: $(item).find('dl dt a img').attr('alt'),
                    imgUrl: $(item).find('dl dt a img').attr('data-img')
                }
            });
        });
        return list;
    }
}

module.exports = new qiniu();