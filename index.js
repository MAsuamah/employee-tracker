//Requirements
const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

// Start app after DB connection
db.connect(err => {
  if (err) throw err;
  startApp();
});

//Inquirer Prompts for Main Menu
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
                'Update an employee\'s manager?',
                'Update a role\'s department?'
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

      case 'Update a role\'s department?':
        updateRoleDept()
        break;
    };
  });
};

//====================Functions to call for choices selected===========================//

//View Departments function
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

//View Roles function
const viewRoles = () =>  {
  const sql = `SELECT roles.id, roles.title, roles.salary, departments.dept_name
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

//View Employees function
const viewEmployees = () =>  {
  const sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.dept_name As department, roles.salary, CONCAT(emp.first_name, ' ' ,emp.last_name) AS Manager 
  FROM employees
  LEFT JOIN roles ON employees.role_id = roles.id
  LEFT JOIN departments ON roles.department_id = departments.id
  LEFT JOIN employees emp ON employees.manager_id = emp.id; `;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err)
    }
    console.table(rows)
    startApp();
  });
};

//Add Departments function
const addDepartment = () =>  {
  inquirer.prompt([
    {
      type: 'input',
      name: 'addDept',
      message: 'Enter the name of the department you would like to add:'
    }
  //Take input entered and add it to table
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

//Add Role function
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
  //Take input entered and add it to table
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

//Add Employee function
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
  //Take input entered and add it to table
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


//Update Employee function
const updateEmployeeRole = () =>  {
  
  //Arrays that will provide a list of options in the inquirer choices
  let employeeChoices = []
  let roleChoices = []
  
  const sqlEE = `SELECT id, CONCAT(first_name,' ',last_name) AS Employee FROM employees`
  const sqlRole = `SELECT id, title FROM roles`

  db.query(sqlEE, (err, ee) => {
    if (err) {
      console.log(err);
    }
    //Get results from sql query and push Employee (first name last name) into employeeChoices array.
    for (let i = 0; i < ee.length; i++) {
      employeeChoices.push(ee[i].Employee)
    };

    db.query(sqlRole, (err, role) => {
      if (err) {
        console.log(err);
      }
      //Get results from sql query and push roles (title) into roleChoices array.
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

        //Loop through sql query results and get element that matches selected choice, get element's ID and assign to employeeID variable
        for (i=0; i < ee.length; i++){
          if (ans.eeChoices == ee[i].Employee) {
            employeeID = ee[i].id;
          }
        };
        //Loop through sql query results and get element that matches selected choice, get element's ID and assign to roleID variable
        for (i=0; i < role.length; i++){
          if (ans.roleChoices == role[i].title){
            roleID = role[i].id;
          }
        };
          
        //Update query for assigning new role to employee
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

//Update Employee's Manager function
const updateEmployeeMngr = () =>  {
  
  //Array that will provide a list of options in the inquirer choices
  let employeeNames = []
  
  const sqlEE = `SELECT id, CONCAT(first_name,' ',last_name) AS Employee FROM employees`

  db.query(sqlEE, (err, ee) => {
    if (err) {
      console.log(err);
    }
    //Get results from sql query and push Employee (first name last name) into employeeNames array.
    for (let i = 0; i < ee.length; i++) {
      employeeNames.push(ee[i].Employee)
    };

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

      //Loop through sql query results and get element that matches selected choice, get element's ID and assign to employeeID variable
      for (i=0; i < ee.length; i++){
        if (ans.eeChoices == ee[i].Employee) {
          employeeID = ee[i].id;
        }
      };
      //Loop through sql query results and get element that matches selected choice, get element's ID and assign to mngrID variable
      for (i=0; i < ee.length; i++){
        if (ans.mngrChoices == ee[i].Employee){
          mngrID = ee[i].id;
        }
      };

      //Update query for assigning new manager to employee
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

//Update Role's Department function
const updateRoleDept = () =>  {

  //Arrays that will provide a list of options in the inquirer choices
  let roleArr = []
  let deptArr = []
  
  const sqlRole = `SELECT id, title FROM roles`
  const sqlDept = `SELECT id, dept_name FROM departments`

  db.query(sqlRole, (err, role) => {
    if (err) {
      console.log(err);
    }
    //Get results from sql query and push role (title) into roleArr.
    for (let i = 0; i < role.length; i++) {
      roleArr.push(role[i].title)
    };

    db.query(sqlDept, (err, dept) => {
      if (err) {
        console.log(err);
      }
      //Get results from sql query and push department (dept_name) into deptArr.
      for (let i = 0; i < dept.length; i++) {
        deptArr.push(dept[i].dept_name);
      };
      
      inquirer.prompt([
        {
          name: 'roleUD',
          type: 'list',
          message: 'Which role would you like to update the department for?',
          choices: roleArr
        },
        {
          name: 'newDept',
          type: 'list',
          message: 'What is the role\'s updated department?',
          choices: deptArr
        }
      ]).then(function(ans) {
        let deptID;
        let roleID;

        //Loop through sql query results and get element that matches selected choice, get element's ID and assign to roleID variable
        for (i=0; i < role.length; i++){
          if (ans.roleUD == role[i].title) {
            roleID = role[i].id;
          }
        };
        //Loop through sql query results and get element that matches selected choice, get element's ID and assign to deptID variable
        for (i=0; i < dept.length; i++){
          if (ans.newDept == dept[i].dept_name) {
            deptID = dept[i].id;
          }
        };

        //Update query for assigning a department to role
        const sqlUpdate = `UPDATE roles SET department_id = ${deptID} WHERE id = ${roleID}`
        db.query(sqlUpdate, (err, res) => {
          if (err) {
            console.log(err);
          }
          viewRoles();
        });
      });
    });
  });
};

