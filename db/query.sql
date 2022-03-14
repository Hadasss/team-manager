
-- display formatted table for departments: id + name
SELECT * FROM departments;
-- display table for roles: id + title + department + salary
SELECT roles.*, department.name AS department_name;
-- display formatted table for employees: id + first name + last name + title + department + salary + manager
-- SELECT employees.*, department.name AS department_name, 
-- add department to database
-- add role to database
-- add employee to database
-- update employee role