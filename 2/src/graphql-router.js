const EosWrapper = require('./eos-wrapper')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')

const express = require('express')
const router = express.Router()

var eos = new EosWrapper()

var schema = buildSchema(`
    type BlockSummary {
        blockId: String
        transactionCount: Int
    }

    type Query {
        latest: BlockSummary
    }
`)

class BlockSummary {
  constructor (headId, transactionCount) {
    this.blockId = headId
    this.transactionCount = transactionCount
  }
}

var root = {
  latest: async () => {
    let latest = await eos.getLatestBlock()
    return new BlockSummary(latest.id, latest.input_transactions.length)
  }
}

router.get('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: false
}))

module.exports = router
