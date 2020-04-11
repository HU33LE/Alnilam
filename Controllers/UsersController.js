const User = require('../Models/User'); 
const { validationResult } = require('express-validator');

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

    let user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }

    //Validate data input here

   /*  if(!user.firstName || user.firstName.trim().length === 0){
        errors.push({
            field: 'firstName',
            error: 'This field is required'
        });
    }

    if(!user.lasyName || user.lasyName.trim().length === 0){
        errors.push({
            field: 'lastName',
            error: 'This field is required'
        });
    }

    if(!user.email || user.email.trim().length === 0){
        errors.push({
            field: 'email',
            error: 'This field is required'
        });
    } else {
        
    }

    if(!user.password || user.password.trim().length === 0){
        errors.push({
            field: 'password',
            error: 'This field is required'
        });
    } */

    user.firstName = user.firstName.trim().toLowerCase();
    user.lastName = user.lastName.trim().toLowerCase();
    user.email = user.email.trim().toLowerCase();
};

module.exports.create = create;