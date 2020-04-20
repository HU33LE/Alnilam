const express = require('express');
const __PORT = 3000;
const bodyParser = require('body-parser');
const app = express();
const database = require ('./database/mariadb');

// --------------- DECLARATION OF MIDDLEWARE -------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const mainController = require('./controllers/mainController');

app.use(mainController);

database.authenticate()
  .then(() => {
    console.log(
      "Database is connected [\x1b[32m%s\x1b[0m ]",
      " ONLINE"
    );
  }
  ).catch( 
    err => console.log(err)
);

app.listen(__PORT, function () {
  console.log(
    "Server is running on port " + __PORT + " [\x1b[32m%s\x1b[0m ]",
    " ONLINE"
  );
});
