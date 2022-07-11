const express = require('express'); //used for setting up routing
//const { validationResult } = require('express-validator');
//const auth = require('../Middleware/authentication'); //reads authentication where logic for acess thorugh JWT Token is
const router = express.Router();
//Import files:
const photoController = require('../controllers/photo_controller');
const photoValidationRules = require('../validation/photo_validation_rules');

//ROUTES:

/* GET all Photos */
//1. GET from url http://localhost:3000/photos (the photos-path is set in the end of the index file)
router.get('/', photoController.getAllPhotos);

/* 2. GET Photo Id*/
// http://localhost:3000/photos/:photoId is made, the method SHOW, that is in the photo_controller file runs 
router.get('/:photoId', photoController.getPhotoById); 

/* 3. POST Save a new photo */
//when requests to the address http://localhost:3000/photos/ is made, the method STORE, that is in the photo_controller file runs. The method saves what is sent in through a POST-request
router.post('/', photoValidationRules.createPhotoRules, photoController.createPhoto);

/* 4. UPDATE Update a photo */
//when requests to the address http://localhost:3000/photos/:photoId is made, the method PUT, that is in the photo_controller file runs. The method saves what is sent in through a PUT-request
router.put('/:photoId', photoValidationRules.updatePhotoRules, photoController.updatePhoto);

/* 6. DELETE Delete a photo*/
//when requests to the address http://localhost:3000/photos/:photoId is made, the method DELETE, that is in the photo_controller file runs. The method saves what is sent in through a DELETE-request
router.delete('/:photoId', photoController.deletePhoto);

module.exports = router; //exports the router-module
