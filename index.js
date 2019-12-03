const inquirer = require("inquirer");

const questMenu = require("./lib/menu");
const department = require("./lib/department");
const questRole = require("./lib/roles");
const questEmpl= require("./lib/employee");

const test = true;

async function init() {
  if (test) console.log("started init:");
  // will need to wrap this in a loop for n-employees
  try {
    questMenu().then( function(ansOptions){

      if (test) { console.log("answers:",ansOptions); }

      switch (ansOptions.mainMenu) {
        case 'Manage departments':
          console.log("case md");
          // questDept().then( function(){ init();} );
          // department.getDept().then( function(){ init();} );
          department.getDept();
          break;
        case 'Manage roles':
          console.log("case mr");
          // questRole().then( function(){ init();} );
          // questRole();
          break;
        case 'Manage employees':
          console.log("case me");
          // questEmpl().then( function(){ init(); });
          break;
        default:
          console.log("Thank you for using Employee Management Tool.");
          break;
      }
    });
  } catch (error) {
    console.log(`There was a problem ${error}`);
  }
}

init();

exports.init = init;