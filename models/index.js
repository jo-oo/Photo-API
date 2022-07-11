//setting up the database connection using knex
const knex = require('knex')({
	debug: true,
	client: 'mysql',
	connection: process.env.CLEARDB_DATABASE_URL || {
		host: process.env.DB_HOST || 'localhost',
		port: process.env.DB_PORT || 3306,
		charset: process.env.DB_CHARSET || 'utf8mb4',
		database: process.env.DB_NAME || 'Photo-API',
		user: process.env.DB_USER || 'root',
		password: process.env.DB_PASSWORD || '',
	}
});

const bookshelf = require('bookshelf')(knex);

//adding the bookshelf-modules
const models = {};
models.Photo = require('./photo_model')(bookshelf);
models.User = require('./user_model')(bookshelf);
models.Album = require('./album_model')(bookshelf);

//export modules
module.exports = {
	bookshelf,
	...models,
};
