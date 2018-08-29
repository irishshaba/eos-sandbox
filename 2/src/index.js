const graphql = require('./graphql-router');
const express = require('express')
const path = require ('path');

var app = express()

app.get('/', async (req, res, next) => {
    res.sendFile(path.join(__dirname + "/../dist/index.html"))
})

app.get('/graphql', graphql);

app.listen(8081, () => console.log('Example app listening on port 8081!'))