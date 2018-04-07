let express = require('express');
let router = express.Router();
let scraper = require('../scraper/score');
/* GET home page. */
router.get('/', function(req, res, next) {
  scraper.updateScore();
  res.render('index', { title: 'Express' });
});

module.exports = router;
