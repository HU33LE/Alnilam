const { check } = require('express-validator');

// Here define all validations and messages for new user request
module.exports.postNewAsset = [
    check('name').notEmpty().withMessage('name field can not be empty'),
    check('description').optional().notEmpty().withMessage('description field can not be empty'),
    check('userId').notEmpty().withMessage('userId field can not be empty'),
];

