const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;

// initialize storage from storage.json
let storage = require('./storage.json');

app.use(bodyParser.json());

app.post('/users', function(req, res) {
  // POST to add new user
  var newUser = req.body

  // TODO: this doesn't work?
  if (!newUser) {
    // no user found in request body
    return res.sendStatus(400);
  } else {
    storage.push(newUser)
    res.json(storage)
  }
});


app.get('/users', function(req, res) {
  // return all users
  res.json(storage);
});


app.get('/user/:name', function(req, res) {
  // return user by name param
  for (var i = 0; i < storage.length; i++) {
    if (storage[i]['name'] === req.params.name) {
      res.json(storage[i])
    }
  }
  res.sendStatus(400);
});


app.put('/user/:name', function(req, res) {
  // update a current user's name
  for (var i = 0; i < storage.length; i++) {
    if (storage[i]['name'] === req.params.name) {
      storage[i]['name'] = req.body.name
      res.json(storage[i])
    }
  }
  res.sendStatus(400);
});


app.delete('/user/:name', function(req, res) {
  // delete a user
  storage = storage.filter(function(user) {
    if (user['name'] !== req.params.name) {
      return user
    }
  })
  res.json(storage)
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
