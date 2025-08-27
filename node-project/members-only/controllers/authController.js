const db = require('../db/queries');
const passport = require('passport');
const { body, validationResult } = require('express-validator');

function signUpGet(req, res) {
    res.render('sign-up', {
        title: 'Sign Up',
    });
}

const validateSignupInfo = [
    body("firstname")
        .trim()
        .notEmpty().withMessage("First name cannot be empty."),

    body("lastname")
        .trim()
        .notEmpty().withMessage("Last name cannot be empty."),
    
    body("email")
        .trim()
        .notEmpty().withMessage("Email address cannot be empty.")
        .custom(async (value) => {
            const exist = await db.getUserByEmail(value.toLowerCase());
            if (exist) {
                throw new Error("Email has been registered.");
            }

            return true;
        }),
    
    body("password")
        .trim()
        .notEmpty().withMessage("Password cannot be empty or only spaces."),
    
    body("confirmPassword")
        .trim()
        .notEmpty().withMessage("Confirm password cannot be empty or only spaces.")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Confirm password not same with password.");
            }

            return true;
        }),
];

const signUpPost = [
    validateSignupInfo, 
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const { firstname, lastname, email, password, confirmPassword, isAdmin } = req.body;
            return res.status(400).render("sign-up", {
                title: "Sign Up",
                errors: errors.array(),
                firstname,
                lastname,
                email,
                password,
                confirmPassword,
            })
        }

        const { firstname, lastname, email, password, confirmPassword, isAdmin } = req.body;
        const user = await db.addUser(firstname, lastname, email, password, isAdmin ?? false);
        
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }

            res.redirect("/");
        });
    }
]

function loginGet(req, res) {
    res.render('login', {
        title: "Login",
    });
}

const loginPost = passport.authenticate('local', { successRedirect: "/", failureRedirect: "/login" });

function logoutGet(req, res) {
     req.logout(err => {
        if (err) {
            return next(err);
        }

        res.redirect("/");
     });
}

module.exports = {
    signUpGet,
    signUpPost,
    loginGet,
    loginPost,
    logoutGet,
}
