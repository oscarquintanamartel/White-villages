const express = require('express');
const router = express.Router();
const multer = require('../middlewares/multer');
const spotController = require("../controllers/spotController");

//Get spots listing
router.get('/', spotController.getAllSpots);

// Add spot
// form
router.get("/addSpot/:city_id", spotController.spotRegistrationForm)

//post
router.post("/addSpot/:city_id", multer("spot"), spotController.addSpot);

//Add spot SELECT
// form
router.get('/addSpotSelect', spotController.spotRegistrationSelect);
// post
router.post('/addSpotSelect', multer("spot"), spotController.addSpotSelect);

//Edit spot
router.get('/editSpot/:spot_id', spotController.spotEditForm);
//post
router.post('/editSpot/:city_id/:spot_id', multer("spot"), spotController.editSpot);

// logic delete
router.get('/deleteSpot/:city_id/:spot_id', spotController.deleteSpot);


module.exports = router;