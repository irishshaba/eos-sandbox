const express = require('express')
const Eos = require("eosjs")
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
var path = require ('path');

const app = express()
const eos = Eos.Localnet();

var schema = buildSchema(`
    type BlockSummary {
        blockId: String
        transactionCount: Int
    }

    type Query {
        latest: BlockSummary
    }
`);

class BlockSummary {
    constructor(headId, transactionCount) {
        this.blockId = headId
        this.transactionCount = transactionCount
    }
}

var root = {
    latest: async () => {
        info = await eos.getInfo({})
        result = await eos.getBlock(info.head_block_id)        
        return new BlockSummary(result.id, result.input_transactions.length);
    },
};

app.get('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: false, // would it be cheating to just set this to true?
}));

app.get('/', async (req, res, next) => {
    res.sendFile(path.join(__dirname + "/../dist/index.html"))
})

app.listen(8081, () => console.log('Example app listening on port 8081!'))