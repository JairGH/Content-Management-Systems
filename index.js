const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "12345",
    database: "tracker_db",
  },
  console.log("Your are connected!")
);

function init() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "firstQ",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
        ],
      },
    ])
    .then((data) => {
      console.log(data.firstQ);
      if (data.firstQ === "View All Employees") {
        viewEmployees();
      }
      if (data.firstQ === "View All Roles") {
        viewRoles();
      }
      if (data.firstQ === "View All Departments") {
        viewDepartments();
      }
      if (data.firstQ === "Add Employee") {
        db.query("SELECT * FROM role", (err, res) => {
          const roleChoices = res.map(({ id, title }) => ({
            value: id,
            name: title,
          }));
          const addValues = ({ firstName, lastName, role, manager }) => {
            db.query(
              `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', ${role}, '${manager}')`
            );
          };
          inquirer
            .prompt([
              {
                type: "input",
                name: "firstName",
                message: "Enter new employees first name:",
              },
              {
                type: "input",
                name: "lastName",
                message: "Enter new employees last name:",
              },
              {
                type: "list",
                name: "role",
                message: "Enter new employees role:",
                choices: roleChoices,
              },
              {
                type: "input",
                name: "manager",
                message: "Enter new employees manager:",
              },
            ])
            .then((answers) => {
              // Is this even doing something?
              const insertData = addValues(answers);
              console.table(insertData);
              console.table("Added Employee Into The Database");
              init();
            });
        });
      }
      if (data.firstQ === "Update Employee Role") {
        // Grab by ID
      }
      if (data.firstQ === "Add Role") {
        db.query("SELECT * FROM department", (err, res) => {
          const departmentChoices = res.map(({ id, department_name }) => ({
            value: id,
            name: department_name,
          }));

          inquirer
            .prompt([
              {
                type: "input",
                name: "title",
                message: "What is the name of the role?",
              },
              {
                type: "input",
                name: "salary",
                message: "What is the salary of the role?",
              },
              {
                type: "list",
                name: "department",
                message: "Which department does the role belong to?",
                choices: departmentChoices,
              },
            ])
            .then((answers) => {
              const addRole = ({ title, salary, department }) => {
                db.query(
                  `INSERT INTO role (title, salary, department_id) VALUES ('${title}', ${salary}, ${department})`
                );
              };

              const insertRole = addRole(answers);
              console.table(insertRole);
              console.table("Added Role Into The Database");
              init();
            });
        });
      }

      if (data.firstQ === "Add Department") {
        const newDepartment = ({ department }) => {
          console.log(department);
          db.query(
            `INSERT INTO department (department_name) VALUES ('${department}')`
          );
        };
        inquirer
          .prompt([
            {
              type: "input",
              name: "department",
              message: "Enter new department name:",
            },
          ])
          .then((answers) => {
            const idk = newDepartment(answers);
            init();
          });
      }
    });
}
function viewEmployees() {
  db.query("Select * FROM employee", (err, results) => {
    console.table(results);
    init();
  });
}
function viewRoles() {
  db.query("Select * FROM role", (err, results) => {
    console.table(results);
    init();
  });
}
function viewDepartments() {
  db.query("Select * FROM department", (err, results) => {
    console.table(results);
    init();
  });
}
init();
