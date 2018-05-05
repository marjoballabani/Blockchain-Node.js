var express = require('express');
var router = express.Router();
var Blockchain = require("../src/Blockchain")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(Blockchain.chain);
});

module.exports = router;
