const connection = require("../config/db");

class SpotController {

  getAllSpots = (req, res) => {
    let sql = "SELECT city.city_id, city.city_name, city.province, spot.* FROM city, spot WHERE city.city_id = spot.city_id AND spot_is_deleted = 0"


    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.render('allSpots', {result});
    })
  }

  spotRegistrationForm = (req, res) => {
    const city_id = req.params.city_id;

    
    let message = "";
    if (req.query.form == "error"){
      message = "Please fill out all required fields!";
    };
    

    res.render("spotRegistrationForm", {city_id , message });
  }

  addSpot = (req, res) => {
    const city_id = req.params.city_id;
    const { spot_name, street } = req.body;
    let img = req.file?.filename;
    
    let sql = `INSERT INTO spot (spot_name, street, city_id, img) VALUES ("${spot_name}", "${street}", "${city_id}", "${img}")`;

    if (
      spot_name === "" ||
      street === "" ||
      req.file == undefined
    ){
      return res.redirect(`/spot/addSpot/${city_id}?form=error`);
    };

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect(`/city/profile/${city_id}`);
    });
  };

  spotRegistrationSelect = (req, res) => {
    let sql = 'SELECT * FROM city WHERE city_is_deleted = 0'

    let message = "";
    if (req.query.form == "error"){
      message = "Please fill out all required fields!";
    };

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.render('addSpotSelect', {result, message});
    });
  };

  addSpotSelect = (req, res) => {

    const { city_id, spot_name, street } = req.body;
    let img = req.file?.filename;

    let sql = `INSERT INTO spot (spot_name, street, city_id, img) VALUES ("${spot_name}", "${street}", "${city_id}", "${img}")`;

    if (
      spot_name === "" ||
      street === "" ||
      city_id === "0" ||
      req.file == undefined
    ){
      return res.redirect(`/spot/addspotSelect/?form=error`
      );
    };

    connection.query(sql, (err, result) => {
      if(err) throw err;
      res.redirect(`/city/oneCity/${city_id}`);
    });
  };

  deleteSpot = (req, res) => {
    const { city_id, spot_id } = req.params;

    let sql = `UPDATE spot LEFT JOIN city ON city.city_id = spot.city_id SET spot.spot_is_deleted = 1 WHERE spot.spot_id = ${spot_id}`;
    console.log(req.params);
    
    connection.query(sql, (err, result) => {
      if(err) throw err;
       res.redirect(`/city/profile/${city_id}`);
       //redirigir a la página de esa ciudad
    });
    
  };

  spotEditForm = (req, res) => {
    let {spot_id } = req.params;

    let sql = `SELECT * FROM spot WHERE spot_id = ${spot_id}`;
    
    connection.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.render('editSpot', {result});
    });
  };

  editSpot = (req, res) => {
    let { city_id, spot_id} = req.params;
    let { spot_name, street } = req.body;

    let sql = `UPDATE spot SET spot_name = "${spot_name}", street = "${street}" WHERE spot_id = ${spot_id}`;

    if (req.file != undefined){
      let img = req.file.filename;
      sql = `UPDATE spot SET spot_name = "${spot_name}", street = "${street}", img = "${img}" WHERE spot_id = ${spot_id}`;
    };

    connection.query(sql, (err, result) => {
      if(err) throw err;
      res.redirect(`/city/profile/${city_id}`);
    });
  };
};

module.exports = new SpotController;