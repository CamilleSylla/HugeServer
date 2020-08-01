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
app.use(cors());

app.get('/dashboard/:id', (req, res) => {
  const { id } = req.params;
  db.select('*').from('users').where({ id })
  .then(user => {
      res.json(user[0])
  })
  .catch(err => res.status(400).json('error getting data'))
});

app.post('/', (req, res) => {
  db.select('email', 'hash').from('login')
  .where('email', '=', req.body.email)
  .then(data => {
    const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
    console.log(isValid);
    if (isValid) {
      return db.select('*').from('users').where('email', '=' , req.body.email).then(user => {
        console.log(user);
        res.json(user[0])
      })
      .catch(err => res.status(400).json('Impossible de trouver utilisateur'))
    }else{
      res.status(400).json('le mot de passe ou votre email sont incorrectes')
    }
    
  })
  .catch(err => res.status(400).json('mauvaises informations'))
})

app.post('/signup', (req, res) => {
  const { nom, email, prenom, password } = req.body;
  const saltRounds = 10;
  const hash = req.body.password;
  bcrypt.hash(hash, saltRounds, function(err, hash) {
    db.insert({
      hash: hash,
      email: email,
      nom: nom,
      prenom: prenom
}).into('login')
.returning('email')
.then(loginEmail => {
  return db('users').returning('*').insert({
    nom: nom,
    prenom: prenom,
    email: loginEmail[0]
  })
  .then(user => {
    res.json(user[0]);
    })
  })
  .catch(err => res.status(400).json(err))
  })
});

//.then(loginEmail => {
  //return db('users').returning('*').insert({
    //name: name,
    //email: loginEmail[0]
  //}).then(user => {
    //res.json(user[0]);
  //})
//})
  //.catch(err => res.status(400).json("Oups, mauvaise informations"))
//});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });