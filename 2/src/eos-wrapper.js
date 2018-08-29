const Eos = require('eosjs')

const eos = Eos.Localnet()

class EosWrapper {
  async getLatestBlock () {
    let info = await eos.getInfo({})
    let result = await eos.getBlock(info.head_block_id)
    return result
  }
}

module.exports = EosWrapper
