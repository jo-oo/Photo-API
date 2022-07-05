const express = require('express'); //used for setting up routing
const router = express.Router();
//läser in Middleware för authentication, som sköter JWT-token access authentication.
const authentication =  require('../middleware/authentication');
//läser in User Validation Rules
const userValidationRules = require('../validation/user_validation_rules');
//läser in user authentication controller
const userController = require('../controllers/user_controller');

/* GET-requests to index http://localhost:3000/ and some testing 
/ 
*/

// index http://localhost:3000/
//when making a GET-request, the adreess localhost:3000/ should respond with this message
	//the / means path-route without anything more aka localhost:3000/
router.get('/', (req, res, next) => {
	res.send({ success: true, data: { msg: 'message that localhost:3000 is responding to your requests' }});
});

// register new user
//when making a POST-request, the adreess localhost:3000/register should respond with this message
router.post('/register',
	userValidationRules.createUserRules,
	userController.store
);

//Sign in user
router.post('/login', userController.login);


/*//router.use('/example', require('./example'));
//when making a GET request  to this URL, you should recieve a message that says: "du skickade in exampleID"
router.get('/test/:exampleId', (req, res, next) => {

	res.send({ success: true, data: { msg: 'du skickade in ' + req.params.exampleId }});
});
*/
/*
//router.use('/student', require('./student));
//when making a GET request  to this URL, you should recieve ID of the student
	// the “id” property is available as req.params.id. This object defaults to {}.
router.get('/student/:Id', (req, res, next) => {

	res.send({ success: true, data: { msg: 'You sent us an ID of a student ' + req.params.Id }});
});
*/

// router.get('/users', (req, res, next) => {

// 	res.send({ success: true, data: { msg: 'Detta är users ' + req.params.Id }});
// });




// lägg till de route filer som också ska finnas med
//Denna lägger till en ny undermapp/path till localhost:3000 -> localhost:3000/users
//i index-filen säger vi att users-route-filen ska använda adressen /register
router.use(authentication.validateJwtToken); //läser in Middlewaren authentication o använder den funktionen därifrån: validateJwtToken
//router.use('/register', require('./users')); //SKA JAG TA BORT DENNA????????
router.use('/albums',authentication.validateJwtToken, require('./albums')); //Anger routen /albums ska använda filen: routen albums
router.use('/photos',authentication.validateJwtToken, require('./photos'));
module.exports = router;
