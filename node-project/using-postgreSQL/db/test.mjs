import pg from 'pg'
const { Pool, Client } = pg
 
// pools will use environment variables
// for connection information
const pool = new Pool()
 
// you can also use async/await
const res = await pool.query('SELECT NOW()')
await pool.end()
console.log(res.rows);
 
// the command running this file is like below:
// $env:PGUSER="Dan"
// >> $env:PGPASSWORD="1234"
// >> $env:PGHOST="localhost"
// >> $env:PGPORT="5432"
// >> $env:PGDATABASE="top_users"
// >> node .\db\test.mjs