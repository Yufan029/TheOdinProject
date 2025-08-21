require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS Categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255),
    time TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Items (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255),
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
    ( 'Furniture', CURRENT_TIMESTAMP),
    ( 'Electronic', CURRENT_TIMESTAMP),
    ( 'Luxury', CURRENT_TIMESTAMP);

INSERT INTO Items (name, time) 
VALUES
    ( 'Nike Jacket', CURRENT_TIMESTAMP),
    ( 'Desk', CURRENT_TIMESTAMP),
    ( 'iPhone', CURRENT_TIMESTAMP),
    ( 'LV', CURRENT_TIMESTAMP),
    ( 'Basket ball', CURRENT_TIMESTAMP);

INSERT INTO ItemCategories(itemId, categoryId)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (3, 4),
    (4, 1),
    (4, 4);
`

async function seeding() {
    console.log('start seeding db');
    const client = new Client({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        database: process.env.DATABASE_NAME,
        password: "1234",
        port: process.env.DATABASE_PORT,
    });

    await client.connect();
    const res = await client.query('SELECT $1::text as message', ['Hello world!']);
    console.log(res.rows[0].message);
    await client.query(SQL);
    await client.end();
    console.log('done');
}

seeding();