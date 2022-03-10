const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller'); //Importerar user-controllern
const userValidationRules = require('../validation/user_validation_rules');//importerar validation-rules för user

/* Get all resources */
//router.get('/', userController.index);

/* Get a specific resource */
router.get('/:userId', userController.show); //vid anrop till adressen http://localhost:3000/user/userId så körs metoden show som ligger i userController-filen


// vilken metod som ska användas för exempel http://localhost:3000/user/
router.get('/', userController.johannasMetod);

/* Store a new resource */
router.post('/', userValidationRules.createRules, userController.store); //vid anrop till adressen http://localhost:3000/user/ så körs metoden store som ligger i userController-filen. Metoden lagrar det son skickats in via en post-request

/* Update a specific resource */
router.put('/:userId', userValidationRules.updateRules, userController.update);//vid anrop till adressen http://localhost:3000/user/userId så körs metoden update som ligger i userController-filen, Metoden uppdaterar det som skickats in via en put-request

/* Destroy a specific resource */
router.delete('/:userId', userController.destroy);//vid anrop till adressen http://localhost:3000/user/userId så körs metoden destroy som ligger i userController-filen, Metoden raderar det som skickats in via en delete-request

module.exports = router; //exporterar router-modulen
