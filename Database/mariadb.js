const Sequelize = require('sequelize');

// Database configuration
module.exports = new Sequelize('ucodbspr_orions_belt', 'ucodbspr_orions_belt_user', 'r(pi2U2IasWp', {
	host: '199.188.201.88',
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



