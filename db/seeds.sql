INSERT INTO departments (dept_name)
VALUES
  ('HR'),
  ('Design'),
  ('Finance'),
  ('Software Development');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Engineer', 90000, 4),
  ('Accountant', 67000, 3),
  ('HR Analyst', 72000, 1),
  ('UI/UX Designer', 80000, 2),
  ('Tech Lead', 120000, 4),
  ('QA and Test Engineer', 85000, 4);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Michelle', 'Obama', 5, NULL),
  ('Jessica', 'Jones', 4, 1),
  ('Hermione', 'Granger', 1, 1),
  ('Stephen', 'Curry', 1, 1),
  ('Viola', 'Davis', 1, 1),
  ('Kevin', 'Durant', 6, 1),
  ('Kyrie', 'Irving', 3, NULL),
  ('Aubrey', 'Graham', 4, 1),
  ('Sandra', 'Bullock', 2, NULL),
  ('Beyonce', 'Knowles', 6, 1);




  
