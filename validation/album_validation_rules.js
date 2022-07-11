/**
 * Album Validation Rules
 */

//express-validator - helps to make sure the data i safe, that the password the user types in is for example; trimmed, a certain length etc.
    //This is called Sanitization: that it cleanses the data
const { body } = require('express-validator'); 
const models = require('../models'); //reads the models

/**
 * Create new Album - Validation rules
 * POST /albums
*/
const createAlbumRules = [
   
	//checks that the user typed in a title, that it is a string, and minimum 3 chars long
    body('title').exists().isString().isLength({ min: 3 }).custom(async value => {  
        //function that checks if title already exists in database of that User
		const title = await new models.Album({ title: value }).fetch({ require: false }); //refers to the model Album
		
        //if Album exists, reject
        if (title) {
			return Promise.reject("This Album already exists.");
		}

        //else: resolve
		return Promise.resolve();
	}),
];

/** 
* Update Album validation rules
*/
const updateAlbumRules = [
    body('title').exists().isString().isLength({ min: 3 }),
];

/** 
* Add Photo to Album validation rules
*/
const addPhotoToAlbumRules = [
	//checks that the user typed in a photo id, that it is an int, and 
    body('photo_id').exists().isInt()       
];

module.exports = {
	createAlbumRules,
    updateAlbumRules,
    addPhotoToAlbumRules
};