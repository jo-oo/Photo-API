/**
 * USER CONTROLLER
 */
//A controller is a method that recieves a request through http:request

//Authentication:
const bcrypt = require('bcrypt'); //bcrypt is nedded for authentication
const jwt = require('jsonwebtoken');
//Other:
//Express-validator - helps to make sure the data is safe, so the password the user types in is, for example: trimmed, a certain lenght etc.
	//This is called SANITIZATION; that it cleanses the data
const { matchedData, validationResult } = require('express-validator');  
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

	//returns new user WITHOUT PASSWORD and saves
	try {
		const user = await new models.User(validData).save();

		res.status(200).send({
			status: 'success',
			data: {
				email: validData.email,
				first_name: validData.first_name,
				last_name: validData.last_name, //all data from a user should be returned here except from ID
			}
		});

		} 
		catch (error) {
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

	//destructure email and password from the request body
	const { email, password } = req.body;

	//log in the user. Send error message if it fails
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

	//sign the payload & get an access-token
	const access_token = jwt.sign(payload, 'xutld78!&/&J', {
		expiresIn: process.env.ACCESS_TOKEN_LIFETIME || '1h',
	});

	//sign the payload & get a refresh-token
	const refresh_token = jwt.sign(payload, 'xutld78!&/&J', {
		expiresIn: process.env.REFRESH_TOKEN_LIFETIME || '1w',
	});

	//answer with access-token
	return res.status(200).send({
		status: 'success',
		data: {
			access_token,
			refresh_token,
		},
	});
};

//Export methods
module.exports = {
	store, //=register
	login
}
