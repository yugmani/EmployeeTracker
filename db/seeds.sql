INSERT INTO department (name) VALUES ('Research');
INSERT INTO department (name) VALUES ('Development');
INSERT INTO department (name) VALUES ('Administration');

INSERT INTO role (title, salary, department_id) 
VALUES ('Manager', 20000, 101);
INSERT INTO role (title, salary, department_id) 
VALUES ('Asistant', 12000, 202);
INSERT INTO role (title, salary, department_id)  
VALUES ('Coordinator', 18200, 303);



INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Andrew', 'Torres', 2, 11);
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Ryan', 'George', 1, 31);
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Sandra', 'Gurung', 2, 11);

INSERT INTO employee (first_name, last_name, role_id) 
VALUES ('Jasmine', 'Gonzalez', 21);
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('John', 'Ghale', 3, 10);
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Jose', 'Thapa', 3);