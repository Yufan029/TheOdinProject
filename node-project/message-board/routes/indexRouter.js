const express = require('express');
const messagesController = require("../controllers/messagesController");

const indexRouter = express.Router();

indexRouter.get('/', messagesController.getAllMessages);
indexRouter.get('/new', messagesController.getNewMessage);
indexRouter.post('/new', messagesController.postNewMessage);
indexRouter.get('/details', messagesController.getMessageDetails);
indexRouter.get('/:id/delete', messagesController.deleteMessage);

module.exports = indexRouter;