/**
* Album Controller
*/

const models = require('../models');
const { matchedData, validationResult } = require('express-validator');

/** 
 * 1. Get all albums- method
 *
 * GET http://localhost:3000/albums
 */ 
 const getAllAlbums = async (req, res) => {	
    //get users albums
	const user = await models.User.fetchById(req.user.user_id, { withRelated: ['albums'] });
	res.status(200).send({
		status: 'Detta är dina album:',
		data: {
			album: user.related('albums'), //only gets the albums-array
		},
	});
}

/** 
 * 1. Get specific album- method
 *
 * GET http://localhost:3000/albums/albumId
 */ 


const showAlbum = async (req, res) => {
 	//get users albums
 	const user = await models.User.fetchById(req.user.user_id, { withRelated: ['albums'] });
	
	//gets the albums-array from user and uses find method over that array to find specific id
    const usersAlbum = user.related('albums').find(album => album.id == req.params.albumId);
		
		//if not found the users album
		if(!usersAlbum){
			res.status(404).send({
				status: "no albums found for :" + req.params.albumId,
				message: 'Photo with this id was not found',
			});
		}

   	 	//if request suceeded, send this back to the user: 
		res.status(200).send({
			status: 'success' + req.params.albumId,
			data: {
				album: usersAlbum,
			},
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
	getAllAlbums,
	showAlbum,
	storeAlbum, //=register
	updateAlbum,
	postAlbum
}
