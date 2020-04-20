const User = require('../models/User');
const { validationResult } = require('express-validator');

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

let index = (req,res) => {
	/* database.User.findAll({}).then( users => {
		res.json(users);
	}).catch( err => {
		res.json(err);
	}) */

	User.findAll().then(users => {
		let result = users.map( user => user.toJson());

		res.json(result);
	}).catch( err => {
		console.error(err);
		res.status(500).json({
			msg: "An error has occurred"
		});
	})
}

let show = (req, res) => {
	const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

	let userId = req.params.id;

	User.findById(userId).then(user => {
		if(user === null)
			return res.status(404).json({
				msg: `Not user found with id [${userId}]`
			})

		let result = user.toJson();
		res.json(result);
	}).catch( err => {
		console.error(err); 
		res.status(500).json({
			msg: "An error has ocurred"
		});
	})
}

let update = (req, res) => {
	const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
	}
	
	let userId = req.params.id;

	User.findById(userId).then( user => {
		if(user === null)
			return res.status(400).json({
				msg: `Not user found with id [${userId}]`
			});

		if(req.body.firstName)
			user.firstName = req.body.firstName.trim();

		if(req.body.lastName)
			user.lastName = req.body.lastName.trim();

		if(req.body.email)
			user.email = req.body.email.trim();

		user.save().then(user => {
			let result = user.toJson();
			res.json(result);
		}).catch(err => {
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
		})
	}).catch( err => {
		console.error(err);
		res.status(500).json({
			msg: "An error has occurred"
		});
	})
}

let changePassword = (req, res) => {
	/**
	 * The next code until mark should be moved to a middleware
	 * to avoid duplicating code without needing it
	 */
	const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
	}
	// --------- End of the code about the comment ---------

	// Continue here tomorrow c: 


}

let deleteUser = (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    let = userId = req.params.id;

    User.findById(userId).then( user => {
		if(user === null)
			return res.status(400).json({
				msg: `Not user found with id [${userId}]`
            });  

        user.destroy(userId).then( user => {
            res.status(204).json(user.toJson());
        }).catch(err => {
            console.error(err);
            res.status(500).json({
                msg: 'An error has occurred'
            });
        });
    });
}

module.exports.create = create;
module.exports.index = index;
module.exports.show = show;
module.exports.update = update;
module.exports.deleteUser = deleteUser;