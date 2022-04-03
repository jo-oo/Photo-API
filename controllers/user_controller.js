/**
 * UER CONTROLLER
 */
//En controller är en metod som tar emot anrop via en http:request


//Authentication:
const bcrypt = require('bcrypt'); //läser in bcrypt som behövs för authentication
const jwt = require('jsonwebtoken');
//Other:
const debug = require('debug')('Photo-api:user_controller'); //
const { matchedData, validationResult } = require('express-validator');  //express-validator - hjälper till att säkerställa så datan är säker, så lösenordet användaren skriver in är trimmat osv, att det är en viss längd mm. KALLAS SANITATION : att den renar datan
const models = require('../models');


/**
 * AUTHENTICATION
 */



/**
 * 3. Register new User //Store a new resource
 *
 * POST /register  http://localhost:3000/users
 */
 const store = async (req, res) => {

	//check for any validation errors WORKS
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	// hämta bara den validerade datan från requesten och spara den i "validData"
	const validData = matchedData(req);

	try {
		//lösenordshantering: tar lösenordet ur den validerade datan och hashar den och lägger på antal SaltRounds. Sparar det hashade lösenordet i "validData.password"
		validData.password = await bcrypt.hash(validData.password, models.user_model.hashSaltRounds);

/*
		const user = await new models.Users(validData).save();
		debug("Created new example successfully: %O", user);

		res.status(200).send({ //skickar medd 200-meddalnde när användaren hämtas ut
			status: 'success user created',
			data: {
				user,
			}
		});
		*/

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when creating a new user. Hashing password error P',
		});
		throw error;
	}
}








/** 
 * 1. Get all users - method   WORKS
 *
 * GET http://localhost:3000/users
 */ //en metod som gäller om du går direkt på controllern 
 const index = async (req, res) => {
	const allUsers = await models.Users.fetchAll();

	res.send({
		status: 'success från user controllern index som returnerar alla users',
		data: allUsers,
	});
}






/**
* 2. Get a specific resource
*
* GET http://localhost:3000/users/id
*/
const showUser = async (req, res) => {
	const Id = await new models.Users({ id: req.params.Id }).fetch() //get Id
	  // .fetch({withRelated: ['author', 'users']});
		//.fetch({withRelated: ['photos', 'users']}); //to get more from the user

	res.send({
		status: 'success',
		data: Id,
	});
}



/**
 * Get a specific user - method
 *
 * TEST GET /:userId


const johannasMetod = async (req, res) => {
	//exampleId det id som skickas med i requestet example/1
	//const userId = req.params.exampleId;

	//Gör ett anrop mot databasen hämta en modell av tabellen user
	// const user = await new models.Users({ id: userId })//använder vårt models-objekt som har metoden users. där kan vi skicka in id.
	// 	.fetch();

	res.send({ //skickas tillbaka till oss
		status: 'johannas metod'
		
	});
}








/**
 * Update a specific resource
 *
 * 4. PUT http://localhost:3000/users/id
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


//Export methods
module.exports = {
	index,
	showUser,
	store,
	update,
	destroy,
	//johannasMetod,
}
