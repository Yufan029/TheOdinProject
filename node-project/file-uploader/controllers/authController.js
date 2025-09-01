const bcryptjs = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const passport = require('passport');

const prisma = new PrismaClient();

function registerGet(req, res) {
    res.render('register');
}

const validateRegisterInfo = [
    body('firstname').trim()
        .notEmpty().withMessage('First name cannot be empty or spaces')
        .isLength({ min: 2, max: 15 }).withMessage('First name must be between 2 and 15 characters long'),

    body('lastname').trim()
        .notEmpty().withMessage('Last name cannot be empty or spaces')
        .isLength({ min: 2, max: 15 }).withMessage('Last name must be between 2 and 15 characters long'),

    body('email').trim()
        .notEmpty().withMessage('Email address cannot be empty.')
        .custom(async (value) => {
            const exist = await prisma.user.findUnique({
                where: {
                    email: value
                }
            });

            console.log(exist);
            if (exist) {
                throw new Error('Email already registered');
            }

            return true;
        }),
    
    body('password').trim()
        .notEmpty().withMessage('Password cannot be empty or only spaces')
        .isLength({ min: 3 }).withMessage('Password must be at least 3 characters long')
        .matches(/[!@#$%^&*(),.?":{}|<>]/) // Checks for at least one special character
        .withMessage('Password must contain at least one special character.'),
    
    body('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Confirm password not same with password.');
            }

            return true;
        }),
];

const registerPost = [
    validateRegisterInfo,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('register', {
                errors: errors.array(),
            });
        }

        const { firstname, lastname, email, password, confirmPassword } = req.body;
        const hasdedPassword = await bcryptjs.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                firstname, 
                lastname, 
                email,
                password: hasdedPassword,
            }
        });

        req.login(user, (err) => {
            if (err) {
                return next(err);
            }

            res.redirect('/');
        });        
    }
];

function loginGet(req, res) {
    res.render('login');
}

const loginPost = passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' });

function logoutGet(req, res) {
    req.logout(err => {
        if(err) {
            return next(err);
        }

        res.redirect('/');
    })
}

module.exports = {
    registerGet,
    registerPost,
    loginGet,
    loginPost,
    logoutGet,
}