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

let Asset = database.define('asset', {
    name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT('long'),
        allowNull: true
    },
    collectionHash: {
        type: Sequelize.STRING(64),
        allowNull: false,
        unique: true
    }
});

// ----------------- Declaration of relationships -----------------
Asset.belongsTo(User);

module.exports.Asset = Asset;
module.exports.User = User;

User.sync({alter: true}).then(() => {
    console.log("User table synchronized successfully");
}).catch(err => {
    console.error(err);
});

Asset.sync({alter: true}).then(() => {
    console.log("Asset table synchronized successfully");
}).catch(err => {
    console.error(err);
});