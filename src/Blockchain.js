var Block = require("./Block")
const crypto = require('crypto');

class Blockchain {
    constructor() {
        this.chain = []
        this.createBlock(1, 0)
    }

    createBlock(proof, previousHash) {
        let blockIndex = this.chain.length + 1
        let block = new Block(blockIndex, proof, previousHash)
        this.chain.push(block)
        return block
    }

    getPreviousBlock() {
        return this.chain[this.chain.length - 1]
    }

    proofOfWork(previousProof) {
        var newProof = 1;
        var proofChecked = false

        while(!proofChecked) {
            var hashOperation = crypto.createHmac('sha256', "ballabani").update((Math.pow(newProof, 2) - Math.pow(previousProof, 2)).toString()).digest('hex');
            if(hashOperation.substr(0, 4) == "0000") {
                proofChecked = true
            } else {
                newProof++
            }
        }

        return newProof
    }

    isChainValid() {
        let previousBlock = this.chain[0]
        let i = 1
        while(i < this.chain.length) {
            let block = this.chain[i]
            if(block.previousHash != previousBlock.hash)
                return false
            previousProof = previousBlock.proof
            proof = block.proof
            hashOperation = crypto.createHmac('sha256', "ballabani").update((Math.pow(proof, 2) - Math.pow(previousProof, 2)).toString()).digest('hex');
            if(hashOperation.substr(0, 4) != "0000")
                return false
            previousBlock = this.chain[i]
            i++
        }
        return true
    }
}

module.exports = new Blockchain()
