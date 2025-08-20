const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

async function getAllMessages(req, res) {
    const messages = await db.getAllMessages();
    console.log(messages);
    res.render('index', { 
        title: "Mini Message Board",
        messages
    });
}

function getNewMessage(req, res) {
    res.render('form', {
        title: "New Message" 
    });
}

const validateParams = [
    body("author").trim()
        .notEmpty().withMessage("Are you serious? Author name cannot be empty."),
    
    body("message").trim()
        .notEmpty().withMessage("Message cannot be empty."),
]

// Passed as a array, use array as a middleware for the route, express will auto flatten it and apply accordingly.
const postNewMessage = [
    validateParams,     
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('form', {
                title: "New Message", 
                errors: errors.array(),
            });
        }

        const { author, message } = req.body;
        await db.insertNewMessage(author, message);

        res.redirect('/');
    }
]

function getMessageDetails(req, res) {
    res.render('details', { title: "Details", details: req.query });
}

async function deleteMessage(req, res) {
    console.log(req.params.id);
    await db.deleteMessage(req.params.id)

    res.redirect("/");
}

module.exports = {
    getAllMessages,
    getNewMessage,
    postNewMessage,
    getMessageDetails,
    deleteMessage
}