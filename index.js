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
  console.log('hey!')
}