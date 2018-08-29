const Eos = require("eosjs")

const eos = Eos.Localnet();

class EosWrapper {
    async getLatestBlock() {
        return await eos.getBlock((await eos.getInfo({})).head_block_id)    
    }
}

module.exports = EosWrapper;