###to Create DEPARTMENT table 
INSERT INTO department (name) VALUES ('administration');
INSERT INTO department (name) VALUES ('research');
INSERT INTO department (name) VALUES ('development');
INSERT INTO department (name) VALUES ('marketing');

###to Create ROLE table 
INSERT INTO role (title, salary, department_id) 
VALUES ('manager', 20000, 1);
INSERT INTO role (title, salary, department_id)  
VALUES ('researcher', 18200, 2);
INSERT INTO role (title, salary, department_id) 
VALUES ('developer', 12000, 3);
INSERT INTO role (title, salary, department_id)  
VALUES ('market_representative', 15200, 4);
INSERT INTO role (title, salary, department_id)  
VALUES ('helper', 10200, 1);


###to Create EMPLOYEEs table 
INSERT INTO employees (first_name, last_name, role_id) 
VALUES ('Andrew', 'Torres', 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES ('Ryan', 'George', 2, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES ('Sandra', 'Gurung', 3, 1);
INSERT INTO employees (first_name, last_name, role_id) 
VALUES ('Jasmine', 'Gonzalez', 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES ('John', 'Ghale', 4, 4);
INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES ('Jose', 'Thapa', 5, 4);