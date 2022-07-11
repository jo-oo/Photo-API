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

    //get the related photos without user_id
    const photos = user.related('photos').toJSON().map( (photo) => {
        return {
            id: photo.id, 
            title: photo.title, 
            url: photo.url, 
            comment: photo.comment
        };
    });

	res.status(200).send({
		status: 'success',
		data: photos
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
    //get your specific photo by typing ex: /1 in the route (for photo with id 1)
    const usersPhoto = user.related('photos').toJSON().map( (photo) => {
        return {
            id: photo.id, 
            title: photo.title, 
            url: photo.url, 
            comment: photo.comment
        };
    }).find(photo => photo.id == req.params.photoId);

    //if fail
    if (!usersPhoto) {
		return res.status(404).send({
			status: 'fail',
			message: 'Photo with this id was not found',
		});
	}

    //if request suceeded, send this back to the user: 
	res.status(200).send({
		status: 'success',
		data: usersPhoto,
	});
}

/** 
 * 3. Create photo - method
 *
 * POST http://localhost:3000/photos/
 */
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

    //get the request data after it has gone through the validation
    const validData = matchedData(req);

    //apply the users id to the validated data, to be used when creating new photo
    validData.user_id = req.user.user_id;
	
    try {
        //saves a object to the database
        const newPhoto = await new models.Photo(validData).save();

        //inform the user that the photo was created
        res.status(200).send({
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
        //throw an error if creating a photo failed
        res.status(500).send({
            status: 'Error',
            message: 'Issues when creating a new photo'
        });
        throw error;
    }
}

/** 
 * 4. Update photo by ID - method
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
        res.status(404).send({
            status: 'fail',
            data: 'Photo Not Found',
        });
    return;
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

    //get the request data after it has gone through the validation
    const validData = matchedData(req);

	try {
		const updatedPhoto = await usersPhoto.save(validData);
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

/** 
 * 5. Delete photo by ID - method
 *
 * DELETE http://localhost:3000/photos/:photoId
 */
 const deletePhoto = async (req, res) => {
	//get users photos
	const user = await models.User.fetchById(req.user.user_id, { withRelated: ['photos'] });
	
	//get photo by id
	const usersPhoto = user.related('photos').find(photo => photo.id == req.params.photoId);

	//check if photo exists
	if (!usersPhoto) {
	    res.status(404).send({
		    status: 'fail',
		    data: 'Photo not found',
	    });
	return;
	}
	try {
        //detach album
        await usersPhoto.albums().detach();
		//delete photo
        await usersPhoto.destroy();
		    res.status(200).send({
                status: 'success',
                data: null,
		    });
	    } catch (error) {
		    res.status(500).send({
                status: 'error',
                message: 'Exception thrown in database when deleting photo.',
		    });
		throw error;
	}
}

//Export methods
module.exports = {
	getAllPhotos,
	getPhotoById,
	createPhoto,
	updatePhoto,
    deletePhoto
}
