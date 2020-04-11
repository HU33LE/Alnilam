const User = require('../Models/User'); 
const { check, validationResult } = require('express-validator');

let create = (req,res) => {
    console.log('llego una petición');
    
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