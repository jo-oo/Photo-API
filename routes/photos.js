const express = require('express');
const { validationResult } = require('express-validator');
const auth = require('../Middleware/authentication'); //läser in authentication där logik för Acess via JWT Token finns
const router = express.Router();
const photoController = require('../controllers/photo_controller'); //Importerar photo-controllern
const photoValidationRules = require('../validation/photo_validation_rules');//importerar validation-rules för photo


/* GET all Photos */
//1. GET from url http://localhost:3000/photos (photos-pathen sätter vi i slutet av index-filen)
router.get('/', photoController.index);


/* 2. GET Photo Id*/
//vid anrop till adressen http://localhost:3000/photos/:photoId så körs metoden show som ligger i photo_controller-filen
router.get('/:albumId', photoController.showPhoto); 


/* 3. STORE Spara ett nytt foto */
//vid anrop till adressen http://localhost:3000/photos/ så körs metoden STORE som ligger i photo_controller-filen. Metoden lagrar det som skickats in via en POST-request
router.post('/', photoValidationRules.createPhotoRules, photoController.storePhoto);


/* 4. UPDATE  Uppdatera ett foto */
//vid anrop till adressen http://localhost:3000/photos/:photoId så körs metoden PUT som ligger i photo_controller-filen. Metoden lagrar det som skickats in via en PUT-request
router.put('/:albumId', albumValidationRules.updateRules, photoController.updatePhoto);



module.exports = router; //exporterar router-modulen
