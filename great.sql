DROP DATABASE IF EXISTS greatBay_DB;

CREATE DATABASE greatBay_DB;

USE greatBay_DB;

CREATE TABLE Items (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  quantity INT NOT NULL,
  type VARCHAR(45) NOT NULL,
  bidPrice DECIMAL(10,2) NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);
CREATE TABLE Tasks (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  quantity INT NOT NULL,
  type VARCHAR(45) NOT NULL,
  bidPrice DECIMAL(10,2) NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);
CREATE TABLE Jobs (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  quantity INT NOT NULL,
  type VARCHAR(45) NOT NULL,
  bidPrice DECIMAL(10,2) NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);
CREATE TABLE Projects (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  quantity INT NOT NULL,
  type VARCHAR(45) NOT NULL,
  bidPrice DECIMAL(10,2) NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);
SELECT * FROM Items;
SELECT * FROM Tasks;
SELECT * FROM Jobs;
SELECT * FROM Projects;

INSERT INTO product (name, quantity, price, model);
VALUES ("unforgiven","metallica" , "metal"),;

INSERT INTO product (title, artist, genre)
VALUES ("song 2","blur" , "rock");

INSERT INTO product (title, artist, genre)
VALUES ("changes","tupac" , "rap");

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'



