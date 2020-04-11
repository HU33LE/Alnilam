const database = require ('./mariadb');
const Sequelize = require('sequelize');

// ----------------- Declaration of models -----------------

// User Model
let User = database.define('user', {
    firstName: {
        type: Sequelize.STRING(100),
		allowNull: false
    },
    lastName: {
        type: Sequelize.STRING(100),
		allowNull: false
    },
    email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING(64),
		allowNull: false
    },
    passwordToken : {
        type: Sequelize.STRING(64),
		allowNull: false
    },
    apiToken : {
        type: Sequelize.STRING(64),
        allowNull: true,
        unique: true
    }
});

module.exports.User = User;

// ------------------ Sync Models with Database -----------------

module.exports.User.sync({force: false}).then(()=>{
	console.log('Table User syncronized');
}).catch((err)=>{
    console.error("Oops... Couldn't sync User's table");
    console.log(err);
});
