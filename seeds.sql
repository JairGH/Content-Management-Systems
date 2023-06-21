USE tracker_db;
INSERT INTO department (department_name)
VALUES ("Sales"), 
-- 1
("Engineering"), 
-- 2
("Finance"), 
-- 3
("Legal"),
-- 4
 ("Services");
-- 5

INSERT INTO role (title, salary, department_id) 
VALUES ("Sales Lead", 100000, 1), 
-- 1
("Salesperson", 80000, 1),
-- 2
("Lead Engineer", 150000, 2),
-- 3
("Software Engineer", 120000, 2),
-- 4
("Account Manager", 160000, 3),
-- 5
("Accountant", 125000, 3),
-- 6
("Lawyer", 150000, 4),
-- 7
("Postman", 190000, 4);
-- 8
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL),
     ("Mike", "Chan", 2, NULL), 
     ("Ashley", "Rodriguez", 3, NULL),
     ("Kevin", "Tupik", 4, NULL),  
     ("Kunal", "Singh", 5, NULL), 
     ("Malia", "Brown", 6, NULL), 
     ("Sarah", "Lourd", 7, NULL), 
     ("Tom", "Allen", 8, NULL);


