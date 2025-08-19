#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS usernames (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 )
);

INSERT INTO usernames (username) 
VALUES
  ('Bryan'),
  ('Odin'),
  ('Damon');
`;

async function seeding() {
    console.log("seeding..., please provide the argument for connect to the db. Case sensitive!");
    console.log("Format like: node db/populatedb.js ROLE PASSWORD HOST PORT DATABASE")
    console.log("e.g.: node db/populatedb.js Dan 1234 localhost 5432 top_users")
    console.log("Process argv2: ", process.argv[2]);
    console.log("Process argv3: ", process.argv[3]);
    
    const client = new Client({
        connectionString: `postgresql://${process.argv[2]}:${process.argv[3]}@${process.argv[4]}:${process.argv[5]}/${process.argv[6]}`,
    });

    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

seeding();