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

module.exports.getUser = [
	check('id').notEmpty().withMessage('id field can not be empty'),
	check('id').isInt({ min: 1 }).withMessage('id field must be a positive integer')
];

module.exports.putUser = [
    check('firstName').optional().notEmpty().withMessage('firstName field can not be empty'),
    check('lastName').optional().notEmpty().withMessage('lastName field can not be empty'),
    check('email').optional().notEmpty().withMessage('email field cant be empty'),
    check('email').optional().isEmail().withMessage('email format is invalid')
];

module.exports.putUserPassword = [
	check('password').notEmpty().withMessage('password field cant be empty'),
	check('password').isLength({ min: 6 }).withMessage('password field minimun length is 6'),
	check('newPassword').notEmpty().withMessage('newPassword field cant be empty'),
	check('newPassword').isLength({ min: 6 }).withMessage('newPassword field minimun length is 6'),
	check('newPasswordConfirmation').notEmpty().withMessage('newPasswordConfirmation field cant be empty'),
	check('newPasswordConfirmation').isLength({ min: 6 }).withMessage('newPasswordConfirmation field minimun length is 6'),
];