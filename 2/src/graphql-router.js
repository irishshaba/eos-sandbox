const Eos = require("eosjs")
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const express = require('express')
const router = express.Router()

var schema = buildSchema(`
    type BlockSummary {
        blockId: String
        transactionCount: Int
    }

    type Query {
        latest: BlockSummary
    }
`);

var root = {
    latest: async () => {
        info = await eos.getInfo({})
        result = await eos.getBlock(info.head_block_id)        
        return new BlockSummary(result.id, result.input_transactions.length);
    },
};

router.use('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: false, // would it be cheating to just set this to true?
}));

module.exports = router;