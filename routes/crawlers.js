'use strict'
const puppeteer = require('puppeteer');
const fs = require('fs');

module.exports = {
  async index (ctx, next) {
    const browser = await (puppeteer.launch({headless: true }));
    const page = await browser.newPage();
    await page.goto('https://www.27270.com/ent/meinvtupian/');
    const girlList = await page.evaluate((sel) => {
      const boxs = Array.from($(sel).find('li a'));
      const ctn = boxs.map(v => {
        const title = $(v).attr('title');
        const url = $(v).attr('href');
        const img = $(v).find('img').attr('src');

        return {
          title,
          url,
          img
        };
      });
      return ctn;
    }, '.MeinvTuPianBox ul');
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
