//Requirements
const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const roleUD = []

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
                'Update an employee role?',
                'Update an employee\'s manager?'
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
        updateEmployeeRole()
        break;

      case 'Update an employee\'s manager?':
        updateEmployeeMngr()
        break;
    };
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
};

const viewRoles = () =>  {
  const sql = `SELECT roles.title, roles.salary, departments.dept_name
  FROM roles
  LEFT JOIN departments ON roles.department_id = departments.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err)
    }
    console.table(rows)
    startApp();
  });
};

const viewEmployees = () =>  {
  const sql = `SELECT employees.first_name, employees.last_name, roles.title, CONCAT(emp.first_name, ' ' ,emp.last_name) AS Manager 
  FROM employees
  LEFT JOIN roles ON employees.role_id = roles.id
  LEFT JOIN employees emp ON employees.manager_id = emp.id; `;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err)
    }
    console.table(rows)
    startApp();
  });
};

const addDepartment = () =>  {
  inquirer.prompt([
    {
      type: 'input',
      name: 'addDept',
      message: 'Enter the name of the department you would like to add:'
    }
  ]).then(deptName => {
    const sql = `INSERT INTO departments (dept_name)
    VALUES (?)`;
    const dept = deptName.addDept
    db.query(sql, dept, (err, rows) => {
      if (err) {
        console.log(err);
      }
      viewDepartments();
    });
  });
};

const addRole = () =>  {
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the role you would like to add:'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary of the role:'
    }
  ]).then(role => {
    const sql = `INSERT INTO roles (title, salary)
    VALUES (?,?)`;

    const roleAdded = [role.title, role.salary];

    db.query(sql, roleAdded, (err, rows) => {
      if (err) {
        console.log(err);
      }
      viewRoles();
    });
  });
};

const addEmployee = () =>  {
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter the first name of the employee you would like to add:'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter the employee\'s last name:'
    }
  ]).then(ee => {
    const sql = `INSERT INTO employees (first_name, last_name)
    VALUES (?,?)`;

    const roleAdded = [ee.firstName, ee.lastName];

    db.query(sql, roleAdded, (err, rows) => {
      if (err) {
        console.log(err);
      }
      viewEmployees();
    });
  });
};

const updateEmployeeRole = () =>  {
  
  let employeeChoices = []
  let roleChoices = []
  
  const sqlEE = `SELECT id, concat(first_name,' ',last_name) AS Employee from employees`
  const sqlRole = `SELECT id, title from roles`

  db.query(sqlEE, (err, ee) => {
    if (err) {
      console.log(err);
    }
    for (let i = 0; i < ee.length; i++) {
      employeeChoices.push(ee[i].Employee)
    };

    db.query(sqlRole, (err, role) => {
      if (err) {
        console.log(err);
      }
      for (let i = 0; i < role.length; i++) {
        roleChoices.push(role[i].title);
      };
      inquirer.prompt([
        {
          name: 'eeChoices',
          type: 'list',
          message: 'Whose role would you like to update?',
          choices: employeeChoices
        },
        {
          name: 'roleChoices',
          type: 'list',
          message: 'What is their new role?',
          choices: roleChoices
        }
      ]).then(function(ans) {
        let employeeID;
        let roleID;
    
        for (i=0; i < ee.length; i++){
          if (ans.eeChoices == ee[i].Employee) {
            employeeID = ee[i].id;
          }
        };

        for (i=0; i < role.length; i++){
          if (ans.roleChoices == role[i].title){
            roleID = role[i].id;
          }
        };

        const sqlUpdate = `UPDATE employees SET role_id = ${roleID} WHERE id = ${employeeID}`
        db.query(sqlUpdate, (err, res) => {
          if (err) {
            console.log(err);
          }
          viewEmployees();
        });
      });
    });
  });
};

const updateEmployeeMngr = () =>  {
  
  let employeeNames = []
  
  const sqlEE = `SELECT id, concat(first_name,' ',last_name) AS Employee from employees`

  db.query(sqlEE, (err, ee) => {
    if (err) {
      console.log(err);
    }
    for (let i = 0; i < ee.length; i++) {
      employeeNames.push(ee[i].Employee)
    };

    console.log(employeeNames)

    inquirer.prompt([
      {
        name: 'eeChoices',
        type: 'list',
        message: 'Whose manager would you like to update?',
        choices: employeeNames
      },
      {
        name: 'mngrChoices',
        type: 'list',
        message: 'Who is their new manager?',
        choices: employeeNames
      }
    ]).then(function(ans) {
      let employeeID;
      let mngrID;
  
      for (i=0; i < ee.length; i++){
        if (ans.eeChoices == ee[i].Employee) {
          employeeID = ee[i].id;
        }
      };

      for (i=0; i < ee.length; i++){
        if (ans.mngrChoices == ee[i].Employee){
          mngrID = ee[i].id;
        }
      };

      const sqlUpdate = `UPDATE employees SET manager_id = ${mngrID} WHERE id = ${employeeID}`
      db.query(sqlUpdate, (err, res) => {
        if (err) {
          console.log(err);
        }
        viewEmployees();
      });
    });
  });
};


