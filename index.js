const inquirer = require("inquirer");
const db = require("./config/connections");

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
          "View department budget",
          "Exit",
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
        case "Add employee":
          promptAddEmployee();
          break;
        case "Update employee role":
          promptUpdateEmployee();
          break;
        case "View department budget":
          viewDeptBudget();
          break;
        case "Exit":
          db.end();
          break;
      }
    })
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
    })
    .then((answers) => promptUser(answers))
    .catch((err) => console.log(err));
};
const promptAddRole = () => {
  // generateDepartmentsArr()
  //   .then((listArr) => {
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
        type: "list",
        name: "addRoleDepartment",
        message: "Choose a department the role will be active in role",
        // TODO add functionality to pull departments from db
        // choices: listArr,
        choices: ["1", "2", "3", "4", "5", "6"],
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
    // })
    .then((answers) => {
      addRole(answers);
      console.table(answers);
    })
    .then((answers) => promptUser(answers))
    .catch((err) => console.log(err));
};
const promptAddEmployee = () => {
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
        message: "Type employee's role id",
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
        name: "addEmployeeSalary",
        message: "Type employee's salary",
        validate: (answers) => {
          if (answers) {
            return true;
          } else {
            console.log("Please enter employee's salary!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "addEmployeeManager",
        message: "Type employee's manager",
        // TODO change to list - choose manager from list of employees
        default: false,
      },
    ])
    .then((answers) => {
      addEmployee(answers);
      console.table(answers);
    })
    .then((answers) => promptUser(answers))
    .catch((err) => console.log(err));
};
const promptUpdateEmployee = () => {
  // function generateEmployeeArr() {
  //   const employeesArrSql = `
  //   SELECT *
  //   FROM employees
  //   `;
  //   db.query(employeesArrSql, (err, rows) => {
  //     if (err) console.log(err);
  //     for (let i = 0; i < rows.length; i++) {
  //       employeesArr.push(rows[i].last_name);
  //     }
  //     return employeesArr;
  //   });
  //   console.log(employeesArr);
  // }

  inquirer
    .prompt([
      {
        type: "list",
        name: "chooseEmployee",
        message: "Choose employee to update",
        choices: [1, 2, 3, 4],
        // TODO generate list for all updated employees,
        validate: (answers) => {
          if (answers) {
            return true;
          } else {
            console.log("Please choose an employee to updated!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "updateEmployeeRole",
        message: "Type employee's updated role title",
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
      console.table(answers);
    })
    .then(() => promptUser())
    .catch((err) => console.log(err));
};
function viewDept() {
  const sqlString = `
      SELECT *
      FROM departments
      `;
  db.query(sqlString, (err, rows) => {
    if (err) console.log(err);
    console.table(rows);
  });
  promptUser();
}
function viewRoles() {
  const sqlString = `
  SELECT roles.*, departments.name
  AS department_id
  FROM roles
  LEFT JOIN departments
  ON roles.department_id = departments.id
  `;

  db.query(sqlString, (err, rows) => {
    if (err) console.log(err);
    console.table(rows);
  });
  promptUser();
}
function viewEmployees() {
  // TODO change manager id to employee name
  const sqlString = `
  SELECT employees.*, roles.role_title 
  AS role_title
  FROM employees
  LEFT JOIN roles 
  ON employees.role_id = roles.id
  `;

  db.query(sqlString, (err, rows) => {
    if (err) console.log(err);
    console.table(rows);
  });
  promptUser();
}
function addDept(answers) {
  const sqlString = `
    INSERT INTO departments(name)
    VALUES (?)
    `;

  db.query(sqlString, answers.addDepartment, (err, row) => {
    if (err) console.log(err);
    // console.table(row);
  });
}
function addRole(answers) {
  const sqlString = `
    INSERT INTO roles(role_title, salary, department_id)
    VALUES (?, ?, ?)
    `;

  db.query(
    sqlString,
    [answers.addRoleTitle, answers.addRoleSalary, answers.addRoleDepartment],
    (err, row) => {
      if (err) console.log(err);
      // console.table(row);
    }
  );
}
function addEmployee(answers) {
  // TODO change manager id to manager name
  const sqlString = `
    INSERT INTO employees(first_name, last_name, role_id, salary, manager_id)
    VALUES (?, ?, ?, ?, ?)
    `;
  const params = [
    answers.addEmployee,
    answers.addEmployeeLastName,
    answers.addEmployeeRole,
    answers.addEmployeeSalary,
    answers.addEmployeeManager,
  ];
  db.query(sqlString, params, (err, row) => {
    if (err) console.log(err);
    // console.table(row);
  });
}
function updateEmployee(answers) {
  const sqlString = `
  UPDATE employees
  SET employees.role_id = ?
  WHERE id = ?
    `;
  const params = [answers.updateEmployeeRole, answers.chooseEmployee];

  db.query(sqlString, params, (err, row) => {
    if (err) console.log(err);
  });
}
function viewDeptBudget() {
  const sqlString = `
  SELECT departments.id AS id, 
  departments.name AS department,
  SUM(salary) 
  AS budget
  FROM roles  
  INNER JOIN departments 
  ON roles.department_id = departments.id 
  GROUP BY roles.department_id
  `;

  db.query(sqlString, (err, rows) => {
    if (err) console.log(err);
    console.table(rows);
  });
  promptUser();
}
