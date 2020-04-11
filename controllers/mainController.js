const express = require('express');
const app = express();
const usersController = require('./usersController');
const usersValidator = require('../validators/users');

app.post('/users/new',usersValidator.postNewUser,(usersController.create));

app.post('/register',usersValidator.postNewUser,(usersController.create));

app.get('/users',(usersController.index));

//app.get('/users/:id',(usersController.show));

module.exports = app;