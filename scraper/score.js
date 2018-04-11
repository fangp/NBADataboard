let phantom = require('phantom');
let cheerio = require('cheerio');
let app = require('../app');
let instance;

const url = 'http://www.nba.com/scores#/';

exports.updateScore = async function () {
    const html = await loadPage(url);
    await scraper(html);
};

async function loadPage(url) {
    if(!instance){
        instance = await phantom.create();
    }
    const page = await instance.createPage();
    console.log(1);
    const status = await page.open(url);
    console.log(status);
    return await page.property('content');
}

async function scraper(html) {
    console.log(3);
    const $ = await cheerio.load(html);
    let matches = {};
    const teamblocks = $('div[class="score-tile-min__wrapper"]').each(function (i, elem) {
        let match = {};
        // ----------------------- names ----------------------------------------------
        let teamnames = $(this).find('div[class="score-tile__team-name"]').find('span');
        match['visitor'] = teamnames.eq(0).text();
        match['home'] = teamnames.eq(1).text();
        // ----------------------- time -----------------------------------------------
        let teamtimes = $(this).find('span[class="score-tile__period"]').text().toString().trim().replace(/[\s\n]+/g, ' ');
        match['time'] = teamtimes;
        //console.log(teamtimes);
        // ----------------------- scores ----------------------------------------------
        let scores = [];
        let teamscores = $(this).find('span[class="current_score"]');
        scores[0] = teamscores.eq(0).text();
        scores[1] = teamscores.eq(1).text();
        match['score'] = scores;

        matches[i.toString()] = match;
    });
    console.log(matches);
}