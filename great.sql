DROP DATABASE IF EXISTS greatBay_DB;

CREATE DATABASE greatBay_DB;

USE greatBay_DB;

CREATE TABLE Great_Bay (
  id INT NOT NULL AUTO_INCREMENT,
  type VARCHAR(45) NOT NULL,
  name VARCHAR(45) NOT NULL,
  quantity INT NOT NULL,
  bidPrice DECIMAL(10,2) NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);

SELECT * FROM Great_Bay;