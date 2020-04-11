const Sequelize = require('sequelize');

// Database configuration
module.exports = new Sequelize('alnilam', 'alnilam', '12345678', {
	host: 'db4free.net',
	port: '3306',
	dialect: 'mysql',
	operatorAliases: false,
	pool: {
		max: 1000,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
});



