const BaseQiniu = require('../prototype/BaseQiniu');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const {sleep} = require('../tool/tool');

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
        } catch (error) {
          throw error;
        }
        
    }
    async getUrlInfo (url) {
      const browser = await (puppeteer.launch({headless: true }));
        const page = await browser.newPage();
        await page.goto(url);
        await sleep(3000);
        try {
          const bodyHandle = await page.waitForSelector('#picbox');
          let next = true;
          let key = 0;
          while(next){
            key += 1;
            let photo = await bodyHandle.screenshot({
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
              
            }, bodyHandle);
            await sleep(3000);
          };
          return list;
        } catch (error) {
          throw error;
        }

    }
}

module.exports = new qiniu();