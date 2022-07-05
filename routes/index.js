const express = require('express'); //used for setting up routing
const router = express.Router();
//läser in Middleware för authentication, som sköter JWT-token access authentication.
const authentication =  require('../middleware/authentication');
//läser in User Validation Rules
const userValidationRules = require('../validation/user_validation_rules');
//läser in user authentication controller
const userController = require('../controllers/user_controller');


// index http://localhost:3000/
//when making a GET-request, the adreess localhost:3000/ should respond with this message
	//the / means path-route without anything more aka localhost:3000/
router.get('/', (req, res, next) => {
	res.send({ success: true, data: { msg: 'message that localhost:3000 is responding to your requests' }});
});

// register new user
//when making a POST-request, the adreess localhost:3000/register should respond with this message
router.post('/register',
	userValidationRules.createUserRules, //goes throught validations rules at the GET-request
	userController.store //uses the user controller and the store method
);

//Sign in user
router.post('/login', userController.login);


//Denna lägger till en ny undermapp/path till localhost:3000 -> localhost:3000/users
//i index-filen säger vi att users-route-filen ska använda adressen /register
//router.use(authentication.validateJwtToken); //läser in Middlewaren authentication o använder den funktionen därifrån: validateJwtToken
router.use('/albums',authentication.validateJwtToken, require('./albums')); //Anger routen /albums ska använda filen: routen albums
router.use('/photos',authentication.validateJwtToken, require('./photos'));
module.exports = router;
