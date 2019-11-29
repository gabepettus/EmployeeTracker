const mysql = require("mysql");

var PSWD = process.env.MYSQL_PSWD;
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: PSWD,
  database: "employeemanagement"
});

function simpleSelect(tab) {
  console.log("view all departments");
  connection.query("SELECT name AS department FROM ?",tab, function(err,results) {
    if (err) throw err;
    return results; 
  });
};

module.exports = (one) => {
  const stuff = [
    simpleSelect(one)
  ]

  return stuff;
};