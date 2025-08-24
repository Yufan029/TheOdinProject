const bcrypt = require("bcryptjs");
const path = require("node:path");
const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pgSessionStore = require("connect-pg-simple")(session);

const pool = new Pool({
    host: "localhost",
    user: "Dan",
    password: "1234",
    database: "authpractice",
    port: 5432,
});

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session(
    {
        store: new pgSessionStore({
            pool: pool,
            createTableIfMissing: true,
            ttl: 24 * 60 * 60,
        }),
        secret: process.env.SESSION_SECRET || "cats",
        resave: false,
        saveUninitialized: false 
    }
));

app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// async function test() {
//     const password1 = "123456";
//     const password2 = "123456";

//     const salt = bcrypt.genSaltSync(10);

//     console.log(`salt: ${salt}`);

//     // same salt same result.
//     console.log(await bcrypt.hash(password1, salt));
//     console.log(await bcrypt.hash(password2, salt));

//     // 10 means the cost factor (how many times hashing runs).
//     console.log(await bcrypt.hash(password1, 10));
//     console.log(await bcrypt.hash(password2, 10));
// }

// test();

// custom middleware to store the currentUser if exist into the res.locals object,
// Then currentUser can be used in all the views and no need to pass it anymore, like a context in React.
// this is called Express + Passport pattern;
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// This is only track per-session visits.
app.get("/", (req, res) => {
    console.log(`current user: ${req.user?.username} is authenticated: ${req.isAuthenticated()}`);
    if (req.session.views) {
        req.session.views++;
    } else {
        req.session.views = 1;
    }

    res.render("index", { viewCount: req.session.views });
});

app.get("/sign-up", (req, res) => res.render("sign-up-form"));

app.post("/sign-up", async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [req.body.username, hashedPassword]);
        
        res.redirect("/");
    } catch(err) {
        console.error(err);
        next(err);
    }
});

app.post(
    "/log-in", 
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
    })
);

app.get("/log-out", (req, res, next) => {
    req.logout(err => {
        if (err) {
            return next(err);
        }

        res.redirect("/");
    });
});

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
            const user = rows[0];

            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: "Incorrect password" });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await pool.query("SELECT * FROM users WHERE id = $1;", [id]);
        const user = rows[0];

        done(null, user);
    } catch (err) {
        done(err);
    }
});



app.listen(3000, (error) => {
    if (error) {
        throw error;
    }

    console.log("app listening on port 3000!");
});