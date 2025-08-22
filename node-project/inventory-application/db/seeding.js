require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS Categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255),
    time TIMESTAMP
);
git s
CREATE TABLE IF NOT EXISTS Items (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255),
    quantity INTEGER,
    price NUMERIC,
    time TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ItemCategories (
    itemId INTEGER,
    categoryId INTEGER,
    PRIMARY KEY (itemId, categoryId),
    CONSTRAINT fk_itemId FOREIGN KEY (itemId) REFERENCES Items(id) ON DELETE CASCADE,
    CONSTRAINT fk_categoryId FOREIGN KEY (categoryId) REFERENCES Categories(id) ON DELETE CASCADE
);

TRUNCATE TABLE Items RESTART IDENTITY CASCADE;
TRUNCATE TABLE Categories RESTART IDENTITY CASCADE;
TRUNCATE TABLE ItemCategories;

INSERT INTO Categories (name, time)
VALUES 
    ( 'Cloth', CURRENT_TIMESTAMP ),
    ( 'Furnitures', CURRENT_TIMESTAMP),
    ( 'Electronics', CURRENT_TIMESTAMP),
    ( 'Luxury', CURRENT_TIMESTAMP),
    ( 'Shoes', CURRENT_TIMESTAMP),

    ( 'Fishing', CURRENT_TIMESTAMP),
    ( 'Camping', CURRENT_TIMESTAMP),
    ( 'Boat', CURRENT_TIMESTAMP),
    ( 'Spirit', CURRENT_TIMESTAMP);

INSERT INTO Items (name, time, quantity, price) 
VALUES
    ( 'Nike Jacket', CURRENT_TIMESTAMP, 200, 145.7),
    ( 'Desk', CURRENT_TIMESTAMP, 300, 256.34),
    ( 'iPhone', CURRENT_TIMESTAMP, 239, 2999.99),
    ( 'LV scarf', CURRENT_TIMESTAMP, 20, 50000),
    ( 'Basket ball', CURRENT_TIMESTAMP, 98, 40.86),

    ( 'Vodka', CURRENT_TIMESTAMP, 36, 40),
    ( 'Puma sports shoes', CURRENT_TIMESTAMP, 363, 140),
    ( 'Shimano fishing rods', CURRENT_TIMESTAMP, 36, 440),
    ( 'Portable table', CURRENT_TIMESTAMP, 36, 80.99),
    ( 'Tarp', CURRENT_TIMESTAMP, 12, 40),

    ( 'Boss dishwasher', CURRENT_TIMESTAMP, 99, 540),
    ( 'XO', CURRENT_TIMESTAMP, 23, 5740);

INSERT INTO ItemCategories(itemId, categoryId)
VALUES
    (1, 1), (2, 2), (3, 3), (3, 4), (4, 1), (4, 4), (6, 9), (7, 5),
    (8, 6), (8, 7), (8, 8), (9, 2), (9, 6), (9, 7), (10, 1), (10, 7),
    (10, 8), (11, 2), (11, 3), (12, 4), (12, 9);
`

async function seeding() {
    console.log('start seeding db');
    const client = new Client({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
        port: process.env.DATABASE_PORT,
        ssl: {
            rejectUnauthorized: false   // allow self-signed certs
        }
    });

    await client.connect();
    const res = await client.query('SELECT $1::text as message', ['Hello world!']);
    console.log(res.rows[0].message);
    await client.query(SQL);
    await client.end();
    console.log('done');
}

seeding();