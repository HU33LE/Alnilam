const User = require('../models/User');
const { validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');

const {SEED, tokenExpiration} = require('../config/data.config');
let register = (req,res) => {
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
                    error: 'Email is already taken'
                });
                return;
            } else {
                console.error(error.sqlMessage);
                res.status(500).json({
                    error: 'An error has ocurred'
                });
                return;
            }
        });
    
};

let login = (req,res) => {
    const body = req.body;

    const email = body.email;
    const password = body.password;

    User.findByEmail(email).then(user => {
        
        if(!user.isPasswordValid(password)){
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }
        const token = jwt.sign({ user: user.toJson() } , SEED, {expiresIn: tokenExpiration});

        user.apiToken = token;

        user.save();

        res.status(200).json({
            user: user
        });

        
    }).catch(err => {
        return res.status(401).json({
            error: err
        });
    });

    
    // leer base datos con usuario

    // validar que la contraseña en body = basedatos

    // if valid

    //    token = user.getToken()

    //    return token


};

let logut = (req,res) => {

};



module.exports.register = register;
module.exports.login = login;