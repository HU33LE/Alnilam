const express = require('express');
const bodyParser = require('body-parser');
const usersController = require('./Controllers/UsersController');
const { check } = require('express-validator');

const App = express();

const __PORT = 3000;

// --------------- DECLARATION OF MIDDLEWARE -------------
App.use(express.json());
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({extended: false}));

App.post('/users/new',[
    check('firstName').isEmpty(),
    check('lastName').isEmpty,
    check('email').isEmail().isEmpty(),
    check('password').isLength({ min: 6 }).isEmpty(),
], usersController.create);

App.listen(__PORT, function () {
  console.log('app listening on port 3000!');
});
