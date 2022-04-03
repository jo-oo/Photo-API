/**
 * Authentication using JWT Token
 */

 const bcrypt = require('bcrypt');
 const debug = require('debug')('Photo-api:auth');
 const jwt = require('jsonwebtoken');
 const { User } = require('../models');

/**
 * Validera JWT token
 */
 const validateJwtToken = (req, res, next) => {
	//det måste finnas en Authorization header med i requesten, annars hoppar vi ur
	if (!req.headers.authorization) {
		debug("Authorization header is missing in your request");

		return res.status(401).send({
			status: 'fail',
			data: 'Authorization failed',
		});
	}

	// Authorization: "Bearer eyJkpXVCJ9.eyJV9.xndmU"
	// Dela upp datan som vi får in i "authorization header" vid requesten, och dela upp den in i "authSchema + token"
	const [authSchema, token] = req.headers.authorization.split(' ');
    //om authSchema inte är samma som den token vi har, ??????????så
	if (authSchema.toLowerCase() !== "bearer") { 
		return res.status(401).send({
			status: 'fail',
			data: 'Authorization failed',
		});
	}

	//Verify JWT Token. Använd den hemliga access token för att verifiera och få en refrsh token för att hämta ny access token
	try {
		req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

	} catch (error) {
		return res.status(401).send({
			status: 'fail',
			data: 'Authorization failed',
		});
	}

	//send the request further 
	next();
}

module.exports = {
	validateJwtToken
}