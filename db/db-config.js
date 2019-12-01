// const mysql = require('mysql');
const PSWD = process.env.MYSQL_PSWD;

// module.exports = mysql.createPool({
module.exports = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: PSWD,
  database: "employeemanagement"
};