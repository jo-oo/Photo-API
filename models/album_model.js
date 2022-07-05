
//Exports the albums table, creates a model called "Album"
module.exports = bookshelf => {
	return bookshelf.model(
		'Album', //my models name
		{
			tableName: 'albums', //based on table "albums"
			users() {
				return this.belongsTo('User'); //creates a relation between albums table and User-model
			},
			tableName: 'albums',
			photos() {
				return this.belongsToMany('Photo'); //creates a relation between albums table and Photo-model
			},
		},
		{
			async fetchById(id, fetchOptions = {}) {
				return await new this({ id }).fetch(fetchOptions);
			}
		},
	);
};