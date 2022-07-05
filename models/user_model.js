
/**
 * User model. A model/ mirror of the database table User.
 * Declares it´s relations to other tables, the way it´s set up in the database. 
 * Bookshelf holds these models and how they look, in our code
*/

//Bookshelf-Modell som returnerar databasens namn och tabellen user
const bcrypt = require('bcrypt');

//Exports the "users"" table, creates a model called "User"
module.exports = (bookshelf) => {
	return bookshelf.model(
		'User', { //bookshelf skapar en modell av tabellen users (modellen kallas User)
		tableName: 'users', // tableName = tabellen users
		photos() {// deklarera vilken relation User har till photos i det här fallet har en User flera Photo
			return this.hasMany('Photo');
		},
		tableName: 'users',
		albums() { // deklarera vilken relation User har till photos i det här fallet har en User flera Album
			return this.hasMany('Album');
		},
	},
	{
		async login(email, password) {
			const user = await new this({ email }).fetch({ require: false });
			if (!user) {
				return false;
			}
			//Hämtar det hashade lösenordet från db
			const hash = user.get('password');

			//använd bcrypt för att jämnföra det lösenordet som skickades in (password) mot det som fanns i db (hash)
			const result = await bcrypt.compare(password, hash);
			if (!result) {
				return false;
			}
			return user;
		},

		// fetchOptions sätts som default till ett tomt objekt 
		//hämtar en specifik användare med dess realtion
		async fetchById(id, fetchOptions = {}) {
			return await new this({ id }).fetch(fetchOptions);
		},
	});
};

