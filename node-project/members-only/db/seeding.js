require('dotenv').config();
const { Client } = require('pg');

const SQL = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    email VARCHAR(255),
    password TEXT,
    ismember BOOLEAN,
    isadmin BOOLEAN,
    viewcount INTEGER
);

CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255),
    text TEXT,
    time TIMESTAMP,
    authorid INTEGER,
    CONSTRAINT fk_authorid FOREIGN KEY (authorid) REFERENCES users(id)
);
`

async function seeding() {
    console.log('seeding..., create the database table.');
    const client = new Client({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
        port: process.env.DATABASE_PORT,
        ssl: {
            rejectUnauthorized: false   // allow self-signed certs
        }
    })

    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('done.');
}

seeding();