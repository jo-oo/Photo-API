//creates a model called "Photo". Exports the table "photos"
module.exports = bookshelf => {
	return bookshelf.model(
		'Photo', //my models name
		{
			tableName: 'photos', //based on table "photos"
			hidden: ['_pivot_album_id', '_pivot_photo_id'], //hide this data in the respons
			albums() {
				return this.belongsToMany('Album'); //creates a relation between photos table and Album-model
			},
			users() {
				return this.belongsTo('User'); //creates a relation between photos table and User-model
			},
		},
		{
			async fetchById(id, fetchOptions = {}) {
				return await new this({ id }).fetch(fetchOptions);
			},
		}
	);
};