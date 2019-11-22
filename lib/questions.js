questions = {
  options: [
    {
      type: "list",
      name: "options",
      message: "What would you like to do?",
      choices: ["Manage departments", 
                "Manage roles", 
                "Manage employees", 
                "Quit program" ]
    }
  ],

  genDepartment: [
    {
      type: "list",
      name: "genDepartment",
      message: "Options for department management?",
      choices: ["View all departments", 
                "Add department", 
                "Assign manager",
                "View total utilized budget of department", 
                "Remove department" ]
    }
  ],

  addDepartment: [
    {
      type: "input",
      name: "depName",
      message: "Enter department name:",
    },

    // choice will be dynamically set from existing employees
    {
      type: "list",
      name: "depName",
      message: "Select department manager:",
    }
  ],

  genRole: [
    {
      type: "list",
      name: "genRole",
      message: "Options for role management?",
      choices: ["View all roles", 
                "Add role", 
                "Remove role" ]
    }
  ],

  addRole: [
    {
      type: "input",
      name: "rolTitle",
      message: "Enter role title:",
    },

    {
      type: "input",
      name: "rolSalary",
      message: "Enter role salary:",
    },

    // choice will be dynamically set from existing departments
    {
      type: "list",
      name: "rolManager",
      message: "Select department in which rolls are assigned:"
    }
  ],

  genEmployee: [
    {
      type: "list",
      name: "genEmployee",
      message: "Options for employee management?",
      choices: ["View all employees", 
                "View by manager", 
                "Add employee", 
                "Update employee information", 
                "Promote employee to manager",
                "Remove employee" ]
    }
  ],

  addEmployee: [
    {
      type: "input",
      name: "emplFirstName",
      message: "Enter employee first name:",
    },

    {
      type: "input",
      name: "emplLastName",
      message: "Enter employee last name:",
    },

    {
      type: "input",
      name: "emplRole",
      message: "Enter employee role:",
    },

    // choice will be dynamically set from existing managers
    {
      type: "list",
      name: "emplManager",
      message: "Select employees manager:"
    }
  ],
};

module.exports = questions;