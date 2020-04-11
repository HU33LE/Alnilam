const express = require('express');
const app = express();
const usersController = require('./UsersController');

app.post('/users/new',(usersController.create));

module.exports = app;