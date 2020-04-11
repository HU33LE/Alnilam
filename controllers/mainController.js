const express = require('express');
const app = express();
const usersController = require('./usersController');
const usersValidator = require('../validators/users');

app.post('/users/new',usersValidator.postNewUser,(usersController.create));

module.exports = app;