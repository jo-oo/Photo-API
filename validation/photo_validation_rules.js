/**
 * Photo Validation Rules
 */

 const { body } = require('express-validator'); //express-validator - hjälper till att säkerställa så datan är säker, så lösenordet användaren skriver in är trimmat osv, att det är en viss längd mm. KALLAS SANITATION : att den renar datan
 const models = require('../models'); //reads the models


 /**
 * Create new Photo - Validation rules
 * POST /photos
 */
const createPhotoRules = [
   
	//checks that the user typed in a title, that it is a string, and minimum 3 chars long
    body('title').exists().isString().isLength({ min: 3 }).custom(async value => {  
        //function that checks if title already exists in database of that User
        const PhotoTitle = await new models.Photo({ title: value }).fetch({ require: false }); //refers to the model Photo
        
        //if Photo exists, reject
        if (PhotoTitle) {
            return Promise.reject("This Photo Title already exists.");
        }
        
        //else: resolve
		return Promise.resolve();
        }),

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
    body('PhotoTitle').optional().isString().isLength({ min: 3 }),
    //checks if the user typed in a URL, that it is a string
    body('url').optional().isURL().isString(),
    //checks if the user typed in a comment, that it is a string and minimum 3 chars long. 
    body('comment').optional().isString().isLength({ min: 3 })
];


module.exports = {
	createPhotoRules,
    updatePhotoRules,
};