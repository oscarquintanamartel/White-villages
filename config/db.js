const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "turism",
});

connection.connect(function (err) {
  if (err) {
    console.log("err connecting: " + err.stack);
    return;
  }
  console.log("Conexión correcta " + connection.threadId);
});

module.exports = connection;
