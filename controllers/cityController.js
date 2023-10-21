const connection = require("../config/db");
const bcrypt = require("bcrypt");

class CityController {
  
  getAllCities = (req, res) => {
    let sql = "SELECT * FROM city WHERE city_is_deleted = 0";
   
    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.render('allCities', {result});
    });
  };

  cityRegistrationForm = (req, res) => {
    res.render("cityRegistrationForm");
  }

  register = (req, res) => {
    const { city_name, city_tag, province, email, password, description, tel} = req.body;
    const salt = 10;
    
    
    if (
      city_name === "" ||
      email === "" ||
      password === ""
    ){
      return res.render('cityRegistrationForm', {message: "A required field is missing. Please try again!"});
    }
    let img;
    
    if(req.file != undefined){
      img = req.file.filename;
    }else{
      img = "default_image.jpg";
    }

    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err;

      let sql = `INSERT INTO city (city_name, city_tag, province, email, password, description, tel, img) VALUES ("${city_name}", "${city_tag}", "${province}", "${email}", "${hash}", "${description}", "${tel}", "${img}")`;

      connection.query(sql, (err, result) => {
        if (err){
          if(err.code == 'ER_DUP_ENTRY'){
            return res.render('cityRegistrationForm', {message: "Oops! Email provided already registered!"});
          };
        };
        res.render('cityRegistered');
      });
    });

  };

  oneCity = (req, res) => {
    const { city_id } = req.params;

    let sql = `SELECT * FROM city WHERE city_id = ${city_id}`;
    let sqlSpot = `SELECT * FROM spot WHERE city_id = ${city_id} AND spot_is_deleted = 0`; 

    connection.query(sql, (err, resultCity) => {
      if(err) throw err;
      connection.query(sqlSpot, (err2, resultSpot) => {
        if(err2) throw err2;
        res.render('oneCity', { resultCity, resultSpot });
      });
    });
  };

  deleteCity = (req, res) => {
    let city_id = req.params.city_id;

    let sql = `UPDATE city LEFT JOIN spot ON city.city_id = spot.city_id SET city.city_is_deleted = 1, spot.spot_is_deleted = 1 WHERE city.city_id = ${city_id}`;

    connection.query(sql, (err, result) => {
      if(err) throw err;
      res.redirect('/city');
    });
  };

  cityEditForm = (req, res) => {
    let  {city_id} = req.params;

    let sql = `SELECT * FROM city WHERE city_id = ${city_id}`;

    connection.query(sql, (err, result) => {
      if(err) throw err;
      res.render('editCity', {result});
    });
  };

  editCity = (req, res) => {
    let city_id = req.params.city_id;
    let { city_name, city_tag, province, tel, description } = req.body;

    let sql = `UPDATE city SET city_name = "${city_name}", city_tag = "${city_tag}", province = "${province}", tel = "${tel}", description = "${description}" WHERE city_id = "${city_id}"`;

    if (req.file != undefined){
      let img = req.file.filename;
      sql = `UPDATE city SET city_name = "${city_name}", city_tag = "${city_tag}", province = "${province}", tel = "${tel}", description = "${description}", img = "${img}" WHERE city_id = "${city_id}"`;
    }

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect(`/city/profile/${city_id}`);
    });
  };

  loginForm = (req, res) => {
    res.render('login');
  }

  login = (req, res) => {
    const { email, password} = req.body;

    let sql = `SELECT * FROM city WHERE email = "${email}" AND city_is_deleted = 0`;

    connection.query(sql, (err, result) => {
      if(err) throw err;
      if(result.length == 1){
        let hash = result[0].password;

        bcrypt.compare(password, hash, (err, resultCompare) => {
          if(resultCompare){
            res.redirect(`/city/profile/${result[0].city_id}`);
          }else {
            res.render('login', {message: "Oops! Something doesn't match. Please try again!"});
          }
        });
      }else{
       res.render('login', {message: "Oops! Something doesn't match. Please try again!"})
      }
    });
  };

  profile = (req, res) => {
    const { city_id } = req.params;

    let sql = `SELECT * FROM city WHERE city_id = ${city_id}`;
    let sqlSpot = `SELECT * FROM spot WHERE city_id = ${city_id} AND spot_is_deleted = 0`; 

    connection.query(sql, (err, resultCity) => {
      if(err) throw err;
      connection.query(sqlSpot, (err2, resultSpot) => {
        if(err2) throw err2;
        res.render('profile', { resultCity, resultSpot });
      });
    });
  }
};

module.exports = new CityController;