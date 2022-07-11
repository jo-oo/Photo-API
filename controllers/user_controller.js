/**
 * USER CONTROLLER
 */
//En controller är en metod som tar emot anrop via en http:request

//Authentication:
const bcrypt = require('bcrypt'); //läser in bcrypt som behövs för authentication
const jwt = require('jsonwebtoken');
//Other:
const debug = require('debug')('Photo-api:user_controller'); //RÄTT?????
const { matchedData, validationResult } = require('express-validator');  //express-validator - hjälper till att säkerställa så datan är säker, så lösenordet användaren skriver in är trimmat osv, att det är en viss längd mm. KALLAS SANITATION : att den renar datan
const models = require('../models');


/**
 * AUTHORIZATION
 */


/**
 * 3. Register new User //Store a new resource
 *
 * POST /register  http://localhost:3000/register
 */
 const store = async (req, res) => {

	//check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	// get only the validated data from the request and save it in "validData"
	const validData = matchedData(req);

	try {
		//password handeling: hashing validData.password and adds number of SaltRounds. 
		//Saves the hashed password in "validData.password" (like it is overwritten by a new password)
		validData.password = await bcrypt.hash(validData.password, 10);

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when creating a new user. Hashing password error',
		});	
		throw error;
	}

	// returns new user WITHOUT PASSWORD and saves
	try {
		const user = await new models.User(validData).save();

		res.status(200).send({
			status: 'success',
			data: {
				email: validData.email,
				first_name: validData.first_name,
				last_name: validData.last_name, //All data from a user should be returned here except from ID
			}
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when creating a new user.',
		});
		throw error;
	}
};


//3.1. = LOGIN
//Log in a user through it´s email. Sign a JWT token & return it to user.

const login = async (req, res) => {

	//Destructure email and password from the request body
	const { email, password } = req.body;

	//Log in the user. Send error message if it fails
	const user = await models.User.login(email, password);
	if (!user) {
		return res.status(401).send({
			status: 'fail',
			data: 'Authorization failed',
		});
	}

	//JWT Payload-content:
	const payload = {
		sub: user.get('email'),
		user_id: user.get('id'),
		name: user.get('first_name') + ' ' + user.get('last_name'),
	};

	//Sign the payload & get an access-token
	const access_token = jwt.sign(payload, 'xutld78!&/&J', {
		expiresIn: process.env.ACCESS_TOKEN_LIFETIME || '1h',
	});

	//Sign the payload & get a refresh-token
	const refresh_token = jwt.sign(payload, 'xutld78!&/&J', {
		expiresIn: process.env.REFRESH_TOKEN_LIFETIME || '1w',
	});

	//Answer with access-token
	return res.status(200).send({
		status: 'success',
		data: {
			access_token,
			refresh_token,
		},
	});
};



/**
 * Update a user
 *
 * 4. PUT http://localhost:3000/users/id
 */
const update = async (req, res) => {
	const updateId = req.params.Id;

	// make sure example exists
	const userUpdate = await new models.User({ id: req.params.Id }).fetch({ require: false });
	if (!userUpdate) {
		debug("User to update was not found. %o", { id: req.params.Id });
		res.status(404).send({
			status: 'fail',
			data: 'Example Not Found',
		});
		return;
	}

	// check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	// get only the validated data from the request
	const validData = matchedData(req);

	try {
		const updatedUser = await userUpdate.save(validData);
		debug("Updated user successfully: %O", updatedUser);

		res.send({
			status: 'success',
			data: userUpdate,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when updating a new user.',
		});
		throw error;
	}
}




//Export methods
module.exports = {
	store, //=register
	update,
	login
}
