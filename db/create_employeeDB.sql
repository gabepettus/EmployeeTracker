-- Create the database and specify it for use.
CREATE DATABASE emplMang;
USE emplMang;

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
  FOREIGN KEY (dept_id) 
  REFERENCES department(id)
  ON DELETE CASCADE
);
-- Create the employee table
CREATE TABLE employee (
  id int AUTO_INCREMENT,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  role_id int NOT NULL,
  manager_id int,
  PRIMARY KEY(id),
  CONSTRAINT fk_role_id
  FOREIGN KEY (role_id) 
  REFERENCES role(id)
  ON DELETE CASCADE
);
-- Insert a set of records.
INSERT INTO department (name) VALUES ("Back Office");
INSERT INTO department (name) VALUES ("Software");
INSERT INTO department (name) VALUES ("Support");
INSERT INTO department (name) VALUES ("Kitchen");
INSERT INTO role (title, salary, dept_id) VALUES ("Overlord", 21032, 1);
INSERT INTO role (title, salary, dept_id) VALUES ("Boss", 1171, 1);
INSERT INTO role (title, salary, dept_id) VALUES ("Dev, sr", 25, 2);
INSERT INTO role (title, salary, dept_id) VALUES ("Dev, jr", 23, 2);
INSERT INTO role (title, salary, dept_id) VALUES ("Office Pee-on", 13, 3);
INSERT INTO role (title, salary, dept_id) VALUES ("Cleaner", 11, 3);
INSERT INTO role (title, salary, dept_id) VALUES ("Butler", 35, 4);
INSERT INTO role (title, salary, dept_id) VALUES ("Cook", 14, 4);
INSERT INTO role (title, salary, dept_id) VALUES ("Footman", 7, 4);
INSERT INTO role (title, salary, dept_id) VALUES ("Scullery Maid", 1, 4);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Mitch", "TheBitch", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Sally", "Silly", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Fredrick", "FartFace", 3, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Buster", "Brontosaurus", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Sol", "Snake", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Alice", "Aardvark", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Kat", "Cat", 5, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Bob", "Burro", 6, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Dorris", "Donkey", 6, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Elaine", "Elephant", 7, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Frank", "Ferret", 8, 10);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Gerry", "Gerbil", 8, 10);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Harry", "Horse", 9, 10);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Inga", "Iguana", 9, 10);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Jerry", "Jackal", 9, 10);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Keri", "Koala", 10, 10);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Lenard", "Lemur", 10, 10);
