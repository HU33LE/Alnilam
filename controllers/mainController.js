const express = require('express');
const app = express();
const usersController = require('./usersController');
const usersValidator = require('../validators/users');

const authController = require('./authController');


// middlewares
const validateErrorMw = require('../middlewares/user.middleware').validateErrors;

// ------------------------ Users routes --------------------------------

app.get('/users', usersController.index);

app.get('/users/:id', [usersValidator.getUser,validateErrorMw], usersController.show);
app.put('/users/:id', [usersValidator.putUser,validateErrorMw], usersController.update);

app.delete('/users/:id', usersController.deleteUser);

//------------------------- Auth routes ---------------------------------
app.post('/register', [usersValidator.postNewUser,validateErrorMw], authController.register);
app.post('/login', authController.login);


// -------


// ------------------------ End Of Users routes -------------------------


// ------------------------ Default Routes ------------------------------
app.get('*', (req, res) => res.status(404));
app.post('*', (req, res) => res.status(405));
app.put('*', (req, res) => res.status(405));
app.delete('*', (req, res) => res.status(405));
// ------------------------ End Of Default Routes ------------------------

module.exports = app;