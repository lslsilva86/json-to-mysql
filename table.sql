CREATE DATABASE IF NOT EXISTS json_data_db;
USE json_data_db;

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sku INT,
    name VARCHAR(255),
    type VARCHAR(50),
    price DECIMAL(10, 2),
    upc VARCHAR(50),
    category JSON,
    shipping VARCHAR(50),
    description TEXT,
    manufacturer VARCHAR(100),
    model VARCHAR(50),
    url VARCHAR(255),
    image VARCHAR(255)
);
