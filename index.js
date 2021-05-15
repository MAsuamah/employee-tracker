//Requirements
const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  startApp();
});

//Inquirer Prompts
function startApp() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'view',
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
  ])
}