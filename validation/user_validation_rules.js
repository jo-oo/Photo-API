/**
 * Register User Validation Rules
 */
//express-validator - helps to make sure the data i safe, that the password the user types in is for example; trimmed, a certain length etc.
    //This is called Sanitization: that it cleanses the data
const { body } = require('express-validator');
const models = require('../models'); //reads the models

/**
 * Create new User - Validation rules
 *
 * Required from the new user: email, password, first_name, last_name
 * Optional: -
*/
const createUserRules = [
   
	//checks that the user typed in a email, that it is a string, is a valid email-address, and minimum 5 chars long
    body('email').exists().isString().isEmail().isLength({ min: 3 }).custom(async value => {  
        //function that checks if email already exists in database
		const email = await new models.User({ email: value }).fetch({ require: false }); //använder User-modellen
		
        //if email exists, reject
        if (email) {
			return Promise.reject("This email already exists.");
		}
        //else: resolve
		return Promise.resolve();
	}),
    //checks that the user typed in a password, that it is a string amd that it is at least 6 characters long
	body('password').exists().isString().isLength({ min: 6 }),
    //checks that the user typed in a first name, that it is a string amd that it is at least 3 characters long
	body('first_name').exists().isString().isLength({ min: 3 }),
    //checks that the user typed in a last name, that it is a string amd that it is at least 3 characters long
	body('last_name').exists().isString().isLength({ min: 3 }),
   
];

/**
 * Login User - Validation rules
 *
 * Required from the new user: email, password
 * Optional: -
*/
  const loginUserRules = [
	//checks that the user typed in a email, that it is a string, is a valid email-address, and minimum 3 chars long
    body('email').exists().isString().isEmail().isLength({ min: 3 }),
    //checks that the user typed in a password, that it is a string and that it is at least 6 characters long
	body('password').exists().isString().isLength({ min: 6 }), 
];
          
module.exports = {
	createUserRules,
    loginUserRules
}