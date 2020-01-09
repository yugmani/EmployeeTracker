
const inquirer = require("inquirer");
//const orm = require("./config/orm.js");
const mysql = require("mysql");
const figlet = require('figlet');

var express = require("express");
var exphbs = require("express-handlebars");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


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

      
    if (data.tasks === "List all Employees") {
        // app.get("/", function(req, res) {
            connection.query("SELECT * FROM employees;", function(err, data) {
              if (err) {
                throw err(500).end();
              }
            //   console.log({employees: data});
            //   console.log(data.length);
            //   res.render("index", { employees: data });
             for (let i=0; i<data.length; i++) {
                console.log(data[i].id, data[i].first_name, data[i].last_name, "    Role id: "+data[i].role_id);
             }
           
        });
         //  });
      
    } else if(data.tasks=== "Add a Record of an Employee"){
        //app.post("/api/employees", function(req, res) {
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
            //res.json({ id: result.insertId });
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
        
        // app.put("/api/employees/:id", function(req, res) {
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
              //[`${pass.role_id}`],
          
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

        // app.delete("/api/employees/:id", function(req, res) {
            connection.query("DELETE FROM employees WHERE id = ?", [`${doit.employee_id}`], function(err, result) {
              if (err) {
                // If an error occurred, send a generic server failure
                throw err;
              }
              else if (result.affectedRows === 0) {
                // If no rows were changed, then the ID must not exist, so 404
                throw err;
              }
            //   res.status(200).end();
          
            });
          });
        
        
    } else {
        console.log("Bye Bye!");
    }
  
});
// connection.end();
// Start our server so that it can begin listening to client requests.
// app.listen(PORT, function() {
//     // Log (server-side) when our server has started
//     console.log("Server listening on: http://localhost:" + PORT);
//   });
  




        
   

   
   
   


    


// const deleteEmployees = ()=>{
//     console.log("Deleted an Employee Record");
// }


//var orm = require("./config/orm.js");

// For each of the following select methods, a string argument containing wildcard character ("*")
// could work in most environments, but some MySQL servers (like MAMP) will return an error.

// Console log all the party_name's.
// orm.select("party_name", "parties");

// Console log all the client_name's.
// orm.select("client_name", "clients");

// Console log all the parties that have a party-type of grown-up.
// orm.selectWhere("parties", "party_type", "grown-up");

// Console log all the clients and their parties.
// orm.leftJoin(["client_name", "party_name"], "clients", "parties", "id", "client_id");

