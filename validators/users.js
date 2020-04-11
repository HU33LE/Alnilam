const { check } = require('express-validator');

// Here define all validations and messages for new user request
module.exports.postNewUser = [
    check('firstName').notEmpty().withMessage('firstName field can not be empty'),
    check('lastName').notEmpty().withMessage('lastName field can not be empty'),
    check('email').notEmpty().withMessage('email field cant be empty'),
    check('email').isEmail().withMessage('email format is invalid'),
    check('password').notEmpty().withMessage('password field cant be empty'),
    check('password').isLength({ min: 6 }).withMessage('password field minimun length is 6'),
];