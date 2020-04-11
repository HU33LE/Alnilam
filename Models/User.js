const database = ('../Database/mariadb.js');

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
        type: Sequelize.STRING(100),
		allowNull: false
    }
});
module.exports.user = User;