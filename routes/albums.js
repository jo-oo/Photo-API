const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album_controller'); //Importerar user-controllern
const albumValidationRules = require('../validation/album_validation_rules'); //importerar validation-rules för albums

/* GET all albums */
//1. GET from url http://localhost:3000/albums (albums-pathen sätter vi i slutet av index-filen)
router.get('/', albumController.getAllAlbums);

/* 2. GET Id*/
//vid anrop till adressen http://localhost:3000/albums/:albumId så körs metoden show som ligger i album_controller-filen
router.get('/:albumId', albumController.showAlbum); 

/* 3. STORE Spara ett nytt album */
//vid anrop till adressen http://localhost:3000/albums/ så körs metoden STORE som ligger i album_controller-filen. Metoden lagrar det som skickats in via en POST-request
router.post('/', albumValidationRules.createAlbumRules, albumController.createAlbum);

/* 4. UPDATE  Uppdatera ett album */
//vid anrop till adressen http://localhost:3000/albums/:albumId så körs metoden PUT som ligger i album_controller-filen. Metoden lagrar det som skickats in via en PUT-request
router.put('/:albumId', albumValidationRules.updateAlbumRules, albumController.updateAlbum);

/* 5. POST Lägg till ett foto i ett album */
//vid anrop till adressen http://localhost:3000/albums/:albumId/photos så körs metoden POST som ligger i album_controller-filen. Metoden lagrar det som skickats in via en POST-request
router.post('/:albumId/photos',albumValidationRules.addPhotoToAlbumRules, albumController.addPhotoToAlbum);

/* 6. DELETE Radera ett album */
//vid anrop till adressen http://localhost:3000/albums/:albumId så körs metoden DELETE som ligger i album_controller-filen. Metoden lagrar det som skickats in via en DELETE-request
router.delete('/:albumId', albumController.deleteAlbum);

module.exports = router; //exporterar router-modulen
