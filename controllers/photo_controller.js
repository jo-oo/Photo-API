const { matchedData, validationResult } = require('express-validator');
const models = require('../models');

/** 
 * 1. Get all photos- method
 *
 * GET http://localhost:3000/users
 */ //en metod som gäller om du går direkt på controllern 
 const getAllPhotos = async (req, res) => {
	//const user = await models.User.fetchbyId();
	

	const user = await models.User.fetchById(req.user.user_id, { withRelated: ['photos'] });
	res.send({
		status: 'Detta är dina bilder:',
		data: user,			
	});
}

const getPhotoById = async (req, res) => {}


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
        // Models .Photo(model).save() sparar ettobjekt till databasen 
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
