const { Router } = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcryptjs = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const authController = require('../controllers/authController');

const authRouter = Router();
const prisma = new PrismaClient();

authRouter.get('/register', authController.registerGet);
authRouter.post('/register', authController.registerPost);
authRouter.get('/login', authController.loginGet);
authRouter.post('/login', authController.loginPost);
authRouter.get('/logout', authController.logoutGet);

// async function test(email) {
//     const user = await prisma.user.findUnique({
//         where: {
//             email
//         }
//     });
//     console.log(user);
// }

// test('test@gmail.com');

const customField = {
    usernameField: 'email',
    passwordField: 'password',
};

passport.use(
    new LocalStrategy(customField, async (email, password, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            });

            //return done(null, false, { message: console.log(user)});

            if (!user) {
                return done(null, false, { message: 'Incorrect username or password.' });
            }

            const match = await bcryptjs.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: 'Incorrect username or password.' });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
)

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        });

        done(null, user);
    } catch (err) {
        done(err);
    }
})

module.exports = authRouter;