CREATE DATABASE bamazon_db;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Eclipse03!';

USE bamazon_db;

CREATE TABLE products(
  item_id INTEGER PRIMARY KEY AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price FLOAT(7,2) NOT NULL,
  stock_quantity INTEGER default 0
);