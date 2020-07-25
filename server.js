const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;
const knex = require('./knex/knex');


const app = express(); 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extends: false}));


app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });