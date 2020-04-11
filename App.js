const express = require('express');
const bodyParser = require("body-parser");

const App = express();

const __PORT = 3000;

// --------------- DECLARATION OF MIDDLEWARE -------------

App.use(bodyParser.json());
App.use(bodyParser.urlencoded({extended: false}));


App.get('/', function (req, res) {
  res.send('Hello Alnimal!');
});

App.listen(__PORT, function () {
  console.log('app listening on port 3000!');
});
