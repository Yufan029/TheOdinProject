const express = require("express");
const messagesController = require("../controllers/messagesController");

const messagesRouter = express.Router();

messagesRouter.get("/new", messagesController.addMessageGet);
messagesRouter.post("/new", messagesController.addMessagePost);
messagesRouter.get("/delete/:id", messagesController.deleteMessageGet);

module.exports = messagesRouter;
