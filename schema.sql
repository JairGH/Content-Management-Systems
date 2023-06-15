DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;

USE tracker_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id) 
);

CREATE TABLE role (
    id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL,
    PRIMARY KEY (id)
);

