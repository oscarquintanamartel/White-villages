var express = require('express');
var router = express.Router();
const cityController = require("../controllers/cityController");
const multer = require("../middlewares/multer");

// Get cities listing
router.get('/', cityController.getAllCities);

//Register city
//form
router.get('/register', cityController.cityRegistrationForm);
//post
router.post('/register', multer("city"), cityController.register);

//View one city with its spots
router.get('/oneCity/:city_id', cityController.oneCity);

//Edit City
//form
router.get('/editCity/:city_id', cityController.cityEditForm);
//post
router.post('/editCity/:city_id', multer("city"), cityController.editCity);

// logic delete
router.get('/deleteCity/:city_id', cityController.deleteCity);

//login
//form
router.get('/login', cityController.loginForm);
//post
router.post('/login', cityController.login);

//View profile
router.get('/profile/:city_id', cityController.profile)

module.exports = router;