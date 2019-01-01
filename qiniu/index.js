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
                    imgUrl: $(item).find('dl dt a img').attr('data-img'),
                    type: $(item).find('p a').text()
                }
            });
        });
        return list;
    }
    async getUrlInfo (url) {
      const browser = await (puppeteer.launch({headless: true }));
        const page = await browser.newPage();
        await page.goto(url);
        const bodyHandle = await page.$('#picbox');
        let list =[];
        let imgSrc = {
          next:true,
          src:''
        };
        while(imgSrc.next){
          imgSrc = await page.evaluate(img => {
            let src = img.firstChild.src;
            let text =  img.nextElementSibling.lastElementChild.innerText
            if(text == '下一篇'){
              return {
                next: false,
                src
              };
            }else{
              img.onclick();
              return {
                next: true,
                src,
              };
            }
            
          }, bodyHandle);
          list.push(imgSrc.src);
        };
        return list;
    }
}

module.exports = new qiniu();