const connection = require("../config/db");

class IndexController {
  viewHome = (req, res) => {
    let sql = "SELECT * FROM city WHERE city_is_deleted = 0";
    let sqlSpot = "SELECT * FROM spot WHERE spot_is_deleted = 0";
  
    connection.query(sql, (err, resultCity) =>{
      if (err) throw err;
      connection.query(sqlSpot, (err2, resultSpot) => {
        if(err) throw err2;
        res.render('index', {resultCity, resultSpot});
      });
    });
  };

}

module.exports = new IndexController();
