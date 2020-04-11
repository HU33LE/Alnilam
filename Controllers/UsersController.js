const User = require('../Models/User'); 
const { check, validationResult } = require('express-validator');

let create = async (req,res) => {
    console.log('llego una petición');
    await check('firstName').isEmpty();
    await check('lastName').isEmpty();
    await check('email').isEmail().isEmpty();
    await check('password').isLength({ min: 6 }).isEmpty();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
 
    console.log(errors);

    return res.send({
        res: 'mori'
    });
};

module.exports.create = create;