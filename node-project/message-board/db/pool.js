const { Pool } = require('pg');

module.exports = new Pool({
    host: process.env.DATABASE_HOST || "localhost",
    user: process.env.DATABASE_USER || "Dan",
    database: process.env.DATABASE_NAME || "messages",
    password: process.env.DATABASE_PASSWORD || "1234",
    port: process.env.DATABASE_PORT || 5432,
    ssl: 'require',
})