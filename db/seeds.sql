-----Departments----

INSERT INTO departments (dept_name)
VALUES
  ('HR'),
  ('Design'),
  ('Finance'),
  ('Software Development');


-----Roles----

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Engineer', 90000, 4),
  ('Accountant', 67000, 3),
  ('HR Analyst', 72000, 1),
  ('UI/UX Designer', 80000, 2),
  ('Tech Lead', 120000, 4),
  ('QA and Test Engineer', 85000, 4);


-----Employees----

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Jessica', 'Jones', 4, 2),
  ('Michelle', 'Obama', 5, NULL),
  ('Hermione', 'Granger', 1, 2),
  ('Stephen', 'Curry', 1, 2),
  ('Viola', 'Davis', 1, 2),
  ('Kevin', 'Durant', 6, 2),
  ('Kyrie', 'Irving', 3, NULL),
  ('Aubrey', 'Graham', 4, 2),
  ('Sandra', 'Bullock', 2, NULL),
  ('Beyonce', 'Knowles', 6, 2);




  
