const database = require ('../Database/Models');
const crypto = require ('crypto-js');
const stringHelper = require('../Helpers/stringHelper');

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
			for(key of args) {
				this[`_${key}`] = args[key];
			}
		}
    }

    hashPassword (password){
        let passwordToken = this._passwordToken;
        let hashable = passwordToken.substr(0,32)+ password + passwordToken.substr(32);
        let hash = crypto.createHash('sha256').update(hashable).digest('hex');

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

    toJson(inner = false){
        let json = {
            id: this._id,
            firstName: this._firstName,
            lastName: this._lastName,
            email: this._email
        };

        if(inner){
            json.password = this._password;
            json.passwordToken = this._passwordToken;
            json.apiToken = this._apiToken;
        }

        return json;
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



    
    

}