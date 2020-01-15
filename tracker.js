
const inquirer = require("inquirer");

const mysql = require("mysql");
const figlet = require('figlet');


// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;



var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "YOUR PASSWORD",
    database: "employee_db"
  });

connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
  
    console.log("connected as id " + connection.threadId);
  });


  console.log(figlet.textSync('WELCOME!', {
   
    horizontalLayout: 'default',
    verticalLayout: 'default'
}));

 
inquirer
    .prompt([
          { 
          type: "list",
          name: "tasks",
          message: "What do you want to do?",
          choices: [
              "List all Employees",
              "View all Departments",
              "View all Roles",
              "Add an Employee",
              "Add a Department",
              "Add a Role",
              "Update a Role of an Employee",
              "Delete a Record of an Employee",
              "View all Employee Managers"
              ]
          }
   
    ]).then(function(data) {

      
    if (data.tasks === "List all Employees") {
    
            connection.query("SELECT * FROM employees;", function(err, data) {
                if (err) {
                  throw err(500).end();
                }
           
                for (let i=0; i<data.length; i++) {
                    console.log(data[i].id, data[i].first_name, data[i].last_name, "    Role id: "+data[i].role_id);
                }
           
            });
        
    }   else if (data.tasks === "View all Departments") {
      
          connection.query("SELECT * FROM department;", function(err, data) {
                  if (err) {
                    throw err(500).end();
                  }
          
                  for (let i=0; i<data.length; i++) {
                      console.log(data[i].id,"  ", data[i].name);
                  }
         
          });

     }  else if (data.tasks === "View all Roles") {
        
            connection.query("SELECT * FROM role;", function(err, data) {
                  if (err) {
                    throw err(500).end();
                  }
            
                for (let i=0; i<data.length; i++) {
                    console.log(data[i].id,"  ", data[i].title, "  ", data[i].salary, "Department Id ", data[i].department_id);
                }
           
            });


        }  else if (data.tasks === "View all Employee Managers") {
      
            connection.query("SELECT * FROM employees WHERE manager_id <> 'null';", function(err, data) {
                    if (err) {
                      throw err(500).end();
                    }
            
                    for (let i=0; i<data.length; i++) {
                        console.log(data[i].id,"  ", data[i].first_name, "  ", "manager id: ", data[i].manager_id);
                    }
           
            });
      
    } else if(data.tasks === "Add an Employee"){
        
      inquirer
          .prompt([
                {
                type: "input",
                name: "first_name",
                message: "What is FIRSTNAME of an employee?",
                },
                {
                type: "input",
                name: "last_name",
                message: "What is LASTNAME?",
                },
                {
                type: "input",
                name: "role_id",
                message: "What ROLE ID you want to assign?",
                }
          ]).then(function(record) {
              console.log(record);
              connection.query("INSERT INTO employees (first_name, last_name, role_id) VALUES (?, ?, ?)", [[`${record.first_name}`], [`${record.last_name}`], [`${record.role_id}`]], function(err, result) {
                  if (err) {
                      throw err;
                  }
      
                  // Send back the ID of the new employee
           
                  console.log({ id: result.insertId });
              });
            
            });
      
    } else if(data.tasks=== "Add a Department"){
        
        inquirer
            .prompt([
                {
                type: "input",
                name: "name",
                message: "Name of Department to Add: ",
                }
                
            ]).then(function(record) {
                console.log(record);
              connection.query("INSERT INTO department (name) VALUES (?)", [[`${record.name}`]], function(err, result) {
                    if (err) {
                        throw err;
                    }
      
                  // Send back the ID of the departmnet
            
                  console.log({ id: result.insertId });
                });
            
          });

    } else if(data.tasks=== "Add a Role"){
      
      inquirer
          .prompt([
              {
              type: "input",
              name: "title",
              message: "What is the New TITLE? ",
              },
              {
              type: "input",
              name: "salary",
              message: "What is SALARY for this role?",
              },
              {
              type: "input",
              name: "department_id",
              message: "What DEPARTMENT ID you want to assign?",
              }
          ]).then(function(record) {
              console.log(record);
              connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [[`${record.title}`], [`${record.salary}`], [`${record.department_id}`]], function(err, result) {
                    if (err) {
                        throw err;
                    }
    
                  // Send back the ID of the new employee
          
                  console.log({ id: result.insertId });
              });
          
            });
      
    } else if(data.tasks=== "Update a Record of an Employee"){
        inquirer
            .prompt([
                {
                type: "input",
                name: "employee_id",
                message: "What is the ID of an employee to UPATE?",
                },
                {
                type: "input",
                name: "new_role",
                message: "What NEW ID you want to assign?",
                },

            ]).then(function(pass) {
                console.log(pass);
                connection.query("UPDATE employees SET role_id = ? WHERE id = ?", [[`${pass.new_role}`], [`${pass.employee_id}`]], function(err, result) {
                      if (err) {
                          // If an error occurred, send a generic server failure
                          throw err;
                      }
                      else if (result.changedRows === 0) {
                          // If no rows were changed, then the ID must not exist, so 404
                          // return res.status(404).end();
                          throw err;

                      }
            
                });
            });
     
    } else if(data.tasks === "Delete a Record of an Employee"){
      inquirer
          .prompt([
              {
              type: "input",
              name: "employee_id",
              message: "What is the ID of an employee to DELETE?"
              }
  
          ]).then(function(doit) {
                  console.log(doit);
                  connection.query("DELETE FROM employees WHERE id = ?", [`${doit.employee_id}`], function(err, result) {
                        if (err) {
                        // If an error occurred, send a generic server failure
                              throw err;
                        }
                      else if (result.affectedRows === 0) {
                      // If no rows were changed, then the ID must not exist, so 404
                              throw err;
                        }
          
        
                  });
            });

                        
    } else {
        console.log("Bye Bye!");
        }
  
});


