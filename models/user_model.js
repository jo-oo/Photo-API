
//Bookshelf-Modell som returnerar databasens namn och tabellen user

module.exports = (bookshelf) => {
	return bookshelf.model('photo_api', { //photo_api = databasens namn
		tableName: 'user', // tableName = tabellen user
	});
};