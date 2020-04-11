const database = require ('./mariadb');

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
    }
});

module.exports.User = User;

// ------------------ Sync Models with Database -----------------

module.exports.User.sync({force: false}).then(()=>{
	console.log('Table User syncronized');
}).catch(()=>{
	console.error("Oops... Couldn't sync User's table");
});
