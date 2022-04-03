const express = require('express');
const { validationResult } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/user_controller'); //Importerar user-controllern
const userValidationRules = require('../validation/user_validation_rules');//importerar validation-rules för user


/*** GET METHODS ***/

/* Get all resources = GET all users */
//1. GET from url http://localhost:3000/users  (users-pathen sätter vi i slutet av index-filen)
router.get('/', userController.index);


/* 2. Get a specific resource = GET Id*/
//vid anrop till adressen http://localhost:3000/users/:Id så körs metoden show som ligger i user_controller-filen
router.get('/:Id', userController.showUser); 



/* 3. STORE a new resource */
// Registrera en ny användare 
//vid anrop till adressen http://localhost:3000/users/ så körs metoden store som ligger i user_controller-filen. Metoden lagrar det son skickats in via en post-request
router.post('/', userValidationRules.createUserRules, userController.store);






/*router.post('/users/all', function(req, res){   
    userController.store
  });
*/




/* Update a specific resource */
//router.put('/:userId', userValidationRules.updateRules, userController.update);//vid anrop till adressen http://localhost:3000/user/userId så körs metoden update som ligger i userController-filen, Metoden uppdaterar det som skickats in via en put-request

/* Destroy a specific resource */
router.delete('/:userId', userController.destroy);//vid anrop till adressen http://localhost:3000/user/userId så körs metoden destroy som ligger i userController-filen, Metoden raderar det som skickats in via en delete-request

module.exports = router; //exporterar router-modulen
