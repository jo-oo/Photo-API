/**
* Album Controller
*/

const models = require('../models');
const debug = require('debug')('controllers:album_controller');
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

/** 
 * 1. Store a new album- method
 *
 * POST http://localhost:3000/albums
 */ 
   
 const createAlbum = async (req, res) => {
    //check for validation errors first
	const errors = validationResult(req);

    //if errors, show them
    if (!errors.isEmpty()) {
        return res.status(400).send({
            status: 'fail',
            data: errors.array()
        });
    }

    // Get the request data after it has gone through the validation
    const validData = matchedData(req);

    // Apply the users id to the validated data, to be used when creating new photo
    validData.user_id = req.user.user_id;
	
    try {
        //saves a object to the database
        const newAlbum = await new models.Album(validData).save();

        // Inform the user that the album was created
        res.status(201).send({
            status: 'success',
            data: {
                "title": validData.title,
                "url": validData.url,
                "comment": validData.comment,
                "user_id": validData.user_id,
                "id": newAlbum.id
            }
        })

    } catch (error) {
        // Throw an error if creating an album failed
        res.status(500).send({
            status: 'Error',
            message: 'Issues when creating a new album'
        });
        throw error;
    }
}



/** 
 * 3. Update album by ID - method
 *
 * PUT http://localhost:3000/albums/:albumId
 */
 const updateAlbum = async (req, res) => {
	//get users albums
	const user = await models.User.fetchById(req.user.user_id, { withRelated: ['albums'] });
	
	//get album by id
	const usersAlbum = user.related('albums').find(album => album.id == req.params.albumId);
  
	//check if album exists
	if (!usersAlbum) {
	  //debug('Album to update was not found. %o', { id: req.params.albumId });
	  res.status(404).send({
		  status: 'fail',
		  data: 'Album Not Found' + req.params.albumId,
	  });
	  return;
	}
  
	//check that the album belongs to the user, otherwise: reject the request
	if (!usersAlbum) {
	 /*
	  debug('Cannot update due to album belongs to another user. %o', {
		  id: req.params.albumId,
	  });
	  */
	  return res.status(403).send({
		  status: 'fail',
		  data: 'This album is not yours!',
	  });
	 }
	  
	 //check for validation errors first
	  const errors = validationResult(req);
  
	  //if errors, show them
	  if (!errors.isEmpty()) {
		  return res.status(400).send({
			  status: 'fail',
			  data: errors.array()
		  });
	  }
  
	  // Get the request data after it has gone through the validation
	  const validData = matchedData(req);
  
	  try {
		  const updatedAlbum = await usersAlbum.save(validData);
		  debug('Updated photo successfully: %O', updatedAlbum);
  
		  res.send({
			  status: 'success',
			  data: updatedAlbum,
		  });
	  } catch (error) {
		  res.status(500).send({
			  status: 'error',
			  message: 'Exception thrown in database when updating a new album.',
		  });
		  throw error;
	  }
  }
  








const postAlbum = async (req, res) => {

	res.send({
		status: 'post album',

	});
}
module.exports = {
	getAllAlbums,
	showAlbum,
	createAlbum,

	updateAlbum,
	postAlbum
}
