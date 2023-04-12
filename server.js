const inquirer = require("inquirer");
const consoleTable = require("console.table");
const fs = require("fs")
const questionData = require("./lib/index");

const startQuestions = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "startQuestions",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add an employee role",
          "Add an employee",
          "Update an employee",
        ],
      },
    ])
    .then((data) => {
      switch (data.startQuestions) {
        case "View all departments":
          viewDepartments();
          break;

        case "View all roles":
          viewRoles();
          break;

        case "View all employees":
          viewEmployees();
          break;

        case "Add a department":
          createDep();
          break;

        case "Add an employee role":
          createRole();
          break;

        case "Add an employee":
          createEmployee();
          break;

        case "Update an employee":
          updateEmployee();
          break;
      }
    });
};
startQuestions();

function viewDepartments() {
  questionData.viewDepartments().then(([rows, fields]) => {
    console.table(rows);
    startQuestions();
  });
}

const viewRoles = () => {
  questionData.viewRoles().then(([rows, fields]) => {
    console.table(rows);
    startQuestions();
  });
};

const viewEmployees = () => {
  questionData.viewEmployees().then(([rows, fields]) => {
    console.table(rows);
    startQuestions();
  });
};

const createDep = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the new department name?",
        name: "dep_name",
      },
    ])
    .then((data) => {
      questionData.createDep(data.dep_name).then(([rows, fields]) => {
        console.table(rows);
        startQuestions();
      });
    });
};

const createRole = () => {
  questionData.viewDepartments().then(([rows, fields]) => {
    const array = [];
    for (var i = 0; i < rows.length; i++) {
      let department = rows[i].id + "." + " " + rows[i].dep_name;
      array.push(department);
    }
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the role?",
          name: "role_name",
        },
        {
          type: "input",
          message: "What is the salary of the role?",
          name: "salary",
        },
        {
          type: "list",
          message: "What is the department of the role?",
          name: "dep_name",
          choices: array,
        },
      ])
      .then((data) => {
        let id = data.dep_name.slice(0, 1);
        console.log(id);
        questionData
          .addRole(data.role_name, data.salary, id)
          .then(([rows, fields]) => {
            console.table(rows);
            startQuestions();
          });
      });
  });
};

const createEmployee = () => {
  questionData.viewRoles().then(([rows, fields]) => {
    const rArray = [];
    for (var i = 0; i < rows.length; i++) {
      let role = rows[i].id + "." + " " + rows[i].title;
      rArray.push(role);
    }
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the employee's first name?",
          name: "first_name",
        },
        {
          type: "input",
          message: "What is the employee's last name?",
          name: "last_name",
        },
        {
          type: "list",
          message: "What is the employee's role?",
          name: "role",
          choices: rArray,
        },
      ])
      .then((data) => {
        let firstName = data.first_name;
        let lastName = data.last_name;
        let roleId = data.role.slice(0, 1);
        questionData.viewEmployees().then(([rows, fields]) => {
          const eArr = [];
          for (var i = 0; i < rows.length; i++) {
            let employee =
              rows[i].id +
              "." +
              " " +
              rows[i].first_name +
              " " +
              rows[i].last_name;
            eArr.push(employee);
          }
          inquirer
            .prompt([
              {
                type: "list",
                message: "Select the employee's manager",
                name: "employee",
                choices: eArr,
              },
            ])
            .then((data) => {
              let id = data.employee.slice(0, 1);
              questionData
                .addEmployee(firstName, lastName, roleId, id)
                .then(([rows, fields]) => {
                  console.table(rows);
                  startQuestions();
                });
            });
        });
      });
  });
};

//function: WHEN I choose to update an employee role THEN I am prompted to select an employee to update and their new role and this information is updated in the database
const updateEmployee = () => {
  questionData.viewEmployees().then(([rows, fields]) => {
    const eArr2 = [];
    for (var i = 0; i < rows.length; i++) {
      let employee =
        rows[i].id + "." + " " + rows[i].first_name + " " + rows[i].last_name;
      eArr2.push(employee);
    }
    inquirer
      .prompt([
        {
          type: "list",
          message: "Select an employee to update",
          name: "employee",
          choices: eArr2,
        },
      ])
      .then((data) => {
        let employeeSelected = data.employee;
        questionData.viewRoles().then(([rows, fields]) => {
          const rArr2 = [];
          for (var i = 0; i < rows.length; i++) {
            let role = rows[i].id + "." + " " + rows[i].title;
            rArr2.push(role);
          }
          inquirer
            .prompt([
              {
                type: "list",
                message: "Select the new role",
                name: "role",
                choices: rArr2,
              },
            ])
            .then((data) => {
              let id = employeeSelected.slice(0, 1);
              let employee = employeeSelected.slice(3);
              let roleId = data.role.slice(0, 1);
              let role = data.role.slice(3);
              questionData.updateEmployee(id, roleId).then(([rows, fields]) => {
                console.log(`${employee}'s role has been updated to ${role}!`);
                startQuestions();
              });
            });
        });
      });
  });
};
