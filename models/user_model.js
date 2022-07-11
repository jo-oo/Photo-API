
/**
 * User model. A model/ mirror of the database table User.
 * declares it´s relations to other tables, the way it´s set up in the database. 
 * Bookshelf holds these models and how they look, in our code
*/

//Bookshelf model that returns the name of the database and the user table
const bcrypt = require('bcrypt');

//exports the "users"" table, creates a model called "User"
module.exports = (bookshelf) => {
	return bookshelf.model(
		'User', { //bookshelf creates a model of the users table (the model is called User)
		tableName: 'users', // tableName = the users table
		photos() { //declares which relation User has to photos. In this case: a User has many Photos
			return this.hasMany('Photo');
		},
		tableName: 'users',
		albums() { //declares which relation User has to albums. In this case: a User has many Albums
			return this.hasMany('Album');
		},
	},
	{
		async login(email, password) {
			const user = await new this({ email }).fetch({ require: false });
			if (!user) {
				return false;
			}
			//gets the hashed password from the database
			const hash = user.get('password');

			//use bcrypt to compare the password that was sent in (password) towards that in the database (hash)
			const result = await bcrypt.compare(password, hash);
			if (!result) {
				return false;
			}
			return user;
		},

		//fetchOptions is set to default to an empty object
		//gets a specific user with it´s relation
		async fetchById(id, fetchOptions = {}) {
			return await new this({ id }).fetch(fetchOptions);
		},
	});
};

