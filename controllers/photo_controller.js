const { matchedData, validationResult } = require('express-validator');
const models = require('../models');

/** 
 * 1. Get all photos- method
 *
 * GET http://localhost:3000/photos
 */ //
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
 * 1. Get photo by ID - method
 *
 * GET http://localhost:3000/photos/:photoId
 */ //

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

	const errors = validationResult(req);
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
        //sparar ett objekt till databasen 
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
const updatePhoto = async (req, res) => {}
//Export methods
module.exports = {
	getAllPhotos,
	getPhotoById,
	createPhoto,
	updatePhoto
}
