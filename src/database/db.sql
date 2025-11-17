CREATE DATABASE API_Productos_Node

USE API_Productos_Node

CREATE TABLE products(
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2),
    quantity INT,
    description TEXT
)