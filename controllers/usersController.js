const User = require('../models/User'); 
const { check, validationResult } = require('express-validator');

let create = (req,res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let attrs = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };

    let user = new User(attrs);

    user.password = req.body.password;

    user.save().then( (_user) => {
        res.status(201).json(_user.toJson());
    }).catch( (err) => {
        const error = err.original;
        if(error.errno === 1062){
            res.status(409).json({
                ok: false,
                error: 'Email is already taken'
            });
            return;
        } else {
            console.error(error.sqlMessage);
            res.status(500).json({
                ok: false,
                error: 'An error has ocurred'
            });
            return;
        }
    });
};

let index = (req,res) => {
    let users = User.findAll({
        attributes: ['*']
    }).then( (users) => {
        res.json(users);
    }).catch((err) => {
        console.error(err);
        res.status(500);

    });
}

module.exports.create = create;
module.exports.index = index;