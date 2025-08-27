const express = require('express');
const homeController = require('../controllers/homeController');
const messagesController = require('../controllers/messagesController');

const homeRouter = express.Router();

homeRouter.get('/', messagesController.getAllMessages, homeController.homeGet);
homeRouter.get('/join-club', homeController.joinClubGet);
homeRouter.get('/captcha', homeController.captchaGet);
homeRouter.post('/verify', homeController.verifyCaptchPost);


module.exports = homeRouter;