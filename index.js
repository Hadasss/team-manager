const inquirer = require("inquirer");
const db = require("./db/connections");

const questions = [];

db.connect((err) => {
  if (err) throw err;
  console.log("connection successful");
  promptUser();
});

const promptUser = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "options",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add employee",
          "Update employee role",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.options) {
        case "View all departments":
          viewDept();
          break;
        case "View all roles":
          // TODO FUNCTION HERE
          break;
        case "View all employees":
          // TODO FUNCTION HERE
          break;
        case "Add a department":
          promptAddDepartment();
          break;
        default:
          console.log("choice picked");
        case "Add a role":
          promptAddRole();
          break;
        // default:
        //     console.log("choice picked");
        case "Add employee":
          promptAddEmployee();
          break;
        // default:
        //     console.log("choice picked");
        case "Update employee role":
          promptUpdateEmployee();
          break;
        // default:
        //     console.log("choice picked");
      }
    });
};

const promptAddDepartment = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "addDepartment",
      message: "Type a department name to add to the list",
      validate: (answers) => {
        if (answers) {
          return true;
        } else {
          console.log("Please enter department name!");
          return false;
        }
      },
    },
  ]);
};

promptAddRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addRoleTitle",
        message: "Enter role title",
        validate: (answers) => {
          if (answers) {
            return true;
          } else {
            console.log("Please enter role title!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "addRoleSalary",
        message: "Enter role salary",
        validate: (answers) => {
          if (answers) {
            return true;
          } else {
            console.log("Please enter role salary!");
            return false;
          }
        },
      },
      {
        // TODO change type to list, to choose department from list
        type: "input",
        name: "addRoleDepartment",
        message: "Enter department the role will be active in role",
        validate: (answers) => {
          if (answers) {
            return true;
          } else {
            console.log("Please enter role department!");
            return false;
          }
        },
      },
    ])
    .then((answers) => {
      // call addRole();
      addRole(answers);
    });
};

promptAddEmployee = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "addEmployee",
      message: "Type employee's first name",
      // when: (answers) => {
      //   if (answers.options == "Add employee") {
      //     return true;
      //   }
      // },
      validate: (answers) => {
        if (answers) {
          return true;
        } else {
          console.log("Please enter employee's first name!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "addEmployeeLastName",
      message: "Type employee's last name",
      // when: (answers) => {
      //   if (answers.addEmployee) {
      //     return true;
      //   }
      // },
      validate: (answers) => {
        if (answers) {
          return true;
        } else {
          console.log("Please enter employee's last name!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "addEmployeeRole",
      message: "Type employee's role title",
      // when: (answers) => {
      //   if (answers.addEmployeeLastName) {
      //     return true;
      //   }
      // },
      validate: (answers) => {
        if (answers) {
          return true;
        } else {
          console.log("Please enter employee's role title!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "addEmployeeManager",
      message: "Type employee's manager",
      // when: (answers) => {
      //   if (answers.addEmployeeRole) {
      //     return true;
      //   }
      // },
      validate: (answers) => {
        if (answers) {
          return true;
        } else {
          console.log("Please enter employee's manager!");
          return false;
        }
      },
    },
  ]);
};

promptUpdateEmployee = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "updateEmployee",
      message: "Type employee's updated role title",
      // when: (answers) => {
      //   if (answers.options == "Update employee role") {
      //     return true;
      //   }
      // },
      validate: (answers) => {
        if (answers) {
          return true;
        } else {
          console.log("Please enter employee's updated role title!");
          return false;
        }
      },
    },
  ]);
};

// create function to use sql query to add role
function addRole(obj) {
  const sqlString = `
    INSERT INTO roles(job_title, salary, department_id)
    VALUES (?, ?, ?)
    `;
  db.query(
    sqlString,
    [obj.addRoleTitle, obj.addRoleSalary, obj.addRoleDepartment],
    (err, row) => {
      if (err) console.log(err);
      console.log(row);
      console.table(row);
    }
  );
}

function viewDept() {
  const sqlString = `
    SELECT *
    FROM departments
    `;

  db.query(sqlString, (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.log(rows);
    console.table(rows);
  });
}

// TODO create functions to other prompts
