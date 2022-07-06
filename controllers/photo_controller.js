const { matchedData, validationResult } = require('express-validator');
const debug = require('debug')('controllers:photo_controller');
const models = require('../models');


/** 
 * 1. Get all photos- method
 *
 * GET http://localhost:3000/photos
 */ 
 const getAllPhotos = async (req, res) => {	
    //get users photos
	const user = await models.User.fetchById(req.user.user_id, { withRelated: ['photos'] });
	res.send({
		status: 'Detta är dina bilder:',
		data: {
			photo: user.related('photos'), //only gets the photos-array
		},
	});
}

/** 
 * 2. Get photo by ID - method
 *
 * GET http://localhost:3000/photos/:photoId
 */
const getPhotoById = async (req, res) => {
    //get users photos
    const user = await models.User.fetchById(req.user.user_id, { withRelated: ['photos'] });
	//gets the photos-array from user and uses find method over that photos-array to find specific id
    //Get your specific photo by typing ex: /1 in the route (for photo with id 1)
    const usersPhoto = user.related('photos').find(photo => photo.id == req.params.photoId);

    //if fail
    if (!usersPhoto) {
		return res.status(404).send({
			status: 'failed to get photo by id /' + req.params.photoId,
			message: 'Photo with this id was not found',
		});
	}

    //if request suceeded, send this back to the user: 
	res.status(200).send({
		status: 'success',
		data: {
			photo: usersPhoto,
		},
	});

}



const createPhoto = async (req, res) => {
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
        const newPhoto = await new models.Photo(validData).save();

        // Inform the user that the photo was created
        res.status(201).send({
            status: 'success',
            data: {
                "title": validData.title,
                "url": validData.url,
                "comment": validData.comment,
                "user_id": validData.user_id,
                "id": newPhoto.id
            }
        })

    } catch (error) {
        // Throw an error if creating a photo failed
        res.status(500).send({
            status: 'Error',
            message: 'Issues when creating a new photo'
        });
        throw error;
    }

}



/** 
 * 3. Update photo by ID - method
 *
 * PUT http://localhost:3000/photos/:photoId
 */
const updatePhoto = async (req, res) => {
  //get users photos
  const user = await models.User.fetchById(req.user.user_id, { withRelated: ['photos'] });
  
  //get photo by id
  const usersPhoto = user.related('photos').find(photo => photo.id == req.params.photoId);

  //check if photo exists
  if (!usersPhoto) {
    //debug('Photo to update was not found. %o', { id: req.params.photoId });
    res.status(404).send({
        status: 'fail',
        data: 'Photo Not Found' + req.params.photoId,
    });
    return;
  }

  //check that the photo belongs to the user, otherwise: reject the request
  if (!usersPhoto) {
   /*
    debug('Cannot update due to photo belongs to another user. %o', {
        id: req.params.photoId,
    });
    */
    return res.status(403).send({
        status: 'fail',
        data: 'Not your photo!',
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
		const updatedPhoto = await usersPhoto.save(validData);
		debug('Updated photo successfully: %O', updatedPhoto);

		res.send({
			status: 'success',
			data: updatedPhoto,
		});
	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when updating a new photo.',
		});
		throw error;
	}
}





//Export methods
module.exports = {
	getAllPhotos,
	getPhotoById,
	createPhoto,
	updatePhoto
}
