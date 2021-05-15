DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;

---------Departments Table---------

CREATE TABLE departments (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  dept_name VARCHAR(30) NOT NULL
);

-----------Roles Tables-----------

CREATE TABLE roles (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  FOREIGN KEY (department_id) REFERENCES departments(id) 
);

---------Employees Tables----------

CREATE TABLE employees (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  FOREIGN KEY (role_id) REFERENCES roles(id) 
  FOREIGN KEY (manager_id) REFERENCES employees(id) 
);



