require('dotenv').config();

const express = require("express");
const pool = require("./db/pool");
const path = require('node:path');
const session = require("express-session");
const passport = require("passport");
const pgSessionStore = require("connect-pg-simple")(session);

const homeRouter = require('./routes/homeRouter');
const authRouter = require('./routes/authRouter');
const messagesRouter = require('./routes/messagesRouter');

const app = express();

app.set("views", path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
    store: new pgSessionStore({
        pool,
        createTableIfMissing: true,
        ttl: 24 * 60 * 60,
    }),
    secret: process.env.SESSION_SECRET || "cats",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    console.log("res.locals.currentUser = req.user:", req.user);
    res.locals.currentUser = req.user;
    next();
});

app.use('/', homeRouter);
app.use('/', authRouter);
app.use('/message', messagesRouter);

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

app.listen(process.env.PORT, () => {
    console.log(`Server started at port: ${process.env.PORT}`);
})