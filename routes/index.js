var express = require('express');
var router = express.Router();
var Blockchain = require("../src/Blockchain")

/* GET home page. */
router.get('/', function(req, res, next) {
  let previousBlock = Blockchain.getPreviousBlock()
  let previousProof = previousBlock.proof
  let previousHash = previousBlock.hash
  let proof = Blockchain.proofOfWork(previousProof)
  let newBlock = Blockchain.createBlock(proof, previousHash)

  res.json(newBlock._jsonRepresentation());
});

module.exports = router;
