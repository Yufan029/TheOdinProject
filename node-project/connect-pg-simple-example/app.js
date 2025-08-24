const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");

// so, this is where the session being stored, 
// by default, it's in memory(MemoryStore), 
// here we explicitly using pg to store the session info
// so the connect.sid, user info will all go into pg database specified.
const PgSessionStore = require("connect-pg-simple")(session);

const app = express();

const pgPool = new Pool({
    user: "Dan",
    host: "localhost",
    database: "pgsimple",
    password: "1234",
    port: 5432,
});

app.use(session({
    store: new PgSessionStore({
        pool: pgPool,               // conString: 'postgres://Dan:1234@localhost:5432/pgsimple'
        createTableIfMissing: true,
        ttl: 24 * 60 * 60
    }),
    secret: process.env.SESSION_SECRET || 'secret!',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000   // 30 days
    }
}));

app.get("/", (req, res) => {
    if (req.session.views) {
        req.session.views++;
        res.send(`View: ${req.session.views}`);
    } else {
        req.session.views = 1;
        res.send("First visit.");
    }
});

app.listen(3000, () => {
    console.log("server started");
});