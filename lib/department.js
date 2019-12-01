const inquirer = require("inquirer");
const mysql = require("mysql");
const util = require("util");

const db = require("../db/db");

// const start = require("../index");
// /*

const PSWD = process.env.MYSQL_PSWD;
// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: PSWD,
  database: "employeemanagement"
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
  console.log("Here view all departments");
  connection.query("SELECT name AS department FROM department", function(err,results) {
    if (err) throw err;
    console.log("\n\nDepartments");
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
    // console.log("results ",results);
    console.log("\n\nDepartment\tUtilized Budget");
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

function selectMang() {
  // console.log("selectManager");
  // db read to return manager list
  // const results = await getEmployeeList();
  const results = ["dummy","manager"];
  questions.selectMang[0].choices = results;
  // console.log("new",a);
  return inquirer.prompt(questions.selectMang);
};


async function selectDept() {
  // db read to return manager list
  const results = await getDeptList();
  console.log(results);
  // const results = ["dummy","dept"];
  // const r = db.simpleSelect("department");
  // console.log("r",r);
  // const update = db.simpleSelect("department").then( function(dep) {
    questions.selectDept[0].choices = results;
    return inquirer.prompt(questions.selectDept);
  // });
  // return results;
};

async function assignMang() {
  //db call to update manager for department
  // 
  // console.log("simpleSelect",simpleSelect);
  // console.log("simpleSelect[0]",simpleSelect[0]);

  const dept = await selectDept();
  const mang = await selectMang();
  /*
  selectDept()
    .then( function(dep) {
      selectMang(dep); })
    .then( function(man) {
      console.log("select dept",dep);
      console.log("select man",man);
      // update manager db here
      // genDept();
    });
  // */
  // const dept = await selectDept();
  // const mang = await selectMang();
  console.log("assign",dept,mang);
  const assign = {dept,mang};
  // return await updateDb(dept,mang);
  return (assign);
};

function removeDepartment() {
  console.log("remove department");
};

async function genDept() {
  // console.log("in genDept",questions.genDepartment);

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
      // gets new manager
      const assign = await assignMang();
      console.log("X select asign manager",assign);
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
}


async function getDeptList() {
  const db = makeDb();
  let dept;

  const sql1 =  "SELECT name AS department FROM department";

  try {
    dept = await db.query(sql1);
  } catch (err) {
    console.log("poo errors");
  } finally {
    await db.close();
  }
  const results = []; 
  dept.forEach( cur => { results.push(cur.department); });
  return results;
}

function makeDb() {
  return {
    query (sql, args) {
      return util.promisify( connection.query)
        .call ( connection, sql, args);
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
  // const man = await selectMang();
  // console.log(dep,man);
  // const ass = await assignMang();
  // const ass = await getDeptList();
  console.log("ass",ass);
}

async function init() {
  const out = await selectDept();
  console.log("out",out);
}

// init();
// 
// module.exports = () => { return genDept(); };
exports.getDept = genDept;