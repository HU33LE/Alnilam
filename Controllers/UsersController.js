const models = require('../Database/Models');

let create = (req,res) => {
    let user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }

    //Validate data input here

    user.firstName = user.firstName.trim().toLowerCase();
    user.lastName = user.lastName.trim().toLowerCase();
    user.email = user.email.trim().toLowerCase();

    models.User.create(user).then(row => {
        res.send(row);
    });

};

module.exports.create = create;