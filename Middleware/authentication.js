/**
 * Authentication using JWT Token
 */

const debug = require('debug')('Photo-api:auth');
const jwt = require('jsonwebtoken');

/**
 * Validate JWT token
 */
 const validateJwtToken = (req, res, next) => {
	//there must be a Authorization header added to the request, otherwise we will jump out.
	if (!req.headers.authorization) {
		debug("Authorization header is missing in your request");

		return res.status(401).send({
			status: 'fail',
			data: 'Authorization failed',
		});
	}

	// Authorization: "Bearer eyJkpXVCJ9.eyJV9.xndmU"
	// Split the data that we recieve in "authorization header" at our request, and split it in "authSchema + token"
	const [authSchema, token] = req.headers.authorization.split(' ');
    //If authSchema is NOT the same as the token we got, abort
	if (authSchema.toLowerCase() !== 'bearer') { 
		return res.status(401).send({
			status: 'fail',
			data: 'Authorization failed',
		});
	}

	//verify JWT Token. Use the secret access token to verify and get a refresh token to be able to get a new access token
	try {
		req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
	} 
	catch (error) {
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
};