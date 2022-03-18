const inquirer = require("inquirer");
const db = require("./db/connections");

db.connect((err) => {
  if (err) throw err;
  console.log("connection successful");
  promptUser();
});

const generateDepartmentsArr = () => {
  let departArr = [];

  const sqlString = `
  SELECT * 
  FROM departments
  `;
  return new Promise((resolve, reject) => {
    db.query(sqlString, (err, rows) => {
      if (err) {
        reject(new Error("Oops, something's wrong"));
      } else {
        departArr.forEach((department) => {
          departArr.push(department.department.name);
        });
        return departArr;
      }
    });
  });
};

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
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
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
    })
    // .then(() => {
    //   inquirer.prompt([
    //     {
    //       type: "confirm",
    //       name: "finish",
    //       message:
    //         "Would you like to do anything else? If you wish to exit type N.",
    //       // TODO finish this prompt. not sure about the syntax!
    //       when: (answers) => {
    //         if (answers == "y") promptUser();
    //       },
    //     },
    //   ]);
    // })
    .catch((err) => console.log(err));
};

const promptAddDepartment = () => {
  inquirer
    .prompt([
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
    ])
    .then((answers) => {
      addDept(answers);
      console.table(answers);
    });
};

promptAddRole = () => {
  generateDepartmentsArr()
    .then((listArr) => {
      inquirer.prompt([
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
          type: "list",
          name: "addRoleDepartment",
          message: "Choose a department the role will be active in role",
          // TODO add functionality to pull departments from db
          choices: listArr,
          validate: (answers) => {
            if (answers) {
              return true;
            } else {
              console.log("Please enter role department!");
              return false;
            }
          },
        },
      ]);
    })
    .then((answers) => {
      addRole(answers);
    });
};

promptAddEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addEmployee",
        message: "Type employee's first name",
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
        // TODO change to list, choose role from list
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
        // TODO change to list - choose manager from list of employees
        validate: (answers) => {
          if (answers) {
            return true;
          } else {
            console.log("Please enter employee's manager!");
            return false;
          }
        },
      },
    ])
    .then((answers) => {
      addEmployee(answers);
    });
};

promptUpdateEmployee = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "chooseEmployee",
        message: "Choose employee to update",
        choices: [
          // TODO add list of employees
        ],
        validate: (answers) => {
          if (answers) {
            return true;
          } else {
            console.log("Please enter employee's updated role title!");
            return false;
          }
        },
      },
      {
        type: "list",
        name: "updateEmployeeRole",
        message: "Type employee's updated role title",
        choices: [
          // TODO add list of roles
        ],
        validate: (answers) => {
          if (answers) {
            return true;
          } else {
            console.log("Please enter employee's updated role title!");
            return false;
          }
        },
      },
    ])
    .then((answers) => {
      updateEmployee(answers);
    });
};

function viewDept() {
  const sqlString = `
      SELECT *
      FROM departments
      `;

  db.query(sqlString, (err, rows) => {
    if (err) console.log(err);
    console.log(rows);
    console.table(rows);
  });
}

function viewRoles() {
  // TODO change department id to department name
  const sqlString = `
  SELECT *
  FROM roles
  `;
  // LEFT JOIN departments
  // ON roles.department_id = departments.name

  db.query(sqlString, (err, rows) => {
    if (err) console.log(err);
    console.table(rows);
  });
}

function viewEmployees() {
  // TODO change role id to role name
  // TODO change manager id to
  const sqlString = `
  SELECT *
  FROM employees`;

  db.query(sqlString, (err, rows) => {
    if (err) console.log(err);
    console.table(rows);
  });
}

function addDept(answers) {
  const sqlString = `
    INSERT INTO departments(name)
    VALUES (?)
    `;

  db.query(sqlString, answers.addDepartment, (err, row) => {
    if (err) console.log(err);
    // console.log(row);
    // console.table(row);
  });
}

function addRole(obj) {
  const sqlString = `
    INSERT INTO roles(job_title, salary, department_id)
    VALUES (?, ?, ?)
    `;

  // TODO add a departments array for list in prompt

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

function addEmployee(answers) {
  // TODO change manager id to manager name
  // BUG doesn't recognize job_title column because it's a different table.
  const sqlString = `
    INSERT INTO employees(first_name, last_name, job_title, manager_id)
    VALUES (?, ?, ?, ?)
    `;

  db.query(
    sqlString,
    [
      answers.addEmployee,
      answers.addEmployeeLastName,
      answers.addEmployeeRole,
      answers.addEmployeeManager,
    ],
    (err, row) => {
      if (err) console.log(err);
      console.log(row);
      console.table(row);
    }
  );
}

// TODO updateEmployee function
function updateEmployee() {
  const sqlString = `
  UPDATE employees
  WHERE 
    `;
}
