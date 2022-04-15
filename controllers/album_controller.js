//Export methods

const index = async (req, res) => {

	res.send({
		status: 'index',

	});
}

const showAlbum = async (req, res) => {

	res.send({
		status: 'show album',

	});
}

const storeAlbum = async (req, res) => {

	res.send({
		status: 'store album',

	});
}


const updateAlbum = async (req, res) => {

	res.send({
		status: 'update album',

	});
}

const postAlbum = async (req, res) => {

	res.send({
		status: 'post album',

	});
}
module.exports = {
	index,
	showAlbum,
	storeAlbum, //=register
	updateAlbum,
	postAlbum
}
