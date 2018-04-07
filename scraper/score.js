let phantom = require('phantom');
let cheerio = require('cheerio');
let app = require('../app');


const url = 'http://www.nba.com/scores#/';

exports.updateScore = async function () {
    const html = await loadPage(url);
    await scraper(html);
};

async function loadPage(url) {
    const instance = await phantom.create();
    console.log()
    const page = await instance.createPage();
    const status = await page.open(url);
    console.log(status);
    return await page.property('content');
}

async function scraper(html) {
    console.log(1);
    const $ = await cheerio.load(html);
    const teamblocks = $('div[class^="team-game-score"]');
    //const teamblocks = $('div[class="team-game-score"]')
    console.log(teamblocks);
}