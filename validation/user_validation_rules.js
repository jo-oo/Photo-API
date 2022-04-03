/**
 * Register User Validation Rules
 */

 const { body } = require('express-validator'); //express-validator - hjälper till att säkerställa så datan är säker, så lösenordet användaren skriver in är trimmat osv, att det är en viss längd mm. KALLAS SANITATION : att den renar datan
 const models = require('../models');


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
		const email = await new models.Users({ email: value }).fetch({ require: false });
		
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

* Update User validation rules
*
* Required: -
* Optional: password, first_name, last_name
*///Optional user validation rules for update of user
/*
const updateUserRules = [
    body('password').optional().isString().isLength({ min: 6 }),
    body('first_name').optional().isString().isLength({ min: 2 }),
    body('last_name').optional().isString().isLength({ min: 2 }),
    ];
*/               

module.exports = {
	createUserRules,
//	updateUserRules,
}