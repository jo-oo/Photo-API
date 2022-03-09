// Setting up the database connection
const knex = require('knex')({
	debug: true,
	client: 'mysql',
	connection: {
		host: process.env.DB_HOST || 'localhost',
		port: process.env.DB_PORT || 3306,
		charset: process.env.DB_CHARSET || 'utf8mb4',
		database: process.env.DB_NAME || 'boilerplate',
		user: process.env.DB_USER || 'boilerplate',
		password: process.env.DB_PASSWORD || '',
	}
});

const bookshelf = require('bookshelf')(knex);

//här lägger jag in bopokshelf-modulerna
const models = {};
models.Example = require('./Example')(bookshelf);
models.Users = require('./user_model')(bookshelf);

//här exporterar jag modulerna
module.exports = {
	bookshelf,
	...models,
};
