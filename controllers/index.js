const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Vítejte' });
});

router.get('/helloWorld', function(req, res, next) {
  res.send("Hello World!");
});

router.get('/helloWorld2', function(req, res, next) {
  res.send({
    hello: "Kachna"
  });
});

module.exports = router;
