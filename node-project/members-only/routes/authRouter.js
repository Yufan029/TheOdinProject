const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const authController = require('../controllers/authController');
const db = require('../db/queries');

const authRouter = express.Router();

authRouter.get('/sign-up', authController.signUpGet);
authRouter.post('/sign-up', authController.signUpPost);
authRouter.get('/login', authController.loginGet);
authRouter.post("/login", authController.loginPost);
authRouter.get('/logout', authController.logoutGet);

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password"
        },
        async (email, password, done) => {
        try {
            const user = await db.getUserByEmail(email);

            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: "Incorrect password" });
            }

            await db.increaseViewCount(user.id);
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
        const user = await db.getUserById(id);

        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = authRouter;