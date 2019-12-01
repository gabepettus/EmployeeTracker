const mysql = require("mysql");

var PSWD = process.env.MYSQL_PSWD;
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: PSWD,
  database: "employeemanagement"
});

// function makeDb() {
module.exports = () => {
  return {
    query (sql, args) {
      return util.promisify( connection.query)
        .call ( connection, sql, args);
    },
    close () {
      return util.promisify( connection.end ).call(connection);
    }
  };
}

// module.exports = makeDb;

/*
async function simpleSelect(tab) {
  console.log("view all departments",tab);
  const query = `SELECT name AS department from ${tab};`;
  console.log(query);
  // connection.query('SELECT name AS department FROM ?', function(err,results) {
  const stuff = await connection.query(query, function(err,results) {
    if (err) throw err;
    console.log("result",results);
    return results; 
  });
  return stuff;
};

async function init() {
 const res = await simpleSelect("department");
 console.log("res",res);
}

init();
*/