const crypto = require('crypto');

class Block {
    constructor(index, proof, previousHash) {
        this.index = index;
        this.timestamp = new Date()
        this.proof = proof
        this.previousHash = previousHash
        this.hash = this._generateHash()
    }

    _generateHash() {
        let toJson = this._jsonRepresentation()
        let hash = crypto.createHmac('sha256', "ballabani")
                   .update(JSON.stringify(toJson))
                   .digest('hex');
        return hash
    }

    _jsonRepresentation() {
        return {index: this.index, timestamp: this.timestamp, proof: this.proof, previousHash: this.previousHash}
    }
}

module.exports = Block
