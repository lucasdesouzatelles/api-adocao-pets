CREATE DATABASE IF NOT EXISTS pets_db;
USE pets_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'adopter',
    CONSTRAINT pk_users PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS pets (
    id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    species VARCHAR(100) NOT NULL,
    size VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'available',
    description TEXT NULL,
    CONSTRAINT pk_pets PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS adoptions (
    id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    pet_id INT NOT NULL,
    adoption_date DATE NOT NULL,
    CONSTRAINT pk_adoptions PRIMARY KEY (id),
    CONSTRAINT fk_adoptions_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_adoptions_pets FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);