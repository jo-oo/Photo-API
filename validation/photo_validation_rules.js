/**
 * Photo Validation Rules
 */

//express-validator - helps to make sure the data i safe, that the password the user types in is for example; trimmed, a certain length etc.
    //This is called Sanitization: that it cleanses the data
const { body } = require('express-validator');
const models = require('../models'); //reads the models

/**
 * Create new Photo - Validation rules
 * POST /photos
*/
const createPhotoRules = [
	//checks that the user typed in a title, that it is a string, and minimum 3 chars long
    body('title').exists().isString().isLength({ min: 3 }),
    //checks that the user typed in a URL, that it is a string
    body('url').exists().isURL().isString(),
    //checks if the user typed in a comment, that it is a string and minimum 3 chars long. 
    body('comment').optional().isString().isLength({ min: 3 })
];

/** 
* Update Photo validation rules
Updates are optional, not required from user
*/
const updatePhotoRules = [
	//checks if the user typed in a title, that it is a string, and minimum 3 chars long
    body('title').exists().isString().isLength({ min: 3 }),
    //checks if the user typed in a URL, that it is a string
    body('url').optional().isURL().isString(),
    //checks if the user typed in a comment, that it is a string and minimum 3 chars long. 
    body('comment').optional().isString().isLength({ min: 3 })
];

module.exports = {
	createPhotoRules,
    updatePhotoRules
};