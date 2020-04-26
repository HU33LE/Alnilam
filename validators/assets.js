const { check } = require('express-validator');

// Here define all validations and messages for new user request
module.exports.postNewAsset = [
    check('name').notEmpty().withMessage('name field can not be empty'),
    check('description').optional().notEmpty().withMessage('description field can not be empty'),
    check('userId').notEmpty().withMessage('userId field can not be empty'),
];

module.exports.getAsset = [
	check('id').notEmpty().withMessage('id field can not be empty'),
	check('id').isInt({ min: 1 }).withMessage('id field must be a positive integer')
];

module.exports.putAsset = [
    check('name').optional().notEmpty().withMessage('name field can not be empty'),
    check('description').optional().notEmpty().withMessage('name field can not be empty'),
];