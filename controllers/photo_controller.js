const { matchedData, validationResult } = require('express-validator');
const models = require('../models');

/** 
 * 1. Get all photos- method
 *
 * GET http://localhost:3000/users
 */ //en metod som gäller om du går direkt på controllern 
 const getALlPhotos= async (req, res) => {
	const user = await models.Users.fetchAll();

	res.send({
		status: 'success från user controllern som returnerar alla users',
		data: allUsers,
	});
}