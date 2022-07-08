const express = require('express');
const { validationResult } = require('express-validator');
const auth = require('../Middleware/authentication'); //läser in authentication där logik för Acess via JWT Token finns
const router = express.Router();
const userController = require('../controllers/user_controller'); //Importerar user-controllern
const userValidationRules = require('../validation/user_validation_rules');//importerar validation-rules för user


/* 3. STORE a new resource */
// Registrera en ny användare 
//vid anrop till adressen http://localhost:3000/users så körs metoden store som ligger i user_controller-filen. Metoden lagrar det son skickats in via en post-request
router.post('/', userValidationRules.createUserRules,userController.store);

//specifies the route, and which controller to be used, and which method
router.post('/login', userController.login);

//säger åt routern att använda validateJwtToken. Routesen som kommer efter här kommer nu kräva authentication
//router.use(auth.validateJwtToken);


/* Update a specific resource */
router.put('/:userId', userValidationRules.updateRules, userController.update);//vid anrop till adressen http://localhost:3000/user/userId så körs metoden update som ligger i userController-filen, Metoden uppdaterar det som skickats in via en put-request

/* Destroy a specific resource */
router.delete('/:userId', userController.destroy);//vid anrop till adressen http://localhost:3000/user/userId så körs metoden destroy som ligger i userController-filen, Metoden raderar det som skickats in via en delete-request




module.exports = router; //exporterar router-modulen
