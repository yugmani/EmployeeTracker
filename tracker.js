
const inquirer = require("inquirer");
var orm = require("./config/orm.js");
var mysql = require("mysql");

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

inquirer.prompt([
    {
    type: "list",
    name: "tasks",
    message: "What do you want to do?",
    choices: [
        "List all Employees",
        "Add a Record of an Employee", 
        "Update a Record of an Employee",
        "Delete a Record of an Employee"
    ]
}
   
]).then(function(data) {

    console.log(data.tasks);
    
    if (data.tasks === "List all Employees") {
        listEmployees();
    } else if(data.tasks=== "Add a Record of an Employee"){
        addEmployees();
    } else if(data.tasks=== "Update a Record of an Employee"){
        updateEmployees();
    } else if(data.tasks === "Delete a Record of an Employee"){
        deleteEmployees();
    } else {
        console.log("Bye Bye!");
    }
  
});

const listEmployees = ()=>{
    
    // Console log all the employee name's.
    connection.query("SELECT * FROM department;", function(err, data) {
      if (err) {
        throw err;
      }
  
      console.log ({ department: data });
    });
    console.log("All Employees displayed");
}

const addEmployees = ()=>{
    inquirer.prompt([
        {
        type: "input",
        name: "first_name",
        message: "What is the first name?",
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the last name?",
        },
        {
            type: "input",
            name: "role_id",
            message: "Enter role id?",
        }
    ]).then(function(data) {
    
        connection.query("INSERT INTO employee (first_name, last_name, role_id) VALUES (first_name, last_name, role_id)", function(err, result) {
            if (err) {
              throw err;
            }
     
            console.log({ new: data });
            console.log("Added an Employee Record");
        });
});
}



const updateEmployees = ()=>{
    console.log("Update Successful");
}

const deleteEmployees = ()=>{
    console.log("Deleted an Employee Record");
}


