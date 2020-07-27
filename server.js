const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const knex = require('knex');
const bcrypt = require ('bcrypt');
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

db.select('*').from('users').then(data => {
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

app.post('/signin', (req, res) => {
  db.select('email', 'hash').from('login')
  .where('email', '=' , req.body.email)
  .then(data => {
    console.log(data)
  })
  .catch(err => res.json(400).json(err))
})

app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password)
  //db:transaction permet de tchecker si un des hash 
  //(en general utiliser lorsquel'on doit verifier plusieurs valeurs)
  // est faux si c'est le cas le login echouera
  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    }).into('login').returning('email')
    //loginEmail = a l'élément "email" de l'objet retourner par la requette
    .then( loginEmail => {
        return trx('users').returning('*').insert({
          name: name,
          email: loginEmail[0],
        }).then(user => {
          res.json(user[0]);
        })
    })
    .then(trx.commit).catch(trx.rollback)
  })
  .catch(err => res.status(400).json("Oups, mauvaise informations"))
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });