const express = require('express');
const { validationResult } = require('express-validator');
const auth = require('../Middleware/authentication'); //reads authentication where logic for acess thorugh JWT Token is
const router = express.Router();
//import files
const userController = require('../controllers/user_controller');
const userValidationRules = require('../validation/user_validation_rules');

//ROUTES:

/* 3. STORE a new resource */
//registrer a new user
//when requests to the address http://localhost:3000/users is made, the method STORE, that is in the file user_controller runs. The method saves what is sent in through a POST-request.
router.post('/', userValidationRules.createUserRules,userController.store);

//specifies the route, and which controller to be used, and which method
router.post('/login', userController.login);

//tells the router to use validateJwtToken. The routes that comes after here, will now require authentication
//router.use(auth.validateJwtToken);

module.exports = router; //exports the router-module
