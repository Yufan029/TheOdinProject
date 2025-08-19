const { Pool } = require("pg");

module.exports = new Pool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
});

// module.exports = new Pool({
//   connectionString: "postgresql://Dan:1234@localhost:5432/top_users"
// });