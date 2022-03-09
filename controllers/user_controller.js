/**
 * User Controller
 */

const debug = require('debug')('Photo-api:user_controller'); //
const { matchedData, validationResult } = require('express-validator'); //läser in 
const models = require('../models');

/**
 * Get all users
 *
 * GET /user
 */ //en metod som gäller om du går direkt på controllern 
const index = async (req, res) => {
	const allUsers = await models.Users.fetchAll();

	res.send({
		status: 'success',
		data: allUsers,
	});
}

/**
 * Get a specific user
 *
 * GET /:exampleId
 */
const show = async (req, res) => {
	//exampleId det id som skickas med i requestet example/1
	const userId = req.params.exampleId;

	//Gör ett anrop mot databasen hämta en modell av tabellen user
	const user = await new models.Users({ id: userId })//använder vårt models-objekt som har metoden users. där kan vi skicka in id.
		.fetch();

	res.send({ //skickas tillbaka till oss
		status: 'success',
		data: user,
	});
}

/**
 * Register new User
 * //Store a new resource
 *
 * POST /register
 */
const store = async (req, res) => {
	// check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	// get only the validated data from the request
	const validData = matchedData(req);

	try {
		const user = await new models.Users(validData).save();
		debug("Created new example successfully: %O", user);

		res.send({
			status: 'success',
			data: user,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when creating a new example.',
		});
		throw error;
	}
}

/**
 * Update a specific resource
 *
 * PUT /:exampleId
 */
const update = async (req, res) => {
	const exampleId = req.params.exampleId;

	// make sure example exists
	const example = await new models.Example({ id: exampleId }).fetch({ require: false });
	if (!example) {
		debug("Example to update was not found. %o", { id: exampleId });
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
		const updatedExample = await example.save(validData);
		debug("Updated example successfully: %O", updatedExample);

		res.send({
			status: 'success',
			data: example,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when updating a new example.',
		});
		throw error;
	}
}

/**
 * Destroy a specific resource
 *
 * DELETE /:exampleId
 */
const destroy = (req, res) => {
	res.status(400).send({
		status: 'fail',
		message: 'You need to write the code for deleting this resource yourself.',
	});
}

module.exports = {
	index,
	show,
	store,
	update,
	destroy,
}
