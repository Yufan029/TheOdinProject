const { Router } = require('express');

const homeController = require('../controllers/homeController');

const homeRouter = Router();

homeRouter.get('/', homeController.homeGet);
homeRouter.get('/upload', homeController.uploadGet);
homeRouter.post('/upload', homeController.uploadPost);

module.exports = homeRouter;