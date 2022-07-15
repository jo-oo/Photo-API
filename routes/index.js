const express = require('express'); //used for setting up routing
const router = express.Router();
//reads Middleware för authentication, that handles JWT-token access authentication.
const authentication =  require('../Middleware/authentication');
//reads User Validation Rules
const userValidationRules = require('../validation/user_validation_rules');
//reads User Authentication Controller
const userController = require('../controllers/user_controller');

//index http://localhost:3000/
//when making a GET-request, the address localhost:3000/ should respond with this message
	//the / means path-route without anything more, which is: localhost:3000/
router.get('/', (req, res, next) => {
	res.send({ success: true, data: { msg: 'message that localhost:3000 is responding to your requests' }});
});

//register new user
//when making a POST-request, the address localhost:3000/register should respond with this
router.post('/register',
	userValidationRules.createUserRules, //goes throught validations rules at the GET-request
	userController.store //uses the user controller and the store method
);

//sign in user
router.post('/login', userValidationRules.loginUserRules, 
	userController.login
);


//This adds a new under-folder/path till localhost:3000 -> localhost:3000/users
//in the index-file, we tell the users-route-file to use the address: /register
//reads the Middleware authentication and uses that function from there: validateJwtToken
router.use('/albums',authentication.validateJwtToken, require('./albums')); //states the route /albums to use the file: the albums route
router.use('/photos',authentication.validateJwtToken, require('./photos'));
module.exports = router;
