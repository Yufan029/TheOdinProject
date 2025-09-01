require('dotenv').config();

const express = require('express');
const expressSession = require('express-session');
const passport = require('passport');
const path = require('node:path');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');

const authRouter = require('./routes/authRouter');
const homeRouter = require('./routes/homeRouter');
const folderRouter = require('./routes/folderRouter');
const fileRouter = require('./routes/fileRouter');

const PORT = process.env.PORT || 3000;

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressSession({
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000
    },
    secret: process.env.SESSION_SECRET || "cats",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
        new PrismaClient(), {
            checkPeriod: 2 * 60 * 1000,
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    )
}));

app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.use('/', homeRouter);
app.use('/', authRouter);
app.use('/folder', folderRouter);
app.use('/file', fileRouter);

app.use('/', (req, res, next) => {
    res.render('404');
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

app.listen(PORT, () => {
    console.log(`Server starts at port ${PORT}`)
})