const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const knex = require('knex');
const { json } = require('body-parser');


const db = knex({
  client: 'pg',
      connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'laGalere72',
        database : 'huge',
        charset: 'utf8'
      }
});

db.select('*').from('users').then(date => {
  console.log(data);
})
const app = express(); 

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: false}));

app.get('/dashboard/:id', (req, res) => {
  const { id } = req.params;
  db.select('*').from('users').where({ id })
  .then(user => {
      res.json(user[0])
  })
  .catch(err => res.status(400).json('error getting data'))
});

app.post('/signup', (req, res) => {
  const { name, email } = req.body;
  db('users')
  .returning('*')
  .insert({
    name: name,
    email: email,
  }).then(user => {
    res.json(user[0]);
  })
  .catch(err => res.status(400).json("Oups, mauvaise informations"))
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });