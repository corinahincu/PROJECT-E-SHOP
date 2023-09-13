/* DDL COMMANDS / DATABASE 
ACTION SUBJECT id OPTIONS  */
DROP DATABASE js-shop;
CREATE DATABASE js-shop;

/* DDL COMMANDS / TABLE */
CREATE TABLE products (
    id SERIAL PRIMARY KEY, 
    name character varying(30),
    description character varying(200),
    image VARCHAR,
    price integer NOT NULL
);


INSERT INTO products VALUES (1, 'iPhone', 1000);
INSERT INTO products VALUES (2, 'Samsung', 900);
INSERT INTO products VALUES (3, 'MacBook', 1500);

INSERT INTO
    products (name, description, image, price)
VALUES (
        1,
        'Iphone 14 Pro',
        'Capacity: 128GB | Color: Deep Purple',
        'image1.jpg',
        1000 
    ), (
        2,
        'Iphone 14 Pro',
        'Capacity: 256GB | Color: Gold ',
        'image2.jpg',
        1100
    ), (
        3,
        'Iphone 14 Pro',
        'Capacity: 512GB | Color: Silver ',
        'image3.jpg',
        1300
    );

SELECT * FROM products;

-- clients
    CREATE TABLE clients (
    id serial PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    phone VARCHAR(20),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
    );

    INSERT INTO clients VALUES (1,'Isabel Weeks','349 Jacynthe Gateway','+1-927-708-1014','isabelweeks@gmail.com','password1');
    INSERT INTO clients VALUES (2,'Hugh Blair','177 Weissnat Brooks Suite 328','(741) 722-6321 x131','hughblair@gmail.com','password2');
    INSERT INTO clients VALUES (3,'Annabel Howell','799 Dayana Spur Suite 967','343.419.4887','annabelhowell@gmail.com','password3');

