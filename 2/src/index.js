Eos = require("eosjs")

let config = {
    httpEndpoint: "http://127.0.0.1:8888"
}

eos = Eos(config);
const express = require('express')
const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', async (req, res, next) => {
    //res.type('application/json')
    try {
        info = await eos.getInfo({})
        // doesn't work, even when hitting /v1/history/get_Actions?
        //actions = await eos.getActions("eosio")
result = await eos.getBlock(info.head_block_id)
        console.log(JSON.stringify(result, null, 2))
        res.json(result);
    }
    catch (e) {
        next(e)
    }    
})

app.listen(8081, () => console.log('Example app listening on port 8081!'))

