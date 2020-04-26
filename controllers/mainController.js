const express = require('express');
const app = express();
const usersController = require('./usersController');
const usersValidator = require('../validators/users');
const assetsController = require('./assetsController');
const assetsValidator = require('../validators/assets');

// ------------------------     Users routes    ------------------------

app.post('/users/new', usersValidator.postNewUser, usersController.create);
app.post('/register', usersValidator.postNewUser, usersController.create);
app.get('/users', usersController.index);
app.get('/users/:id', usersValidator.getUser, usersController.show);
app.put('/users/:id', usersValidator.putUser, usersController.update);
app.delete('/users/:id', usersController.deleteUser);

// ------------------------ End Of Users routes ------------------------
// ------------------------ Assets routes ------------------------
app.post('/assets/new', assetsValidator.postNewAsset, assetsController.create);
app.get('/assets', assetsController.index);
app.get('/assets/:id', assetsValidator.getAsset, assetsController.show);
app.put('/assets/:id', assetsValidator.putAsset, assetsController.update);
app.delete('/assets/:id', assetsController.deleteAsset);
// ------------------------ End Of Assets routes ------------------------


// ------------------------     Default Routes    ------------------------
app.get('*', (req, res) => res.status(404));
app.post('*', (req, res) => res.status(405));
app.put('*', (req, res) => res.status(405));
app.delete('*', (req, res) => res.status(405));
// ------------------------ End Of Default Routes ------------------------

module.exports = app;