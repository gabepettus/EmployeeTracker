const inquirer = require("inquirer");

const questions = {
  genDepartment: [
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

  selectDepartment: [
    {
      type: "list",
      name: "depName",
      message: "Select department:",
      // choices will be dynamically set from existing departments
    },
  ],

  selectManager: [
    {
      type: "list",
      name: "depName",
      message: "Select department manager:",
      // choice will be dynamically set from existing employees
    }
  ],
}

function viewDepartments() {
  console.log("view all departments");
}

function addDepartment() {
  console.log("add departments");
}

function assignManager() {
  console.log("assign manager");
}

function viewUtilizedBudget() {
  console.log("view utilized budget");
}

function removeDepartment() {
  console.log("remove department");
}

async function genDept() {
  // console.log("in genDept",questions.genDepartment);
  let again = true;
  while (again) {
    const deptAction = await inquirer.prompt(questions.genDepartment);
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
        assignManager();
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
  }

  console.log("here dept");
}

module.exports = () => {
  return genDept();
};