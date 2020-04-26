const Sequelize = require('sequelize');

// Database configuration
module.exports = new Sequelize('ucodbspr_alnilam', 'ucodbspr_miniaikon', 'Laravel#5', {
	host: 'localhost',
	port: '3307',
	dialect: 'mysql',
	operatorAliases: false,
	pool: {
		max: 1000,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	logging: false
});



