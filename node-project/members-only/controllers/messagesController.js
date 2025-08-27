const db = require("../db/queries");

async function getAllMessages(req, res, next) {
    res.locals.messages = await db.getAllMessages();
    console.log('all message: ', res.locals.messages);
    next();
}

async function addMessageGet(req, res) {
    res.render("newMessage", {
         title: "Add new message"
        }
    );
}

async function addMessagePost(req, res) {
    console.log("res.locals.currentUser.id = ", res.locals.currentUser.id);
    const { title, content } = req.body;
    await db.addMessage(title, content, res.locals.currentUser.id);
    res.redirect("/");
}

async function deleteMessageGet(req, res) {
    await db.deleteMessage(req.params.id);
    res.redirect("/");
}

module.exports = {
    addMessageGet,
    addMessagePost,
    getAllMessages,
    deleteMessageGet,
}