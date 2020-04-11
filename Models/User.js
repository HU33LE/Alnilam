const database = ('../Database/Models');

let User = class User {
	constructor(args) {
		this._id = undefined;
		this._firstName = undefined;
		this._lastName = undefined;
		this._password = undefined;

		if(args) {
			for(key of args) {
				this[`_${key}`] = args[key];
			}
		}
	}
}