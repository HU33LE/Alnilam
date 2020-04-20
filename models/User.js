const database = require ('../database/models');
const crypto = require ('crypto-js');
const stringHelper = require('../helpers/stringHelper');

let User = class User {
	constructor(args = {}) {
		this._id = undefined;
		this._firstName = undefined;
        this._lastName = undefined;
        this._email = undefined;
        this._password = undefined;
        this._passwordToken = stringHelper.random(64);
        this._apiToken = undefined;

		if(args) {
			for(let key in args) {
				this[`_${key}`] = args[key];
			}
		}
	}

    hashPassword (password){
        let passwordToken = this._passwordToken;
        let hashable = passwordToken.substr(0,32)+ password + passwordToken.substr(32);
        let hash = crypto.SHA256(hashable).toString();
        return hash;
    }

    save (){
        return new Promise((res,rej) => {
            if(this._id === undefined){
                //Create in DataBase
                let user = this.toJson(true);
                database.User.create(user).then(row => {
                    this._id = row.id; 
                    res(this);
                }).catch((err) => {
                    rej(err);
                });
            } else {
                //Update in DataBase
                let user = this.toJson(true);
                
                database.User.findOne({
                    where: {
                        id: this._id
                    }
                }).then(_user => {
                    _user.update(user).then(row =>{
                        res(this);
                    }).catch(err => {
                        rej(err);
                    });
                }).catch(err => {
                    rej(err);
                });
            }
        });
    };

    destroy (){
        return new Promise((res,rej) => {
            if(this._id === undefined){
                err = new Error('No user to delete');
                rej(err);
            } else {
                //Delete User
                
                database.User.findOne({
                    where: {
                        id: this._id
                    }
                }).then(user => {
                    user.destroy().then(row =>{
                        res(this);
                    }).catch(err => {
                        rej(err);
                    });
                }).catch(err => {
                    rej(err);
                });
            }
        });
    }

    toJson(inner = false){
        let json = {
            id: this._id,
            firstName: this._firstName,
            lastName: this._lastName,
            email: this._email,
            token: this._apiToken
        };

        if(inner){
            json.password = this._password;
            json.passwordToken = this._passwordToken;
        }

        return json;
    }

    /**
     * @description this function checks if the given password is equal to the user hashed passowrd
     * @param {string} password request password
     * @returns {bool}
     */
    isPasswordValid(password){
        const hash = this.hashPassword(password);
        return hash === this._password;
    }

    set firstName (_firstName){
        this._firstName = _firstName; 
    }

    get firstName (){
        return this._firstName;
    }

    set lastName (_lastName){
        this._lastName = _lastName; 
    }

    get lastName (){
        return this._lastName;
    }

    set email (_email){
        this._email = _email; 
    }

    get email (){
        return this._email;
    }

    set password (_password){
        this._password = this.hashPassword(_password); 
    }

    get password (){
        return this._password;
    }

    get apiToken (){
        return this._apiToken;
    }

    set apiToken (token){
        this._apiToken = token;
    }
}



/** 
 * Emulate Sequelize.findAll method, but returning
 * instances of User instead of raw database info
 */
User.findAll = (obj = {}) => {
	return new Promise( (res, rej) => {
		database.User.findAll(obj).then( rawUsers => {
			let users = rawUsers.map( rawUser => {
				return new User(rawUser.dataValues);
			});

			res(users);
		}).catch( err => {
			rej(err);
		});
	});
};

/**
 * Emulate Sequelize.findOne method, but returning
 * instances of User instead of raw database info
 */
User.findOne = (obj = {}) => {
	return new Promise( (res, rej) => {
		database.User.findOne(obj).then( rawUser => {
			if(!rawUser) 
				res(null);

			let user = new User(rawUser.dataValues);
			res(user);
		}).catch( err => {
			rej(err);
		});
	});
};

/**
 * Emulate Sequelize.findOne method, but returning
 * instances of User instead of raw database info
 */
User.findById = (id) => {
	return new Promise( (res, rej) => {
		database.User.findByPk(id).then( rawUser => {
			if(!rawUser) 
				res(null);

			let user = new User(rawUser.dataValues);
			res(user);
		}).catch( err => {
			rej(err);
		});
	});
};

/**
 * Emulate Sequelize.findOne method with email where condition, but returning
 * an instance of User instead 
 */
User.findByEmail = (email) => {
	return new Promise( (res, rej) => {
		database.User.findOne({
            where: {
                email: email
            }
        }).then( rawUser => {
			if(!rawUser) 
				res(null);

            let user = new User(rawUser.dataValues);
            

			res(user);
		}).catch( err => {
			rej(err);
		});
	});
};


module.exports = User;