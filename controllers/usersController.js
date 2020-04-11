const User = require('../models/User'); 
const { check, validationResult } = require('express-validator');

let create = (req,res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
};

module.exports.create = create;