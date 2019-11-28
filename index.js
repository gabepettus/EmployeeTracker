const inquirer = require("inquirer");

const questMenu = require("./lib/menu");
const questDept= require("./lib/department");
const questRole = require("./lib/roles");
const questEmpl= require("./lib/employee");

const test = true;

async function init() {
  // if (test) console.log("started init:");
  // will need to wrap this in a loop for n-employees
  try {
    let again = true;

    // while (again) {
      // build employee information (i would put this in the Employee object)
      // const ansOptions = await questMenu();
      questMenu().then( function(ansOptions){

      if (test) { console.log("answers:",ansOptions); }

      switch (ansOptions.mainMenu) {
        case 'Manage departments':
          console.log("case md");
          questDept();
          console.log("here");
          // employee = new Intern (fullName,id,email,ansRoleEmpl.school);
          // intList.push(employee);
          break;
        case 'Manage roles':
          console.log("case mr");
          questRole();
          break;
        case 'Manage employees':
          console.log("case me");
          questEmpl();
          break;
        default:
          again = false;
          break;
      }

      });
    // }
  } catch (error) {
    console.log(`There was a problem ${error}`);
  }
}

init();

module.exports = () => { return init(); };