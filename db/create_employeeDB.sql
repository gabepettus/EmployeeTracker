-- Create the database and specify it for use.
CREATE DATABASE employeeManagement;
USE employeeManagement;

-- Create the department table

CREATE TABLE department (
  id int AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  PRIMARY KEY(id)
);
-- Create the role table
CREATE TABLE role (
  id int AUTO_INCREMENT,
  title varchar(30) NOT NULL,
  salary decimal(9.2) NOT NULL,
  dept_id int NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (dept_id) REFERENCES department(id)
);
-- Create the employee table
CREATE TABLE employee (
  id int AUTO_INCREMENT,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  role_id int NOT NULL,
  manager_id int,
  PRIMARY KEY(id),
  FOREIGN KEY (role_id) REFERENCES role(id)
);
-- Insert a set of records.
INSERT INTO department (name) VALUES ("Back Office");
INSERT INTO department (name) VALUES ("Software");
INSERT INTO department (name) VALUES ("Support");
INSERT INTO role (title, salary, dept_id) VALUES ("boss", 100, 1);
INSERT INTO role (title, salary, dept_id) VALUES ("Pee-on", 10, 2);
INSERT INTO role (title, salary, dept_id) VALUES ("PeePee-on", 1, 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Sally", "SideDoor", 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Fredrick", "FrontPoarch", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Buster", "Backdoor", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Sol", "SecondFloor", 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Alice", "Aardvark", 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Bob", "Burro", 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Cathrine", "kat", 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Dorris", "Donkey", 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Elaine", "Elephant", 3, 1);