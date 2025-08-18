const { body, validationResult } = require("express-validator");
const usersStorage = require("../storages/usersStorage");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

exports.usersListGet = (req, res) => {
    res.render("index", {
        title: "User list",
        users: usersStorage.getUsers(),
    })
};

exports.usersCreateGet = (req, res) => {
    res.render("createUser", {
        title: "Create user",
    });
};

const validateUsers = [
    body("firstName").trim()
        .isAlpha().withMessage(`First name ${alphaErr}`)
        .isLength({ min: 1, max: 10 }).withMessage(`First name ${lengthErr}`),
    body("lastName").trim()
        .isAlpha().withMessage(`Last name ${alphaErr}`)
        .isLength({ min: 1, max: 10 }).withMessage(`Last name ${lengthErr}`),
    body("age").trim()
        .optional({ values: "falsy" })
        .isInt({ min: 18, max: 120 }).withMessage(`Age must between 18 and 120`),
    body("email").trim()
        .isEmail().withMessage(`Must be a valid email address`),
    body("bio").trim()
        .optional({ values: "falsy" }),
];

exports.usersCreatePost = [
    validateUsers,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("createUser", {
                title: "Create user",
                errors: errors.array(),
            });
        }

        const { firstName, lastName, age, email, bio } = req.body;
        console.log(`age: ${age}`);
        console.log('bio'+bio);
        usersStorage.addUser({ firstName, lastName, age, email, bio });
        
        res.redirect("/");
    }
];

exports.usersUpdateGet = (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    res.render("updateUser", {
        title: "Update user", 
        user: user,
    });
};

exports.usersUpdatePost = [
    validateUsers,
    (req, res) => {
        const user = usersStorage.getUser(req.params.id);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("updateUser", {
                title: "Update user",
                user: user,
                errors: errors.array(),
            });
        }

        const { firstName, lastName, age, email, bio  } = req.body;
        usersStorage.updateUser(req.params.id, { firstName, lastName, age, email, bio });

        res.redirect("/");
    }
]

exports.usersSearchGet = (req, res) => {
    res.render('search', {
        title: "Search",
        searchName: "",
        searchEmail: "",
    })
}

exports.usersSearchPost = (req, res) => {
    const { searchName, searchEmail } = req.body;
    const allUsers = usersStorage.getUsers();
    const filteredUsers = allUsers.filter(user => {
        let result = true;
        
        if (searchName !== '') {
            result = searchByName(user, searchName.toLowerCase());
        }

        if (searchEmail !== '') {
            result &&= searchByEmail(user, searchEmail.toLowerCase());
        }

        return result;
    });

    console.log(filteredUsers);
    res.render('search', {
        title: "Search",
        users: filteredUsers,
        searchName,
        searchEmail,
    })
}

exports.usersDeletePost = (req, res) => {
    const { id } = req.params;
    usersStorage.deleteUser(id);

    res.redirect("/");
}


function searchByName(user, searchName) {
    return user.firstName.toLowerCase().includes(searchName) || user.lastName.toLowerCase().includes(searchName);
}

function searchByEmail(user, searchEmail) {
    return user.email.toLowerCase().includes(searchEmail);
}