/**
* Album Controller
*/

const models = require('../models');
const { matchedData, validationResult } = require('express-validator');

/*
const index = async (req, res) => {


	res.status(200).send({
		status: 'success',
		data: {
		
		},
	});
	
}
*/



/* GET all albums */
//1. GET from url http://localhost:3000/albums
 const index = async (req, res) => {
	
	const user = await models.User.fetchById(req.user_id, {
		withRelated: ['albums'],
	});

	res.status(200).send({
		status: 'success',
		data: {
			album: user.related('albums'),
		},
	});

	
	
};

const showAlbum = async (req, res) => {

	 const album = await models.User.fetchById(req.params.albumId, {
		withRelated: ['albums'],
	});

	if(!album){
		res.status(200).send({
			status: "no albums found for :" + req.params.albumId,
		
		});
	}

	res.status(200).send({
		status: req.params.albumId,
		data: album
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
