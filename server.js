const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const knex = require('./knex/knex');
const knexfile = require('./knexfile').development;


const db = knex(knexfile);

db.select('*').from('users').then(date => {
  console.log(data);
})
const app = express(); 

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extends: false}));

app.post('/signup', (req, res) => {
  const { name, email } = req.body;
  db('users').insert({
    name: name,
    email: email,
  }).then(console.log)
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });