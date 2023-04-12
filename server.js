const { prompt } = require("inquirer");
require("console.table");
const dataBase = require("./db");

function askQuestions() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "Make a selection from the choices listed below",
      choices: [
        {
          name: "VIEW all employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "VIEW all roles",
          value: "VIEW_ROLES",
        },
        {
          name: "VIEW all departments",
          value: "VIEW_DEPARTMENTS",
        },
        {
          name: "ADD employee",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "ADD role",
          value: "ADD_ROLE",
        },
        {
          name: "ADD department",
          value: "ADD_DEPARTMENT",
        },
        {
          name: "DELETE employee",
          value: "DELETE_EMPLOYEE",
        },
        {
          name: "DELETE role",
          value: "DELETE_ROLE",
        },
        {
          name: "DELETE department",
          value: "DELET_DEPARTMENT",
        },
        {
          name: "Quit",
          value: "QUIT",
        },
      ],
    },
  ]).then((answer) => {
    let choice = answer.choice;
    switch (choice) {
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case "VIEW_ROLES":
        viewRoles();
        break;
      case "VIEW_DEPARTMENTS":
        viewDepartments();
        break;
      case "ADD_EMPLOYEE":
        createEmployee();
        break;
      case "ADD_ROLE":
        createRole();
        break;
      case "ADD_DEPARTMENT":
        createDepartment();
        break;
      case "DELETE_EMPLOYEE":
        deleteEmployee();
        break;
      case "DELETE_ROLE":
        deleteRole();
        break;
      case "DELETE_DEPARTMENT":
        deleteDepartment();
        break;
      default:
        quitQuestions();
    }
  });
}
