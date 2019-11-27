const inquirer = require("inquirer");

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
};

function viewUtilizedBudget() {
  console.log("view utilized budget");
};

function addDepartment() {
  console.log("add departments");
};

async function selectMang() {
  console.log("selectManager");
  // db read to return manager list
  // const results = await getEmployeeList();
  const results = ["dummy","manager"];
  questions.selectMang[0].choices = results;
  // console.log("new",a);
  return inquirer.prompt(questions.selectMang);
};

let selectDept = function() {
  console.log("in selectDept");
  // db read to return manager list
  // const results = await getDeptList();
  const results = ["dummy","dept"];
  questions.selectDept[0].choices = results;
  // console.log("new2",questions.selectDept);
  let stuff = inquirer.prompt(questions.selectDept)
          .then(function(ans) {
            return ans;
          });
  return stuff;
};

async function assignMang() {
  //db call to update manager for department
  // 
  selectDept().then( function(ans) {
    console.log("select dept",ans);
  });
  // const mang = await selectMang();
};

function removeDepartment() {
  console.log("remove department");
};

async function genDept() {
  // console.log("in genDept",questions.genDepartment);
  // let again = true;
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
        again = false;
    }
  // }
  console.log("here dept");
}

module.exports = () => {
  return genDept();
};