const { Router } = require('express');
const folderController = require('../controllers/folderController');

const folderRouter = new Router();

folderRouter.get('/create', folderController.folderCreateGet);
folderRouter.post('/create', folderController.folderCreatePost);
folderRouter.get('/', folderController.folderGet);
folderRouter.get('/:id', folderController.folderGet);
folderRouter.get('/update/:id', folderController.folderUpdateGet);
folderRouter.post('/update/:id', folderController.folderUpdatePost);
folderRouter.get('/delete/:id', folderController.folderDeleteGet)

module.exports = folderRouter;