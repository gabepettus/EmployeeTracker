const inquirer = require("inquirer");
const mysql = require("mysql");
const util = require("util");
const ctable = require("console.table");

// const db = require("../db/db");

const main = require("../index");
// /*

const PSWD = process.env.MYSQL_PSWD;
// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: PSWD,
  database: "emplmang"
});
// */

const questions = {
  genDept: [
    {
      type: "list",
      name: "deptChoice",
      message: "Options for department management?",
      choices: ["View all departments", 
                "Add department", 
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
  selectEmpl: [
    {
      type: "list",
      name: "depName",
      message: "Select department manager:",
      // choice will be dynamically set from existing employees
    }
  ],
  confirmDelDept: [
    {
      type: "confirm",
      name: "delDept",
      message: "Are you sure you want to delete this department and elimiate associate roles and fire all the lazy-ass employees?",
      default: false
    },
  ],
  addDept: [
    {
      type: "input",
      name: "newDept",
      message: "Enter name of department you would like to add:",
    },
  ],
};

async function viewDepartments() {
  const db = makeDb();
  let values = [];

  try {
    const sql = "SELECT name AS department FROM department";
    const results = await db.query(sql);

    results.forEach(res => { 
      values.push([res.department]); 
    });

  } catch (err) {
    console.log("error with insert",err);
  }
  console.table(['Department'],values);
  // db.close();
  genDept();
};


async function viewUtilizedBudget() {
  const db = makeDb();
  let values = [];
  try {
    const sql = "select d.name, sum(r.salary) as UB from employee e join role r on e.role_id = r.id join department d on d.id = r.dept_id group by d.name"
    const results = await db.query(sql);

    results.forEach(res => { 
      values.push([res.name,res.UB]); 
    });

  } catch (err) {
    console.log("error with viewUtiliedBudget",err);
  }
  console.table(['Department','Utilized Budget'],values);
  // db.close();
  genDept();
};


async function addDepartment() {
  // console.log("add departments");
  const nd = await inquirer.prompt(questions.addDept);
  const newDept = nd.newDept;

  const db = makeDb();

  const sql = `INSERT INTO department (name) VALUES ("${newDept}")`;

  try {
    await db.query(sql);
    console.log(`\nSuccessfully created new department named ${newDept}\n`);
  } catch (err) {
    console.log("error with insert",err);
  }

  genDept();
};

async function selectEmpl() {
  // db read to return manager list
  const results = await getEmplList();
  questions.selectEmpl[0].choices = results;
  return inquirer.prompt(questions.selectEmpl);
};


async function selectDept() {
  // db read to return department list
  const results = await getDeptList();
  questions.selectDept[0].choices = results;
  return inquirer.prompt(questions.selectDept);
};

/*
async function assignEmpl() {
  //db call to update manager for department
  const db = makeDb();

  let status = "failure";

  const empl = await selectEmpl();
  const dept = await selectDept();
  // const assign = {dept,empl};
  console.log("assign",assign);

  // const sql = "UPDATE employee SET 

  try {
    empl = await db.query(sql);
  } catch (err) {
    console.log("error",err);
  }
  const results = []; 
  empl.forEach( cur => { results.push(cur.empl); });
  return results;
}
*/

async function removeDepartment() {
  const db = makeDb();
  let deldept;

  const dept = await selectDept();

  const confirm = await inquirer.prompt(questions.confirmDelDept);

  if (confirm) {
    const sql = `DELETE FROM department WHERE name = "${dept.depName}"`;

    try {
      await db.query(sql);
      console.log(`\nSuccessully removed departemnt ${dept.deptName}\n`);
    } catch (err) {
      console.log("error with remove department:?",err);
    } 
  }
  genDept();
};

async function genDept() {
  // console.log("in genDept",questions.genDepartment);

  const deptAction = await inquirer.prompt(questions.genDept);
  // console.log("deptAction:",deptAction.deptChoice);

  switch (deptAction.deptChoice) {
    case 'View all departments':
      // console.log("X select view all departments");
      viewDepartments();
      break;
    case 'Add department': 
      await addDepartment();
      // console.log("X select add departments");
      break;
    // case 'Assign employee':
      // assign new employee
      // const assign = await assignEmpl();
      // console.log("X select asign empl",assign);
      // break;
    case 'View total utilized budget of department': 
      // console.log("X select view total util budget");
      viewUtilizedBudget();
      break;
    case 'Remove department': 
      // console.log("X select remove department");
      removeDepartment();
      break;
    default:
      // console.log("X return to main menu");
      main.init();
      break;
  }
}

async function getEmplList() {
  const db = makeDb();
  let empl;

  const sql = "SELECT CONCAT(last_name,\",\",first_name) AS empl FROM employee";

  try {
    empl = await db.query(sql);
  } catch (err) {
    console.log("error",err);
  }
  const results = []; 
  empl.forEach( cur => { results.push(cur.empl); });
  return results;
}

async function getDeptList() {
  const db = makeDb();
  let dept;

  const sql =  "SELECT name AS department FROM department";

  try {
    dept = await db.query(sql);
  } catch (err) {
    console.log("error",err);
  }

  const results = []; 
  dept.forEach( cur => { results.push(cur.department); });
  return results;
}

function makeDb() {
  return {
    query (sql, args) {
      return util.promisify( connection.query)
        .call( connection, sql, args);
    },
    close() {
      return util.promisify( connection.end ).call(connection);
    }
  };
}

async function init2 () {
  // const db = makeDb();
  let ass;

  const sql1 =  "SELECT name AS department FROM department";
  const sql2 =  "SELECT name AS goat FROM department";

  try {
    const dept = await db.query(sql1);
    const goat = await db.query(sql2);

    console.log("dept",dept);
    console.log("goat",goat);
    ass = {dept,goat};
  } catch (err) {
    console.log("errors");
  } finally {
    await db.close();
  }
  
  // const dep = await selectDept();
  // const man = await selectEmpl();
  // console.log(dep,man);
  // const ass = await assignMang();
  // const ass = await getDeptList();
  console.log("ass",ass);
}

async function init() {
  const out = await selectDept();
  // console.log("out",out);
  const out2 = await selectEmpl();
  // console.log("out",out2);
  console.log("out",out,out2);
}

// init();
// 
// module.exports = () => { return genDept(); };
exports.getDept = genDept;