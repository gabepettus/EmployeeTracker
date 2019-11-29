const inquirer = require("inquirer");
const mysql = require("mysql");
const db = require("../db/db");

// const start = require("../index");

var PSWD = process.env.MYSQL_PSWD;
// create the connection information for the sql database
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

const questions = {
  genDept: [
    {
      type: "list",
      name: "deptChoice",
      message: "Options for department management?",
      choices: ["View all departments", 
                "Add department", 
                "Assign manager",
                "View total utilized budget of department", 
                "Remove department",
                "Return to main menu" ]
    }
  ],

  selectDept: [
    {
      type: "list",
      name: "depName",
      message: "Select department:",
      // choices will be dynamically set from existing departments
    },
  ],

  selectMang: [
    {
      type: "list",
      name: "depName",
      message: "Select department manager:",
      // choice will be dynamically set from existing employees
    }
  ],
};

function viewDepartments() {
  console.log("view all departments");
  connection.query("SELECT name AS department FROM department", function(err,results) {
    if (err) throw err;
    console.log(" ");
    console.log("Departments");
    console.log("-----------");
    results.forEach(dep => { 
      console.log(dep.department); 
    });
    console.log(" ");
    genDept();
  });
};


function viewUtilizedBudget() {
  console.log("view utilized budget");
  // query needs to be updated this is placeholder
  let query = "select d.name, sum(r.salary) as UB from employee e join role r on e.role_id = r.id join department d on d.id = r.dept_id group by d.name"
  connection.query(query, function(err,results) {
    if (err) throw err;
    console.log("results ",results);
    console.log("Department\tUtilized Budget");
    console.log("----------\t---------------");
    results.forEach(res => { 
      console.log(`${res.name}\t${res.UB}`); 
    });
    console.log(" ");
    genDept();
  });
};

function addDepartment() {
  console.log("add departments");
  genDept();
};

async function selectMang() {
  // console.log("selectManager");
  // db read to return manager list
  // const results = await getEmployeeList();
  const results = ["dummy","manager"];
  questions.selectMang[0].choices = results;
  // console.log("new",a);
  return inquirer.prompt(questions.selectMang);
};

let selectDept = function() {
  // db read to return manager list
  // const results = await getDeptList();
  // const results = ["dummy","dept"];
  const results = simpleSelect("department").then( function(dep) {
    questions.selectDept[0].choices = dep;
    return inquirer.prompt(questions.selectDept);
  });
  return results;
};

async function assignMang() {
  //db call to update manager for department
  // 
  selectDept().then( function(dep) {
    selectMang(dep).then(function(man) {
      console.log("select dept",dep);
      console.log("select man",man);
      // update manager db here
      genDept();
    });
  });
  // const mang = await selectMang();
};

function removeDepartment() {
  console.log("remove department");
};

async function genDept() {
  // console.log("in genDept",questions.genDepartment);
  let again = true;
  // while (again) {
    const deptAction = await inquirer.prompt(questions.genDept);
    console.log("deptAction:",deptAction.deptChoice);

    switch (deptAction.deptChoice) {
      case 'View all departments':
        console.log("X select view all departments");
        viewDepartments();
        break;
      case 'Add department': 
        addDepartment();
        console.log("X select add departments");
        break;
      case 'Assign manager':
        console.log("X select asign manager");
        // gets new manager
        assignMang();
        break;
      case 'View total utilized budget of department': 
        console.log("X select view total util budget");
        viewUtilizedBudget();
        break;
      case 'Remove department': 
        console.log("X select remove department");
        removeDepartment();
        break;
      default:
        console.log("X return to main menu");
        // start();
        break;
    }
  // if (again) { start(); }
  // }
  console.log("here dept");
  return "goat";
}

module.exports = () => {
  return genDept();
};