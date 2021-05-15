//Requirements
const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

// Start app after DB connection
db.connect(err => {
  if (err) throw err;
  startApp();
});

//Inquirer Prompts
function startApp() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'toDo',
      message: 'What would you like to do?',
      choices: [
                'View all departments?', 
                'View all roles?',
                'View all employees?', 
                'Add a department?',
                'Add a role?',
                'Add an employee?',
                'Update an employee role?'
              ]
    },
  //Call specific function depending on choice selected
  ]).then(function(action) {
    switch(action.toDo) {
      case 'View all departments?':
        viewDepartments()
        break;

      case 'View all roles?':
        viewRoles()
        break;

      case 'View all employees?':
        viewEmployees()
        break;

      case 'Add a department?':
        addDepartment()
        break;

      case 'Add a role?':
        addRole()
        break;

      case 'Add an employee?':
        addEmployee()
        break;

      case 'Update an employee role?':
        updateEmployee()
        break;
    }
  });
};

//====================Functions to call for choices selected===========================//

const viewDepartments = () =>  {
  const sql = `SELECT * FROM departments`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err)
    }
    console.table(rows)
    startApp();
  });
}

const viewRoles = () =>  {
  const sql = `SELECT * FROM roles`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err)
    }
    console.table(rows)
    startApp();
  });
}

const viewEmployees = () =>  {
  const sql = `SELECT * FROM employees`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err)
    }
    console.table(rows)
    startApp();
  });
}

const addDepartment = () =>  {
  inquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'Enter the name of the department you would like to add:'
    },
  ]).then(deptName => {
    const sql = `INSERT INTO departments (dept_name)
    VALUES (?)`;
    const dept = deptName.departmentName
    db.query(sql, dept, (err, rows) => {
      if (err) {
        console.log(err)
      }
      viewDepartments();
    });
  })
}






