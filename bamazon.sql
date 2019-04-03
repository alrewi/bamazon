DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  id INTEGER(10) NOT NULL AUTO_INCREMENT,
  name VARCHAR(50),
  department VARCHAR(30),
  price INTEGER(10),
  stock INTEGER(10),
  PRIMARY KEY (id)
);

INSERT INTO products (name, department, price, stock)
VALUES ("Prickly Pear Cactus", "Garden", 12, 24),
("Crown of Thorns", "Garden", 14, 10),
("Jade Plant", "Garden", 10, 20),
("Flaming Katy", "Garden", 11, 18),
("Aloe Vera", "Garden", 8, 19),
("Panda Plant", "Garden", 12, 6),
("Pincushion Cactus", "Garden", 14, 9),
("Roseum", "Garden", 9, 20),
("Snake Plant", "Garden", 8, 10),
("Zebra Plant", "Garden", 13, 15);

SELECT * FROM products;