
//Bookshelf-Modell som returnerar databasens namn och tabellen user
const bcrypt = require('bcrypt');

module.exports = (bookshelf) => {
	return bookshelf.model(
		'User', { //bookshelf skapar en model av tabellen Users (modellen kallas User)
		tableName: 'Users', // tableName = tabellen Users
		photos() {// deklarera vilken relation User har till Photo i det här fallet har en User flera Photo
			return this.hasMany('Photo');
		},
		tableName: 'Users',
	
		albums() {
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
		async fetchById(id, fetchOptions = {}) {
			return await new this({ id }).fetch(fetchOptions);
		},
	}
	);
};

