const inquirer = require("inquirer");

const questions = require("./lib/questions")

const test = false;

// use inquire to ask general employee questions
const askOptions = () => {
  if (test) console.log("entered: askOptions", questions.options);
  return inquirer.prompt(questions.options);
};

async function init() {
  if (test) console.log("started init:");
  // array in which to store employees
  // let employee;

  // will need to wrap this in a loop for n-employees
  try {
    let again = true;

    while (again) {
      // build employee information (i would put this in the Employee object)
      const ansOptions = await askOptions();
      // maybe these should be in the employee class?

      // increment id for next employee

      switch (ansGenEmpl.role) {
        case 'Intern':
          ansRoleEmpl = await askIntEmpl();
          employee = new Intern (fullName,id,email,ansRoleEmpl.school);
          intList.push(employee);
          break;
        case 'Engineer':
          ansRoleEmpl = await askEngEmpl();
          employee = new Engineer (fullName,id,email,ansRoleEmpl.github);
          engList.push(employee);
          break;
      }

      console.log(`Added new employee ${employee.getName()} to team!`);

      // can i combine this into one statement
      const askResult = await askAgain();
      again = askResult.again;
    }

    // sort lists 
    manList.sort(nameCompare);
    engList.sort(nameCompare);
    intList.sort(nameCompare);

    const file = generateHTML(teamList);

    // write to file

    const filename = "./index.html";
    write2File(filename,file);

  } catch (error) {
    console.log(`There was a problem ${error}`);
  }
}

init();