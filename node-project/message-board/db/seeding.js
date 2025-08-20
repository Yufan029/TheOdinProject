const { Client } = require('pg');

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    author VARCHAR(255),
    message VARCHAR(255),
    time TIMESTAMP
);

INSERT INTO messages (author, message, time)
VALUES
( 'Bryan', 'hello, world!', CURRENT_TIMESTAMP );
`

async function seeding() {
    console.log("Start seeding");
    const client = new Client({
        host: process.env.DATABASE_HOST || "localhost",
        user: process.env.DATABASE_USER || "Dan",
        database: process.env.DATABASE_NAME || "messages",
        password: process.env.DATABASE_PASSWORD || "1234",
        port: process.env.DATABASE_PORT || 5432,
        ssl: {
            rejectUnauthorized: false   // allow self-signed certs
        }
    });

    // const client = new Client({
    //     connectionString: `postgresql://Dan:1234@localhost:5432/messages`,
    // });

    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("Done");
}

module.exports = seeding;