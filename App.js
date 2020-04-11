const express = require('express');
const bodyParser = require('body-parser');
const usersController = require('./Controllers/UsersController');
const { check } = require('express-validator');
const app = express();

const __PORT = 3000;

// --------------- DECLARATION OF MIDDLEWARE -------------
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/users/new',[check('firstName').notEmpty()],(usersController.create));

app.listen(__PORT, function () {
  console.log('app listening on port 3000!');
});
