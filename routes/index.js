const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
/* GET-requests to index http://localhost:3000/ and some testing 
/ 
*/

// index http://localhost:3000/
//when making a GET-request, the adreess localhost:3000/ should respond with this message
	//the / means path-route without anything more aka localhost:3000/
router.get('/', (req, res, next) => {
	res.send({ success: true, data: { msg: 'message that locakhost:3000 is responding to your requests' }});
});

//router.use('/example', require('./example'));
//when making a GET request  to this URL, you should recieve a message that says: "du skickade in exampleID"
router.get('/test/:exampleId', (req, res, next) => {

	res.send({ success: true, data: { msg: 'du skickade in ' + req.params.exampleId }});
});

//router.use('/student', require('./student));
//when making a GET request  to this URL, you should recieve ID of the student
	// the “id” property is available as req.params.id. This object defaults to {}.
router.get('/student/:Id', (req, res, next) => {

	res.send({ success: true, data: { msg: 'You sent us an ID of a student ' + req.params.Id }});
});

// router.get('/users', (req, res, next) => {

// 	res.send({ success: true, data: { msg: 'Detta är users ' + req.params.Id }});
// });




// lägg till de route filer som också ska finnas med
//Denna lägger till en ny undermapp/path till localhost:3000 -> localhopst:3000/users
router.use('/users', require('./users'));
module.exports = router;
